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



Helper.AbstractHelper
-------------------------------------------------

### Events

* onEnable
* onDisable

### Methods

* getName
* getTarget
* setEnable
* bind
* unbind
* enable
* disable
* isEnable
* getMethod
* getMethods
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

Helper.AbstractHelper

### Events

* onEnable
* onDisable

### Methods

* getName
* getTarget
* setEnable
* bind
* unbind
* enable
* disable
* isEnable
* getMethod
* getMethods
* addMethod
* addMethods
* removeMethod
* removeMethods
* hasMethod
* delegate
