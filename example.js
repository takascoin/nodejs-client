
var Takascoin = require('./takascoin.js').Takascoin;

var takascoin = new Takascoin();

var amount = 0.012;
var apiKey = "merchant email address";

var createPayment = function () {
	coinvoy.payment(amount, apiKey, function (payment) {
		console.log(payment);

		if (!payment.success) return;

		coinvoy.status(payment.id, function (response) {
			console.log(response);
		});
	});
};

var getButton = function () {
	coinvoy.button(amount, apiKey, function (button) {
		console.log(button);
	});
};

// createPayment();
// getButton();
