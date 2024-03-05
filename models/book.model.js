const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: {
        type: String, 
        required: [true, "Please enter a book title"]
    },
    author: {
        type: String, 
        required: [true, "Please enter author first name and last name"]
    },
    publicationYear: {
        type: Number, 
        required: [true, "Please enter publication year"]
    },
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;