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
  - Helper.Properties
  - Helper.Pluggable
...
*/

(function(){

function validateHelper(helper) {
	if (!(Type.isFunction(helper.bind) && Type.isFunction(helper.unbind))) {
		throw new TypeError('It is an invalid helper.');
	}
	return helper;
}

var Helper = this.Helper = new Class({

	_helpers: {},

	addHelper: function(helper){
		var that = this;
		var bindHelper = validateHelper(helper);

		bindHelper.addEvents({
			enable: function(){
				that.fireEvent('enableHelper', [bindHelper]);
			},
			disable: function(){
				that.fireEvent('disableHelper', [bindHelper]);
			}
		})
		.bind(this);

		var key = bindHelper.getName();
		this._helpers[key] = bindHelper;
		return this;
	},

	addHelpers: function(){
		var helpers = Array.from(arguments);
		helpers.each(function(helper){
			this.addHelper(helper);
		}, this);
		return this;
	},

	removeHelper: function(helper){
		var unbindHelper = validateHelper(helper);
		var key = unbindHelper.getName();
		delete this._helpers[key];
		return this;
	},

	removeHelpers: function(){
		var helpers = Array.from(arguments);
		if (helpers.length <= 0) {
			helpers = this.getHelpers();
		}
		helpers.each(function(helper){
			this.removeHelper(helper);
		}, this);
		return this;
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
		if (names.length <= 0) {
			names = Object.keys(this._helpers);
		}
		names.each(function(key){
			helpers.push(this.getHelper(key));
		}, this);
		return helpers;
	},

	enableHelper: function(name){
		var helper = this.getHelper(name);
		helper.setEnable(true);
		return this;
	},

	disableHelper: function(name){
		var helper = this.getHelper(name);
		helper.setEnable(false);
		return this;
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


Helper.Properties = {

    Properties: function(properties){
        if (!this.prototype.setOptions) return;
        var setOptions = this.prototype.setOptions;
        var decorator = function(options){
			if (!options) return;
            properties.each(function(key){
                if (options[key]) {
                    var method = key.capitalize();
                    var setter = 'set' + method;
                    if (this[setter]) {
                        var handler = this[setter];
                        handler.call(this, options[key]);
                    }
                    delete options[key];
                }
            }, this);
            setOptions(options);
        };
        this.prototype.setOptions = decorator;
    }

};

Object.append(Class.Mutators, Helper.Properties);


Helper.Pluggable = new Class({

	Implements: [Options, Events],

	Properties: ['name', 'target'],

	_name: null,
	_target: null,
	_enable: false,

	initialize: function(options) {
		this.setOptions(options);
	},

	setName: function(name){
		if (!Type.isString(name)){
			throw new TypeError('Name should be a character string.');
		}
		this._name = name;
		return this;
	},

	getName: function(){
		return this._name;
	},

	setTarget: function(target){
		if (!(Type.isObject(target) || target == null)){
			throw new TypeError('Specified target is not an object or null.');
		}
		this._target = target;
		return this;
	},

	getTarget: function(){
		return this._target;
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

	setEnable: function(value){
		if (this.isEnable() == value) {
			return;
		}
		var eventType = (value) ? 'enable' : 'disable';
		this[eventType]();
		this.fireEvent(eventType);
		this._enable = value;
		return this;
	},

	bind: function(control){
		if (!Type.isObject(control)) {
			throw new TypeError('It is an invalid object.');
		}
		this.setTarget(control);
		this.setup();
		if (!this.isEnable()) {
			this.setEnable(true);
		}
		return this;
	},

	unbind: function(){
		this.setEnable(false);
		this.setTarget(null);
	},

	isEnable: function(){
		return (this._enable) ? true : false;
	}

});

}());