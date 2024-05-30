var express = require('express');
var router = express.Router();
var helpers = require('../helpers');
var apiRouter = require('./api');
var pageRouter = require('./pages');
var middlewares = require('../middlewares');

router.options('/api', middlewares.cors.cors);

router.use('/api', middlewares.cors.corsWithOptions, apiRouter);
router.use('/', pageRouter);

/**
 * @description Handling the 404 pages (not found pages)
 */
router.get('/*', function (req, res) {
    helpers.handleNotFoundError('Not found!', res);
});

module.exports = router;
