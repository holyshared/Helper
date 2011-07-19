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



Helper.Interface
-------------------------------------------------


### Methods

* getName
* getTarget
* setEnable
* bind
* unbind
* isEnable
* getInvokeMethod
* getInvokeMethods
* addInvokeMethod
* addInvokeMethods
* removeInvokeMethod
* removeInvokeMethods
* hasInvokeMethod


Helper.Keyboard
-------------------------------------------------

	var Controller = new Class({
	
		Implements: [Helper]
	
		prev: function(){
			//do something
		},
	
		next: function(){
			//do something
		}
	
	});
	
	var controller = new Controller();
	
	var helper = new Helper.Keyboard();
	helper.addInvokeMethods({
		p: controller.prev,
		n: controller.next
	});
	controller.addHelper(helper);

### Extends

Helper.Interface


### Methods

* getName
* getTarget
* setEnable
* bind
* unbind
* enable
* disable
* isEnable
* getInvokeMethod
* getInvokeMethods
* addInvokeMethod
* addInvokeMethods
* removeInvokeMethod
* removeInvokeMethods
* hasInvokeMethod
* delagate
