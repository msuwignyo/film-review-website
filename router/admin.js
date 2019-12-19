const express = require('express')
const router = express.Router()
const Controller = require('../controllers').UserController
const ControllerMovie = require('../controllers').FilmController

function checkAdmin(req, res, next) {
  if (req.session.UserId === undefined && req.session.role !== 'admin') {
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
router.get('/addMovie', checkAdmin, ControllerMovie.generateFormAdd)
router.post('/addMovie', checkAdmin, ControllerMovie.addFilm)
router.get('/editMovie/:id', checkAdmin, ControllerMovie.generateFormEdit)
router.post('/editMovie/:id', checkAdmin, ControllerMovie.updateFilm)
router.get('/listMovie', checkAdmin, ControllerMovie.showAllFilmsAdmin)
router.get('/deleteMovie/:id', checkAdmin, ControllerMovie.deleteFilm)
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin');
})

module.exports = router