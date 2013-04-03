var mongohelper = require('../helper/mongohelper');

module.exports = function(t193r) {
	t193r.get('/', function(req, res) {
		res.render('index');
	});
};