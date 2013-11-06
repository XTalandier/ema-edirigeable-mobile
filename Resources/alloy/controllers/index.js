function Controller() {
    function getInfos() {
        var urlPrefix = "http://192.168.1.51:8000";
        WS.getJSON(urlPrefix + "/getInfos", {}, function(data) {
            Ti.App.fireEvent("logMe", {
                message: JSON.stringify(data)
            });
            if (null === data) {
                setTimeout(getInfos, 300);
                return;
            }
            var lat = data.data.latitude;
            var lon = data.data.longitude;
            var tem = data.data.temperature;
            $.mapview.region = {
                latitude: lat,
                longitude: lon,
                latitudeDelta: .01,
                longitudeDelta: .01
            };
            $.eDirigeable.applyProperties({
                latitude: lat,
                longitude: lon
            });
            Ti.App.fireEvent("graph:updateGraph", {
                value: tem
            });
            setTimeout(getInfos, 300);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.dir = Alloy.createWidget("direction", "widget", {
        id: "dir",
        __parentSymbol: $.__views.index
    });
    $.__views.dir.setParent($.__views.index);
    $.__views.logger = Alloy.createWidget("fr.logger", "widget", {
        id: "logger",
        __parentSymbol: $.__views.index
    });
    $.__views.logger.setParent($.__views.index);
    $.__views.graph = Ti.UI.createWebView({
        top: "30dp",
        height: "400px",
        id: "graph",
        url: "/graph/chart.html"
    });
    $.__views.index.add($.__views.graph);
    var __alloyId1 = [];
    $.__views.eDirigeable = Ti.Map.createAnnotation({
        latitude: 37.390749,
        longitude: -122.081651,
        id: "eDirigeable",
        title: "E-Diregeable",
        subtitle: "Mountain View, CA",
        pincolor: Titanium.Map.ANNOTATION_RED,
        leftButton: "/images/appcelerator_small.png",
        myid: "1"
    });
    __alloyId1.push($.__views.eDirigeable);
    $.__views.mapview = Ti.Map.createView({
        width: "800dp",
        height: "400dp",
        right: 0,
        bottom: "300px",
        annotations: __alloyId1,
        id: "mapview",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.index.add($.__views.mapview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var WS = require("Webservice").Webservice;
    $.dir.addEventListener("directionChanged", function(direction) {
        Ti.App.fireEvent("logMe", {
            message: "Direction: " + direction
        });
    });
    getInfos();
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;