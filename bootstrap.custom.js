// Add blur,reveal and ripple effect to each element
$(".dropdown-menu:not(.custom-select-list-multiple)").addClass("bg-light-blur");
$(".btn").addClass("reveal").addClass("ripple");
$(".card").addClass("reveal").addClass("reveal-large").addClass("ripple").addClass("ripple-large");
$(".custom-select-list-multiple .custom-select-option").addClass("ripple");
$(".dropdown-item").addClass("reveal");

// Brightness function
$.fn.brightness = function() {
  var bg_color, rgba, y;
  bg_color = this.css('color');
  if ((bg_color != null) && bg_color.length) {
    rgba = bg_color.match(/^rgb(?:a)?\(([0-9]{1,3}),\s([0-9]{1,3}),\s([0-9]{1,3})(?:,\s)?([0-9]{1,3})?\)$/);
    if (rgba != null) {
      if (rgba[4] === '0') {
        if (this.parent().length) return this.parent().brightness();
      } else {
        y = 2.99 * rgba[1] + 5.87 * rgba[2] + 1.14 * rgba[3];
        if (y >= 1275) {
          return 'light';
        } else {
          return 'dark';
        }
      }
    }
  } else {
    if (this.parent().length) return this.parent().brightness();
  }
};

// Reveal effect
$('<span class="reveal-span"></span>').appendTo(".reveal");
$('.reveal').mousemove(function(e) {
		revealOffset = $(this).offset(),
		revealY = e.pageY - revealOffset.top,
		revealX = e.pageX - revealOffset.left,
		revealSpan = $(this).children('.reveal-span');
		revealSpan.css({
		top: revealY - (revealSpan.height() / 2),
		left: revealX - (revealSpan.width() / 2),
		opacity: 1
		});
});
$('.reveal').mouseleave(function(e) {
	$(this).children('.reveal-span').css({
		opacity: 0
		});
});
$('.reveal:not([class*="btn-outline-"])').each(function() {
		if ($(this).brightness()=='dark') {
			$(this).addClass('reveal-dark');
		};
});
$('.reveal[class*="btn-outline-"]').each(function() {
		if ($(this).brightness()=='light') {
			$(this).addClass('reveal-dark');
		};
});

// Ripple effect
$('.ripple').click(function(e) {
		var rippleDiv = $('<span class="ripple-span"></span>'),
		rippleOffset = $(this).offset(),
		rippleY = e.pageY - rippleOffset.top,
		rippleX = e.pageX - rippleOffset.left,
		rippleSpan = '10';
	rippleDiv.css({
		width: rippleSpan,
		height: rippleSpan,
		top: rippleY - (rippleSpan / 2),
		left: rippleX - (rippleSpan / 2),
	}).appendTo($(this));
	window.setTimeout(function() {
		rippleDiv.remove();
	}, 1500);
});
$('.ripple:not([class*="btn-outline-"])').each(function() {
		if ($(this).brightness()=='dark') {
			$(this).addClass('ripple-dark');
		};
});
$('.ripple[class*="btn-outline-"]').each(function() {
		if ($(this).brightness()=='light') {
			$(this).addClass('ripple-dark');
		};
});

// Form input underline
$('.form-control[type="search"]').each(function() {
	if (!$(this).parent().hasClass('input-group')) {
		$(this).wrap('<div class="form-control-wrapper" style="position: relative;"></div>')
		$(this).parent().css({
			'margin-top': $(this).css("marginTop"),
			'margin-right': $(this).css("marginRight"),
			'margin-bottom': $(this).css("marginBottom"),
			'margin-left': $(this).css("marginLeft"),
		});
		$(this).attr('style', 'margin: 0 !important');
		$(this).after('<span></span>');
		$(this).next('span').css({
				width: $(this).outerWidth(),
				height: $(this).outerHeight(),
			'clip-path': 'inset(' + $(this).outerHeight() + 'px calc(var(--bs-outline)*-1) calc(var(--bs-outline)*-1) calc(var(--bs-outline)*-1))',
			});
	}
});
$('form').on("click",function() {
	$(this).find('.form-control').each(function() {
		$(this).next('span').css({
		width: $(this).outerWidth(),
		height: $(this).outerHeight(),
		'clip-path': 'inset(' + $(this).outerHeight() + 'px calc(var(--bs-outline)*-1) calc(var(--bs-outline)*-1) calc(var(--bs-outline)*-1))',
		});
	});
});

// Search input
$(".form-control-search-left-btn").before('<button class="btn-form-control-search-left" type="submit"></button>');
$(".form-control-search-right-btn").before('<button class="btn-form-control-search-right" type="submit"></button>');
$(".btn-form-control-search-right").css({
		'left': $('.form-control').outerWidth() - 30
		});

// Form range tracker
$('input[type="range"]').each(function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min')) * 98 + 1;
$(this).css( 'background', 'linear-gradient(to right, var(--bs-primary) 0%, var(--bs-primary) '+val+'%, #e5e5e5 ' +val+ '%, #e5e5e5 100%)' );
});
$('input[type="range"]').on("change mousemove", function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min')) * 98 + 1;
$(this).css( 'background', 'linear-gradient(to right, var(--bs-primary) 0%, var(--bs-primary) '+val+'%, #e5e5e5 ' +val+ '%, #e5e5e5 100%)' );
});

// Backdrop-filter:blur() with child issue fixed
$('<span class="bg-light-blurred"></span>').prependTo(".bg-light-blur");