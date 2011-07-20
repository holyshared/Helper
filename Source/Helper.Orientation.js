/*
---
name: Helper.Orientation

description: 

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

	enable: function() {
		win.addEvent('orientationchange', this._handler);
	},

	disable: function() {
		win.removeEvent('orientationchange', this._handler);
	}

});

}(window, Helper));
