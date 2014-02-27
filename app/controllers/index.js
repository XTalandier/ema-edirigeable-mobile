var WS = require('Webservice').Webservice;

var urlPrefix = 'http://146.19.17.198:8000';

//Alloy.Collections.trajets = Alloy.createCollection('trajet');

var trajets = Alloy.Collections.trajets;
trajets.fetch();

var points = Alloy.Collections.points;
points.fetch();

var debutTrajet = null;
var isRecoerding = false;

$.dir.addEventListener("directionChanged", function(direction, e) {
	Ti.App.fireEvent("logMe", {
		message : "Direction: " + direction
	});
	var cmds = {
		cmdType : ''
	};
	switch(direction) {
		case 'haut':
			cmds.cmdType = 'Forward';
			break;
		case 'droite':
			cmds.cmdType = 'Right';
			break;
		case 'bas':
			cmds.cmdType = 'Backward';
			break;
		case 'gauche':
			cmds.cmdType = 'Left';
			break;
	}
	WS.postJSON(cmds, function(data) {
		Ti.App.fireEvent("logMe", {
			message : "DATA: " + JSON.stringify(data)
		});
		updateData(data);
	});
});

function getInfos() {
	WS.postJSON({
		cmdType : 'GetInfos'
	}, function(data) {
		Ti.App.fireEvent("logMe", {
			message : JSON.stringify(data)
		});
		if (data === null) {
			setTimeout(getInfos, 1000);
			return;
		}
		updateData(data);
		setTimeout(getInfos, 1000);
	});
};

function updateData(data) {
	//data = data.data;
	var lat = data.latitude;
	var lon = data.longitude;
	var tem = data.measuredTemperature;
	var dID = data.dirigeableId;
	if (isRecoerding) {
		point = Alloy.createModel('point', {
			id : uniqid(),
			lat : lat,
			lon : lon,
			temp : tem,
			date : new Date(),
			trajetid : uid
		});
		points.add(point);
		point.save();
	}

	$.mapview.region = {
		latitude : lat,
		longitude : lon,
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	};
	$.eDirigeable.applyProperties({
		latitude : lat,
		longitude : lon,
		subtitle : dID
	});

	Ti.App.fireEvent('graph:updateGraph', {
		value : tem
	});
}

/*
 function save(){
 //urlPrefix = "http://"+ $.txtIP.value;
 alert('ok => ' + urlPrefix);
 }
 */

function config() {
	var winConfig = Alloy.createController('config').getView();
	winConfig.open();
}

getInfos();

var winRecord = null;
function btnRecord_click() {
	winRecord = Alloy.createController('record').getView();
	winRecord.open();
}

Ti.App.addEventListener("index:closeRecord", function(data) {
	closeWinRecord();
});

Ti.App.addEventListener("index:startRecord", function(data) {
	startRecord(data.nom_trajet);
});

function closeWinRecord() {
	winRecord.close();
	winRecord = null;
}

var trajet = null;
var uid = null;

function startRecord(nom_trajet) {
	closeWinRecord();

	Ti.App.trajet = nom_trajet;
	uid = uniqid();
	trajet = Alloy.createModel('trajet', {
		id : uid,
		nom : nom_trajet,
		debut : new Date()
	});
	trajets.add(trajet);

	trajet.save();
	trajets.fetch();
	isRecoerding = true;

	$.btnEnreg.setVisible(false);
	$.btnFinish.setVisible(true);
}

function stopRecord() {
	isRecoerding = false;
	trajet.set('fin', new Date()).save();
	trajets.fetch();

	$.btnEnreg.setVisible(true);
	$.btnFinish.setVisible(false);
}

function showTrajets() {
	Alloy.createController("trajets").getView().open();
}

$.index.open();

function uniqid(prefix, more_entropy) {
	if ( typeof prefix === 'undefined') {
		prefix = "";
	}

	var retId;
	var formatSeed = function(seed, reqWidth) {
		seed = parseInt(seed, 10).toString(16);
		// to hex str
		if (reqWidth < seed.length) {// so long we split
			return seed.slice(seed.length - reqWidth);
		}
		if (reqWidth > seed.length) {// so short we pad
			return Array(1 + (reqWidth - seed.length)).join('0') + seed;
		}
		return seed;
	};

	// BEGIN REDUNDANT
	if (!this.php_js) {
		this.php_js = {};
	}
	// END REDUNDANT
	if (!this.php_js.uniqidSeed) {// init seed with big random int
		this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
	}
	this.php_js.uniqidSeed++;

	retId = prefix;
	// start with prefix, add current milliseconds hex string
	retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
	retId += formatSeed(this.php_js.uniqidSeed, 5);
	// add seed hex string
	if (more_entropy) {
		// for more entropy we add a float lower to 10
		retId += (Math.random() * 10).toFixed(8).toString();
	}

	return retId;
}
