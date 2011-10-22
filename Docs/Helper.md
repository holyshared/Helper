Helper
=================================================

The helper is a library where a specific function can do in plug and play.  
It is convenient to want to notify objects of what loans the change in the state when a specific event is generated on the application. 

Helper
-------------------------------------------------

Helper's management function is built into the specified object.  
When the state changes, each helper executes the method of the object object.

	//Object object built in.
	var Controller = new Class({

		Implements: [Helper],

		prev: function(){
			//do something
		},

		next: function(){
			//do something
		}

	});

	//The helper is added.
	var controller = new Controller();
	controller.addHelper(new Helper.Keyboard({
		methods: {
			p: 'prev',
			n: 'next'
		}
	}));

### Events

* **onEnableHelper** (helper) - When the helper becomes effective, it is generated. 
* **onDisableHelper** (helper) - When the helper becomes invalid, it is generated.

### Methods

* **addHelper** (helper) - The helper is added.
* **addHelpers** (helper, [helper]) - Two or more helpers are added.
* **removeHelper** (string) - The helper is deleted. 
* **removeHelpers** (string, [string]) - Two or more helpers are deleted.
* **getHelper** (string) - The helper is acquired.
* **getHelpers** (string, [string]) - Two or more helpers are acquired.
* **enableHelper** (string) - The helper is made effective. 
* **disableHelper** (string) - The helper is invalidated.
* **hasHelper** (string) - Whether the helper is added is confirmed.
* **isEnableHelper** (string) - It is confirmed whether the helper is effective.
* **isDisableHelper** (string) - It is confirmed whether the helper is invalid.


Helper.Pluggable
-------------------------------------------------

Pluggable should mount setup, enable, and the disable method in an abstract class.  
The role of each method is as follows.  

* **setup** - Helper is initialized.
* **enable** - Helper is made effective.
* **disable** - Helper is nullified.

The example that uses Pluggable is as follows.  

	Helper.StatusView = new Class({

		Implements: [Helper.Pluggable],

		_name: 'statusView',
		_change: null,

		_onChange: function(index, total){
			this._current.set('html', index);
			this._total.set('html', total);
		},

		/*-----------------------------
			ABSTRACT METHODS
		-----------------------------*/
		//Method of initializing helper.
		setup: function(){
			var target = this.getTarget();
			this._container = new Element('p');
			this._current = new Element('span');
			this._total = new Element('span');
			this._container.adopt([this._current, this._total]);
			this._container.inject($(target));
			this._change = this._onChange.bind(this);
		},

		//The helper is made effective.
		enable: function() {
			var target = this.getTarget();
			target.addEvent('change', this._change);
		},
	
		//The helper is nullified. 
		disable: function() {
			var target = this.getTarget();
			target.removeEvent('change', this._change);
		}
	
	});


### Events

* **onEnable** - When the helper becomes effective, it is generated. 
* **onDisable** - When the helper becomes invalid, it is generated.

### Methods

* **setName** (string) - The helper name is set.
* **getName** - The helper name is acquired. 
* **setTarget** (object) - The related object is specified. 
* **getTarget** - The related object is acquired. 
* **setEnable** (boolean) - The helper effective/is invalidated. 
* **bind** (object) - The helper is related. 
* **unbind** - Helper's relation is released. 
* **isEnable** - Whether the helper is effective is confirmed. 

### Abstract Methods

* **setup** - Helper is initialized.
* **enable** - Helper is made effective.
* **disable** - Helper is nullified.


Helper.Delegator
-------------------------------------------------

**Helper.Delegator** carries out delegate of the event to the object object incorporating a helper function.
delegate is performed using a **delegate method**.

