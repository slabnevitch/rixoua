$(function() {


	// header on scroll
		var $header = $('header');
		
		$(window).scroll(function(e) {

			if($(this).scrollTop() > 143){
				$header.addClass('header-scroll');
				// $('.products-filter').css('margin-top', '100px');
			}else{
				$header.removeClass('header-scroll');
				// $('.products-filter').css('margin-top', '0');
			}

		});
	// end header on scroll

	// animations main page
		$('.main-page-actions__inner, .footer-contacts, .footer-menu, .main-page-reviews__text, .main-page-reviews__photos').animated('slideInUp', 'fadeOut');
		
		$('.main-page-categories__inner').waypoint(function() {
			$('.main-page-about__title').each(function(index) {
				var $this = $(this);

				setTimeout(function() {
					$this.animated('fadeIn');
					$this.next('.main-page-about__picture').animated('fadeInUp');
					$('.main-page-about__text').animated('fadeInDown');

				}, index*200);

			}, {offset: '100%'});
		});

		$('.gallery-item').waypoint(function() {
			$(this.element).removeClass('fade');

		}, {offset: '75%'});
	// and of animations main page

	// category toggle
		var parentTop,
			opened = false;
		$('.category__header-inner, .category__toggle-icon--bottom').click(function(e) {
			var $parent = $(this).closest('.category'),
					headerHeight = $('header').height(),
					thHeaderHeight = $parent.find('.category__header').height(),
					$page = $('html, body'),
					$chevron = $parent.find('.category__toggle-icon');
				
			if(!$parent.hasClass('opened')){
				$parent.find('.category__content').slideDown(500);
				 parentTop = $parent.offset().top;
				$page.animate({scrollTop: parentTop - thHeaderHeight}, 1200);
				$parent.addClass('opened');
				$parent.find('.category__toggle-icon').addClass('active');
				$parent.find('.category__toggle-icon').removeClass('category__toggle-icon--animation');
				opened = true;
			}else{
				$parent.find('.category__content').slideUp(700, function() {
					if(getOpened() == true){
						$page.animate({scrollTop: $('.category.opened').eq(0).offset().top - thHeaderHeight}, 1200);
						
					}else{
						$page.animate({scrollTop: $('.category').eq(0).offset().top - thHeaderHeight}, 1200);
					}
				});
				 parentTop = $parent.offset().top;

				$parent.removeClass('opened');
				$parent.find('.category__toggle-icon').removeClass('active');
				$parent.find('.category__toggle-icon').addClass('category__toggle-icon--animation');
				opened = false;
			}
			
		});

		function getOpened() {
			var opened = false;
			 $('.category').each(function(index, elem) {
					var $th = $(elem);
					if($th.hasClass('opened')){
						
						opened = true;
						return;
					}
			});
			return opened;
		}

		// $('.category__toggle-icon--bottom').click(function(e) {
		// 	var $parent = $(this).closest('.category');
		// 	$parent.find('.category__content').slideUp();
		// 	$parent.find('.category__toggle-icon').removeClass('active');
		// });
	// end of category toggle




	//gallery 
	$('.gallery-item').magnificPopup({
		type: 'image',
		preloader: true,
		focus: '#name',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				// return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
		
	});
	//end of gallery 

	// filter-dropdown toggle
		$('.filter-menu__inner').click(function(e) {
			$(this)
				.parent()
				.toggleClass('filter-menu--opened');
			
			$(this)
				.next('.filter-dropdown')
				.fadeToggle();
		});

		var $searchInp = $('.header-inner__search-input');

	    $(document).mouseup(function(e) {
	    	if(!$searchInp.is(e.target) && $searchInp.has(e.target).length === 0 && e.target.className !== 'header-inner__search-input'){
	    		$searchInp.fadeOut();
	    	}
	    });
	// end of filter-dropdown toggle

	// lables dropdown toggle
		$('.product-delivery__toggle').click(function(e) {
			$(this)
				.toggleClass('opened')
				.closest('.delivery-item')
				.find('.delivery-item__hidden-items')
				.slideToggle();
		});
	// end lables dropdown toggle

	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$("header nav").stop(true, true).fadeToggle();
		return false;
	});

	var sliderResponce = [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 480,
			settings: {
				// arrows: false,
				// centerMode: true,
				// centerPadding: '40px',
				slidesToShow: 1
			}
		}
		];
	var $actionsSlider = $('.main-page-actions__slider').slick({
		slidesToShow: 5,
		responsive: sliderResponce
	});

	$('.consumable__slider, .alternative__slider').each(function(index, elem) {
		$(elem).slick({
			slidesToShow: 6,
			responsive: sliderResponce
		});
	});

	var $searchInput = $('.header-inner__search input');

	// $(document).mouseup(function(e) {
	// 	if(!$searchInput.is(e.target) && $searchInput.has(e.target).length === 0 && e.target.className !== 'header-inner__search-input'){
	// 		$searchInput.fadeOut();
	// 	}
	// });
	
	$('.header-inner__search .icon').click(function(e) {
		e.preventDefault();
		$searchInput.fadeToggle();
	});

	// Tooltipster
		var cartPopScroll,
				registrCount = 0;
		$('.tooltip').tooltipster({
			contentCloning: true,
			arrow: false,
			interactive: true,
			repositionOnScroll: true,
			trigger: 'hover',
			side: 'bottom',
			// delay: 0,
			functionInit: function(instance, helper){

				var $origin = $(helper.origin),
				dataOptions = $origin.attr('data-tooltipster');

				if(dataOptions){

					dataOptions = JSON.parse(dataOptions);

					$.each(dataOptions, function(name, option){
						instance.option(name, option);
					});
				}
			},
			// animation: 'grow',
			functionPosition: function(instance, helper, position) {
				var originLeft = helper.origin.getBoundingClientRect().left,
					originRight = helper.origin.getBoundingClientRect().right,
					originTop = helper.origin.getBoundingClientRect().top;
					originWidth = helper.origin.offsetWidth,
					originHeight = helper.origin.offsetHeight,
					summ = position.coord.left + position.size.width,
					difference = summ - originRight,
					tooltipLeft = originLeft + originWidth,
					tooltipTop = originHeight + originTop;
				
				
				if($(helper.origin).hasClass('tooltip-left')){

					position.coord.left = tooltipLeft - 15;
					

				}else if($(helper.origin).hasClass('tooltip-right')){
					
					 position.coord.left -= difference;
				}
				 
				return position;
			},
			functionReady: function(instance, helper) {
			
				var dataTooltip = helper.origin.getAttribute('data-tooltip-content');
					cartItemLength = helper.tooltip.querySelectorAll('.cart-popup__item').length;
				
				if(dataTooltip ==="#cart-popup"){
					cartPopScrollInit();
					registrCount+= 1;
					if(registrCount == 1){
						$(helper.tooltip).find('.plus, .minus')
							.bind('click', countClickListener);

					}
				}
		
			}
		});
