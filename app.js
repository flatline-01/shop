'use strict'

const express = require("express");
const path    = require("path");
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const pagesRouter = require('./routes');

app.listen(3000);

app.set("view engine","pug");

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/', pagesRouter);
