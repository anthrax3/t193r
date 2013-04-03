var express = require('express');
var http = require('http');
var path = require('path');
var colors = require('colors');
var config = require('./config/config.json');
var notfound = require('./middleware/notfound');
var configurator = require('./middleware/configurator');
var t193r = express();

var host = configurator.getHostConfig.getHost();
var port = configurator.getHostConfig.getPort();

t193r.configure(function() {
  t193r.set('views', __dirname + '/views');
  t193r.set('view engine', 'ejs');
  t193r.use(express.logger('dev'));
  t193r.use(express.bodyParser());
  t193r.use(express.methodOverride());
  t193r.use(express.cookieParser(config.secret));
  t193r.use(express.session());
  t193r.use(t193r.router);
  configurator.routers(t193r);
  t193r.use(express.static(path.join(__dirname, 'public')));
  t193r.use(notfound.notfound);
});

t193r.configure('development', function() {
  t193r.use(express.errorHandler());
});

configurator.checkDatabase(function() {
  http.createServer(t193r).listen(port, function() {
    console.log('');
    console.log("=================================================================".green);
    console.log("t193r ".blue + " server has been started, just go to " + host.toString().red + ":".red + port.toString().red);
    console.log("=================================================================".green);
    console.log('');
  });
});