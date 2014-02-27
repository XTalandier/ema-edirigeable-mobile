function Controller() {
    function getInfos() {
        WS.postJSON({
            cmdType: "GetInfos"
        }, function(data) {
            Ti.App.fireEvent("logMe", {
                message: JSON.stringify(data)
            });
            if (null === data) {
                setTimeout(getInfos, 1e3);
                return;
            }
            updateData(data);
            setTimeout(getInfos, 1e3);
        });
    }
    function updateData(data) {
        if (null === data) return;
        var lat = data.latitude;
        var lon = data.longitude;
        var tem = data.measuredTemperature;
        var dID = data.dirigeableId;
        if (isRecoerding) {
            point = Alloy.createModel("point", {
                id: uniqid(),
                lat: lat,
                lon: lon,
                temp: tem,
                date: new Date(),
                trajetid: uid
            });
            points.add(point);
            point.save();
        }
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
    function config() {
        var winConfig = Alloy.createController("config").getView();
        winConfig.open();
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
        uid = uniqid();
        trajet = Alloy.createModel("trajet", {
            id: uid,
            nom: nom_trajet,
            debut: new Date()
        });
        trajets.add(trajet);
        trajet.save();
        trajets.fetch();
        isRecoerding = true;
        $.btnEnreg.setVisible(false);
        $.btnFinish.setVisible(true);
    }
    function stopRecord() {
        isRecoerding = false;
        trajet.set("fin", new Date()).save();
        trajets.fetch();
        $.btnEnreg.setVisible(true);
        $.btnFinish.setVisible(false);
    }
    function showTrajets() {
        Alloy.createController("trajets").getView().open();
    }
    function uniqid(prefix, more_entropy) {
        "undefined" == typeof prefix && (prefix = "");
        var retId;
        var formatSeed = function(seed, reqWidth) {
            seed = parseInt(seed, 10).toString(16);
            if (seed.length > reqWidth) return seed.slice(seed.length - reqWidth);
            if (reqWidth > seed.length) return Array(1 + (reqWidth - seed.length)).join("0") + seed;
            return seed;
        };
        this.php_js || (this.php_js = {});
        this.php_js.uniqidSeed || (this.php_js.uniqidSeed = Math.floor(123456789 * Math.random()));
        this.php_js.uniqidSeed++;
        retId = prefix;
        retId += formatSeed(parseInt(new Date().getTime() / 1e3, 10), 8);
        retId += formatSeed(this.php_js.uniqidSeed, 5);
        more_entropy && (retId += (10 * Math.random()).toFixed(8).toString());
        return retId;
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
        backgroundColor: "#f1f1f1",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId7 = Ti.UI.createView({
        backgroundColor: "#f1f1f1",
        borderWidth: "1px",
        borderColor: "#cccccc",
        top: "20dp",
        left: "0",
        width: "25%",
        height: "33%",
        id: "__alloyId7"
    });
    $.__views.index.add($.__views.__alloyId7);
    $.__views.btnEnreg = Ti.UI.createButton({
        top: "10%",
        id: "btnEnreg",
        title: "Enregistrer"
    });
    $.__views.__alloyId7.add($.__views.btnEnreg);
    btnRecord_click ? $.__views.btnEnreg.addEventListener("click", btnRecord_click) : __defers["$.__views.btnEnreg!click!btnRecord_click"] = true;
    $.__views.btnFinish = Ti.UI.createButton({
        top: "20%",
        visible: "false",
        id: "btnFinish",
        title: "Arrêter"
    });
    $.__views.__alloyId7.add($.__views.btnFinish);
    stopRecord ? $.__views.btnFinish.addEventListener("click", stopRecord) : __defers["$.__views.btnFinish!click!stopRecord"] = true;
    $.__views.btnOptions = Ti.UI.createButton({
        top: "65%",
        id: "btnOptions",
        title: "Configuration"
    });
    $.__views.__alloyId7.add($.__views.btnOptions);
    config ? $.__views.btnOptions.addEventListener("click", config) : __defers["$.__views.btnOptions!click!config"] = true;
    $.__views.btnTrajets = Ti.UI.createButton({
        id: "btnTrajets",
        title: "Trajets"
    });
    $.__views.__alloyId7.add($.__views.btnTrajets);
    showTrajets ? $.__views.btnTrajets.addEventListener("click", showTrajets) : __defers["$.__views.btnTrajets!click!showTrajets"] = true;
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
        backgroundColor: "#f1f1f1",
        id: "graph",
        url: "/graph/chart.html"
    });
    $.__views.index.add($.__views.graph);
    var __alloyId8 = [];
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
    __alloyId8.push($.__views.eDirigeable);
    $.__views.mapview = Ti.Map.createView({
        borderWidth: "1px",
        borderColor: "#cccccc",
        top: "20dp",
        width: "75%",
        height: "50%",
        right: 0,
        annotations: __alloyId8,
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
    var trajets = Alloy.Collections.trajets;
    trajets.fetch();
    var points = Alloy.Collections.points;
    points.fetch();
    var isRecoerding = false;
    $.dir.addEventListener("directionChanged", function(direction) {
        Ti.App.fireEvent("logMe", {
            message: "Direction: " + direction
        });
        var cmds = {
            cmdType: ""
        };
        switch (direction) {
          case "haut":
            cmds.cmdType = "Forward";
            break;

          case "droite":
            cmds.cmdType = "Right";
            break;

          case "bas":
            cmds.cmdType = "Backward";
            break;

          case "gauche":
            cmds.cmdType = "Left";
        }
        WS.postJSON(cmds, function(data) {
            Ti.App.fireEvent("logMe", {
                message: "DATA: " + JSON.stringify(data)
            });
            updateData(data);
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
    var trajet = null;
    var uid = null;
    $.index.open();
    __defers["$.__views.btnEnreg!click!btnRecord_click"] && $.__views.btnEnreg.addEventListener("click", btnRecord_click);
    __defers["$.__views.btnFinish!click!stopRecord"] && $.__views.btnFinish.addEventListener("click", stopRecord);
    __defers["$.__views.btnOptions!click!config"] && $.__views.btnOptions.addEventListener("click", config);
    __defers["$.__views.btnTrajets!click!showTrajets"] && $.__views.btnTrajets.addEventListener("click", showTrajets);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;