var handlers = {};
handlers.directionChanged = function(){};

exports.addEventListener = function(listenerName, listenerFunction){
	switch (listenerName){
		case 'directionChanged' :
			handlers.directionChanged = listenerFunction;
			break;
	}
};


$.btnHaut.addEventListener('click', function(e) {
	fireDirection('haut', e);
});
$.btnDroite.addEventListener('click', function(e) {
	fireDirection('droite', e);
});
$.btnBas.addEventListener('click', function(e) {
	fireDirection('bas', e);
});
$.btnGauche.addEventListener('click', function(e) {
	fireDirection('gauche', e);
});


function fireDirection(dir, event){
	handlers.directionChanged(dir, event);
}
