var WS = require('Webservice').Webservice;

var urlPrefix = 'http://146.19.17.120:8080';
$.txtIP.value = urlPrefix.replace('http://', '');

$.dir.addEventListener("directionChanged", function(direction, e) {
	Ti.App.fireEvent("logMe", {message : "Direction: " + direction});
	var cmds = {cmdType: ''};
	switch(direction){
		case 'haut':
			cmds.cmdType = 'Up';
			break;
		case 'droite':
			cmds.cmdType = 'Right';
			break;
		case 'bas':
			cmds.cmdType = 'Down';
			break;
		case 'gauche':
			cmds.cmdType = 'Left';
			break;
	}
	WS.postJSON(urlPrefix + '/' , cmds, function(data){
		Ti.App.fireEvent("logMe", {message : "DATA: " + JSON.stringify(data)});
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

function save(){
	urlPrefix = "http://"+ $.txtIP.value;
	alert('ok => ' + urlPrefix);
}
getInfos();



$.index.open();


