const FilmController = require('../controllers').FilmController;
const express = require('express');
const router = express.Router();

// home page
router.get('/', FilmController.openHomePage);

// show one movie in details
router.get('/:id', FilmController.openMovieDetailPage);

module.exports = router;