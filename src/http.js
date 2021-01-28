const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const { log } = require('./log/log');
const CONFIG = require('./config');
const { app, validate } = require('./http/expressBootstrap');

module.exports = new function() {
    app.get('/endpoint', validate([
        // validation example - docs: https://express-validator.github.io/docs/index.html
        body('example').isString().optional()
    ]), (req, res) => {
        // logging example - docs: https://github.com/pinojs/pino/tree/185dc159166d8d31471a31532fede220d5a8d588
        req.log.info('Foobar');

        return res.json({foo: 'bar'});
    });

    this.start = function() {
        // logging example - docs: https://github.com/pinojs/pino/tree/185dc159166d8d31471a31532fede220d5a8d588
        log.debug('Starting HTTP on port ' + CONFIG.httpPort);
        if (CONFIG.httpAuth) {
            log.debug('HTTP auth enabled with with secret ' + CONFIG.httpAuthSecret);
            log.debug('HTTP auth access token: ' + jwt.sign({}, CONFIG.httpAuthSecret, {algorithm: CONFIG.httpAuthAlgorithm}));
        } else {
            log.debug('HTTP auth disabled');
        }
        app.listen(CONFIG.httpPort);
        log.info('HTTP listening on ' + CONFIG.httpPort);
    };
};