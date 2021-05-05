'use strict'

const mysql   = require("mysql");
const express = require("express");
const path    = require("path");


const app = express();

app.listen(3000);

app.set("view engine","pug");

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname,"public")));



const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123312WX#A45",
    database: "shop"
});
connection.connect(function(err){
    if(err) return console.log(err.message);
});

app.get("/", function(req, resp){

    connection.query("SELECT * FROM goods", function (err, result){
            if(err) throw err;

            let goods = {};

            for(let i = 0; i < result.length; i++){
                goods[result[i]["id"]] = result[i];
            }

            const obj = JSON.parse(JSON.stringify(goods));

            resp.render('main.pug', {
                goods: JSON.parse(JSON.stringify(goods))
            });
    });
});


app.get("/category", function(req, resp){
    let categoryId = req.query.id;

    let category = new Promise(function(resolve, reject){
        connection.query(
            "SELECT * FROM category WHERE id=" + categoryId,
            function(err, result){
                if(err) reject(err);
                resolve(result);
            }
        );
    });

    let goods = new Promise(function(resolve, reject){
        connection.query(
            "SELECT * FROM goods WHERE category=" + categoryId,
            function(err, result){
                if(err) reject(err);
                resolve(result);
            }
        );
    });

    Promise.all([category, goods]).then(function(value){
        resp.render("category.pug", {
            category: JSON.parse(JSON.stringify(value[0])),
            goods: JSON.parse(JSON.stringify(value[1]))
        });
    });
});


app.get("/product", function(req, resp){
    let productId = req.query.id;

    let product = new Promise(function(resolve, reject){
        connection.query(
            "SELECT * FROM goods WHERE id=" + productId,
            function(err, result){
                if(err) reject(err);
                resolve(result);
            }
        );
    }).then(function(value){
        resp.render("product.pug", {
           product: JSON.parse(JSON.stringify(value[0]))
        });
    });
});

app.get("/cartCheckout", function(req, resp){
    resp.render("cartCheckout.pug");
});





