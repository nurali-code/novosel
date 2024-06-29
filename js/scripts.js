
//js tabs
const tabsNav = document.querySelectorAll('.js-tabs-nav')
const tabsBlocks = document.querySelectorAll('.js-tab-block')
function tabsActiveStart() {
	for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
		if (tabsBlocks[iTab].classList.contains('active')) {
			tabsBlocks[iTab].classList.remove('active')
		}
	}
	for (i = 0; i < tabsNav.length; i++) {
		let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
		for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
			if (tabsNavElements[iElements].classList.contains('active')) {
				let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
				for (j = 0; j < tabsBlocks.length; j++) {
					if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
						console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
						tabsBlocks[j].classList.add('active')
					}
				}
			}
		}
	}

}
for (i = 0; i < tabsNav.length; i++) {
	tabsNav[i].addEventListener('click', function (e) {
		if (e.target.closest('[data-tab]')) {
			let tabsNavElements = this.querySelector('[data-tab].active')
			tabsNavElements ? tabsNavElements.classList.remove('active') : false
			e.target.closest('[data-tab]').classList.add('active')
			tabsActiveStart()
			e.preventDefault()
			e.stopPropagation()
			return false
		}
	})
}
tabsActiveStart()


//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')

function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}

function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}

function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}

for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.innerHTML = ''
			popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})


