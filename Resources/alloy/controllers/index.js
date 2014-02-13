function Controller() {
    function getInfos() {
        var urlPrefix = "http://127.0.0.1:8000";
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
    function btnRecord_click() {
        winRecord = Alloy.createController("record").getView();
        winRecord.open();
    }
    function closeWinRecord() {
        winRecord.close();
        winRecord = null;
    }
    function startRecord(nom_trajet) {
        closeWinRecord();
        Ti.App.trajet = nom_trajet;
        $.btnEnreg.setVisible(false);
        $.btnFinish.setVisible(true);
    }
    function stopRecord() {
        $.btnEnreg.setVisible(true);
        $.btnFinish.setVisible(false);
    }
    function config() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#CACACA",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "#CACACA",
        borderWidth: "1px",
        borderColor: "black",
        top: "20dp",
        left: "0",
        width: "33%",
        height: "33%",
        id: "__alloyId1"
    });
    $.__views.index.add($.__views.__alloyId1);
    $.__views.btnEnreg = Ti.UI.createButton({
        top: "20%",
        id: "btnEnreg",
        title: "Enregistrer"
    });
    $.__views.__alloyId1.add($.__views.btnEnreg);
    btnRecord_click ? $.__views.btnEnreg.addEventListener("click", btnRecord_click) : __defers["$.__views.btnEnreg!click!btnRecord_click"] = true;
    $.__views.btnFinish = Ti.UI.createButton({
        top: "20%",
        visible: "false",
        id: "btnFinish",
        title: "Arrêter"
    });
    $.__views.__alloyId1.add($.__views.btnFinish);
    stopRecord ? $.__views.btnFinish.addEventListener("click", stopRecord) : __defers["$.__views.btnFinish!click!stopRecord"] = true;
    $.__views.btnOptions = Ti.UI.createButton({
        top: "50%",
        id: "btnOptions",
        title: "Configuration"
    });
    $.__views.__alloyId1.add($.__views.btnOptions);
    config ? $.__views.btnOptions.addEventListener("click", config) : __defers["$.__views.btnOptions!click!config"] = true;
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
        top: "60%",
        width: "70%",
        height: "50%",
        right: 0,
        backgroundColor: "#CACACA",
        id: "graph",
        url: "/graph/chart.html"
    });
    $.__views.index.add($.__views.graph);
    var __alloyId2 = [];
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
    __alloyId2.push($.__views.eDirigeable);
    $.__views.mapview = Ti.Map.createView({
        borderWidth: "1px",
        borderColor: "black",
        top: "20dp",
        width: "70%",
        height: "50%",
        right: 0,
        annotations: __alloyId2,
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
    var winRecord = null;
    Ti.App.addEventListener("index:closeRecord", function() {
        closeWinRecord();
    });
    Ti.App.addEventListener("index:startRecord", function(data) {
        startRecord(data.nom_trajet);
    });
    $.index.open();
    __defers["$.__views.btnEnreg!click!btnRecord_click"] && $.__views.btnEnreg.addEventListener("click", btnRecord_click);
    __defers["$.__views.btnFinish!click!stopRecord"] && $.__views.btnFinish.addEventListener("click", stopRecord);
    __defers["$.__views.btnOptions!click!config"] && $.__views.btnOptions.addEventListener("click", config);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;