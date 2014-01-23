---
layout: post
title: Button type=button
date: 2014/1/23 13:41:00
categories: blog
---

I ran in to a strange issue the other day where a ```<button>``` element was consistently refreshing the page, no matter what I did. I follow [Chris Coyier's train of thought on the button issue](http://css-tricks.com/use-button-element/) : Hyperlinks are meant to send someone to a new page. If you want a user to click or press something and there is no html page to send them to, you're probably better off using a ```<button>``` rather than an ```<a>``` tag with some nonsense ```href="#"``` business.

I usually work in a .NET environment where the entire page is wrapped in a ```form``` element, so I wasn't entirely surprised that tapping the ```button``` was giving me problems. I've run in to similar issues with unrelated buttons triggering client side validation somewhere else on the page because everything is really one big form. 

The normal way to stop some element from doing some default behavior like that would be some kind of ```e.preventDefault()``` situation but no matter what I tried, I couldn't get my event to fire without the page refreshing. 

After much frustration and searching, it turns out that I missed one key feature of the humble ```<button>```.

Courtesy of the [W3C](http://www.w3.org/wiki/HTML/Elements/button#HTML_Attributes):
>* type = submit/ reset/ button
>
>  The missing value default is the Submit Button state. 

All I had to do was set ```<button type="button">```. I now make it a standard practice to always explicitly set the type for the function that I want it to perform.