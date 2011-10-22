/*
---
name: Helper.Delegator

description:

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Helper/Helper.Pluggable
  - Helper/Helper.Properties

provides:
  - Helper.Delegator
...
*/

(function(doc, Helper){

Helper.Delegator = new Class({

	Implements: [Helper.Pluggable],

	Properties: ['name', 'target', 'observer', 'methods'],

	_observer: null,
	_methods: {},

	initialize: function(options) {
		this.setOptions(options);
	},

	setObserver: function(observer){
		if (!(Type.isObject(observer) || Type.isElement(observer))){
			throw new TypeError('Specified observer is an object or not element.');
		}
		this._observer = observer;
		return this;
	},

	getObserver: function(){
		return this._observer;
	},

	getMethod: function(key){
		if (!this.hasMethod(key)) {
			throw new Error('The specification ' + key + ' method is not found.');
		}
		return this._methods[key];
	},

	getMethods: function(){
		var methods = [];
		var names = Array.from(arguments);
		if (names.length <= 0) {
			names = Object.keys(this._methods);
		}
		names.each(function(key){
			methods.push(this.getMethod(key));
		}, this);
		return methods;
	},

	setMethods: function(methods) {
		this._methods = {};
		this.addMethods(methods);
	},

	addMethod: function(key, method){
		if (this.hasMethod(method)) {
			return;
		}
		this._methods[key] = method;
		return this;
	},

	addMethods: function(methods){
		for (var key in methods) {
			this.addMethod(key, methods[key]);
		}
		return this;
	},

	removeMethod: function(key){
		if (!this.hasMethod(key)) {
			throw new TypeError('Because method ' + key + ' doesn\'t exist, it is not possible to delete it.');
		}
		delete this._methods[key];
		return this;
	},

	removeMethods: function(){
		var methods = Array.from(arguments);
		if (methods.length <= 0) {
			methods = this.getMethods();
		}
		methods.each(function(method){
			this.removeMethod(method);
		}, this);
		return this;
	},

	hasMethod: function(key){
		return (this._methods[key]) ? true : false;
	},

	delegate: function(key, args){
		var method = this.getMethod(key);
		var target = this.getTarget();
		if (!Type.isFunction(target[method])) {
			throw new Error('Method ' + method + ' doesn\'t exist or it is an invalid method.');
		}
		target[method].apply(target, args);
	}

});

}(document, Helper));