Helper
====================================

![Mootools Helper Plugin](http://holyshared.github.com/Helper/logo.png "Mootools Helper Plugin")

The helper is a library where a specific function can do in plug and play.  
It is convenient to want to notify objects of what loans the change in the state when a specific event is generated on the application. 

How to use
------------------------------------------------------------------------

For instance, it is assumed that there is a library like the slide show.  
In that case, I think that I might support the Swipe input with a keyboard and a mobile terminal.  

The helper can freely build in the miscellaneous function, comes, and can do a switch effective/invalid.  

In the following example, the following has been achieved by using the helper. 

* When p key is typed, and the prev method and n key to the slide show are typed, the next method of the slide show is executed and the image is switched. 
* The next method of the slide show is executed when swipe is done and the image is switched to the prev method and the left of the slide show when swipe is done right. 

### Sample code

	var Slideshow = new Class({
	
		Implements: [Helper],
	
		prev: function(){
			//Processing that switches the image here enters.
		},
	
		next: function(){
			//Processing that switches the image here enters.
		}

	});

	var controller = new Slideshow();
	controller.addHelper(
		new Helper.Keyboard({
			methods: {
				p: 'prev',
				n: 'next'
			}
		})
	)
	.addHelper(
		new Helper.Swipe({
			methods: {
				left: 'next',
				right: 'prev'
			}
		})
	);


Build packages
------------------------------------------------------------------------

### Mootools Core

It is the necessary always one.  

	packager build Core/Class.Extras Core/DOMReady -blocks 1.2compat

### Mootools Mobile

Only when Helper.Swipe is used, it is necessary.  

	packager build Mobile/Swipe -packages Core > mootools-mobile.js

### Helper

Please build in the necessary if necessary one.  

	packager build Helper/* +use-only Helper > helper.js
