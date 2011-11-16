(function(doc){

	window.addEventListener('load', function(){

		var enable = false;
		var disable = false;

		var controller = new Controller();

		var helper = new Helper.Keyboard();
		helper.addMethods({
			p: 'prev',
			n: 'next'
		}).addEvents({
			enable: function(){
				enable = true;
			},
			disable: function(){
				disable = true;
			}
		});

		controller.addHelper(helper);

		var testcases = [];
		testcases.push({
			title: 'enable',
			description : 'enable method testcase',
			fn: function(){
				controller.disableHelper('keyboard');
				controller.enableHelper('keyboard');
				log ( (enable) ? 'assert ok - helper is enalbed' : 'aa' );
			}
		});

		testcases.push({
			title: 'disable',
			description : 'disable method testcase',
			fn: function(){
				controller.enableHelper('keyboard');
				controller.disableHelper('keyboard');
				log ( (disable) ? 'assert ok - helper is disable' : 'bb' );
			}
		});

		makeActions(testcases);

	}, false);

}(document));
