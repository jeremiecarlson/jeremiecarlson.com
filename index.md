---
layout: default
title: Home
---

{% for p in site.posts %}
<article>
	<h2><a href="{{ site.baseurl }}{{ p.url }}">{{ p.title }}</a></h2>
	{{ p.content }}
</article>
{% endfor %}

