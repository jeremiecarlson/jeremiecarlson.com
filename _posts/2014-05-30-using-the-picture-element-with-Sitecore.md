---
layout: post
title: Using the Picture Element With Sitecore
date: 2014/5/30 19:41:00
categories: blog
---

The [```<picture>```](http://www.w3.org/TR/html-picture-element/) element provides a means to display different image assets based on screen size and display density.

## The Syntax

```html
<picture width="500" height="500">
   <source media="(min-width: 45em)" srcset="large-1.jpg 1x, large-2.jpg 2x">
   <source media="(min-width: 18em)" srcset="med-1.jpg 1x, med-2.jpg 2x">
   <source srcset="small-1.jpg 1x, small-2.jpg 2x">
   <img src="small-1.jpg" alt="">
   <p>Accessible text</p>
</picture>
```

This ```<picture>``` has a set of possible sources that the browser goes through in order. The first statement that reads as true downloads and displays the related image. The browser checks screen width via the ```media``` attribute and can choose the right image for the density of the image in the ```scrset``` attribute. If none of the sources read as true, the regular ```<img>``` is used. 

## How Sitecore Can Enhance the Picture Element

If there is no desired change in aspect ratio or cropping across screen sizes we can implement ```<picture>``` rather easily. Using [Sitecore's server side resizing](http://www.sitecore.net/Community/Technical-Blogs/John-West-Sitecore-Blog/Posts/2011/05/Media-Options-and-Query-String-Parameters-in-the-Sitecore-ASPNET-CMS.aspx) we can automate some of the work in managing all of the required assets. The content editor would be able to input a single large image and Sitecore can handle the rest using the ```?mw=``` syntax.

To adapt the same example:

```html
<picture width="500" height="500">
   <source media="(min-width: 45em)" srcset="image.jpg?mw=500 1x, image.jpg?mw=1000  2x">
   <source media="(min-width: 18em)" srcset="image.jpg?mw=200 1x, image.jpg?mw=400 2x">
   <source srcset="image.jpg?mw=75 1x, image.jpg?mw=150 2x">
   <img src="image.jpg?mw=75" alt="">
   <p>Accessible text</p>
</picture>
```

Unfortunately this does little to support the [art direction use case](http://usecases.responsiveimages.org/#art-direction), but it should help create some efficiencies.
