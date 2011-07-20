/*
---
name: Helper.Keyboard

description: The input with the keyboard is notified to the related specific object.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Helper/Helper.HelperObject

provides:
  - Helper.Keyboard
...
*/

(function(doc, Helper){

Helper.Keyboard = new Class({

	Extends: Helper.HelperObject,

	_name: 'keyboard',
	_handler: null,

	_onKeydown: function(event){
		if (!this.isEnable()) return;
		if (!this.hasMethod(event.key)) return;
		this.delegate(event.key);
	},

	setup: function(){
		this._handler = this._onKeydown.bind(this);
	},

	enable: function() {
		doc.addEvent('keydown', this._handler);
	},

	disable: function() {
		doc.removeEvent('keydown', this._handler);
	}

});

}(document, Helper));