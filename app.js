'use strict'

const express = require('express');
const path    = require('path');
const dotenv  = require('dotenv');
const cookieParser = require('cookie-parser');
const i18n = require('i18n');
const session = require('express-session');

dotenv.config();

const app = express();
const pagesRouter = require('./routes');

app.set('view engine','pug');

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use('/', pagesRouter);

app.use(i18n.init);

i18n.configure({
    locales:['en', 'ru'],
    directory: __dirname + '/locales',
    indent: '\t',
    extension: '.json',
    defaultLocale: 'en',
    register: global
});

app.use(function(req, resp, next){
    if(req.cookies.lang){
        i18n.setLocale(req.cookies.lang);
    } else {
        i18n.setLocale(i18n.defaultLocale);
    }
    next();
});

app.use((req, resp, next) => {
    resp.status = 404;
    let errorCode = 404;
    let errorMessage;
    if(req.cookies.lang === 'en'){
        errorMessage = 'Page not found.';
    } else {
        errorMessage = 'Страница не найдена.';
    }
    resp.render('error.pug', {errorCode, errorMessage});
    next();
});

app.use((err, req, resp, next) => {
    resp.status = err.status || 500;
    let errorCode = err.status || 500;
    let errorMessage;
    if(req.cookies.lang === 'en'){
        errorMessage = 'Internal Server Error.';
    } else {
        errorMessage = 'Внутренняя ошибка сервера.';
    }
    resp.render('error.pug', {errorCode, errorMessage});
    next();
});

app.listen(3000);
