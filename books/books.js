// Load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Load mongoose
const mongoose = require("mongoose");

//Create the model entity object
require("./Book");
const Book = mongoose.model("Book");

//connect to db
mongoose.connect("mongodb://eduonix:abc123...@localhost:27017/booksservice", () => {
    console.log("Our Database is connected");
});

app.get('/', (req, res) => {
    res.send("This is our main endpoint for the books service!");
});

app.get('/books', (req, res) => {
    //We add a then to a promise(Book.find())
    Book.find().then((books) => {
        console.log(books);
        res.json(books);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
});

//Create functionnality
app.post("/book", (req, res) => {
    console.log(req.body);
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    };

    var book = new Book(newBook);
    book.save().then(() => {
        console.log("New book create");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
    res.send("A new book created with success")
});

app.get("/book/:id", (req, res) => {
    //To get id
    Book.findById(req.params.id).then((book) => {

        if (book) {
            res.json(book);
        } else {
            res.sendStatus(404);
        }

    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});


app.delete("/book/:id", (req, res) => {
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send("Book removed with success")
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

app.put('/book/:id', (req, res) => {
    var bookToUpdate;
    Book.findById(req.params.id).then((book) => {
        if (book) {
            bookToUpdate = book;
        } else {
            res.sendStatus(404);
        };
        console.log(book);
    });

    bookToUpdate = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    };
    // bookToUpdate.author = req.body.author;
    // bookToUpdate.numberPages = req.body.numberPages;
    // bookToUpdate.numberPages = req.body.numberPages;
    console.log(req.body);

    var book = new Book(bookToUpdate);
    book.findOneAndUpdate().then(() => {
        console.log("the bookToUpdate is updated");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
    res.send("The bookToUpdate is updated with success")
});

app.listen(4545, () => {
    console.log("Books service is up and running");
});