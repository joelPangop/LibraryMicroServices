const mongoose = require("mongoose");

//Mapping model with db table

mongoose.model("Book", {

    //Model name is Book and its attributes: Title, author, numbers, publisher

    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberPages: {
        type: Number,
        require:false
    },
    publisher:{
        type: String,
        require:false
    }

});