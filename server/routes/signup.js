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
        req.assert('name', 'Name cannot be blank').notEmpty();
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.sanitize('email').normalizeEmail({ remove_dots: false });

        var errors = req.validationErrors(true);

        if (errors) {
            return res.status(400).send(errors);
        }

        models.client.create({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: req.body.password
            })
            .then(function(client) {
                res.send({ token: generateToken(client), client: client });
            })
            .catch(function(err) {
                next(err);
            });

    })

module.exports = router;