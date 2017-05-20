var config = require('server/config');
var express = require('express');
var router = express.Router();
var models = require('server/models');
var console = require('server/libs/logger');

router
    .route('/')
    .get(function(req, res, next) { //product list route
        var page = req.query.page || 1;
        models
            .product
            .findAll({
                limit: 10,
                offset: (page - 1) * 10
            })
            .then(function(products) {
                res.json(products);
            })
            .catch(function(err) {
                console.error(err);
                next(err);
            });
    })
    .post(function(req, res, next) { //product create route
        req.checkBody({
            name: {
                notEmpty: true,
                errorMessage: 'Product name can not be empty'
            },
            description: {
                notEmpty: true,
                errorMessage: 'Product description can not be empty'
            },
            cost: {
                notEmpty: true,
                errorMessage: 'Product cost can not be null',
            },
            status: {
                notEmpty: true,
                errorMessage: 'Product status can not be empty'
            }
        });
        var errors = req.validationErrors();
        if (errors) {
            console.error(errors);
            return res.status(400).send(errors);
        }
        models
            .product
            .create({
                name: req.body.name,
                description: req.body.description,
                cost: parseFloat(req.body.cost, 10),
                status: req.body.status
            })
            .then(function(product) {
                res.json(product);
            })
            .catch(function(err) {
                console.error(err);
                next(err);
            });
    })

router
    .use('/', require('./other'));

module.exports = router;