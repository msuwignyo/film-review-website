const express = require('express')
const router = express.Router()
const Controller = require('../controllers').UserController

router.get('/', (req, res) => { res.render('admin') })
router.get('/addUser', Controller.formAddUser)
router.post('/addUser', Controller.create)
router.get('/editUser/:id', Controller.formEditUser)
router.get('/listUser', Controller.findAllUser)
router.get('/deleteUser/:id', Controller.deleteUser)
module.exports = router