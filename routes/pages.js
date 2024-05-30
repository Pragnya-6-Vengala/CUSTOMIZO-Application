var express = require('express');
var router = express.Router();
var helpers = require('../helpers');
var controllers = require('../controllers');
var middlewares = require('../middlewares');

/* GET home page. */
helpers.setupPageRoute(router, '/', [middlewares.user.requireLogin], controllers.pages.getHomePage)
helpers.setupPageRoute(router, '/login', [], controllers.pages.login)

helpers.setupPageRoute(router, '/app/user', [middlewares.user.requireLogin], controllers.pages.user)
helpers.setupPageRoute(router, '/app/user/request', [middlewares.user.requireLogin], controllers.pages.request)

helpers.setupPageRoute(router, '/app/reader', [middlewares.user.requireLogin], controllers.pages.reader)
helpers.setupPageRoute(router, '/app/reader/dashboard', [middlewares.user.requireLogin], controllers.pages.readerdashboard)

module.exports = router;
