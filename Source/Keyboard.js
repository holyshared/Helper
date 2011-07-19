/*
---
name: Helper.Keyboard

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Helper/Helper

provides:
  - Helper.Keyboard
...
*/

(function(Helper){

Helper.Keyboard = new Class({

	Implement: [Helper.Interface],

	_onKeydown: function(event){
		if (!this.isEnable()) {
			return;
		}
		this.delagate(event.key);
	},

	enable: function() {
		window.addEvent('keydown', this._onKeydown.bind(this));
	},

	disable: function() {
		window.removeEvent('keydown', this._onKeydown);
	}

});

}(Helper));