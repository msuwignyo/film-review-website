const express = require('express');
const router = express.Router();
const Controller = require('../controllers').UserController;

// function checkUser(req, res, next) {
//   if (req.session.UserId !== undefined) {
//     res.redirect('/');
//   } else {
//     next();
//   }
// }

router.get('/', (req, res) => res.render('login', { session: req.session }));

router.post('/', Controller.findUser);

module.exports = router;