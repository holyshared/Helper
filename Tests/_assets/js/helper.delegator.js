(function(doc){

	var ControllerHelper = new Class({

		Extends: Helper.Delegator,

		_name: 'controllerHelper',

		setup: function(){
			this._prev = new Element('button', {
				type: 'button',
				html: 'prev'
			});
			this._next = new Element('button', {
				type: 'button',
				html: 'next'
			});
			this._prevHandler = this._onPrev.bind(this);
			this._nextHandler = this._onNext.bind(this);
		},

		_onNext: function(event){
			this.delegate('next');
		},

		_onPrev: function(event){
			this.delegate('prev');
		},

		enable: function(){
			var content = $('mt-content');
			this._prev.inject(content);
			this._next.inject(content);
			this._prev.addEvent('click', this._prevHandler);
			this._next.addEvent('click', this._nextHandler);
		},

		disable: function(){
			this._prev.removeEvent('click', this._prevHandler);
			this._next.removeEvent('click', this._nextHandler);
			this._prev = this._prev.dispose();
			this._next = this._next.dispose();
		}
	});

	window.addEventListener('load', function(){

		var enable = false;
		var disable = false;

		var controller = new Controller();

		var helper = new ControllerHelper();
		helper.addMethods({
			prev: 'prev',
			next: 'next'
		}).addEvents({
			enable: function() {
				enable = true;
			},
			disable: function() {
				disable = true;
			}
		});
		controller.addHelper(helper);


		var test2Enable = false;
		var test2Disable = false;

		var test2Controller = new Controller();
		var test2Helper = new ControllerHelper();
		test2Helper.addMethods({
			prev: 'prev',
			next: 'next'
		}).addEvents({
			enable: function() {
				test2Enable = true;
			},
			disable: function() {
				test2Disable = true;
			}
		});

		var testcases = [];

		testcases.push({
			title: 'addMethod/addMethods',
			description : 'addMethod and addMethods method testcase',
			fn: function(){
				var helper = new ControllerHelper();
				helper.addMethod('prev', 'prevContent');

				helper.addMethods({
					'first': 'firstContent',
					'last': 'lastContent'
				});

				log ( (helper.hasMethod('prev')) ? 'assert ok' : 'prev method is not found.' );
				log ( (helper.hasMethod('first')) ? 'assert ok' : 'first method is not found.' );
				log ( (helper.hasMethod('last')) ? 'assert ok' : 'last method is not found.' );
			}
		});

		testcases.push({
			title: 'removeMethod/removeMethods',
			description : 'removeMethod and removeMethods method testcase',
			fn: function(){
				var helper = new ControllerHelper();
				helper.addMethod('prev', 'prevContent');

				helper.addMethods({
					'first': 'firstContent',
					'last': 'lastContent'
				});
				helper.removeMethod('prev');
				helper.removeMethods('first', 'last');

				log ( (!helper.hasMethod('prev')) ? 'assert ok' : 'prev method is found.' );
				log ( (!helper.hasMethod('first')) ? 'assert ok' : 'first method is  found.' );
				log ( (!helper.hasMethod('last')) ? 'assert ok' : 'last method is found.' );
			}
		});

		makeActions(testcases);

	}, false);

}(document));