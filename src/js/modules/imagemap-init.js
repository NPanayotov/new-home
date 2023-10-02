/**
 * Init plugin
 */
$('img[usemap]').rwdImageMaps();


/**
 * Handle interactive section
 */

$('.js-image-map').on('mouseenter', 'area', function(evt) {
	const targetId = $(this).attr('href');

	$(targetId).addClass('is-visible')
		.siblings().removeClass('is-visible');
}).on('mouseleave', 'area', function(evt) {
	$('.interactive-image__layers img').removeClass('is-visible');
}).on('click', 'area', function(evt) {
	const targetTab = $(this).data('url');

	$.magnificPopup.open({
		items: {
			src: targetTab
		},
		alignTop: true,
		mainClass: 'mfp-interactive',
		type: 'ajax',
		callbacks: {
			ajaxContentAdded: function(evt) {
				$(this.content).find('img[usemap]').rwdImageMaps();

				$('.js-image-map').on('mouseenter', 'area', function(evt) {
					const targetId = $(this).attr('href');

					$(targetId).addClass('is-visible--alt')
						.siblings().removeClass('is-visible--alt');
				}).on('mouseleave', 'area', function(evt) {
					$('.interactive-image__layers img').removeClass('is-visible--alt');
				});
			}
		}
	})

	evt.preventDefault();
});
