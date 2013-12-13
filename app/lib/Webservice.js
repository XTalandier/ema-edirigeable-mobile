function Webservice() {

}

Webservice.getJSON = function(url, params, callback) {
	var request = Titanium.Network.createHTTPClient();
	request.open('GET', url);
	request.onload = function() {
		var content = JSON.parse(this.responseText);
		callback(content);
	};
	request.onerror = function(e) {
		alert('WS Error : ' + JSON.stringify(e));
		callback(null);
	};

	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send();
};

Webservice.postJSON = function(url, params, callback) {
	var request = Titanium.Network.createHTTPClient();
	//request.timeout = 100;
	request.open('POST', url);
	request.onload = function() {
		var content = JSON.parse(this.responseText);
		callback(content);
	};
	request.onerror = function(e) {
		Ti.App.fireEvent("logMe", {message:'WS Error : ' + JSON.stringify(e)});
		callback(null);
	};

	//request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//request.setRequestHeader("Content-Type", "application/json");
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(JSON.stringify(params));
};

exports.Webservice = Webservice;
