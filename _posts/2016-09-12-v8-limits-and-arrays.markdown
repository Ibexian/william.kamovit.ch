---
layout:     post
title:      "V8 Limits and Arrays"
subtitle:   "Object.key, V8, and the limits of things"
date:       2016-09-12 12:00:00
author:     "Will"
header-img: "img/v8.jpeg"
---
A few months back, in an attempt to further pad out my Melville twitter bot, I decided to add every available work by Melville to the seed text my markov chain had been trained on. This meant that instead of running a seed on 22,000 lines we were now trying to parse 122,000 lines of text. Parsing the seed text for Melvillebot had never been a fast process, so I settled in for the long haul. Except... the process never finished.

Now at this point it was clear that something was very wrong with how my data was created - but the process hadn't just increased at a fixed rate, it had all but stopped. After adding in some logging it became clear that everything was going swimmingly (if slowly) until around line 50,000 - at which point things slowed to a drag, finishing a line per 2-3 min rather than several a second.

But why was this happening? Clearly there was some sort of performance cliff, but where was it?

### A Confluence of factors
As it turned out, a few things conspired together to bring the parsing crashing down:

**1)** The markov chains library I had built my bot on was based around a JS implementation of a hashmap (not the native [ES6 Map Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) ). This implementation used ```Object.key()``` to create a ```Map.get()``` function, which was working ok with smaller data sets, but was slow with large sets and unusable with huge data sets. But what about ```Object.key()``` was causing this drop off in performance?

**2)** Since ```Object.key()``` returns an array - large seed files start producing very large arrays to iterate over. For some reason, 100k keys seemed to be the magic stop point for the parse function.

After digging around stack overflow a bit, I found [this post](http://stackoverflow.com/questions/16961838/working-with-arrays-in-v8-performance-issue) which turned out to contain the key to the issue.

It turns out that 100k items is where V8 (the JS engine used by default in node.js and Chrome) switches how it handles arrays. Under 100k and the js arrays are backed by C arrays - over 100k and the data is now managed as a hash table. In fact, there's a [single line in the V8 code](https://github.com/v8/v8/blob/abfa9f17410a2a84c2ac3364e0288f4a8311b9b1/src/objects.h#L2411) that shows this transition pretty clearly.

``` static const int kInitialMaxFastElementArray = 100000; ```

### Conclusion
Once I had tracked down this bottleneck the fix more or less fell out - by using the Object to check for key existence (rather than checking them myself) I was able to avoid using large arrays.

The object only version of my markov chain seeding showed ~1000% speed improvement **(from nearly infinite time to around 20 seconds for 120,000 lines)**

So if you find yourself running into a wall with large JS data sets it might be time to check how your JS Engine of choice is performing. Oh, and maybe don't use enormous arrays.