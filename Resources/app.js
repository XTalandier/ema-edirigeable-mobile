var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.trajet = "";

Alloy.CFG = {
    environment: "",
    db_name: ""
};

"production" !== Ti.App.deployType && (Alloy.CFG.environment = "test");

Alloy.Collections.trajets = Alloy.createCollection("trajet");

Alloy.Collections.points = Alloy.createCollection("point");

Ti.App.addressip = Ti.App.Properties.getString("addressip", "0.0.0.0");

Ti.App.port = Ti.App.Properties.getString("port", "8080");

Ti.App.intervalle = Ti.App.Properties.getInt("intervalle", 10);

Ti.App.modeconsole = Ti.App.Properties.getBool("modeconsole", true);

Alloy.createController("index");