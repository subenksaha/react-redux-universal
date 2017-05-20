var config = require('server/config');
var express = require('express');
var router = express.Router();
var models = require('server/models');
var console = require('server/libs/logger');

router
    .route('/:id')
    .get(function(req, res, next) { //single product view route
        models
            .product
            .findOne({
                where: {
                    id: req.params.id,
                }
            })
            .then(function(product) {
                res.json(product);
            })
            .catch(function(err) {
                console.error(err);
                next(err);
            })
    })
    .put(function(req, res, next) { //product update route
        if (req.params.id == req.body.id) {
            var body = req.body;
            delete body.id;
            models
                .product
                .update(body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(function(json) {
                    body.id = req.params.id;
                    res.json(body);
                })
                .catch(function(err) {
                    console.error(err);
                    next(err);
                })
        } else {
            next(new Error('Product id mismatch'));
        }
    })
    .delete(function(req, res, next) { //product delete route
        if (req.params.id == req.body.id) {
            var body = req.body;
            delete body.id;
            models
                .product
                .destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(function(json) {
                    res.sendStatus(200);
                })
                .catch(function(err) {
                    console.error(err);
                    next(err);
                })
        } else {
            next(new Error('Product id mismatch'));
        }
    })

module.exports = router;