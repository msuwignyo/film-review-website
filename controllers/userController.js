const Models = require('../models').User
const UserLikeFilms = require('../models').UserLikesFilm
const viewJs = require('../views/view')
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
        Models.findAll({ order: [["id", "asc"]] })
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
    static Edit(req, res) {
        req.body.id = Number(req.params.id)
        Models.update(req.body, { where: req.params })
            .then(success => {
                res.redirect('/admin/listUser')
            })
            .catch(err => {
                res.send(err)
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
        UserLikeFilms.destroy({ where: { UserId: req.params.id } })
            .then(() => {

                // baru hapus film-nya
                return Models.destroy({ where: req.params })
            })
            .then(() => {

                // terminal view
                // View.success('Delete operation done...')
                //browser
                res.redirect('/admin/listUser')
            })
            .catch((err) => View.error(err));
    }

    static findAdmin(req, res) {
        Models.findOne({ where: req.body })
            .then((user) => {

                // res.send(user.role);
                if (user.role == 'admin') {
                    req.session.UserId = user.id;
                    // res.send(req.session);
                    res.redirect('/admin/listUser');
                } else {
                    res.redirect('/admin');
                }
            })
            .catch((err) => res.send(`Error: ${err}`));
    }
}

module.exports = UserController;