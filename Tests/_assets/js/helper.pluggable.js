(function(doc){

	var ControllerHelper = new Class({

		Implements: [Helper.Pluggable],

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
			var target = this.getTarget();
			target.next();
		},

		_onPrev: function(event){
			var target = this.getTarget();
			target.prev();
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
		helper.addEvents({
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
		test2Helper.addEvents({
			enable: function() {
				test2Enable = true;
			},
			disable: function() {
				test2Disable = true;
			}
		});

		var testcases = [];

		testcases.push({
			title: 'bind',
			description : 'bind method testcase',
			fn: function(){
				test2Helper.bind(controller);
				log ( (test2Enable) ? 'assert ok' : 'helper is disable' );
			}
		});

		testcases.push({
			title: 'unbind',
			description : 'unbind method testcase',
			fn: function(){
				test2Helper.unbind();
				log ( (test2Disable) ? 'assert ok' : 'helper is disable' );
			}
		});

		testcases.push({
			title: 'enable',
			description : 'enable method testcase',
			fn: function(){
				controller.enableHelper('controllerHelper');
				log ( (enable) ? 'assert ok - helper is enalbed' : 'aa' );
			}
		});

		testcases.push({
			title: 'disable',
			description : 'disable method testcase',
			fn: function(){
				controller.disableHelper('controllerHelper');
				log ( (disable) ? 'assert ok - helper is disable' : 'bb' );
			}
		});

		makeActions(testcases);

	}, false);

}(document));
