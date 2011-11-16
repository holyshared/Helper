(function(doc){

	var Mock = new Class({

		Implements: [Helper, Events]

	});

	var HelperMock1 = new Class({

		Implements: Helper.Pluggable,

		_name: 'helperMock1',

		setup: function(){
		},

		enable: function(){
		},

		disable: function(){
		},

		destroy: function(){
		}

	});

	var HelperMock2 = new Class({

		Implements: Helper.Pluggable,

		_name: 'helperMock2',

		setup: function(){
		},

		enable: function(){
		},

		disable: function(){
		},

		destroy: function(){
		}

	});

	window.addEventListener('load', function(){

		var testcases = [];
		testcases.push({
			title: 'addHelper/addHelpers',
			description : 'addHelper and addHelpers method testcase',
			fn: function(){

				var target1 = new Mock();
				target1.addHelper(new HelperMock1());

				log ( (target1.hasHelper('helperMock1')) ? 'assert ok' : 'addHelper - helperMock1 is not found.'  );

				var target2 = new Mock();
				target2.addHelpers(new HelperMock1(), new HelperMock2());

				log ( (target2.hasHelper('helperMock1')) ? 'assert ok' : 'addHelpers - helperMock1 is not found.'  );
				log ( (target2.hasHelper('helperMock2')) ? 'assert ok' : 'addHelpers - helperMock2 is not found.'  );

			}
		});

		testcases.push({
			title: 'removeHelper/removeHelpers',
			description : 'removeHelper and removeHelpers method testcase',
			fn: function(){

				var helper1 = new HelperMock1();
				var target1 = new Mock();
				target1.addHelper(helper1);
				target1.removeHelper(helper1);

				log ( (!target1.hasHelper('helperMock1')) ? 'assert ok' : 'removeHelper - helperMock1 is found.'  );

				var helper1 = new HelperMock1();
				var helper2 = new HelperMock2();

				var target2 = new Mock();
				target2.removeHelpers(helper1, helper2);

				log ( (!target2.hasHelper('helperMock1')) ? 'assert ok' : 'removeHelpers - helperMock1 is found.'  );
				log ( (!target2.hasHelper('helperMock2')) ? 'assert ok' : 'removeHelpers - helperMock2 is found.'  );

			}
		});

		testcases.push({
			title: 'enableHelper/disableHelper',
			description : 'enableHelper and disableHelper method testcase',
			fn: function(){

				var helper1 = new HelperMock1();
				var target1 = new Mock();
				target1.addHelper(helper1);

				target1.disableHelper('helperMock1');

				log ( (!target1.isEnableHelper('helperMock1')) ? 'assert ok' : 'disableHelper - helperMock1 is enable.'  );

				target1.enableHelper('helperMock1');

				log ( (!target1.isDisableHelper('helperMock1')) ? 'assert ok' : 'enableHelper - helperMock1 is disable.'  );

			}
		});

		makeActions(testcases);

		testcases.each(function(testcase, key){
			$('test-' + key.toString()).fireEvent('click');
		});

	}, false);

}(document));