$(document).ready(function () {


	//swipebox
	if (!!$('[data-swipebox]').offset()) {
		$('[data-swipebox]').swipebox();
	}


	//text more
	$('.text-more-wrap .text-more-action').on('click', function () {
		$(this).parents('.text-more-wrap').toggleClass('active');
		return false;
	})

	//more
	$('.tiles-links-box .more-box .btn').on('click', function () {
		$(this).toggleClass('active');
		$(this).parents('.tiles-links-box').toggleClass('show-all')
		return false;
	})
	$('.tiles-totals-box .more-box .btn').on('click', function () {
		$(this).toggleClass('active');
		$(this).parents('.cnt-box').toggleClass('show-all')
		return false;
	})
	$('.item-tile-info .tile-more-link').on('click', function () {
		$(this).parents('.item-tile-info').addClass('show-all')
		return false;
	})


	//btn tgl
	$('.js-btn-tgl:not(.tgl-one)').on('click', function () {
		$(this).toggleClass('active');
		return false;
	})
	$('.js-btn-tgl.tgl-one').on('click', function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).parents('.tgl-wrap').find('.js-btn-tgl.active').removeClass('active');
			$(this).addClass('active');
		}
		return false;
	})

	//filter
	$('.js-btn-filter-toggle').on('click', function () {
		if ($('body').hasClass('filter-show')) {
			$('.filter-box .js-btn-popup-toggle').removeClass('active');
			$('body').removeClass('filter-show');
		} else {
			$('.filter-box .js-btn-popup-toggle').addClass('active');
			$('body').addClass('filter-show');
		}
		return false;
	})

	//map
	$('.js-btn-map-toggle').on('click', function () {
		if ($('.map-box').hasClass('active')) {
			$('.map-box').slideUp(200).removeClass('active');
		} else {
			$('.map-box').slideDown(200).addClass('active');
		}
		return false;
	})


	//mobile menu
	$('.header .menu-wrap li ul').each(function () {
		$(this).parent().addClass('submenu');
	})
	$('.header .menu-wrap li a').on('click', function () {
		if ($(this).next('ul').length > 0) {
			if ($(window).innerWidth() < 1024) {
				if ($(this).parent().hasClass('open')) {
					$(this).parent().removeClass('open').children('ul').slideUp(200);
				} else {
					$('.header .menu-wrap li.open').removeClass('open').children('ul').slideUp(200);
					$(this).parent().addClass('open').children('ul').slideDown(200);
				}
				return false;
			}
		}
	})


	//title-catalog
	if (!!$('.title-catalog .slider-inner-wrap').offset()) {
		$('.title-catalog .slider').slick({
			dots: false,
			slidesToShow: 5,
			variableWidth: true,
			infinite: false,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
		});

	}


	//main-tiles-box
	if (!!$('.main-tiles-box').offset()) {
		if ($(window).innerWidth() < 1024) {
			$('.main-tiles-box .slider').slick({
				dots: true,
				slidesToShow: 2,
				variableWidth: false,
				infinite: false,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				prevArrow: false,
				nextArrow: false,
				responsive: [
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 1,
						}
					},
				]
			});
		}
	}


	//tiles-box
	if (!!$('.tiles-box').offset()) {
		if ($(window).innerWidth() > 1023) {
			$('.tiles-box .slider').slick({
				dots: false,
				slidesToShow: 3,
				variableWidth: false,
				infinite: false,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 3,
						}
					},
				]
			});
		}
	}


	//tiles-slider-box
	$('.tiles-slider-box.all-slider .slider:not(.swiper-wrapper)').slick({
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		touchThreshold: 100,
		variableWidth: false,
		infinite: false,
		adaptiveHeight: false,
		rows: 1,
		prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
		nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToScroll: 3,
					touchThreshold: 100,
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToScroll: 1,
					touchThreshold: 100,
					dots: true,
					slidesToShow: 4,
					prevArrow: false,
					nextArrow: false,
				}
			},
		]
	});
	$('.tiles-slider-box.all-slider .item-tile-adv .tile-slider').slick({
		dots: true,
		slidesToShow: 1,
		variableWidth: false,
		infinite: false,
		adaptiveHeight: false,
		rows: 1,
		swipeToSlide: true,
		prevArrow: false,
		nextArrow: false,
		autoplay: true,
		autoplaySpeed: 2000,
	})
	if (!!$('.tiles-slider-box:not(.all-slider)').offset()) {
		if ($(window).innerWidth() > 1023) {
			$('.tiles-slider-box .slider:not(.swiper-wrapper)').slick({
				dots: false,
				slidesToShow: 4,
				slidesToScroll: 4,
				touchThreshold: 100,
				variableWidth: false,
				infinite: false,
				adaptiveHeight: false,
				rows: 1,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToScroll: 3,
							touchThreshold: 100,
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToScroll: 1,
							touchThreshold: 100,
						}
					},
				]
			});
			$('.tiles-slider-box:not(.all-slider) .item-tile-adv .tile-slider').slick({
				dots: true,
				slidesToShow: 1,
				variableWidth: false,
				infinite: false,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				prevArrow: false,
				nextArrow: false,
				autoplay: true,
				autoplaySpeed: 2000,
			})
		}
	}

	//tiles-logos-box
	if (!!$('.tiles-logos-box').offset()) {
		$('.tiles-logos-box .slider').slick({
			dots: false,
			slidesToShow: 1,
			variableWidth: true,
			infinite: false,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						prevArrow: false,
						nextArrow: false,
						dots: false,
					}
				},
			]
		});

	}


	//tooltip
	tippy('.tile-help', {
		content(reference) {
			const id = reference.getAttribute('data-template');
			const template = document.getElementById(id);
			return template.innerHTML;
		},
	});
	//field-password
	$('.js-password-toggle').on('click', function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parent('.frm-field-password').find('.form-input').prop('type', 'password');
		} else {
			$(this).addClass('active');
			$(this).parent('.frm-field-password').find('.form-input').prop('type', 'text');
		}
		return false;
	})
	//popups
	let popupCurrent;
	$('.js-popup-close').on('click', function () {
		if ($(this).hasClass('.js-popup-open')) {
			$('.popup-outer-box').removeClass('active');
		} else {
			$('body').removeClass('popup-open');
			$('.popup-outer-box').removeClass('active');
			return false;
		}
	})
	$('.js-popup-open').on('click', function () {
		$('.popup-outer-box').removeClass('active');
		$('body').addClass('popup-open');
		popupCurrent = $(this).attr('data-popup');
		$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
		return false;
	})
	$('.popup-outer-box').on('click', function (event) {
		if (!event.target.closest('.popup-box')) {
			$('body').removeClass('popup-open');
			$('body').removeClass('popup-open-scroll');
			$('.popup-outer-box').removeClass('active');
			return false;
		}
	})
	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99", { placeholder: "+7 (___) ___-__-__" });
	$('input[type="tel"]').on('click', function () {
		$(this).setCursorPosition(4);
	})
	$('input.js-input-code').mask("9 9 9 9", { placeholder: "_ _ _ _" });
	$('input.js-input-code').on('click', function () {
		$(this).setCursorPosition(0);
	})
	$.fn.setCursorPosition = function (pos) {
		this.each(function (index, elem) {
			if (elem.setSelectionRange) {
				elem.setSelectionRange(pos, pos);
			} else if (elem.createTextRange) {
				var range = elem.createTextRange();
				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		});
		return this;
	};
});