// end of Tooltipster

	// custom Scroll
		function cartPopScrollInit() {
			cartPopScroll = $('.tooltipster-content .scroller').customScroll({
					horizontal: false
				});

				var $cartPopTrack = cartPopScroll.$container;


				function cherryScroll(delta) {
					var $inner = cartPopScroll.$inner;

					$inner.animate({'scrollTop': $inner.scrollTop() + delta + 'px'}, 100);
				}

				$cartPopTrack.find('.custom-scroll-advanced_track-y')
				.on('click', function(e) {
					var yPos = e.pageY - $(this).offset().top;
					var barTop = cartPopScroll.$bar.position().top;
					var h = cartPopScroll.$container.height() - 20;
					cherryScroll(yPos < barTop ? -h : h);
				})
				.on('click', '.arrow', function(e) {
					e.stopPropagation();
					var isTop = $(this).hasClass('top');
					cherryScroll(isTop ? -50 : 50);
				});
}
			
	// end custom Scroll
	// product-count
			$('.minus, .plus').on('click', countClickListener);

			function countClickListener() {
				var $countVal = $(this).parent().find('.count-val'),
						$newVal;

				if($(this).hasClass('minus')){
					$newVal = (+$countVal.text() - 1);
				}
				if($(this).hasClass('plus')){
					$newVal = (+$countVal.text() + 1);
				}
				if($newVal < 0){
					 $newVal = 0;
				}

				$countVal.text($newVal);
			}
		// end of product-count

	// product-card slider
		$(".product-slider__display").slick({
			lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			// respondTo: 'min',
			arrows: false,
			fade: true,
			customPaging : function(slider, i) {
				var thumb = $(slider.$slides[i]).attr('data-thumb');
				return '<a><img src="'+thumb+'"></a>';
			},
			responsive: [
			{
				breakpoint: 780,
				settings: {
					dots: false,
					arrows: true
				}
			},
			]
		});
	// end product-card slider

	

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});