const mongoose = require('mongoose');
var mysqlModel = require('mysql-model');

mongoose.model("Order", {
    CustomerID: {
        type: Number,
        required: true
    },
    BookID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
});