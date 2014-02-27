var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.trajet = "";

Alloy.CFG = {
    environment: "",
    db_name: ""
};

"production" !== Ti.App.deployType && (Alloy.CFG.environment = "test");

Alloy.Collections.trajets = Alloy.createCollection("trajet");

Alloy.Collections.points = Alloy.createCollection("point");

Ti.App.addressip = "146.19.17.225";

Ti.App.port = "8000";

Ti.App.intervalle = Ti.App.Properties.getInt("intervalle", 10);

Ti.App.modeconsole = Ti.App.Properties.getBool("modeconsole", true);

Alloy.createController("index");