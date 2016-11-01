---
layout:     post
title:      "Words on Fire"
subtitle:   "Using Javascript and Google Font Effect to make the worst Bookmarklet ever"
date:       2016-11-01 12:00:00
author:     "Will"
header-img: "img/hell.jpeg"
---
A few months ago, while doing my favorite activity (spending too much time on the internet) I was linked to [Google Fonts' beta for 'font effects'](https://developers.google.com/fonts/docs/getting_started#enabling_font_effects_beta). If you haven't seen these font effects before - **they are fantastic** in a Geocities sort of way.

With options like 'distressed wood', 'neon', and 'ice' there's was no chance I was going to simply move on and forget this. I had to do something.

![Distressed Wood](/img/wood.png)

As you may have gathered by the title of this post, the font effect that stood out to me the most was 'fire-animation', which, more than any other, really hammers home that awful Geocities vibe. Now, I could simply have added some of these effects to this website, but why stop there? Why not add it to every website?

### Enter bookmarklet
As many of you know you can add any properly formatted bit of javascript as a bookmark on your browser. Since we're working with a beta product from Google, Chrome is going to be the best place to try this out.

For my bookmarklet I wanted to show the full power of the fire animation, and that means having it on every bit of text on a page. To do this, I use JS to add a link element to the page's head, include the needed google api call, and change font of the body text to match. The minified, ready for bookmarking, code is as follows:

	javascript:(function(){var a=document.getElementsByTagName("body")[0],b="font-effect-fire-animation",c="myCss";if(!document.getElementById(c)){var d=document.getElementsByTagName("head")[0],e=document.createElement("link");e.id=c,e.rel="stylesheet",e.type="text/css",e.href=document.location.protocol+"//fonts.googleapis.com/css?family=Rancho&effect=fire-animation",e.media="all",d.appendChild(e)}a.classList?a.classList.add(b):a.className+=" "+b})();

You've now been granted the keys to this awful new kingdom - **go forth and set text on fire!**

![This page is on fire](/img/firepage.png)