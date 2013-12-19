function Controller() {
    function getInfos() {
        WS.postJSON(urlPrefix + "/", {
            cmdType: "GetInfos"
        }, function(data) {
            Ti.App.fireEvent("logMe", {
                message: JSON.stringify(data)
            });
            if (null === data) {
                setTimeout(getInfos, 4e3);
                return;
            }
            updateData(data);
            setTimeout(getInfos, 4e3);
        });
    }
    function updateData(data) {
        var lat = data.latitude;
        var lon = data.longitude;
        var tem = data.measuredTemperature;
        var dID = data.dirigeableId;
        $.mapview.region = {
            latitude: lat,
            longitude: lon,
            latitudeDelta: .01,
            longitudeDelta: .01
        };
        $.eDirigeable.applyProperties({
            latitude: lat,
            longitude: lon,
            subtitle: dID
        });
        Ti.App.fireEvent("graph:updateGraph", {
            value: tem
        });
    }
    function save() {
        urlPrefix = "http://" + $.txtIP.value;
        alert("ok => " + urlPrefix);
    }
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
    $.__views.txtIP = Ti.UI.createTextField({
        top: "0%",
        width: "80%",
        id: "txtIP"
    });
    $.__views.__alloyId1.add($.__views.txtIP);
    $.__views.btnEnreg = Ti.UI.createButton({
        top: "20%",
        width: "80%",
        id: "btnEnreg",
        title: "Enregistrer"
    });
    $.__views.__alloyId1.add($.__views.btnEnreg);
    save ? $.__views.btnEnreg.addEventListener("click", save) : __defers["$.__views.btnEnreg!click!save"] = true;
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
        subtitle: "",
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
    var urlPrefix = "http://146.19.17.72:8080";
    $.txtIP.value = urlPrefix.replace("http://", "");
    $.dir.addEventListener("directionChanged", function(direction) {
        Ti.App.fireEvent("logMe", {
            message: "Direction: " + direction
        });
        var cmds = {
            cmdType: ""
        };
        switch (direction) {
          case "haut":
            cmds.cmdType = "Up";
            break;

          case "droite":
            cmds.cmdType = "Right";
            break;

          case "bas":
            cmds.cmdType = "Down";
            break;

          case "gauche":
            cmds.cmdType = "Left";
        }
        WS.postJSON(urlPrefix + "/", cmds, function(data) {
            Ti.App.fireEvent("logMe", {
                message: "DATA: " + JSON.stringify(data)
            });
            updateData(data);
        });
    });
    getInfos();
    $.index.open();
    __defers["$.__views.btnEnreg!click!save"] && $.__views.btnEnreg.addEventListener("click", save);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;