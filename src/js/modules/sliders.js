import { tns } from "tiny-slider/src/tiny-slider"


/**
 * Slider gallery
 */

$('.js-slider-gallery').each( (idx, DOMnode) => {

	const $container = $(DOMnode).find('.js-slider-gallery-container');
	const $thumbsContainer = $(DOMnode).find('.js-slider-thumbs .slider__slides');
	const $thumbsSlides = $thumbsContainer.find('.slider__slide');

	const mainSlider = tns({
		container: $container[0],
		items: 1,
		mode: 'gallery',
		loop: false,
	});

	mainSlider.events.on('transitionEnd', function(data, evt) {

		$thumbsSlides.removeClass('is-current');
		$thumbsSlides.eq(data.index).addClass('is-current');

		thumbs.goTo(data.index);
	});

	const thumbs = tns ({
		container: $thumbsContainer[0],
		autoWidth: true,
		gutter: 10,
		loop: false,
	});

	thumbs.events.on('transitionStart', function() {
		$('.js-slider-thumbs').find('.tns-controls button').removeAttr('disabled');
	});

	$thumbsContainer.on('click', '.slider__slide', function() {
		const $this = $(this);
		const slideIndex = $this.attr('id').split('tns2-item').pop();

		mainSlider.goTo(slideIndex);

		$this.addClass('is-current')
			.siblings().removeClass('is-current');
	});

	$('.js-slider-thumbs').on('click', '.tns-controls button', function() {
		const direction = $(this).data('controls');
		const currentIndex = $thumbsContainer.find('.is-current').index();
		const allSides = $thumbsSlides.length - 1;
		let nextIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

		nextIndex = nextIndex === -1 ? 0 : nextIndex;
		nextIndex = nextIndex >= allSides ? allSides : nextIndex;

		$thumbsSlides.removeClass('is-current');
		$thumbsSlides.eq(nextIndex).addClass('is-current');

		mainSlider.goTo(nextIndex);
	})
})
