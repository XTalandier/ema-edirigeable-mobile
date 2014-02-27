function Controller() {
    function __alloyId14() {
        __alloyId14.opts || {};
        var models = whereFunction(__alloyId13);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId11 = models[i];
            __alloyId11.__transform = transformFunction(__alloyId11);
            var __alloyId12 = Alloy.createController("rowPoint", {
                $model: __alloyId11
            });
            rows.push(__alloyId12.getViewEx({
                recurse: true
            }));
        }
        $.__views.pointsTable.setData(rows);
    }
    function whereFunction() {
        return points.where({
            trajetid: args.item_id
        });
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.title = JSON.stringify(transform);
        return transform;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "trajetDetails";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.pointsWin = Ti.UI.createWindow({
        id: "pointsWin",
        title: "Points"
    });
    $.__views.pointsWin && $.addTopLevelView($.__views.pointsWin);
    $.__views.pointsTable = Ti.UI.createTableView({
        id: "pointsTable"
    });
    $.__views.pointsWin.add($.__views.pointsTable);
    var __alloyId13 = Alloy.Collections["points"] || points;
    __alloyId13.on("fetch destroy change add remove reset", __alloyId14);
    exports.destroy = function() {
        __alloyId13.off("fetch destroy change add remove reset", __alloyId14);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var points = Alloy.Collections.points;
    points.fetch();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;