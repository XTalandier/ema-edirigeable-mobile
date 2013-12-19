function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "direction/" + s : s.substring(0, index) + "/direction/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    function fireDirection(dir, event) {
        handlers.directionChanged(dir, event);
    }
    new (require("alloy/widget"))("direction");
    this.__widgetId = "direction";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.dirContainer = Ti.UI.createView({
        backgroundColor: "#CACACA",
        borderWidth: "1px",
        borderColor: "black",
        width: "30%",
        height: "34%",
        left: 0,
        top: "33%",
        id: "dirContainer"
    });
    $.__views.dirContainer && $.addTopLevelView($.__views.dirContainer);
    $.__views.btnHaut = Ti.UI.createImageView({
        left: "33,5%",
        top: "0",
        height: "33,3%",
        width: "33,4%",
        backgroundImage: "button_top.png",
        id: "btnHaut"
    });
    $.__views.dirContainer.add($.__views.btnHaut);
    $.__views.btnDroite = Ti.UI.createImageView({
        top: "33,3%",
        left: "66,7%",
        height: "33,3%",
        width: "33,3%",
        backgroundImage: "button_right.png",
        id: "btnDroite"
    });
    $.__views.dirContainer.add($.__views.btnDroite);
    $.__views.btnBas = Ti.UI.createImageView({
        left: "33,5%",
        top: "66,6%",
        height: "33,3%",
        width: "33,4%",
        backgroundImage: "button_bottom.png",
        id: "btnBas"
    });
    $.__views.dirContainer.add($.__views.btnBas);
    $.__views.btnGauche = Ti.UI.createImageView({
        left: 0,
        top: "33,3%",
        height: "33,3%",
        width: "33,3%",
        backgroundImage: "button_left.png",
        id: "btnGauche"
    });
    $.__views.dirContainer.add($.__views.btnGauche);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var handlers = {};
    handlers.directionChanged = function() {};
    exports.addEventListener = function(listenerName, listenerFunction) {
        switch (listenerName) {
          case "directionChanged":
            handlers.directionChanged = listenerFunction;
        }
    };
    $.btnHaut.addEventListener("click", function(e) {
        fireDirection("haut", e);
    });
    $.btnDroite.addEventListener("click", function(e) {
        fireDirection("droite", e);
    });
    $.btnBas.addEventListener("click", function(e) {
        fireDirection("bas", e);
    });
    $.btnGauche.addEventListener("click", function(e) {
        fireDirection("gauche", e);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;