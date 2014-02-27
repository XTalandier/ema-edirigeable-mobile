function Webservice() {}

Webservice.getUrl = function() {
    return "http://" + Ti.App.addressip + ":" + Ti.App.port;
};

Webservice.getJSON = function(params, callback) {
    var request = Titanium.Network.createHTTPClient();
    request.open("GET", Webservice.getUrl());
    request.onload = function() {
        var content = JSON.parse(this.responseText);
        callback(content);
    };
    request.onerror = function(e) {
        Ti.App.fireEvent("logMe", {
            message: "WS Error URL : " + Webservice.getUrl()
        });
        Ti.App.fireEvent("logMe", {
            message: "WS Error : " + JSON.stringify(e)
        });
        callback(null);
    };
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
};

Webservice.postJSON = function(params, callback) {
    var request = Titanium.Network.createHTTPClient();
    request.open("POST", Webservice.getUrl());
    request.onload = function() {
        var content = JSON.parse(this.responseText);
        callback(content);
    };
    request.onerror = function(e) {
        Ti.App.fireEvent("logMe", {
            message: "WS Error URL : " + Webservice.getUrl()
        });
        Ti.App.fireEvent("logMe", {
            message: "WS Error : " + JSON.stringify(e)
        });
        callback(null);
    };
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(JSON.stringify(params));
};

exports.Webservice = Webservice;