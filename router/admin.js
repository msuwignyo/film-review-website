const express = require('express')
const router = express.Router()
const Controller = require('../controllers').UserController
const ControllerMovie = require('../controllers').FilmController

// middleware that is specific to this router
// function timeLog(req, res, next) {
//   console.log(`=======================================`);
//   console.log(`Middleware Admin`);
//   if (req.session.currUserId === undefined) {
//     next();
//   } else {
//     req.session.currUserId = req.body.id;
//   }
//   console.log(`=======================================`);
// }

function checkAdmin(req, res, next) {
  // res.send(req.session)
  // console.log(req.session.id);
  if (req.session.UserId === undefined) {
    res.redirect('/admin');
  } else {
    next();
  }
}

// res.render('admin')
router.get('/', (req, res) => { res.render('admin') });
router.post('/', Controller.findAdmin);
router.get('/addUser', checkAdmin, Controller.formAddUser)
router.post('/addUser', checkAdmin, Controller.create)
router.get('/editUser/:id', checkAdmin, Controller.formEditUser)
router.post('/editUser/:id', checkAdmin, Controller.Edit)
router.get('/listUser', checkAdmin, Controller.findAllUser)
router.get('/deleteUser/:id', checkAdmin, Controller.deleteUser)
router.get('/addMovie', ControllerMovie.generateFormAdd)
router.post('/addMovie', ControllerMovie.addFilm)
router.get('/editMovie/:id', ControllerMovie.generateFormEdit)
router.post('/editMovie/:id', ControllerMovie.updateFilm)
router.get('/listMovie', ControllerMovie.showAllFilmsAdmin)
router.get('/deleteMovie/:id', ControllerMovie.deleteFilm)

module.exports = router