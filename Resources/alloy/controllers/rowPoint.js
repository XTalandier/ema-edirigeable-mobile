function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "rowPoint";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row",
        title: "undefined" != typeof $model.__transform["title"] ? $model.__transform["title"] : $model.get("title")
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $model && ($.row.item_id = $model.get("id"));
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;