(function(win, doc){

Object.append(Element.NativeEvents, {
	webkitAnimationEnd: 1,
	animationend: 1
});


var Controller = this.Controller = new Class({

	Implements: [Helper, Options, Events],

	_view: null,

	initialize: function(options){
		this.setOptions(options);
	},

	prevAction: function(){
		this.getView().setMessage('Action prevAction was called.');
	},

	nextAction: function(){
		this.getView().setMessage('Action nextAction was called.');
	},

	landscapeAction: function(){
		this.getView().setMessage('Action landscapeAction was called.');
	},

	portraitAction: function(){
		this.getView().setMessage('Action portraitAction was called.');
	},

	getView: function(){
		return this._view;
	},

	setView: function(view){
		this._view = view;
	}

});

var StatusView = this.StatusView = new Class({

	initialize: function(container){
		var type = '';
		if (Browser.firefox){
			type = 'animationend';
		} else if (Browser.safari || Browser.chrome) {
			type = 'webkitAnimationEnd';
		}

		this.container = container;
		this.container.addEvent(type, function(event){
			container.removeClass('highlight');
		});
	},

	setMessage: function(message) {
		this.container.set('html', message);
		this.container.addClass('highlight');
	},

	getMessage: function(message) {
		return this.container.get('html');
	}

});

}(window, document));