The example that uses Helper.Delegator is as follows.  

	Helper.Tooltips = new Class({

		Extends: [Helper.Delegator],

		_name: 'tooltips',
		_handler: null,
		_observer: doc,
	
		_getObserver: function(){
			var target = this.getTarget();
			var observer = this.getObserver();
			if (target.toElement){
				observer = target.toElement();
			}
			return observer;
		}.protect(),

		_onMouseOver: function(event) {
			//The change in the state is notified to tootips.
			var ovserver = this._getObserver();
			var args = [ovserver];
			this.delegate('showTooltip', args);
		},

		_onMouseOut: function(event) {
			//The change in the state is notified to tootips.
			var ovserver = this._getObserver();
			var args = [ovserver];
			this.delegate('hideTooltip', args);
		},

		/*-----------------------------
			ABSTRACT METHODS
		-----------------------------*/
		//Method of initializing helper.
		setup: function(){
			this._mouseover = this._onMouseOver.bind(this);
			this._mouseout = this._onMouseOut.bind(this);
		},
	
		//The helper is made effective.
		enable: function() {
			var ovserver = this._getObserver();
			ovserver.addEvent('mouseover', this._mouseover);
			ovserver.addEvent('mouseout', this._mouseout);
		},
	
		//The helper is nullified. 
		disable: function() {
			var ovserver = this._getObserver();
			ovserver.removeEvent('mouseover', this._mouseover);
			ovserver.removeEvent('mouseout', this._mouseout);
		}

	});


### Implements

Helper.Pluggable


### Methods

* **setObserver** (object) - The object that observes the state variation is specified. 
* **getObserver** - The object that observes the state variation is acquired. 
* **getMethod** (string) - The executed method name is acquired. 
* **getMethods** (string, [string]) - Two or more executed method names are acquired. 
* **setMethods** (object) - The execution method is specified. 
* **addMethod** (string, string) - The method is added. 
* **addMethods** (object) - Two or more methods are added. 
* **removeMethod** (string) - The method is deleted. 
* **removeMethods** (string, [string]) - Two or more methods are deleted. 
* **hasMethod** (string) - Whether the method exists is confirmed. 
* **delegate** (string, array) - The delegate does the state variation. 

### Abstract Methods

* **setup** - Helper is initialized.
* **enable** - Helper is made effective.
* **disable** - Helper is nullified.


Helper.Keyboard
-------------------------------------------------

The key is notified for **Helper.Keyboard** to have been typed to the object of the object specified when the key is typed.  
Being able to notify is in the following cases.  

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

	var helper = new Helper.Keyboard({
		methods: {
			p: 'prev', //When p is typed, the prev method is executed.
			n: 'next' //When n is typed, the next method is executed.
		}
	});
	controller.addHelper(helper);


### Extends

Helper.Delegator

### Events

It is the same as the event of Helper.Pluggable.

### Methods

It is the same as the method of Helper.Pluggable.



Helper.Swipe
-------------------------------------------------

The object specified when Swipe is done on the device notifies **Helper.Swipe** for object swipe to have been worn.  
Being able to notify is in the following cases.  

* **left** - It notifies when Swipe is done to the left.
* **right** - It notifies when Swipe is done to the right.

Helper's usage is as follows.  

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

	var helper = new Helper.Swipe({
		methods: {
			left: 'prev',
			right: 'next'
		}
	});
	controller.addHelper(helper);

### Extends

Helper.Delegator

### Events

It is the same as the event of Helper.Pluggable.

### Methods

It is the same as the method of Helper.Pluggable.


Helper.Orientation
-------------------------------------------------

**Helper.Orientation** notifies the inclination to have changed into the object of the object specified when the inclination of the device changes.  
Being able to notify is in the following cases.  

* **landscape** - The state is notified to execute the method of the specification when the direction of the device becomes landscape and to have changed.
* **portrait** - The state is notified to execute the method of the specification when the direction of the device becomes portrait and to have changed.  

Helper's usage is as follows.  

	var Controller = new Class({

		Implements: [Helper] //Helper building in of the controller object

		landscape: function(){
			//do something
		},

		portrait: function(){
			//do something
		}

	});

	var controller = new Controller();

	var helper = new Helper.Orientation({
		methods: {
			landscape: 'landscape',
			portrait: 'portrait'
		}
	});
	controller.addHelper(helper);

### Extends

Helper.Delegator

### Events

It is the same as the event of Helper.Pluggable.

### Methods

It is the same as the method of Helper.Pluggable.
