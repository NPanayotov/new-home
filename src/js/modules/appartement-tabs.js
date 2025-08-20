/**
 * Tabs
 */

export const handleAppartementTabs = () => {
	$('.js-appartement-tabs').on('click', '.appartement', function() {
		const targetId = $(this).data('target');
		const $target = $(targetId);

		$target.stop().slideToggle('slow', function(){
			$target[0].scrollIntoView({ behavior: "smooth"})
		}).siblings().slideUp();
		
	})
};

