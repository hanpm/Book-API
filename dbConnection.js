const mongoose = require("mongoose");


const dbConnection = () => {
    mongoose.connect(process.env.DB);
    mongoose.connection.on("connected", () => {
        console.log("Succesfully connected to database!");
    });
    mongoose.connection.on("error", (e) => {
        console.log("Database connection failed. \nError: ", e);
    });
    mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from the database.");
    })
};
module.exports = dbConnection;