//swiper slider
const swiperAll = new Swiper('.tiles-slider-box.all-slider .swiper', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
	slidesPerView: 4,
	spaceBetween: 0,

	// If we need pagination
	pagination: {
		el: '.slick-dots',
	},

	// Navigation arrows
	navigation: false,

	breakpoints: {
		1024: {
			slidesPerView: 4,
			pagination: false,
			navigation: {
				nextEl: '.ico-arrow-next',
				prevEl: '.ico-arrow-prev',
			},
		},
		1200: {
			slidesPerView: 4,
			pagination: false,
			navigation: {
				nextEl: '.ico-arrow-next',
				prevEl: '.ico-arrow-prev',
			},
		},
	},
});

if (window.innerWidth > 1023) {

	//swiper slider
	const swiper = new Swiper('.tiles-slider-box:not(.all-slider) .swiper', {
		// Optional parameters
		direction: 'horizontal',
		loop: true,
		slidesPerView: 4,
		spaceBetween: 0,

		// If we need pagination
		pagination: false,

		// Navigation arrows
		navigation: false,

		breakpoints: {
			1024: {
				slidesPerView: 4,
				pagination: false,
				navigation: {
					nextEl: '.ico-arrow-next',
					prevEl: '.ico-arrow-prev',
				},
			},
			1200: {
				slidesPerView: 4,
				pagination: false,
				navigation: {
					nextEl: '.ico-arrow-next',
					prevEl: '.ico-arrow-prev',
				},
			},
		},
	});
}

// property-slider
var $slider = $('.property-slider');
$slider.on('init', function (event, slick) { $('.property__total').text(slick.slideCount); });
$slider.on('afterChange', function (event, slick, currentSlide) { $('.property__current').text(currentSlide + 1); });

$slider.slick({
	dots: false,
	slidesToShow: 1,
	variableWidth: true,
	infinite: false,
	adaptiveHeight: false,
	swipeToSlide: true,
	prevArrow: $('.property-prev'),
	nextArrow: $('.property-next'),
	autoplay: false,
	autoplaySpeed: 2000,
	responsive: [
		{
			breakpoint: 1020,
			settings: {
				slidesToShow: 1,
				// variableWidth: false,
				dots: true,
			}
		},
	]
})


// exmp-slider
$('.exmp-slider').slick({
	dots: true,
	slidesToShow: 1,
	variableWidth: false,
	infinite: false,
	adaptiveHeight: true,
	swipeToSlide: true,
	prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
	nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
	autoplay: false,
	autoplaySpeed: 2000,
})

// 2 sliders
$('.dnt-slider, .wide-slider').slick({
	dots: true,
	arrows: false,
	slidesToShow: 1,
	infinite: false,
	mobileFirst: true,
	centerPadding: 0,
	centerMode: true,
	swipeToSlide: true,
	autoplay: false,
	autoplaySpeed: 2000,
	responsive: [
		{
			breakpoint: 1200,
			settings: "unslick"
		}
	]
})
// 2 sliders
$('.rev-slider').slick({
	dots: true,
	arrows: false,
	slidesToShow: 3,
	infinite: false,
	centerPadding: 0,
	swipeToSlide: true,
	autoplay: false,
	autoplaySpeed: 2000,
	responsive: [
		{
			breakpoint: 1100,
			settings: {
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 750,
			settings: {
				slidesToShow: 1,
			}
		},
	]
})

