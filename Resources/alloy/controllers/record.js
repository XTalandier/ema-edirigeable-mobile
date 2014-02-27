function Controller() {
    function back() {
        Ti.App.fireEvent("index:closeRecord", {});
    }
    function save() {
        Ti.App.fireEvent("index:startRecord", {
            nom_trajet: $.nom_trajet.getValue()
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "record";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.record_win = Ti.UI.createWindow({
        id: "record_win"
    });
    $.__views.record_win && $.addTopLevelView($.__views.record_win);
    $.__views.record_view = Ti.UI.createView({
        top: "40%",
        width: "40%",
        height: "25%",
        backgroundColor: "white",
        opacity: "70%",
        id: "record_view"
    });
    $.__views.record_win.add($.__views.record_view);
    $.__views.label = Ti.UI.createLabel({
        left: "20%",
        text: "Nom du trajet :",
        id: "label"
    });
    $.__views.record_view.add($.__views.label);
    $.__views.nom_trajet = Ti.UI.createTextField({
        left: "60%",
        id: "nom_trajet",
        value: "Trajet 1"
    });
    $.__views.record_view.add($.__views.nom_trajet);
    $.__views.btnCancel = Ti.UI.createButton({
        left: "30%",
        bottom: "10%",
        id: "btnCancel",
        title: "Annuler"
    });
    $.__views.record_view.add($.__views.btnCancel);
    back ? $.__views.btnCancel.addEventListener("click", back) : __defers["$.__views.btnCancel!click!back"] = true;
    $.__views.btnSave = Ti.UI.createButton({
        left: "60%",
        bottom: "10%",
        id: "btnSave",
        title: "Enregistrer"
    });
    $.__views.record_view.add($.__views.btnSave);
    save ? $.__views.btnSave.addEventListener("click", save) : __defers["$.__views.btnSave!click!save"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.btnCancel!click!back"] && $.__views.btnCancel.addEventListener("click", back);
    __defers["$.__views.btnSave!click!save"] && $.__views.btnSave.addEventListener("click", save);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;