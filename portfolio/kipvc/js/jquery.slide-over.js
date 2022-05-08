(function($) {
  $.fn.slideOver = function(options) {
    // Establish our default settings
    var settings = $.extend({
      orientation: 'right',
      animationSpeed: 200,
      overlayColor: null,
      afterOpen: null,
      afterClose: null
    }, options);
    // Append the needed HTML elements to the DOM
    $('body').append(
        "<div class='slide-over'>"
      + "<a data-slideover='close' class='close-x' style='cursor:pointer;'><img class='closebtn' src='images/closebtn.png'></a>"
      + "</div>"
      + "<div class='overlay' data-slideover='close'>"
      + "</div>"
    );

    var panel = $(".slide-over");
    var panelWidth = panel.width();

    // Add proper classes for settings
    if (settings.orientation) {
      if (settings.orientation == 'left') {
        $('.slide-over').addClass('left');
      }
    }
    if (settings.overlayColor) {
      $('.overlay').css('background', settings.overlayColor);
    }

    // Trigger the slideout on click
    this.each(function() {
      $(this).click(function(event) {
        var contentId = $(this).attr('href')
        var currentContent = $('.slide-over div.slideover-content');
        var currentContentId = "#" + currentContent.attr('id');
        // Swap out the content if a different button was clicked
        if(contentId != currentContentId) {
          currentContent.remove();
          $(contentId).clone().appendTo('.slide-over');
        }
        event.preventDefault();
        // Toggle open class
        panel.addClass("open");
        // Slide functionality
        panel.show().animate({
          right: (settings.orientation == 'right' ? '0px' : "auto"),
          left: (settings.orientation == 'left' ? '0px' : 'auto')
        }, settings.animationSpeed, function() {
          if ( $.isFunction( settings.onOpen ) ) {
              settings.onOpen.call( this );
          }
        });
        // Append content inside the panel
        $(".overlay").fadeIn(settings.animationSpeed);
        $("body").css("overflow", "hidden");
      });
    });

    // Close the slideout when clicking X or outside panel
    $('*[data-slideover="close"]').click(function() {
      var currentContent = $('.slide-over div.slideover-content');
      closeSlider();
    });

    function closeSlider() {
      $('.overlay').fadeOut(settings.animationSpeed);
      // Remove the content inside the panel
      panel.animate({
        right: (settings.orientation == 'right' ? -panelWidth : "auto"),
        left:  (settings.orientation == 'left' ? -panelWidth : "auto")
      }, settings.animationSpeed, function() {
        $("body").css("overflow","auto");
        if ( $.isFunction( settings.onClose ) ) {
            settings.onClose.call( this );
        }
      });
    }
  }
}(jQuery));
