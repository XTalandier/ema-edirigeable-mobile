var WS = require('Webservice').Webservice;

$.dir.addEventListener("directionChanged", function(direction, e) {
	Ti.App.fireEvent("logMe", {message : "Direction: " + direction});
});

function getInfos(){
	var urlPrefix = 'http://127.0.0.1:8000';
	WS.getJSON(urlPrefix + '/getInfos', {}, function(data){
		Ti.App.fireEvent("logMe", {message:JSON.stringify(data)});
		if(data === null){
			setTimeout(getInfos, 300);
			return;
		}
		var lat = data.data.latitude;
		var lon = data.data.longitude;
		var tem = data.data.temperature;
		
		$.mapview.region = {latitude:lat, longitude:lon, latitudeDelta:0.01, longitudeDelta:0.01};
		$.eDirigeable.applyProperties({
			latitude: lat,
			longitude: lon
		});
		
		Ti.App.fireEvent('graph:updateGraph', { value: tem });

		setTimeout(getInfos, 300);
	});
}
getInfos();

var winRecord = null;
function btnRecord_click(){
	winRecord = Alloy.createController('record').getView();
	winRecord.open();
}

Ti.App.addEventListener("index:closeRecord", function(data) {
	closeWinRecord();
});

Ti.App.addEventListener("index:startRecord", function(data) {
	startRecord(data.nom_trajet);
});

function closeWinRecord(){
	winRecord.close();
	winRecord=null;
}

function startRecord(nom_trajet){
	closeWinRecord();
	Ti.App.trajet = nom_trajet;
	$.btnEnreg.setVisible(false);
	$.btnFinish.setVisible(true);
}

function stopRecord(){
	$.btnEnreg.setVisible(true);
	$.btnFinish.setVisible(false);
}

function config(){

}

$.index.open();
