var https = require("https");
var querystring = require("querystring");

function mywallet(params) {
	this.params = params;

	this.guid = params.guid;
	this.password = params.password;

	if((!(this.guid) || !(this.password))) {
		throw "guid or password missing";
	}
};

mywallet.prototype.apiCall = function(method, params, callback) {
	params.guid = this.guid;
	params.password = this.password;

	var path = "/merchant/" + this.guid + "/" + method + "?" + querystring.stringify(params);

	var options = {
		hostname: ((this.params.hostname) ? this.params.hostname : "blockchain.info"),
		port: ((this.params.port) ? this.params.port : 443),
		path: path,
		method: ((this.params.method) ? this.params.method : "GET")
	};
	
	var req = https.request(options, function(res) {
		var data = "";

		res.on("data", function(chunk) {
			data += chunk;
		});

		res.on("end", function() {
			callback(null, JSON.parse(data));
		});
	});

	req.end();

	req.on("error", function(err) {
		callback(err, null);
	});
};

mywallet.prototype.payment = function(params, callback) {
	this.apiCall("payment", params, callback);
};

mywallet.prototype.multiplePayments = function(params, callback) {
	this.apiCall("sendmany", params, callback);
};

mywallet.prototype.getBalance = function(callback) {
	this.apiCall("balance", {}, callback);
};

mywallet.prototype.getAddresses = function(params, callback) {
	this.apiCall("list", params, callback);
};

mywallet.prototype.getAddressBalance = function(params, callback) {
	this.apiCall("address_balance", params, callback);
};

mywallet.prototype.generateAddress = function(params, callback) {
	this.apiCall("new_address", params, callback);
};

mywallet.prototype.archiveAddress = function(params, callback) {
	this.apiCall("archive_address", params, callback);
};

mywallet.prototype.unarchiveAddress = function(params, callback) {
	this.apiCall("unarchive_address", params, callback);
};

mywallet.prototype.consolidate = function(params, callback) {
	this.apiCall("auto_consolidate", params, callback);
};

mywallet.prototype.satoshiToBtc = function(value) {
	return value / 100000000;
};

mywallet.prototype.btcToSatoshi = function(value) {
	return value * 100000000;
};

module.exports = mywallet;