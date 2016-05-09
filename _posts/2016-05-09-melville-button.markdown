---
layout:     post
title:      "Melville Button"
subtitle:   "A tale of node, raspberry pi, and compiler upgrades"
date:       2016-05-09 12:00:00
author:     "Will"
header-img: "img/melvillebutton.png"
---
Ever since I bought an Amazon Dash button I've been planning on somehow using it to trigger my twitter bots, and when I found [node-dash-button](https://github.com/hortinstein/node-dash-button) I finally got the kick to move forward.

For this project I was relying on node-dash-button to do two things: 

1. Find the address of the button
2. Using said address to watch for button presses

Since the address of the device won't be changing we can handle the first task on a normal desktop with node-dash's ```node bin/findbutton``` without any issue.

Scanning for button presses on my computer works out of the box as well, but since I don't leave my computer on all the time, this wasn't a long term solution. 

### Enter the raspberry pi

Fortunately I already had a raspberry pi lying around without any use. My raspberry pi was already running Raspian, so it shouldn't take me to much effort to get node and node-dash running - well that was the thought at least.

After installing node on raspbian:

	wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
	sudo dpkg -i node_latest_armhf.deb

This got me the 0.12.6 version of node, which was perfect, except it wasn't.

After cloning the node-dash-button git repo it turned out that node-dash-button requires node 4.0 and above in order to run, which left me with two options - rework node-dash in order to get it to work on 0.12.6 or try to get v4 working on the raspberry pi.

### Installing Node v4.0+ on a raspberry pi

I decided to go with the node version upgrade, but it ended up leading a bit further into the javascript arcana than I had planned. 

Since I'm not the first person to go down this path there were several guides readily available that showed how to get node v4 on to any version of a raspberry pi (https://blog.wia.io/installing-node-js-v4-0-0-on-a-raspberry-pi). 

What the available guides failed to mention was that __some aspects of node v4.0.0+ rely on a different version of the underlying GCC than the default one.__

This stems from the V8 javascript compiler in node v4.0.0 - trying to run node-pcap and monitor events simply innundated me with compiler errors.

### Bigger numbers are better: GCC 4.8 > 4.6

Fortunately for us - even though the default version is 4.6 - there's a package for 4.8 available in raspbian. So it's a simple enough (though perhaps scary) task to get the newer version installed.

	sudo apt-get install gcc-4.8 g++-4.8
	cd /usr/bin
	sudo rm g++
	sudo ln -s /usr/bin/g++-4.8 g++
	sudo rm gcc
	sudo ln -s /usr/bin/gcc-4.8 gcc   

With a new version of node, an updated gcc, and figers crossed - I tried running node-dash-button once again - and success! We can now monitor dash button presses, so it's downhill from here. 

### Wind at our backs: Final steps

We now will want to make sure our button tracking starts on boot, which means editing the ``` /etc/rc.local ```file by adding (in my case) ``` su pi -c 'sudo /usr/local/bin/node /home/pi/melvilleButton/dash.js < /dev/null &'``` to the end of the file. 

All that remained now was to tell node-dash-button what to do when the button was pressed. For this I simply cloned my MelvilleBot.js repo, installed the dependencies, and imported it into node-dash-button, so that we'd have an api to hit and trigger tweets.

As an added bonus I decided to expand my test seed to be all of Melville's writings (white jacket, typee, etc.) - In doing so I ran into hard limit length at around ~50000 lines, but more on that later.

If you'd like to check out the updated repo on github it's available [here](https://github.com/Ibexian/wkapi) - the twitter bots tweet at [@melvillebot](https://www.twitter.com/melvillebot) and [@FSFitzgeraldBot](https://www.twitter.com/FSFitzgeraldBot)

