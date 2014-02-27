function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "trajetDetails";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.trajetDetails = Ti.UI.createView({
        id: "trajetDetails"
    });
    $.__views.trajetDetails && $.addTopLevelView($.__views.trajetDetails);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var collection = Alloy.Collections.points;
    var args = arguments[0] || {};
    $.init = function() {
        collection.fetch();
        trajet = collection.get(args.item_id);
        $.title.text = book.get("title");
        $.author.text = book.get("author");
        $.win.open();
    };
    $.toggleAuthor = function() {
        if (true === $.author.visible) {
            $.toggleAuthorButton.title = "Show author";
            $.authorLabel.visible = false;
            $.author.applyProperties({
                visible: false
            });
        } else {
            $.toggleAuthorButton.title = "Hide author";
            $.authorLabel.visible = true;
            $.author.applyProperties({
                visible: true
            });
        }
    };
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;