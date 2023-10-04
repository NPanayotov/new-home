import { handleAppartementTabs } from './appartement-tabs';
import { handleNavFloors } from './nav-floors';

/**
 * Init plugin
 */
$('img[usemap]').rwdImageMaps();

/**
 * Handle interactive section
 */

const openInteractivePopup = (url) => {
	$.magnificPopup.open({
		items: {
			src: url
		},
		alignTop: true,
		mainClass: 'mfp-interactive mfp-fade',
		removalDelay: 300,
		type: 'ajax',
		callbacks: {
			ajaxContentAdded: function(evt) {

				handleAppartementTabs();
				handleNavFloors();

				$(this.content).find('img[usemap]').rwdImageMaps();

				$('.js-image-map').on('mouseenter', 'area', function(evt) {
					const targetId = $(this).attr('href');

					$(targetId).addClass('is-visible--alt')
						.siblings().removeClass('is-visible--alt');
				}).on('mouseleave', 'area', function(evt) {
					$('.interactive-image__layers img').removeClass('is-visible--alt');
				});
			},
			close: function() {
				$('img[usemap]').rwdImageMaps();
			}
		}
	})
}

$('.js-image-map').on('mouseenter', 'area', function(evt) {
	const targetId = $(this).attr('href');

	$(targetId).addClass('is-visible')
		.siblings().removeClass('is-visible');
}).on('mouseleave', 'area', function(evt) {
	$('.interactive-image__layers img').removeClass('is-visible');
}).on('click', 'area', function(evt) {
	const targetTab = $(this).data('url');

	openInteractivePopup(targetTab);

	evt.preventDefault();
});
