// app.js

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');

// Import comic routes
const comicRoutes = require("./routes/comicRoutes");
// Import error handling middleware
const errorHandler = require("./middlewares/errorHandler");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Database connection
const MONGO_URL = "mongodb://127.0.0.1:27017/comicbook";
mongoose.connect(MONGO_URL)
    .then(() => console.log("CONNECTED TO DATABASE"))
    .catch(err => console.log(err));

// Use the comic routes
app.use("/comics", comicRoutes);

// Root route
app.get('/', (req, res) => {
    res.send("Welcome to the Comic Book Collection");
});

// Use the error handler middleware after all routes
app.use(errorHandler);

// Set up the server
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
