function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "fr.logger/" + s : s.substring(0, index) + "/fr.logger/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("fr.logger");
    this.__widgetId = "fr.logger";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.logger = Ti.UI.createTextArea({
        left: 0,
        bottom: 0,
        height: "300px",
        right: 0,
        color: "#ffffff",
        backgroundColor: "#000000",
        id: "logger",
        editable: "false"
    });
    $.__views.logger && $.addTopLevelView($.__views.logger);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("logMe", function(e) {
        Ti.API.debug(e.message);
        $.logger.value = "[" + new Date() + "] " + e.message + "\n" + $.logger.value;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;