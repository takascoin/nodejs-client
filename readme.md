TAKASCOIN PAYMENT API - NodeJS Client Library
================================

NodeJS client library for Takascoin API


##About Takascoin

Takascoin is an online Bitcoin exchange platform. Takascoin is also a payment services provider for merchants.

##Get started

Just include takascoin.js in your document and use it freely.

```
var Takascoin = require('./takascoin.js').Takascoin;

var takascoin = new Takascoin();

// Create invoice
var amount   = 0.012
var apiKey   = "Takas merchant email"
var options = {
    'currency'    : 'TRY', // OR 'BTC'
    'item'        : 'T-shirt',
    'description' : '100% cotton natural T-shirt'
}

takascoin.payment(amount, apiKey, function (payment) {
    console.log(payment);
}, options)



// payment.url     - payment frame url to display to user
// payment.html    - default behaviour, includes an iframe and js listener
// payment.address - display payment address

```

###List of all commands:
- payment(amount, apiKey, callback, options);                           - creates payment
- button(amount, apiKey, callback, options);                            - prepares a button template
- validateNotification(hash, orderID, invoiceID, secret);               - checks if incoming payment notification is valid.
- status(invoiceID, callback);                                          - current status of invoice [new,approved,confirmed,completed,cancelled]
- invoice(invoiceID, callback);                                         - get latest invoice object


Your feedback and suggestions are very much welcome. Please contact info@takascoin.com for any input. 

Enjoy!

Takascoin

