function Controller() {
    function __alloyId14() {
        __alloyId14.opts || {};
        var models = __alloyId13.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId11 = models[i];
            __alloyId11.__transform = {};
            var __alloyId12 = Alloy.createController("rowTrajet", {
                $model: __alloyId11
            });
            rows.push(__alloyId12.getViewEx({
                recurse: true
            }));
        }
        $.__views.trajetTable.setData(rows);
    }
    function showDetail(e) {
        var item_id = e.row.item_id;
        Alloy.createController("trajetDetails", {
            item_id: item_id
        }).getView().open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "trajets";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.trajetsWin = Ti.UI.createWindow({
        id: "trajetsWin",
        title: "Trajets"
    });
    $.__views.trajetsWin && $.addTopLevelView($.__views.trajetsWin);
    $.__views.trajetTable = Ti.UI.createTableView({
        id: "trajetTable"
    });
    $.__views.trajetsWin.add($.__views.trajetTable);
    var __alloyId13 = Alloy.Collections["trajets"] || trajets;
    __alloyId13.on("fetch destroy change add remove reset", __alloyId14);
    showDetail ? $.__views.trajetTable.addEventListener("click", showDetail) : __defers["$.__views.trajetTable!click!showDetail"] = true;
    exports.destroy = function() {
        __alloyId13.off("fetch destroy change add remove reset", __alloyId14);
    };
    _.extend($, $.__views);
    var trajets = Alloy.Collections.trajets;
    trajets.fetch();
    __defers["$.__views.trajetTable!click!showDetail"] && $.__views.trajetTable.addEventListener("click", showDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;