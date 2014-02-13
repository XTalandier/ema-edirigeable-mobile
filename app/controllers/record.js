function back() {
	Ti.App.fireEvent('index:closeRecord', {});
}

function save() {
	Ti.App.fireEvent('index:startRecord', { nom_trajet: $.nom_trajet.getValue() });
}
