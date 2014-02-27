var Alloy = require('alloy');

exports.definition = {
	config : {
		columns : {
			"id" : "string",
			"nom" : "string",
			"debut" : "string",
			"fin" : "string"
		},
		adapter : {
			type : "sql",
			collection_name : "trajet",
			db_name : 'ema_dev',
			idAttribute : "id"
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
}; 