const mongoose = require("mongoose");

const dbConnection = () => {
    const connectionParams = {useNewUrlParser: true};
    mongoose.connect(process.env.DB, connectionParams);
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

