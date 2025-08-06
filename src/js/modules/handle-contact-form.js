const initEmailJs = () => {
	let emailjs = window.emailjs;

	if (emailjs === undefined) {
		return;
	}

	emailjs.init('EqGMiwsB7jtM_fDAn');

	const formName = 'Eurobuld';
	const replayTo = 'r-grozev@abv.bg';

	$('.js-contact-form').on('submit', 'form', function(evt) {
		const $this = $(this);
		const formData = $this.serializeArray();
		const dataObj = {};
		const $formContainer = $this.parent();
		const $honeyPot = $this.find('.js-hp');

		if ($honeyPot.val() !== '') {
			evt.preventDefault();
			return; //Robot detected
		};

		$formContainer.addClass('is-sending');

		for (const item of formData) {
			const { name, value } = item;

			dataObj[name] = value;
		}

		const { name: sender_name, email: sender_email, phone: sender_phone, msg: message } = dataObj;

		emailjs.send("contact_service","contact_form",{
			from_name: formName,
			sender_name,
			sender_email,
			sender_phone,
			message,
			reply_to: replayTo,
		}) .then(function() {

			$formContainer.addClass('has-sent');

			console.log('SUCCESS!');
		}, function(error) {
			console.log('FAILED...', error);

			$formContainer.addClass('has-error');
		});

		evt.preventDefault();
	})

}


initEmailJs();

