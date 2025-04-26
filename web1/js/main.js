(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

	// Add content selector handling
	$(document).ready(function() {
		$('.content-selector .btn').on('click', function() {
			const contentType = $(this).data('type');
			const display = $('.content-display');
			
			// Clear previous content
			display.empty();
			
			switch(contentType) {
				case 'description':
					display.html('<div class="description-content"><textarea class="form-control" rows="5" placeholder="Enter description"></textarea></div>');
					break;
				case 'images':
					display.html('<div class="image-upload"><input type="file" class="form-control" accept="image/*" multiple></div>');
					break;
				case 'certificates':
					display.html('<div class="certificate-upload"><input type="file" class="form-control" accept="image/*,application/pdf" multiple></div>');
					break;
			}
		});
	});

	// Content Selection Modal Handler
	$(document).ready(function() {
		$('#contentSelectionModal .btn').on('click', function() {
			const type = $(this).data('type');
			const contentArea = $('#contentArea');
			
			contentArea.attr('class', type);
			contentArea.empty();

			switch(type) {
				case 'description':
					contentArea.html(`
						<textarea class="form-control" placeholder="Enter description"></textarea>
					`);
					break;
				case 'images':
					contentArea.html(`
						<input type="file" class="form-control" accept="image/*" multiple>
						<div class="preview"></div>
					`);
					break;
				case 'certificates':
					contentArea.html(`
						<input type="file" class="form-control" accept="image/*,.pdf" multiple>
						<div class="preview"></div>
					`);
					break;
			}
		});

		// Handle file previews
		$(document).on('change', '#contentArea input[type="file"]', function() {
			const files = this.files;
			const preview = $(this).siblings('.preview');
			preview.empty();
			
			Array.from(files).forEach(file => {
				if (file.type.startsWith('image/')) {
					const reader = new FileReader();
					reader.onload = e => {
						preview.append(`<img src="${e.target.result}" alt="Preview">`);
					};
					reader.readAsDataURL(file);
				}
			});
		});
	});

})(jQuery);
