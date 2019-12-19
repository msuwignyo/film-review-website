const express = require('express');
const router = express.Router();
const Controller = require('../controllers').UserController

router.get('/', (req, res) => res.render('register', { session: req.session }));

router.post('/', Controller.createUser);

module.exports = router;