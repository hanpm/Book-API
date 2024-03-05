require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConnection");
const bookRoute = require("./routes/book.route");

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


// Routes 
app.use("/books", bookRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});