const express = require("express");

const router = express.Router();

const Book = require("../models/book");

// CRUD Handlers
// READ method to return all books
router.get("/books", (req, res) => {
    Book.find({}).then((books) => {
        res.send(books);
    }).catch((err) => {
        res.status(500).send(err);
    })
})

// POST
router.post("/books", (req, res) => {
    // filtering to get only required fields and remove unnecessary ones
    console.log(req.body);
    const { title, author, description, isbn, categories, notes } = req.body;

    // using create method on the book object passing request's body
    Book.create(req.body).then((book) => {
        console.log(book);
        res.status(201).send({ status: "success" });
    }).catch((err) => {
        res.status(400).send(err);
    })
})

// PUT
router.put("/books", (req, res) => {
    // extract param from the request
    const { _id } = req.query;

    console.log(req.body);

    // checking if the put request has _id
    if (_id === undefined) {
        return res.status(400).send({ message: "?_id required" });
    }

    Book.findByIdAndUpdate(_id, req.body).then(book => {
        if (!book) {
            return res.status(404).send({ message: "no book with that _id found update" });
        }
        res.send({ status: "success" });
    })
        .catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
})


// DELETE using id param
router.delete("/books", (req, res) => {
    // extract param from the request
    const { _id } = req.query;

    // checking if the put request has _id
    if (_id === undefined) {
        return res.status(400).send({ message: "?_id required" });
    }

    Book.findByIdAndDelete(_id).then(book => {
        if (!book) {
            return res.status(404).send({ message: "no book with that _id found delete" });
        }
        res.send({ status: "success" });
    }).catch(err => {
        res.status(500).send(err);
        console.log(err);
    })
})

module.exports = router;


