require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConnection")

// Connection to the MongoDB database 
dbConnection();

// Middleware for application 
app.use(express.json());
app.use(cors());

// Connection to port 
const PORT = process.env.PORT || 3000;

// Start the express server 
const app = express();


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});