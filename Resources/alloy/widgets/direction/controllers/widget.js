function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "direction/" + s : s.substring(0, index) + "/direction/" + s.substring(index + 1);
    return path;
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
        backgroundColor: "#000000",
        width: "300px",
        height: "300px",
        left: 0,
        top: "50%",
        id: "dirContainer"
    });
    $.__views.dirContainer && $.addTopLevelView($.__views.dirContainer);
    $.__views.btnHaut = Ti.UI.createImageView({
        left: "25%",
        top: 0,
        height: "50%",
        width: "50%",
        backgroundImage: "/direction/triangle-haut.png",
        id: "btnHaut"
    });
    $.__views.dirContainer.add($.__views.btnHaut);
    $.__views.btnDroite = Ti.UI.createImageView({
        left: "50%",
        top: "25%",
        height: "50%",
        width: "50%",
        backgroundImage: "/direction/triangle-droite.png",
        id: "btnDroite"
    });
    $.__views.dirContainer.add($.__views.btnDroite);
    $.__views.btnBas = Ti.UI.createImageView({
        left: "25%",
        top: "50%",
        height: "50%",
        width: "50%",
        backgroundImage: "/direction/triangle-bas.png",
        id: "btnBas"
    });
    $.__views.dirContainer.add($.__views.btnBas);
    $.__views.btnGauche = Ti.UI.createImageView({
        left: 0,
        top: "25%",
        height: "50%",
        width: "50%",
        backgroundImage: "/direction/triangle-gauche.png",
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