function Controls(ws) {
	this.WS = ws;
}

Controls.prototype.move = function(direction, callback) {
	var cmds = {
		cmdType : ''
	};
	switch(direction) {
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
	var urlPrefix = '10.0.2.1:40404';//'http://146.19.17.215:8080';
	this.WS.postJSON(urlPrefix + '/', cmds, function(data) {
		Ti.App.fireEvent("logMe", {
			message : "DATA: " + JSON.stringify(data)
		});
		callback(data);
	});

};

exports.Controls = Controls;
