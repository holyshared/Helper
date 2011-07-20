/*
---
name: Helper

description: The miscellaneous function is offered to the object built in.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/Class
  - Core/Options
  - Core/Event

provides:
  - Helper
  - Helper.Interface
...
*/

(function(){

function validateHelper(helper) {
	if (!Type.isHelper(helper)){
		throw new TypeError('It is an invalid helper.');
	}
	return helper;
}

var Helper = this.Helper = new Class({

	_helpers: {},

	addHelper: function(helper){
		var bindHelper = validateHelper(helper);
		bindHelper.bind(this);
		var key = bindHelper.getName();
		this._helpers[key] = bindHelper;
	},

	addHelpers: function(){
		var helpers = Array.from(arguments);
		helpers.each(function(helper){
			this.addHelper(helper);
		}, this);
	},

	removeHelper: function(helper){
		var unbindHelper = validateHelper(helper);
		var key = unbindHelper.getName();
		delete this._helpers[key];
	},

	removeHelpers: function(){
		var helpers = Array.from(arguments);
		if (helpers.length <= 0) {
			helpers = this.getHelpers();
		}
		helpers.each(function(helper){
			this.removeHelper(helper);
		}, this);
	},

	getHelper: function(name){
		if (!this.hasHelper(name)){
			throw new Error('Helper ' + name + ' is not found.');
		}
		return this._helpers[name];
	},

	getHelpers: function(){
		var helpers = [];
		var names = Array.from(arguments);
		if (helpers.length <= 0) {
			names = Object.keys(this._helpers);
		}
		names.each(function(key){
			helpers.push(this.getHelper(key));
		});
		return helpers;
	},

	enableHelper: function(name){
		var helper = this.getHelper(name);
		helper.setEnable(true);
	},

	disableHelper: function(name){
		var helper = this.getHelper(name);
		helper.setEnable(false);
	},

	hasHelper: function(name){
		return (this._helpers[name]) ? true : false;
	},

	isEnableHelper: function(name){
		var helper = this.getHelper(name);
		return helper.isEnable();
	},

	isDisableHelper: function(name){
		var helper = this.getHelper(name);
		return (helper.isEnable()) ? false : true;
	}

});


Helper.Interface = new Class({

	_methods: {},

	Implements: [Options, Events],

	getName: function(){
		return this.name;
	},

	getTarget: function(){
		return this.target;
	},

	setEnable: function(value){
		var eventType = (value) ? 'enable' : 'disable';
		this[eventType]();
		this.fireEvent(eventType);
		this._enable = value;
	},

	bind: function(control){
		if (!Type.isObject(control)) {
			throw new TypeError('');
		}
		this.target = control;
	},

	unbind: function(){
		this.target = null;
	},

	isEnable: function(){
		return (this._enable) ? true : false;
	},

	getInvokeMethod: function(key){
		if (!this.hasInvokeMethod(key)) {
		}
		return this._methods[key];
	},

	getInvokeMethods: function(){
	},

	addInvokeMethod: function(key, method){
		this._methods[key] = method;
	},

	addInvokeMethods: function(methods){
		for (var key in methods) {
			this.addInvokeMethod(key, methods[key]);
		}
	},

	hasInvokeMethod: function(key){
		return (this._methods[key]) ? true : false;
	},

	delagate: function(key, args){
		var handler = this.getInvokeMethod(key);
		handler(args);
	}

});

new Type('Helper', Helper.Interface);

}());