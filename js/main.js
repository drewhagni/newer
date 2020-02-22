jQuery(document).ready(function() {

	//* Variables

	var wHeight = $(window).outerHeight();

	function tipsText(){
		if(! $('body').hasClass('start')){
			if($('body').hasClass('in-process')) {
				// $('#tips p').html('<i class="far fa-hand-paper"></i> Click & drag to navigate slider');
			} else if($('body').hasClass('in-code')) {
				$('#tips p').html('<i class="far fa-hand-pointer"></i> Click tiles for more info');
			} else if($('body').hasClass('in-skillset')) {
				// $('#tips p').html('');
			} else if($('body').hasClass('in-footer')) {
				// $('#tips p').html('<i class="fas fa-praying-hands"></i> Thanks for visiting!');
			} else {
				// $('#tips p').html('<i class="fas fa-long-arrow-alt-down"></i> Keep Scrolling');
			}
		} else {
			$('#tips p').html('<i class="fas fa-long-arrow-alt-down"></i>');
		}
	}


	setTimeout(function() {
		tipsText();
	}, 600)

	$(document).scroll(function() {
		tipsText();
	});

	$('.atvImg').each(function(){
		var atvParentHeight = $(this).parent().outerHeight();
		$(this).height(atvParentHeight);
	});

	/*
	var arr = [];
	i = 0;

	$('#code .box').each(function(){
		var tileColor = $(this).find('.atvImg-bg-color').css('background-color');
        arr[i++] = tileColor;

	});

	console.log(arr);
	*/

	atvImg();


	$('#code .box').each(function(){
		var tileColor = $(this).css('background-color');
		$(this).css('background-color', '');
		$(this).find('.atvImg-layers').css('background-color', tileColor);
	});

	/*
	$.each(arr, function(i, tileColor) {
		console.log(tileColor);
	});

	*/

	//* Smooth scroll to anchor links
	$('a[href*="#"]') // Select all links with hashes
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.not('.nav-tabs a')
	.click(function(event) {
		// On-page links
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
			&& 
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 500, function() {
					// Callback after animation
					// Must change focus!
					var $target = $(target);
					$target.focus();
					if ($target.is(":focus")) { // Checking if the target was focused
						return false;
					} else {
						$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					};
				});
			}
		}
	});

	// Initialize Slick Slider
	$('#process-slider').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		dots: true,
		focusOnSelect: true,
		responsive: [
		{
			breakpoint: 575.98,
			settings: {
				arrows: false,
				centerPadding: '0',
		  }
		}
		]
	});

	// Match heights of boxes to each other
	function matchBoxes() {
		$('.match-heights').each(function(){  
		
			var highestBox = 0;

			$('.match-height').height('auto');

			$('.match-height', this).each(function(){
				if($(this).height() > highestBox) {
					highestBox = $(this).height(); 
				}
			});
					
			$('.match-height',this).height(highestBox);
			// var boxHeight = $(this).outerHeight();

		});
	}
	
	setTimeout(function() {
		matchBoxes();
	}, 200);

	$(window).resize(matchBoxes);

	setTimeout(function(){

		$('#skillset #bar-graph .skill').each(function(){
			var level = $(this).children('.bar').attr('data-level') / 10 * 100 +'%';
			$(this).children('.bar').css('height', level);
			// $(this).children('.bar').css('opacity', 1);

		});
	}, 100);

	enquire.register('screen and (min-width: 1024px)', {

		match: function(){

			// console.log('init ScrollMagic');
			initScrollMagic();
		
		},

		unmatch: function(){

			// console.log('disable ScrollMagic');
			controller.destroy(true);
			$('*').removeAttr('style');

		}

	});

	// Page Loader
	$(window).on('load', function (){
		setTimeout(function(){
			$('#page-loader').addClass('loaded');
			// TweenMax.to('#page-loader', 1, {autoAlpha: 0, ease: Power3.easeInOut});
		}, 500);
	});

	function initScrollMagic(){

		var controller = new ScrollMagic.Controller();

		// Fade In Hero Elements
		$(window).on('load', function (){
			setTimeout(function(){
				var fadeInHeroElems = new TimelineMax();
				fadeInHeroElems
					.to('#hero .graphic', 1.5, {autoAlpha: 1, y: '0', ease: Power4.easeInOut})
					.to('#hero .bg', 0.5, {autoAlpha: 1, ease: Power1.easeOut})
					.to('#hero h2', 0.5, {autoAlpha: 1, x: '0', ease: Power1.easeOut}, '-=1.5')
					.to(['#hero h3', '#hero hr'], 0.5, {autoAlpha: 1, x: '0', ease: Power1.easeOut}, '-=0.5')
					// .staggerFrom('#hero .intro > *', 0.5, {autoAlpha: 0, x: '-50px', ease: Power1.easeOut}, 0.5, 0)
					;
			}, 500);
		});	
	/*
		// Pin About Section (horizontal scroll)
		var parallaxInsigniaTl = new TimelineMax();
		parallaxInsigniaTl
			.to('#hero .bg', 1, {y: '-50%', ease: Power4.easeInOut}, 0.1)
			;
	*/
		// Parallax Hero
		var parallaxHero = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration: '150%',
		})
		.setTween(TweenMax.to($('#hero .content'), 1, {y: '50%', ease:Power1.easeOut}))
		.addTo(controller)
		;

		// Header Changes ---------------------->
		setTimeout(function(){

			var menuColorStart = new ScrollMagic.Scene({
				triggerElement: '#hero',
				triggerHook: 0,
				offset: 0,
			})
			.setTween(TweenLite.set($('body'), {className: 'start'}))
			.addTo(controller)
			;

			var menuColorHero = new ScrollMagic.Scene({
				triggerElement: '#hero',
				triggerHook: 0,
				offset: 150,
			})
			.setTween(TweenLite.set($('body'), {className: 'in-hero'}))
			// .addIndicators()
			.addTo(controller)
			;

			var menuColorAbout = new ScrollMagic.Scene({
				triggerElement: '#developer-designer',
				triggerHook: 1,
			})
			.setTween(TweenLite.set($('body'), {className: 'in-about'}))
			.addTo(controller)
			;

			var menuColorProcess = new ScrollMagic.Scene({
				triggerElement: '#process',
				triggerHook: 1,
			})
			.setTween(TweenLite.set($('body'), {className: 'in-process'}))
			.addTo(controller)
			;

			// var processHeight = $('#process').outerHeight() + 500;

			var menuColorCode = new ScrollMagic.Scene({
				triggerElement: '#code',
				triggerHook: 1,
				offset: wHeight / 2
			})
			.setTween(TweenLite.set($('body'), {className: 'in-code'}))
			.addTo(controller)
			;

			var menuColorSkillset = new ScrollMagic.Scene({
				triggerElement: '#skillset',
				triggerHook: 1,
			})
			.setTween(TweenLite.set($('body'), {className: 'in-skillset'}))
			.addTo(controller)
			;

			var menuColorFooter = new ScrollMagic.Scene({
				triggerElement: '#skillset',
				triggerHook: 1,
				offset: wHeight
			})
			.setTween(TweenLite.set($('body'), {className: 'in-footer'}))
			.addTo(controller)
			;

		}, 500);


		// ---------------------->
		/*
		// FadeOut Insignia
		var fadeOutInsignia = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration: '50%',
		})
		.setTween(TweenMax.to($('#hero .bg'), 1, {autoAlpha: 0, ease:Power4.easeInOut}))
		.addTo(controller)
		;
		*/

		// Slide In Developer Illustration
		var slideInDevIllo = new ScrollMagic.Scene({
			triggerElement: '#developer',
			triggerHook: 1,
			duration: '100%',
			offset: -150,
		})
		.setTween(TweenMax.from($('#developer .illo'), 1, {x: '-100%', ease:Power4.easeInOut}))
		.addTo(controller)
		;

		// Slide Out Design Illustration
		var slideOutDesIllo = new ScrollMagic.Scene({
			triggerElement: '#process',
			triggerHook: 1,
			duration: '100%',
			offset: -150,
		})
		.setTween(TweenMax.to($('#designer .illo'), 1, {x: '100%', ease:Power4.easeInOut}))
		.addTo(controller)
		;

		// Pin About Section (horizontal scroll)
		var horizontalMoveTl = new TimelineMax();
		horizontalMoveTl
			.to('.horizontal-container', 1, {x: '-50%', ease: Power0.easeNone}, 0.1)
			;

		var pinAboutSection = new ScrollMagic.Scene({
			triggerElement: '#developer-designer',
			triggerHook: 0,
			duration: '300%',
		})
		.setTween(horizontalMoveTl)
		.setPin('#developer-designer')
		.addTo(controller)
		;

		var codeBGTl = new TimelineMax();
		codeBGTl
			.to('#process .container', 0.1, {opacity: 0, ease: Power1.easeInOut}, 0.1)
			.set('main', {backgroundColor: '#001d2c'})
			.set('#code', {className: 'dark-bg'})
			.to('#code-vid video.video-background', 0.1, {opacity: 1, ease: Power1.easeInOut}, 0.1)
			;

		// Code Section BG Transition
		var codeBG = new ScrollMagic.Scene({
			triggerElement: '#bg-trigger',
			triggerHook: 0,
			offset: -wHeight / 2
		})
		.setTween(codeBGTl)
		// .setClassToggle('main', 'dark-bg')
		.addTo(controller)
		;

		// Code Section Intro
		var codeIntroTl = new TimelineMax();
		codeIntroTl
			.staggerFrom('#lead-in span', 1, {x: '-100%', ease: Power4.easeInOut}, 0.25, 0)
			// .staggerFrom('#html-css .box', 1, {y: '300%', ease: Power4.easeInOut}, 0.25, 0)
			// .from(['#html-css h2', '#html-css p'], 1, {autoAlpha: 0, y: '25', ease: Power4.easeInOut}, 0)
			// .set('#code', {backgroundColor: '#01242B'}, 2)
			// .set('main', {backgroundColor: '#f3f3f3'}, 3)
			// .set('#code .clip', {className: '+=rect'}, 3)
			;

		var codeIntro = new ScrollMagic.Scene({
			triggerElement: '#bg-trigger',
			triggerHook: 1,
			offset: wHeight / 2
		})
		.setTween(codeIntroTl)
		.addTo(controller)
		;

		// Code Section Pin
		var pinCodeSectionTl = new TimelineMax();
		pinCodeSectionTl
			.set('#html-css', {zIndex: 2, autoAlpha: 1})

			.staggerTo('#html-css .box', 1, {y: '-300%', autoAlpha: 0, ease: Power4.easeInOut}, 0.25, '=+2')
			.set('#html-css', {zIndex: 1})

			.set('#php-wp', {zIndex: 2, autoAlpha: 1})
			.staggerFrom('#php-wp .box', 1, {y: '300%', autoAlpha: 0, ease: Power4.easeInOut}, 0.25)
			.to(['#html-css .content'], 1, {autoAlpha: 0, y: '-25', ease: Power4.easeInOut})		
			.from(['#php-wp .content'], 1, {autoAlpha: 0, y: '25', ease: Power4.easeInOut})
			.staggerTo('#php-wp .box', 1, {y: '-300%', autoAlpha: 0, ease: Power4.easeInOut}, 0.25, '=+2')
			.set('#php-wp', {zIndex: 1})

			.set('#js-jq', {zIndex: 2, autoAlpha: 1})
			.staggerFrom('#js-jq .box', 1, {y: '300%', autoAlpha: 0, ease: Power4.easeInOut}, 0.25)
			.to(['#php-wp .content'], 1, {autoAlpha: 0, y: '-25', ease: Power4.easeInOut})
			.from(['#js-jq .content'], 1, {autoAlpha: 0, y: '25', ease: Power4.easeInOut})
			.to('#js-jq', 2, {}) // pause

			// .set('#code', {backgroundColor: '#01242B'})
			// .set('main', {backgroundColor: '#f3f3f3'}, '+=1')
			.set('#code .clip', {className: '+=rect'})
			;

		var pinCodeSection = new ScrollMagic.Scene({
			duration: '600%',
			triggerElement: '#code',
			triggerHook: 0
		})
		.setPin('#code')
		.setTween(pinCodeSectionTl)
		.addTo(controller)
		;
		/*
		$('#skillset #bar-graph .skill').each(function(){
			$(this).children('.bar').css({
				'height': 0,
				'opacity': 1
			});
		});
		*/

		setTimeout(function(){

			var skillsetGraphTl = new TimelineMax();
			skillsetGraphTl
				.set('#skillset #bar-graph .skill .bar .fill', {height: '0'})
				.staggerTo('#skillset #bar-graph .skill .bar .fill', 0.25, {height: '100%', ease: Power1.easeInOut}, 0.1)
				;

			var skillsetGraph = new ScrollMagic.Scene({
				triggerElement: '#skillset',
				triggerHook: 0.5,
				reverse: false,
			})
			.setTween(skillsetGraphTl)
			.addTo(controller)
			;
		}, 100);

	$('.flipcard').removeClass('hover');
	$('.flipcard').each(function(){
		$(this).removeClass('hover');
		$(this).hover(function(){
			$(this).toggleClass('hover');
		})
	});

	/*
		var skillsetBGTl = new TimelineMax();
		skillsetBGTl
			.from(['#skillset .container', '#hero .bg'], 0.5, {autoAlpha: 0, ease: Power4.easeInOut})
			.set('main', {backgroundColor: '#f3f3f3'})
			;

		// Code Section BG Transition
		var skillsetBG = new ScrollMagic.Scene({
			triggerElement: '#skillset',
			triggerHook: 1,
		})
		.setTween(skillsetBGTl)
		.addTo(controller)
		;
	*/

	}

});