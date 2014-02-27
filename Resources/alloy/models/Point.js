exports.definition = {
    config: {
        columns: {
            id: "string",
            lat: "string",
            lon: "string",
            temp: "double",
            date: "string",
            trajetid: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "point",
            db_name: "ema_dev",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("point", exports.definition, []);

collection = Alloy.C("point", exports.definition, model);

exports.Model = model;

exports.Collection = collection;