var Alloy = require("alloy");

exports.definition = {
    config: {
        columns: {
            id: "string",
            nom: "string",
            debut: "string",
            fin: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "trajet",
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

model = Alloy.M("trajet", exports.definition, []);

collection = Alloy.C("trajet", exports.definition, model);

exports.Model = model;

exports.Collection = collection;