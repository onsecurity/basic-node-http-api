const CONFIG = require('../config');
const express = require('express')
const expressJwt = require('express-jwt');
const { validationResult } = require('express-validator');
const { logHttp } = require('../log/log');

const app = express();
app.use(express.json());
app.use(logHttp);
// add auth
if (CONFIG.httpAuth) {
    app.use(expressJwt({ secret: CONFIG.httpAuthSecret, algorithms: [CONFIG.httpAuthAlgorithm]}));
    app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send('Unauthorized');
        }
    });
}

// parallel validator
const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

module.exports = {app, validate};