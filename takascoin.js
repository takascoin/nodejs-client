//--------------------------------
//---- Takascoin Node Client -----
//--------------------------------

var crypto      = require('crypto');
var https       = require('https');

var Takascoin = function () {};

//----------------------------------------------------------------
// Create new payment
// Required : amount		# Billed amount
// Required : apiKey		# Merchant ApiKey (merchant email)
// Optional : options 	    # Payment options : currency # Billed currency - defaults to "TRY"
//											    orderID,
//                                              secret,
//                                              callback,
//                                              item,
//                                              description,
//                                              minconf
// Returns   : JSON object
//----------------------------------------------------------------
Takascoin.prototype.payment = function (amount, apiKey, callback, options) {
    if (typeof options === "undefined") options = {};
    
    var params = this._createParameterObject({amount : amount, apiKey : apiKey}, options);

    this._apiRequest('/api/takas/payment', params, function (response) {
        callback(response);
    });
};

//----------------------------------------------------------------
// Create new payment
// Required : amount		# Billed amount
// Required : apiKey		# Merchant ApiKey (merchant email)
// Optional : options 	    # Payment options : currency # Billed currency - defaults to "TRY"
//											    orderID,
//                                              secret,
//                                              callback,
//                                              buttonText,
//                                              item,
//                                              description,
//                                              minconf
// Returns   : JSON object
//----------------------------------------------------------------
Takascoin.prototype.button = function (amount, apiKey, callback, options) {
    if (typeof options === "undefined") options = {};
    
    var params = this._createParameterObject({amount : amount, apiKey : apiKey}, options);

    this._apiRequest('/api/takas/button', params, function (response) {
        callback(response);
    });
};

//---------------------------------------------------
// Required : invoiceID
// Reqired  : callback # callback function
// Returns  : JSON object
//---------------------------------------------------
Takascoin.prototype.status = function (invoiceID, callback) {
    this._apiRequest('/api/status', { invoiceID : invoiceID }, function (response) {
        callback(response);
    });
};

//---------------------------------------------------
// Required : invoiceID
// Required : callback
// Returns  : JSON object
//---------------------------------------------------
Takascoin.prototype.invoice = function (invoiceID, callback) {
    this._apiRequest('/api/invoice', { invoiceID : invoiceID }, function (response) {
        callback(response);
    });
};


//----------------------------------------------
// Validates received payment notification (IPN)
// Required : hash      # provided by IPN call
// Required : orderID   # provided by IPN call
// Required : invoiceID # provided by IPN call
// Required : secret    # secret used while creating payment
// Returns  : true/false
//----------------------------------------------
Takascoin.prototype.validateNotification = function (hash, orderID, invoiceID, secret) {
    var hmac = crypto.createHmac('sha256', secret);

    hmac.update(orderID + ':' + invoiceID);

    return hmac.digest('hex').toLowerCase() == hash.toLowerCase();
};


Takascoin.prototype._apiRequest = function (path, params, callback) {
    var postData = JSON.stringify(params);

    var options = {
        host   : 'coinvoy.net',
        path   : path,
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length
      }
    };

    var req = https.request(options, function (response) {
        var content = '';

        response.on('data', function (chunk) {
            content += chunk;
        });
        response.on('end', function () {
            var result;

            try {
                result = JSON.parse(content);
            } catch (err) {
                result = content;
            }

            callback(result);
        });
    });
    req.write(postData);

    req.end();
    
};

Takascoin.prototype._error = function (message) {
    return { success : false, message : message };
};

Takascoin.prototype._createParameterObject = function () {
    var params = {};

    for (var i=0; i<arguments.length; i++) {
        for (var key in arguments[i]) params[key] = arguments[i][key];    
    }
    
    return params;
};

module.exports.Takascoin = Takascoin;
