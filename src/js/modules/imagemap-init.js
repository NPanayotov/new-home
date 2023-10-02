/**
 * Init plugin
 */
$('img[usemap]').rwdImageMaps();


/**
 * Handle interactive section
 */

$('.js-imagemap').on('mouseenter', 'area', function(evt) {
	const targetId = $(this).attr('href');

	$(targetId).addClass('is-visible')
		.siblings().removeClass('is-visible');
}).on('mouseleave', 'area', function(evt) {
	$('.hero__image-layers img').removeClass('is-visible');
}).on('click', 'area', function(evt) {
	const targetTab = $(this).data('url');

	$.magnificPopup.open({
		items: {
			src: targetTab
		},
		type: 'ajax'
	})

	evt.preventDefault();
});
