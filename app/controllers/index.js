var WS = require('Webservice').Webservice;
var Ctrl = require('controls').Controls;
Ctrl = new Ctrl(WS);

var urlPrefix = '146.19.17.219:8080';//'http://146.19.17.215:8080';

$.dir.addEventListener("directionChanged", function(direction, e) {
	Ti.App.fireEvent("logMe", {message : "Direction: " + direction});
	Ctrl.move(direction , function(data){
		updateData(data);
	});
});

function getInfos(){
	WS.postJSON(urlPrefix + '/', {cmdType: 'GetInfos'}, function(data){
		Ti.App.fireEvent("logMe", {message:JSON.stringify(data)});
		if(data === null){
			setTimeout(getInfos, 4000);
			return;
		}
		updateData(data);
		setTimeout(getInfos, 4000);
	});
};

function updateData(data){
		var lat = data.latitude;
		var lon = data.longitude;
		var tem = data.measuredTemperature;
		var dID = data.dirigeableId;
		
		$.mapview.region = {latitude:lat, longitude:lon, latitudeDelta:0.01, longitudeDelta:0.01};
		$.eDirigeable.applyProperties({
			latitude: lat,
			longitude: lon,
			subtitle: dID
		});
		
		Ti.App.fireEvent('graph:updateGraph', { value: tem });
}
getInfos();



$.index.open();


