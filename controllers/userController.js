// TODO: Bayu
const Models = require('../models').User

class UserController {
    static formAddUser(req, res) {
        let htmlAttr = {
            title: "Add User",
            form: {
                name: "",
                username: "",
                password: "",
                email: "",
                role: "",
                button: "Add User"
            }
        }
        res.render('admin/formUser', { htmlAttr })
    }
    static findAllUser(req, res) {
        Models.findAll()
            .then(dataUser => {
                // console.log(dataUser)

                res.render('admin/listUser', { data: dataUser })
                // res.send(dataUser)
            })
            .catch(err => {
                res.send(err)

            })
    }
    static formEditUser(req, res) {
        Models.findOne({ where: { id: req.params.id } })
            .then(data => {
                let htmlAttr = {
                    title: "Edit User",
                    form: {
                        name: data.name,
                        username: data.dataValues.username,
                        password: data.dataValues.password,
                        email: data.dataValues.email,
                        role: data.dataValues.role,
                        button: "Edit User"
                    }
                }

                res.render('admin/formUser', { htmlAttr })
            })
    }
    static create(req, res) {
        Models.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
            .then(success => {
                res.redirect('/admin/listUser')

            })
            .catch(err => {
                res.send(err)

            })
    }
    static deleteUser(req, res) {
        Models.destroy({ where: req.params })
            .then(success => {
                res.redirect('/admin/listUser')

            })
            .catch(err => {

                res.sed(err)
            })
    }
}

module.exports = UserController;