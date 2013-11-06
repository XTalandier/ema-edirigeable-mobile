function Webservice() {}

Webservice.getJSON = function(url, params, callback) {
    var request = Titanium.Network.createHTTPClient();
    request.open("GET", url);
    request.onload = function() {
        var content = JSON.parse(this.responseText);
        callback(content);
    };
    request.onerror = function(e) {
        alert("WS Error : " + JSON.stringify(e));
        callback(null);
    };
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
};

exports.Webservice = Webservice;