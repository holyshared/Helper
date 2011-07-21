Helper
=================================================




Helper
-------------------------------------------------


### Methods

* addHelper
* addHelpers
* removeHelper
* removeHelpers
* getHelper
* getHelpers
* enableHelper
* disableHelper
* hasHelper
* isEnableHelper
* isDisableHelper



Helper.HelperObject
-------------------------------------------------

### Events

* onEnable
* onDisable

### Methods

* setName
* getName
* setTarget
* getTarget
* setObserver
* getObserver
* setEnable
* bind
* unbind
* enable
* disable
* isEnable
* getMethod
* getMethods
* setMethods
* addMethod
* addMethods
* removeMethod
* removeMethods
* hasMethod
* delegate


Helper.Keyboard
-------------------------------------------------

	var Controller = new Class({
	
		Implements: [Helper] //Helper building in of the controller object

		prev: function(){
			//do something
		},

		next: function(){
			//do something
		}
	
	});

	var controller = new Controller();

	var helper = new Helper.Keyboard();
	helper.addMethods({
		p: 'prev', //When p is typed, the prev method is executed.
		n: 'next' //When n is typed, the next method is executed.
	});
	controller.addHelper(helper);

### Extends

Helper.HelperObject

### Events

It is the same as the event of Helper.HelperObject.

### Methods

It is the same as the method of Helper.HelperObject.



Helper.Swipe
-------------------------------------------------

	var Controller = new Class({
	
		Implements: [Helper] //Helper building in of the controller object

		prev: function(){
			//do something
		},

		next: function(){
			//do something
		}

	});

	var controller = new Controller();

	var helper = new Helper.Swipe();
	helper.addMethods({
		left: 'prev',
		right: 'next'
	});
	controller.addHelper(helper);

### Extends

Helper.HelperObject

### Events

It is the same as the event of Helper.HelperObject.

### Methods

It is the same as the method of Helper.HelperObject.
