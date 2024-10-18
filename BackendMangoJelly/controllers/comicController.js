// controllers/comicController.js

const ComicBook = require("../model/comic");
const { validateComic } = require("../validators/comicValidator");

// GET all comics (Index Route)
module.exports.getAllComics = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, sortBy = 'BookName' } = req.query;
        const sortOptions = {};
        sortOptions[sortBy] = 1; // Ascending order

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const totalComics = await ComicBook.countDocuments({});
        const allComics = await ComicBook.find({})
            .sort(sortOptions)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        res.render('index.ejs', {
            allComics,
            currentPage: pageNumber,
            totalComics,
            limit: limitNumber,
            sortBy
        });
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
};

// CREATE new comic (POST request)
module.exports.createComic = async (req, res, next) => {
    try {
        const { error } = validateComic(req.body.comics); // Validate the incoming data
        if (error) {
            throw { statusCode: 400, message: error.details[0].message }; // Return a meaningful error response
        }

        const newComics = new ComicBook(req.body.comics);
        await newComics.save();
        res.redirect("/comics");
    } catch (error) {
        next(error);
    }
};

// GET single comic (Show Route)
module.exports.getComicById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comic = await ComicBook.findById(id);
        if (!comic) {
            throw { statusCode: 404, message: 'Comic not found' }; // Custom error if comic not found
        }
        res.render("show.ejs", { comic });
    } catch (error) {
        next(error);
    }
};

// GET form for new comic
module.exports.getNewComicForm = (req, res) => {
    res.render("comic/new.ejs");
};

// GET form for editing comic
module.exports.getEditComicForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comics = await ComicBook.findById(id);
        if (!comics) {
            throw { statusCode: 404, message: 'Comic not found' };
        }
        res.render("comic/edit.ejs", { comics });
    } catch (error) {
        next(error);
    }
};

// UPDATE comic (PUT request)
module.exports.updateComic = async (req, res, next) => {
    try {
        const { error } = validateComic(req.body.comics); // Validate the incoming data
        if (error) {
            throw { statusCode: 400, message: error.details[0].message }; // Return a meaningful error response
        }

        const { id } = req.params;
        const updatedComic = await ComicBook.findByIdAndUpdate(id, { ...req.body.comics }, { new: true });
        if (!updatedComic) {
            throw { statusCode: 404, message: 'Comic not found' };
        }
        res.redirect("/comics");
    } catch (error) {
        next(error);
    }
};

// DELETE comic (DELETE request)
module.exports.deleteComic = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedComic = await ComicBook.findByIdAndDelete(id);
        if (!deletedComic) {
            throw { statusCode: 404, message: 'Comic not found' };
        }
        res.redirect("/comics");
    } catch (error) {
        next(error);
    }
};
