(function(){

	var Controller = this.Controller = new Class({

		Implements: [Helper, Events],

		prev: function(index){
			alert('prev');
		},

		next: function(index){
			alert('next');
		}

	});

}());
