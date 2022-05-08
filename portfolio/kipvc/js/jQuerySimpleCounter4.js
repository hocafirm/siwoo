(function($) {
	$.fn.jQuerySimpleCounter4 = function( options ) {
	    var settings = $.extend({
	        start:  0,
	        end:    15,
	        easing: 'swing',
	        duration: 4000,
	        complete: ''
	    }, options );

	    var thisElement = $(this);

	    $({count: settings.start}).animate({count: settings.end}, {
			duration: settings.duration,
			easing: settings.easing,
			step: function() {
				var mathCount = Math.ceil(this.count)/100;
				thisElement.text(mathCount);
			},
			complete: settings.complete
		});
	};

}(jQuery));
