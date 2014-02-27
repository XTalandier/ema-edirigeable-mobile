// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.trajet = "";
Alloy.CFG = {
	environment: '',
	db_name: ''
};

//if( Ti.App.deployType !== 'production' )
//{
if (Ti.App.deployType !== 'production') {
	Alloy.CFG.environment = 'test';
	//require('tests_runner').run();
}

//Alloy.db_name = 'ema_dev';
Alloy.Collections.trajets = Alloy.createCollection('trajet');
Alloy.Collections.points = Alloy.createCollection('point');


Ti.App.addressip   = '146.19.17.225';//'127.0.0.1';//Ti.App.Properties.getString('addressip' , '0.0.0.0');
Ti.App.port        = '8000';//Ti.App.Properties.getString('port'      , '8080');
Ti.App.intervalle  = Ti.App.Properties.getInt('intervalle'   , 10);
Ti.App.modeconsole = Ti.App.Properties.getBool('modeconsole' , true);
