'use strict'

const express = require('express');
const path    = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const pagesRouter = require('./routes');

app.set('view engine','pug');

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', pagesRouter);

app.use((req, resp, next) => {
    resp.status = 404;
    let errorCode = 404;
    let errorMessage = 'Page not found.';
    resp.render('error.pug', {errorCode, errorMessage});
    next();
});

app.use((err, req, resp, next) => {
    resp.status = err.status || 500;
    let errorCode = err.status || 500;
    let errorMessage = 'Internal Server Error.';
    resp.render('error.pug', {errorCode, errorMessage});
    next();
});

app.listen(3000);
