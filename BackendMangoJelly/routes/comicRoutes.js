// routes/comicRoutes.js

const express = require("express");
const router = express.Router();
const comicController = require("../controllers/comicController");

// Route to get all comics
router.get("/", comicController.getAllComics);

// Route to create a new comic (POST request)
router.post("/", comicController.createComic);

// Route to get the new comic form
router.get("/new", comicController.getNewComicForm);

// Route to get a single comic by ID (Show Route)
router.get("/:id", comicController.getComicById);

// Route to get the edit comic form
router.get("/:id/edit", comicController.getEditComicForm);

// Route to update comic by ID (PUT request)
router.put("/:id", comicController.updateComic);

// Route to delete a comic by ID (DELETE request)
router.delete("/:id", comicController.deleteComic);

module.exports = router;
