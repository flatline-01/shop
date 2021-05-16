'use strict'

const express = require("express");
const path    = require("path");

// подключаем переменные из файла
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const pagesRouter = require('./routes'); // подключаем наши роуты

app.listen(3000);

app.set("view engine","pug");

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));
app.use('/', pagesRouter);

//#{category.goods[`${value['id']}`]["name"]}
