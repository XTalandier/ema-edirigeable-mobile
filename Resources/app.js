var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

<<<<<<< HEAD
if ("production" !== Ti.App.deployType) {
    Alloy.CFG.environment = "test";
    require("tests_runner").run();
}

=======
>>>>>>> 08ca8479f6db1cb5b4bb23db9359fa3c6ba0ee7a
Alloy.createController("index");