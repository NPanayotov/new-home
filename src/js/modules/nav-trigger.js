/**
 * js-nav-trigger
 */

import { $document } from '../utils/globals';

$('.js-nav-trigger').on('click', function(evt) {
	$(this).toggleClass('is-active');

	$('.nav').toggleClass('is-visible');

	evt.preventDefault();
});

$document.on('click touchstart', (evt) => {
	const $target = $(evt.target);

	if (! $target.closest('.header').length) {
		$('.nav').removeClass('is-visible');
		$('.js-nav-trigger').removeClass('is-active');
	}
})
