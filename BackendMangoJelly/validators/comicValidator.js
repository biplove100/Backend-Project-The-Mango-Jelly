// validators/comicValidator.js

const Joi = require('joi');

// Define the validation schema for a comic book
const comicSchema = Joi.object({
    BookName: Joi.string().required(),
    AuthorName: Joi.string().required(),
    YearOfPublication: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    Price: Joi.number().positive().required(),
    Discount: Joi.number().min(0).max(100).default(0), // Assuming discount is a percentage
    NumberOfPages: Joi.number().integer().positive().required(),
    Condition: Joi.string().valid('new', 'used').required(),
    description: Joi.string().optional(),
    Genre: Joi.string().valid('sci-fi', 'war', 'family', 'soldier', 'friendship', 'love').required(),
});

// Validation function
const validateComic = (comic) => {
    return comicSchema.validate(comic);
};

module.exports = { validateComic };
