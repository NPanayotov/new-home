import { $window } from '../utils/globals'

const observerOptions = {
	rootMargin: '0px',
	threshold: 0.4,
}

/**
 * Mutation Observer CB
 * @param  {NodeList} entries
 * @param  {obj} observer
 * @return {Void}
 */
const observerCallback = (entries, observer) => {
	entries.forEach(entry => {
		const isVisible = entry.isIntersecting;
		if (isVisible) {
			$(entry.target).addClass('is-animated');
		}
	});
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
const animatedElements = document.querySelectorAll('.animate-in')

$window.on('load', () => {
	for (const element of animatedElements) {
		observer.observe(element);
	}
});
