exports.definition = {
	config: {
		columns: {
		    "id": "string",
		    "lat": "string",
		    "lon": "string",
		    "temp": "double",
		    "date": "string",
		    "trajetid": "string"
		},
		adapter: {
			type : "sql",
			collection_name : "point",
			db_name : 'ema_dev',
			idAttribute : "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};