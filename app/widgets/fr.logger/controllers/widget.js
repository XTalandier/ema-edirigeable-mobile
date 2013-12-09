Ti.App.addEventListener("logMe", function(e) {
	Ti.API.debug(e.message);
	$.logger.value = "[" + (new Date()) + "] " + e.message + "\n" + $.logger.value;
});
