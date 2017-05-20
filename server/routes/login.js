var config = require('server/config');
var express = require('express');
var router = express.Router();
var models = require('server/models');
var jwt = require('jsonwebtoken');
var moment = require('moment');

function generateToken(client) {
    var payload = {
        iss: config.keys.app.domain,
        sub: client.id,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, config.keys.jwt.secret);
}

router
    .route('/')
    .post(function(req, res, next) {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.sanitize('email').normalizeEmail({ remove_dots: false });

        var errors = req.validationErrors();

        if (errors) {
            return res.status(400).send(errors);
        }

        models.client.findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then(function(client) {
                if (client && client.id) {
                    if (client.isValidPassword(req.body.password)) {
                        res.send({ token: generateToken(client), client: client });
                    } else {
                        return res.status(400).send('client/password did not match');
                    }
                } else {
                    return res.status(400).send('client not found');
                }
            })
            .catch(function(err) {
                next(err);
            });

    })

module.exports = router;