const { getBook } = require("./controllers/book.controller");
const Book = require("./models/book.model");

// Making mock req, res 
const req = {params: {id: '65e505573be2ff278a96c3ad'}};
const res = { status: jest.fn().mockReturnThis(), json: jest.fn()}


// Unit test 
describe("testing getBook function", () => {
    it("Book ID exists, return book information", async() => {

        const bookFromDB = await Book.findById('65e505573be2ff278a96c3ad');

        await getBook(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(bookFromDB);
    });

    it("Book ID doesn't exist, return error message", async() => {
        const message = "Book ID does not exist";
        Book.findById.mockRejectedValue(new Error(message));

        await getBook(req, res);
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: "Book ID does not exist in DB"});
    });
})
