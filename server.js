require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConnection");
const Book = require("./models/book.model");

// Connection to port 
const PORT = process.env.PORT || 3000;

// Start the express server 
const app = express();

// Connection to the MongoDB database 
dbConnection();

// Middleware for application 
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());


// routers 
// GET method /books 
app.get('/books', async(req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// GET method /books/{id}
app.get('/books/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: `${id} does not exist in DB.`});
    }
});


// POST method /books
app.post('/books', async(req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: "Failed to input book(s) into DB."})
    }
})

// PUT method /books/{id}
app.put('/books/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        if (!book) {
            return res.status(404).json({message: `Cannot find book for ${id}`});
        }
        else {
            const updatedBook = await Book.findById(id);
            res.status(200).json(updatedBook);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// DELETE method /books/{id}
app.delete('/books/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id, req.body);
        if (!book) {
            return res.status(404).json({message: `Cannot find book for ${id}`});
        }
        else {
            res.status(200).json({message: `Successfully deleted book for ${id}`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// GET method /books/search?q={query}
app.get('/books/search', function(req, res) {
    console.log("Title: ", req.query.title);
    console.log("Author: ", req.query.author);
    res.send();
});
// GET /books/stats 



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});