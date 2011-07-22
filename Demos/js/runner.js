(function(win, doc){

window.addEvent('domready', function(){

	var swipeHelper = new Helper.Swipe({
		methods: {
			left: 'nextAction',
			right: 'prevAction'
		}
	});

	var keyboardHelper = new Helper.Keyboard({
		methods: {
			p: 'prevAction',
			n: 'nextAction'
		}
	});
	
	var orientationHelper = new Helper.Orientation({
		methods: {
			landscape: 'landscapeAction',
			portrait: 'portraitAction'
		}
	});

	var view = new StatusView($('status'));

	var controller = new Controller({
		onEnableHelper: function(helper){
			var name = helper.getName();
			var enableButton = $(name + 'Enable');
			var disableButton = $(name + 'Disable');
			enableButton.removeClass('enable')
				.addClass('disable');
			disableButton.removeClass('disable')
				.addClass('enable');
		},
		onDisableHelper: function(helper){
			var name = helper.getName();
			var enableButton = $(name + 'Enable');
			var disableButton = $(name + 'Disable');
			enableButton.removeClass('disable')
				.addClass('enable');
			disableButton.removeClass('enable')
				.addClass('disable');
		}
	});
	controller.addHelpers(swipeHelper, keyboardHelper, orientationHelper)
		.setView(view);

	var helpers = ['keyboard', 'swipe', 'orientation'];
	helpers.each(function(name){
		var enableButton = $(name + 'Enable');
		enableButton.addEvent('click', function(event){
			if (this.hasClass('disable')) {
				return;
			}
			controller.enableHelper(name);
		});
	
		var disableButton = $(name + 'Disable');
		disableButton.addEvent('click', function(event){
			if (this.hasClass('disable')) {
				return;
			}
			controller.disableHelper(name);
		});
	});

});

}(window, document));
