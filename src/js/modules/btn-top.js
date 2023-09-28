import { $window } from '../utils/globals';


$window.on('scroll load', () => {
	const scrollTop = $window.scrollTop();
	const hasScrolled = scrollTop > 500;

	$('.js-show-on-scroll').toggleClass('is-visible', hasScrolled);
})
