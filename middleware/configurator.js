var portchecker = require('portchecker');
var config = require('../config/config.json');
var dbconfig = config.database;
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

// Auto add  routers to t193r in folder routes/
exports.routers = function(t193r) {
	var routes = fs.readdirSync(path.join(__dirname, '../', 'routes'));
	_.map(routes, function(files) {
		require('../routes/' + files)(t193r);
	});
};

exports.getHostConfig = {
	getHost : function() {
		var host = config.host || "127.0.0.1";
		return host;
	},
	getPort : function() {
		var port = config.port || 8000;
		return port;
	},

}

// Getting database configuration
exports.getDatabaseConfig = {
	getEngine: function() {
		for (var key in dbconfig) {
			if (dbconfig.hasOwnProperty(key)) {
				if(dbconfig[key].active) {
					return dbconfig[key].engine;
				} else {
					return false;
				}
			}
		}
	},
	getHost: function() {
		for (var key in dbconfig) {
			if (dbconfig.hasOwnProperty(key)) {
				if(dbconfig[key].active) {
					return dbconfig[key].host;
				} else {
					return false;
				}
			}
		}
	},
	getPort: function() {
		for (var key in dbconfig) {
			if (dbconfig.hasOwnProperty(key)) {
				if(dbconfig[key].active) {
					return dbconfig[key].port;
				} else {
					return false;
				}
			}
		}
	},
	getDbName: function() {
		for (var key in dbconfig) {
			if (dbconfig.hasOwnProperty(key)) {
				if(dbconfig[key].active) {
					return dbconfig[key].dbname;
				} else {
					return false;
				}
			}
		}
	}
}

// Checking database
exports.checkDatabase = function(callback) {
	if(this.getDatabaseConfig.getEngine() == "") {
		console.log('No database configured');
		callback();
	} else {
		var that = this;
		var dbhost = this.getDatabaseConfig.getHost();
		var dbport = this.getDatabaseConfig.getPort();
		portchecker.isOpen(dbport, dbhost, function(port) {
			if(port) {
				callback();
			} else {
				console.log('No database connection');
			}
		});
	}
}