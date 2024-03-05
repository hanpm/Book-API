const express = require("express");
const router = express.Router();
const {getBooks, getBook, postBooks, updateBooks, deleteBooks, searchBooks, getStats} = require("../controllers/book.controller");

// GET method 
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
router.get("/stats", getStats);

module.exports = router;