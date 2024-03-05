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

// GET method /books/{id} ([0-9a-f]{24})
app.get('/books/:id([0-9a-f]{24})', async(req, res) => {
    try {
        const {id} = req.params;
        console.log(req.params)
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


//GET method /books/search?q={query}
app.get('/books/search', async(req, res) => {
    try {
        const books = await Book.find({});
        const searchTerm = req.query.q;
        if (!searchTerm) {
            res.status(404).json({message: "Search term not found"});
        }
        else {
            // Find book based on title or author using filter é
            const searchResults = books.filter(book =>
                book.title.replace(/\s/g, "").includes(searchTerm.replace(/\s/g, "")) ||
                book.title.toLowerCase().replace(/\s/g, "").replace(/\./g, "").includes(searchTerm.toLowerCase().replace(/\s/g, "").replace(/\./g, "")) ||
                book.author.toLowerCase().replace(/\s/g, "").includes(searchTerm.toLowerCase().replace(/\s/g, ""))
            );   
            console.log("Search results: ", searchResults);

            res.status(200).json(searchResults);
        }
        
    } catch (error) {
        console.log("search error")
        res.status(500).json({message: error.message});
    }

});
    
// GET /books/stats 
// Getting the total number of books, earliest/latest publication, list of books in ABC order, list of books by dates, date when the book was inputted into DB.  
app.get('/books/stats', async(req, res) => {
    try {
        const titleAsc = {title: 1};
        const yearAsc = {publicationYear: 1};
        const timestampAsc = {createdAt: 1}
        
        const bookCount = await Book.countDocuments({});
        const sortedJsonByABC = await Book.find({}).sort(titleAsc);
        const sortedJsonByDates = await Book.find({}).sort(yearAsc);
        const sortedJsonByTimestamp = await Book.find({}).sort(timestampAsc);
        
        const lengthOfLibrary = bookCount;

        const bookListABCOrder = []; 
        const booksListDateOrder = []; 
        const booksListTimestamp = [];

        for (let i = 0; i < lengthOfLibrary; i++){
            let itemA = sortedJsonByABC[i].title;
            let itemB = sortedJsonByDates[i].title;
            let bookTitle = sortedJsonByTimestamp[i].title;
            let timestamp = sortedJsonByTimestamp[i].createdAt;

            bookListABCOrder.push(itemA);
            booksListDateOrder.push(itemB);
            booksListTimestamp.push({bookTitle, timestamp});
        };

        res.status(200).json({"Total Number of Books": bookCount, "Earliest publication": sortedJsonByABC[0], "Latest Publication": sortedJsonByABC[lengthOfLibrary-1], "Sorted books by ABC order": bookListABCOrder, "Sorted books by date in asc. order": booksListDateOrder, "Timestamp for when each book entered the library": booksListTimestamp});
        
    } catch (error) {
        console.log("Stats error");
        res.status(500).json({message: error.message});
    }
    
});



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});