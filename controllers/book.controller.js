const Book = require("../models/book.model");

/**
 * Retrieve details of a book by ID.
 * 
 * @param {object} req - The request object containing the book ID in params.
 * @param {object} res - The response object to send back the book details.
 * @returns {object} JSON object containing the book details.
 * @throws {object} JSON object containing error message if the book retrieval fails.
 */
const getBook = async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: `${id} does not exist in DB.`});
    }
};

/**
 * Getting book's information.
 * 
 * @param {object} req - The request object asking for books from DB.
 * @param {object} res - The response object to send back all the books or a select range of books within page or limit.
 * @returns {object} JSON object containing all the books in range of page or limit.
 * @throws {object} JSON object containing error message if the book(s) cannot be found.
 */
const getBooks = async(req, res) => {
    try {
        // default page = 1
        const page = parseInt(req.query.page) || 1;
        // default limit = 5
        const limit = parseInt(req.query.limit) || 5;

        const books = await Book.find({});

        if (page === undefined && limit === undefined) {
            res.status(200).json(books);
        }
        else {
            const paginatedData = paginatedJson(books, page, limit);
            res.status(200).json(paginatedData);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

/**
 * Input book's information.
 * 
 * @param {object} req - The request object containing book details in body.
 * @param {object} res - The response object to send back the updated book.
 * @returns {object} JSON object containing the book information.
 * @throws {object} JSON object containing error message if the book can't be inputted in MongoDB
 */
const postBooks = async(req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: "Failed to input book(s) into DB."})
    }
};


/**
 * Update a book's information.
 * 
 * @param {object} req - The request object containing book ID in params and updated book details in body.
 * @param {object} res - The response object to send back the updated book.
 * @returns {object} JSON object containing the updated book information.
 * @throws {object} JSON object containing error message if the update fails.
 */
const updateBooks = async(req, res) => {
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
};

/**
 * Delete a book by ID.
 * 
 * @param {object} req - The request object containing the book ID in params.
 * @param {object} res - The response object to send back the success message.
 * @returns {object} JSON object containing success message upon deletion.
 * @throws {object} JSON object containing error message if the deletion fails.
 */
const deleteBooks = async(req, res) => {
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
};


/**
 * Search books by title or author.
 * 
 * @param {object} req - The request object containing the search query and pagination parameters.
 * @param {object} res - The response object to send back the search results.
 * @returns {object} JSON object containing the search results.
 * @throws {object} JSON object containing error message if the search fails.
 */
const searchBooks = async(req,res) => {
    try {
        // default page = 1
        const page = parseInt(req.query.page) || 1;
        // default limit = 5
        const limit = parseInt(req.query.limit) || 10;

        const searchTerm = req.query.q;
        const books = await Book.find({});
        
        if (!searchTerm) {
            res.status(404).json({message: "Search term not found"});
        }
        else {
            // Find book based on title or author using filter
            if (page === undefined && limit === undefined) {
                const searchResults = books.filter(book =>
                    book.title.replace(/\s/g, "").includes(searchTerm.replace(/\s/g, "")) ||
                    book.title.toLowerCase().replace(/\s/g, "").replace(/\./g, "").includes(searchTerm.toLowerCase().replace(/\s/g, "").replace(/\./g, "")) ||
                    book.author.toLowerCase().replace(/\s/g, "").includes(searchTerm.toLowerCase().replace(/\s/g, ""))
                );   
            
                res.status(200).json(searchResults);
            }
            else {
                const paginatedData = paginatedJson(books, page, limit);
                const searchResults = paginatedData.results.filter(book =>
                    book.title.replace(/\s/g, "").includes(searchTerm.replace(/\s/g, "")) ||
                    book.title.toLowerCase().replace(/\s/g, "").replace(/\./g, "").includes(searchTerm.toLowerCase().replace(/\s/g, "").replace(/\./g, "")) ||
                    book.author.toLowerCase().replace(/\s/g, "").includes(searchTerm.toLowerCase().replace(/\s/g, ""))
                );   
            
            res.status(200).json(searchResults);
        }
    } 
    } catch (error) {
        console.log("search error")
        res.status(500).json({message: error.message});
    }
};

/**
 * Retrieve statistics related to the library.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object to send back the library statistics.
 * @returns {object} JSON object containing various library statistics.
 * @throws {object} JSON object containing error message if the statistics retrieval fails.
 */
const getStats = async(req, res) => {
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

        res.status(200).json({
        "Total Number of Books": bookCount,
        "Earliest publication": sortedJsonByABC[0],
        "Latest Publication": sortedJsonByABC[lengthOfLibrary-1],
        "Sorted books by ABC order": bookListABCOrder,
        "Sorted books by date in asc. order": booksListDateOrder,
        "Timestamp for when each book entered the library": booksListTimestamp});
        
    } catch (error) {
        console.log("Stats error");
        res.status(500).json({message: error.message});
    }  
};

/**
 * Paginate an array of books based on given page and limit.
 * 
 * @param {array} books - Array of books to paginate.
 * @param {number} page - Current page number.
 * @param {number} limit - Number of items per page.
 * @returns {object} JSON object containing paginated results with next and previous page information.
 */ 
const paginatedJson = (books, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = (page * limit);
    const results = {};

        if(endIndex < books.length) {
            results.next = {
                page: page + 1,
                limit: limit
            };     
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            } 
        }
        results.results = books.slice(startIndex, endIndex);
        return results;
    };


module.exports = {
    getBooks,
    getBook, 
    postBooks,
    updateBooks, 
    deleteBooks, 
    searchBooks, 
    getStats, 
};