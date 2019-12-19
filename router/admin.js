const express = require('express')
const router = express.Router()
const Controller = require('../controllers').UserController

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
// router.get('/addUser', checkAdmin, Controller.formAddUser)
// router.post('/addUser', checkAdmin, Controller.create)
// router.get('/editUser/:id', checkAdmin, Controller.formEditUser)
// router.post('/editUser/:id', checkAdmin, Controller.Edit)
router.get('/listUser', checkAdmin, Controller.findAllUser)
// router.get('/deleteUser/:id', checkAdmin, Controller.deleteUser)

module.exports = router