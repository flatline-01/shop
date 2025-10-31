'use strict'

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const i18n = require('i18n');
const session = require('express-session');

dotenv.config();

const app = express();
const pagesRouter = require('./routes');

i18n.configure({
    locales: ['en', 'ru'], 
    directory: __dirname + '/locales',
    indent: '\t',
    extension: '.json',
    defaultLocale: 'en',
    register: global,
    cookie: 'lang',
    queryParameter: 'lang'
});

app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

app.use(i18n.init);

app.use((req, res, next) => {
    if (req.cookies && req.cookies.lang && i18n.locales && i18n.locales.includes(req.cookies.lang)) {
        i18n.setLocale(req, req.cookies.lang);
    } else if (req.i18n && !req.i18n.locale) { 
        i18n.setLocale(req, i18n.defaultLocale);
    }
    next();
});

app.use('/', pagesRouter);

app.use((req, res, next) => {
    res.status(404);
    res.render('error', {
        errorCode: 404,
        errorMessage: (req.i18n && req.i18n.__('Page not found.')) || 'Page not found.'
    });
});

app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err); 
    res.status(err.status || 500);
    res.render('error', {
        errorCode: err.status || 500,
        errorMessage: (req.i18n && req.i18n.__('Internal Server Error.')) || 'Internal Server Error.'
    });
});

app.listen(3000);