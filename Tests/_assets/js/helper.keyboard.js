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

		var defaultStatus = controller.isEnableHelper('keyboard');
		log ( (defaultStatus) ? 'assert ok - helper default status is enabled' : 'assert ng - helper default status is not enabled' );

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

		testcases.push({
			title: 'destroy',
			description : 'destroy method testcase',
			fn: function(){
				var check = false;
				var helper = new Helper.Keyboard({
					name: 'destroy'
				});
				var unbind = function(helper){
					check = true;
					controller.removeEvent('unbindHelper', unbind);
				};
				controller.addEvent('unbindHelper', unbind);
				controller.addHelper(helper);
				controller.removeHelper(helper);
				log ( (check) ? 'assert ok - helper is unbind' : 'assert ng - helper is not unbind' );

			}
		});


		makeActions(testcases);

	}, false);

}(document));
