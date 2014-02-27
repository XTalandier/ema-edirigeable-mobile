function Controller() {
    function __alloyId13() {
        __alloyId13.opts || {};
        var models = __alloyId12.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId10 = models[i];
            __alloyId10.__transform = {};
            var __alloyId11 = Alloy.createController("rowTrajet", {
                $model: __alloyId10
            });
            rows.push(__alloyId11.getViewEx({
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
    var __alloyId12 = Alloy.Collections["trajets"] || trajets;
    __alloyId12.on("fetch destroy change add remove reset", __alloyId13);
    showDetail ? $.__views.trajetTable.addEventListener("click", showDetail) : __defers["$.__views.trajetTable!click!showDetail"] = true;
    exports.destroy = function() {
        __alloyId12.off("fetch destroy change add remove reset", __alloyId13);
    };
    _.extend($, $.__views);
    var trajets = Alloy.Collections.trajets;
    trajets.fetch();
    __defers["$.__views.trajetTable!click!showDetail"] && $.__views.trajetTable.addEventListener("click", showDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;