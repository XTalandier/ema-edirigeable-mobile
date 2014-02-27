var cpt = 0;
Ti.App.addEventListener("logMe", function(e) {
	if(++cpt > 10){
		$.logger.value = 0;
		cpt = 0;
	}
	Ti.API.debug(e.message);
	$.logger.value = "[" + (new Date()) + "] " + e.message + "\n" + $.logger.value;
});
