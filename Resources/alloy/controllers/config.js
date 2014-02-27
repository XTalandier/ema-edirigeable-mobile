function Controller() {
    function Save() {
        Ti.App.addressip = $.adresseIP.getValue();
        Ti.App.port = $.port.getValue();
        Ti.App.intervalle = $.intervalle.getValue();
        Ti.App.Properties.setString("addressip", Ti.App.addressip);
        Ti.App.Properties.setString("port", Ti.App.port);
        Ti.App.Properties.setInt("intervalle", Ti.App.intervalle);
        $.config_win.close();
        $.config_win = null;
    }
    function back() {
        $.config_win.close();
        $.config_win = null;
    }
    function initialise() {
        $.adresseIP.setValue(Ti.App.addressip);
        $.port.setValue(Ti.App.port);
        $.intervalle.setValue(Ti.App.intervalle);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "config";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.config_win = Ti.UI.createWindow({
        id: "config_win",
        backgroundColor: "grey",
        opacity: "100%"
    });
    $.__views.config_win && $.addTopLevelView($.__views.config_win);
    $.__views.config_view = Ti.UI.createView({
        backgroundColor: "#fff",
        width: "40%",
        height: "55%",
        id: "config_view"
    });
    $.__views.config_win.add($.__views.config_view);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        left: "20%",
        top: "10%",
        text: "Configuration",
        id: "__alloyId0"
    });
    $.__views.config_view.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        left: "20%",
        top: "20%",
        text: "Adresse IP :",
        id: "__alloyId1"
    });
    $.__views.config_view.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        left: "20%",
        top: "30%",
        text: "Port :",
        id: "__alloyId2"
    });
    $.__views.config_view.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        left: "20%",
        top: "40%",
        text: "Intervalle (ms) :",
        id: "__alloyId3"
    });
    $.__views.config_view.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createButton({
        left: "20%",
        top: "75%",
        title: "Annuler",
        id: "__alloyId4"
    });
    $.__views.config_view.add($.__views.__alloyId4);
    back ? $.__views.__alloyId4.addEventListener("click", back) : __defers["$.__views.__alloyId4!click!back"] = true;
    $.__views.__alloyId5 = Ti.UI.createButton({
        left: "60%",
        top: "75%",
        title: "Enregistrer",
        id: "__alloyId5"
    });
    $.__views.config_view.add($.__views.__alloyId5);
    Save ? $.__views.__alloyId5.addEventListener("click", Save) : __defers["$.__views.__alloyId5!click!Save"] = true;
    $.__views.adresseIP = Ti.UI.createTextField({
        backgroundColor: "#CACACA",
        width: "30%",
        left: "60%",
        top: "20%",
        id: "adresseIP"
    });
    $.__views.config_view.add($.__views.adresseIP);
    $.__views.port = Ti.UI.createTextField({
        backgroundColor: "#CACACA",
        width: "30%",
        left: "60%",
        top: "30%",
        id: "port"
    });
    $.__views.config_view.add($.__views.port);
    $.__views.intervalle = Ti.UI.createTextField({
        backgroundColor: "#CACACA",
        width: "30%",
        left: "60%",
        top: "40%",
        id: "intervalle"
    });
    $.__views.config_view.add($.__views.intervalle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    initialise();
    __defers["$.__views.__alloyId4!click!back"] && $.__views.__alloyId4.addEventListener("click", back);
    __defers["$.__views.__alloyId5!click!Save"] && $.__views.__alloyId5.addEventListener("click", Save);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;