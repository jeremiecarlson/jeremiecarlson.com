---
layout: post
title: Handling different touch events and the 300ms delay
date: 2014/2/14 19:41:00
categories: blog
---

When the iPhone hit the scene, Apple needed a way to handle all those sites that never imagined they would show up on a tiny screen. One way to help the user zero in on the content that they really wanted was the double-tap to zoom feature. Apple engineers came up with an ingenious system that does a kind of smart zoom directly on to the content area where the user double-taps.

To get the double-tap action to work, an event listener is set that listens for a tap and then must wait for up to 300ms to see if a second tap is coming. This has the unintended consequence of creating the appearance of a slow to respond site. There is a way around it.

It turns out this 300ms delay is attached to the 'click' event. This means that if we set event listeners for the device's native touch action, we can avoid it all together. This is made slightly more difficult in the fact that different browser vendors and device manufacturers handle touch differently.

Webkit, and now Blink currently use ["Touch Events"](http://www.w3.org/TR/touch-events/) and Microsoft supports a competing spec called ["Pointer Events"](http://www.w3.org/TR/pointerevents/). I think that Pointer Events make a hell of a lot more sense than Touch Events so don't be too quick to jump on the anti M$FT bandwagon on this one.

There are a few different groups that have attempted to solve this particular issue with good success including the Financial Times with their library [FastClick](http://ftlabs.github.io/fastclick/). I've had a lot of trouble getting FastClick and other similar libraries to work so I've come up with my own solution using browser feature detection and [Modernizr](http://modernizr.com/).

{% highlight js %}
var eventType = 'click';

if (navigator.pointerEnabled) {
	eventType = 'pointerup';
} else if (navigator.msPointerEnabled) {
	eventType = 'MSPointerUp';
} else if (Modernizr.touchevents){
 	eventType = 'touchend';
}
{% endhighlight %}

What I'm doing here is setting my event type to a variable and going through a series of checks. I default to the click event for non touch-screen devices, then check for ```pointerup``` (IE11+ currently), ```MSPointerUp``` (IE10), and have Modernizr do the hard work of testing for all other touch scenarios which use ```touchend```. I can then use ```eventType``` in place of any event listener that I use on the site and ensure that I have the fastest touch action available.

I'd love to hear if anyone has suggestions or a different way that they are handling cross-browser touch interactions.
