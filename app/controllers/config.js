function Save () {
	Ti.App.addressip = $.adresseIP.getValue();
	Ti.App.port = $.port.getValue();
	Ti.App.intervalle = $.intervalle.getValue();
	//Ti.App.modeconsole = $.modeConsole.getValue();
	
	Ti.App.Properties.setString('addressip'  , Ti.App.addressip);
	Ti.App.Properties.setString('port'       , Ti.App.port);
	Ti.App.Properties.setInt('intervalle'    , Ti.App.intervalle);
	//Ti.App.Properties.setBool('modeconsole'  , Ti.App.modeconsole);
	
	$.config_win.close();
	$.config_win=null;

}

function back () {
  $.config_win.close();
  $.config_win=null;
}

function initialise() {
	
 	$.adresseIP.setValue(Ti.App.addressip);
	$.port.setValue(Ti.App.port);
	$.intervalle.setValue(Ti.App.intervalle);
	//$.modeConsole.setValue(Ti.App.modeconsole);
}

initialise();
