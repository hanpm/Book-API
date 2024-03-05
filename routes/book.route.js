const express = require("express");
const router = express.Router();
const {getBooks, getBook, postBooks, updateBooks, deleteBooks, searchBooks, getStats} = require("../controllers/book.controller");

// GET method - get all books 
router.get("/", getBooks);

// GET method /books/{id} 
router.get("/:id([0-9a-f]{24})", getBook);

// POST method /books
router.post("/", postBooks);

// PUT method /books/{id}
router.put("/:id", updateBooks);

// DELETE method /books/{id} 
router.delete("/:id", deleteBooks);

//GET method /books/search?q={query}
router.get("/search", searchBooks);

// GET /books/stats
// Getting the total number of books, earliest/latest publication, list of books in ABC order, list of books by dates, date when the book was inputted into DB.  
router.get("/stats", getStats);

module.exports = router;