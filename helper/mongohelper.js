var mongo = require('mongoskin');
var mongodb = require('mongodb');
var configurator = require('../middleware/configurator');

// Database configuration
var host = configurator.getDatabaseConfig.getHost();
var port = configurator.getDatabaseConfig.getPort();
var database = configurator.getDatabaseConfig.getDbName();
var dbUrl = host + ':' + port + '/' + database;
var dbOptions = {safe:true};
var db = mongo.db(dbUrl, dbOptions);

exports.createID = function(string) {
	return new mongodb.BSONPure.ObjectID(string);
}

exports.CRUD = {
	create : function(options) {
		db.collection(options.collection).insert(options.data, function(err, items) {
			if (err) {
				this.err = err;
				options.errCallback();
			} else {
				options.successCallback();
			}
		});
	},
	read : function(options) {
		db.collection(options.collection).find(options.criteria).sort(options.orderBy || {_id: -1}).toArray(function(err, items) {
			if (err) {
				this.err = err;
				options.errCallback();
			} else {
				this.items = items;
				options.successCallback();
			}
		});
	},
	update: function(options) {
		db.collection(options.collection).update(options.criteria, {$set: options.data}, {safe:true}, function(err) {
			if (err) {
				this.err = err;
				options.errCallback();
			} else {
				options.successCallback();
			}
		});
	},
	delete: function(options) {
		db.collection(options.collection).remove(options.criteria, function(err, items) {
			if (err) {
				this.err = err;
				options.errCallback();
			} else {
				options.successCallback();
			}
		});
	}
};