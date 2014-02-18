var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.trajet = "";

"production" !== Ti.App.deployType && (Alloy.CFG.environment = "test");

Alloy.createController("index");