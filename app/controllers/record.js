function back() {
	$.record_win.close();
	$.record_win=null;
	//$.index.refreshBtn();
	var controller = Alloy.createController('index');
	controller.refreshBtn();
}

function save() {
	Ti.App.trajet = $.nom_trajet.getValue();
	$.record_win.close();
	$.record_win=null;	

	//alert(Ti.App.trajet);
}
