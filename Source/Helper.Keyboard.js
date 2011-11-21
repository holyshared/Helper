/*
---
name: Helper.Keyboard

description: The input with the keyboard is notified to the related specific object.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Helper/Helper.Delegator

provides:
  - Helper.Keyboard
...
*/

(function(doc, Helper){

Helper.Keyboard = new Class({

	Extends: Helper.Delegator,

	_name: 'keyboard',
	_handler: null,
	_observer: doc,

	_onKeydown: function(event){
		if (!this.isEnable()) return;
		if (!this.hasMethod(event.key)) return;
		this.delegate(event.key);
	},

	setup: function(){
		this._handler = this._onKeydown.bind(this);
	},

	enable: function() {
		var ovserver = this.getObserver();
		ovserver.addEvent('keydown', this._handler);
	},

	disable: function() {
		var ovserver = this.getObserver();
		ovserver.removeEvent('keydown', this._handler);
	},

	destroy: function() {
		delete this._handler;
	}

});

}(document, Helper));