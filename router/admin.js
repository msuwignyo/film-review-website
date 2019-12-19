const express = require('express')
const router = express.Router()
const Controller = require('../controllers').UserController
const ControllerMovie = require('../controllers').FilmController

router.get('/', (req, res) => { res.render('admin') })
router.get('/addUser', Controller.formAddUser)
router.post('/addUser', Controller.create)
router.get('/editUser/:id', Controller.formEditUser)
router.post('/editUser/:id', Controller.Edit)
router.get('/listUser', Controller.findAllUser)
router.get('/deleteUser/:id', Controller.deleteUser)
router.get('/addMovie', ControllerMovie.generateFormAdd)
router.post('/addMovie', ControllerMovie.addFilm)
router.get('/editMovie/:id', ControllerMovie.generateFormEdit)
router.get('/listMovie', ControllerMovie.showAllFilmsAdmin)
router.get('/deleteMovie/:id', ControllerMovie.deleteFilm)

module.exports = router