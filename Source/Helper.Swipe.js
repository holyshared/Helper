/*
---
name: Helper.Swipe

description: The swipe operation is notified to a relating specific object.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Mobile/Swipe
  - Helper/Helper.HelperObject

provides:
  - Helper.Swipe
...
*/

(function(doc, Helper){

Helper.Swipe = new Class({

	Extends: Helper.HelperObject,

	_name: 'swipe',
	_handler: null,
	_observer: doc.body,

	setup: function(){
		this._handler = this._onSwipe.bind(this);
	},

	_onSwipe: function(event){
		if (!this.isEnable()) return;
		if (!this.hasMethod(event.direction)) return;
		this.delegate(event.direction);
	},

	_getObserver: function(){
		var target = this.getTarget();
		var observer = this.getObserver();
		if (observer.toElement){
			observer = observer.toElement();
		}
		return observer;
	}.protect(),

	enable: function() {
		var ovserver = this._getObserver();
		ovserver.addEvent('swipe', this._handler);
	},

	disable: function() {
		var ovserver = this._getObserver();
		ovserver.removeEvent('swipe', this._handler);
	}

});

}(document, Helper));
