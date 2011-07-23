/*
---
name: Helper.Orientation

description: The object that specifies the change of orientation is notified.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Helper/Helper.HelperObject

provides:
  - Helper.Orientation
...
*/

(function(win, Helper){

Helper.Orientation = new Class({

	Extends: Helper.HelperObject,

	_name: 'orientation',
	_handler: null,
	_observer: win,

	setup: function(){
		this._handler = this._onOrientationChange.bind(this);
	},

	_onOrientationChange: function(event){
		var type = '';
		var orientation = win.orientation;
		//landscape
		if (orientation == 90 || orientation == -90) {
			type = 'landscape';
		//portrait
		} else if (orientation == 0 || orientation == 180) {
			type = 'portrait';
		}
		if (!this.isEnable()) return;
		if (!this.hasMethod(type)) return;
		this.delegate(type);
	},

	_getObserver: function(){
		var target = this.getTarget();
		var observer = this.getObserver();
		if (target.toElement){
			observer = target.toElement();
		}
		return observer;
	}.protect(),

	enable: function() {
		var ovserver = this._getObserver();
		ovserver.addEvent('orientationchange', this._handler);
	},

	disable: function() {
		var ovserver = this._getObserver();
		ovserver.removeEvent('orientationchange', this._handler);
	}

});

}(window, Helper));
