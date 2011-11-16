(function(doc){

	window.addEventListener('load', function(){

		var enable = false;
		var disable = false;

		var controller = new Controller();

		var helper = new Helper.Swipe();
		helper.addMethods({
			left: 'prev',
			right: 'next'
		}).addEvents({
			enable: function() {
				enable = true;
			},
			disable: function() {
				disable = true;
			}
		});
		controller.addHelper(helper);

		var testcases = [];

		testcases.push({
			title: 'enable',
			description : 'enable method testcase',
			fn: function(){
				controller.disableHelper('swipe');
				controller.enableHelper('swipe');
				log ( (enable) ? 'assert ok - helper is enabled' : 'aa' );
			}
		});

		testcases.push({
			title: 'disable',
			description : 'disable method testcase',
			fn: function(){
				controller.enableHelper('swipe');
				controller.disableHelper('swipe');
				log ( (disable) ? 'assert ok - helper is disable' : 'bb' );
			}
		});

		makeActions(testcases);

	}, false);

}(document));