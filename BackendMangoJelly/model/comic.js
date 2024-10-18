//Creating the model for comic books and then will export the schema in app.js file and will use it for CRUD operations
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comicBookSchema = new Schema({
    BookName:{
        type: String,
        required: true
    },
    AuthorName:{
        type: String,
        required: true
    },
    YearOfPublication:{
        type: Number,
        required: true
    },
    Price:{
        type: Number,
        required: true
    },
    Discount:{
        type: Number,
        Default: 0
    },
    NumberOfPages:{
        type: Number,
        required: true
    },
    Condition:{
        type: String,
        enum: ['new', 'used'],
        required: true
    },
    description:{
        type: String,
        default: "Comic Book"
    },
    Genre:{
        type: String,
        enum: ['sci-fi', 'war', 'family', 'soldier', 'friendship', 'love'],
        required: true
    }
});


const ComicBook = mongoose.model('ComicBook', comicBookSchema);
module.exports = ComicBook;