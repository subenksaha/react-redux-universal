import express from 'express';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import exphbs from 'express-handlebars';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import request from 'request';
import webpack from 'webpack';
import rfs from 'rotating-file-stream';

import ServerConfig from 'server/config';
import console from 'server/libs/logger'; //overriding default console

import React from 'react';
import {Provider} from 'react-redux';
import clientRoutes from 'client/routes';
import configureStore from 'client/store/configureStore';
import { StaticRouter as Router, matchPath } from 'react-router';
import { renderToString } from 'react-dom/server';

import ClientApp from 'client/app';
import ClientConfig from 'client/webpack.development';

var staticRoutes = [];
function generateStaticRoutes(routes){
    routes.forEach(function(route){
        staticRoutes.push(route.path);
        if(route.routes && route.routes.length){
            generateStaticRoutes(route.routes);
        }
    })
}
generateStaticRoutes(clientRoutes);

var serverRoutes = require('server/routes');
var app = express();

var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        ifeq: function(a, b, options) {
            if (a === b) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        toJSON: function(object) {
            return JSON.stringify(object);
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(compression());

var accessLogDirectory = path.resolve(__dirname, './logs/access');
fs.existsSync(accessLogDirectory) || fs.mkdirSync(accessLogDirectory)
 
// create a rotating write stream 
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily 
  path: accessLogDirectory
})
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
    global.navigator = global.navigator || {};
    global.navigator.userAgent = req.headers['user-agent'] || 'all';
    req.isAuthenticated = function() {
        var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            return false;
        }
    };
    next();
});

if (app.get('env') === 'development') {
    var compiler = webpack(ClientConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: ClientConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/', serverRoutes);

app.get('*', (req, res) => {
    const match = staticRoutes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null);
    if (!match) {
        res.status(404).send(render('Not Found'));
        return;
    }
    let initialState = {};
    const store = configureStore(initialState);
    let html = renderToString(
        <Provider store={store}>
            <Router context={{}} location={req.url}>
                <ClientApp/>
            </Router>
        </Provider>
    );

    res.render('layouts/main',{
        html,
        title:ServerConfig.app.title
    });
});

// Production error handler
if (app.get('env') === 'production') {
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}
module.exports = app;