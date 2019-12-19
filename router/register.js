const express = require('express');
const router = express.Router();
const Controller = require('../controllers').UserController

router.get('/', (req, res) => res.render('register'));

router.post('/', Controller.createUser);

module.exports = router;