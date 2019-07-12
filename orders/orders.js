const express = require("express");
const app = express();
const axios =require("axios");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Load mongoose
const mongoose = require("mongoose");

//Create the model entity object
require("./Order");
const Order = mongoose.model("Order");

//connect to db
mongoose.connect("mongodb://eduonix:abc123...@localhost:27017/booksservice", () => {
    console.log("Our Database is connected");
});

var mysqlModel = require('mysql-model');
const detect = require('detect-port');

var mySqlPort = 3306;
var MyAppModel;

detect(mySqlPort, (err, _port) => {
    if (err) {
        console.log(err);
    }

    if (mySqlPort == _port) {
        console.log(`port: ${mySqlPort} was not occupied`);
        MyAppModel = mysqlModel.createConnection({
            host     : 'localhost',
            port: mySqlPort,
            user     : 'viper',
            password : 'Positron!',
            database : 'customermanagement',
        });

    } else {
        console.log(`port: ${mySqlPort} was occupied, try port: ${_port}`);
    }
});

app.get('/orders', (req, res) => {
    //We add a then to a promise(Book.find())
    Order.find().then((orders) => {
        console.log(orders);
        res.json(orders);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
});

app.get('/order/:id', (req, res) => {
    //We add a then to a promise(Book.find())
    Order.findById(req.params.id).then((order) => {
        if(order){
            // res.json(order);
            axios.get("http://localhost:5555/customer/"+order.CustomerID).then((response) =>{
                var orderObject = {
                    customerName: response.data.name,
                    bookTitle: ''
                };
                axios.get("http://localhost:4545/book/"+order.BookID).then((response) =>{
                    orderObject.bookTitle = response.data.title;
                    res.json(orderObject);
                })
            });
        }else{
            res.send("Invalid Order");
        }

    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
});

app.post("/order", (req, res) =>{

    var newOrder = {
        CustomerID: req.body.CustomerID,
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    };

    var order = new Order(newOrder);

    order.save().then(()=>{
        res.json(req.body);
        console.log("Order created with success")
    }).catch((err) =>{
        if(err){
            throw err;
        }
    });
    res.send("A new Order created with success")
});

app.listen(7777, ()=>{
    console.log("Orders services are up and running");
});