// bind $ and add a .on function to mimic jquery
var $ = document.querySelectorAll.bind(document);
Element.prototype.on = Element.prototype.addEventListener;

// check for touch and change event type 

var EventType = 'click';

if(navigator.pointerEnabled) {
	EventType = 'pointerup';
} else if (navigator.msPointerEnabled) {
	EventType = 'MSPointerUp';
} else if (Modernizr.touchevents){
 	EventType = 'touchstart';
}

// detecting js features

var feature = {
  addEventListener : !!window.addEventListener,
  querySelectorAll : !!document.querySelectorAll,
};

// set up ajax call function

var ajax = {
	load: function (url, callback) {  
	    var xhr;  
	      
	    if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();  
	    else {  
	        var versions = ["MSXML2.XmlHttp.5.0",   
	                        "MSXML2.XmlHttp.4.0",  
	                        "MSXML2.XmlHttp.3.0",   
	                        "MSXML2.XmlHttp.2.0",  
	                        "Microsoft.XmlHttp"]  

	         for(var i = 0, len = versions.length; i < len; i++) {  
	            try {  
	                xhr = new ActiveXObject(versions[i]);  
	                break;  
	            }  
	            catch(e){}  
	         } // end for  
	    }  
	      
	    xhr.onreadystatechange = ensureReadiness;  
	      
	    function ensureReadiness() {  
	        if(xhr.readyState < 4) {  
	            return;  
	        }  
	          
	        if(xhr.status !== 200) {  
	            return;  
	        }  

	        // all is well    
	        if(xhr.readyState === 4) {  
	            callback(xhr);  
	        }             
	    }  
	      
	    xhr.open('GET', url, true);  
	    xhr.send('');  
	}  
}


// load Disqus

var loadDisqus = {

	settings: {
		username: "jeremiecarlsoncom",
		commentsContainer: $("#disqus_thread")[0],
    	showButton: $("#show-comments")[0]
	},

	init: function(){
		s = this.settings;
		if (s.commentsContainer){
			this.bindUiActions();
		}
	},

	bindUiActions: function(){
		s.showButton.on(EventType, loadDisqus.getComments, false);
	},

	getComments: function(){
		var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + s.username + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        s.showButton.className += " hidden";
	}

}

document.addEventListener("DOMContentLoaded", function() {
  if (feature.addEventListener && feature.querySelectorAll) {
	  loadDisqus.init();
	}
}, false);


