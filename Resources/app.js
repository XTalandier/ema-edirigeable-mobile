var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

"production" !== Ti.App.deployType && (Alloy.CFG.environment = "test");

Ti.App.addressip = "0.0.0.0";

Ti.App.port = "8080";

Ti.App.intervalle = "10";

Ti.App.modeconsole = false;

Alloy.createController("index");