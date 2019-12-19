// TODO: Markus

const Film = require('../models').Film;
const User = require('../models').User;
const UserLikesFilm = require('../models').UserLikesFilm;
const View = require('../views/view');


class FilmController {
  static logout(req, res) {
    // req.session.destroy();
    res.send('fuck');
  }

  static userLikeFilm(req, res) {
    // console.log(req.session.UserId);
    UserLikesFilm
      .create({
        UserId: req.session.UserId,
        FilmId: req.params.id,
        status: true
      })
      .then(() => res.redirect(`/movie/${req.params.id}`))
      .catch((err) => res.send(err));
  }

  static userDislikeFilm(req, res) {
    UserLikesFilm
      .create({
        UserId: req.session.UserId,
        FilmId: req.params.id,
        status: false
      })
      .then(() => res.redirect(`/movie/${req.params.id}`))
      .catch((err) => res.send(err));
  }

  static openHomePage(req, res) {
    FilmController.showAllFilms(req, res);
  }

  static openMovieDetailPage(req, res) {
    // const filmId = req.params.id;
    FilmController.showOneFilm(req, res);
  }

  /**
   * Contoh output:
   * {
   *    id: 2,
   *    name: 'Skyfall',
   *    psoter: null,
   *    description: 'lorem ipsum'
   *    trailer: 'www.loremipsum.com'
   * }
   * 
   * @param {object} nextFilm 
   */
  static addFilm(req, res) {
    const out = {};
    req.body.poster = req.file.filename
    const nextFilm = req.body
    // res.send(req.file.filename)
    // masukkin film ke dalam database
    Film.create(nextFilm)
      .then((newFilm) => {
        out.id = newFilm.id;
        out.name = newFilm.name;
        out.poster = newFilm.poster;
        out.description = newFilm.description;
        out.trailer = newFilm.trailer;

        // terminal view
        View.success(out);
        //ejs
        res.redirect('/admin/listMovie')
      })
      .catch((err) => View.error(err));
  }

  /**
   * Contoh output:
   * {
   *    id: 2,
   *    name: 'Skyfall',
   *    poster: null,
   *    description: 'lorem ipsum'
   *    trailer: 'www.loremipsum.com'
   *    stats: { totalLikes: 1, totalDislikes 1, totalUsersReacted: 2 }
   * }
   * 
   * @param {integer} filmId
   */

  static showOneFilm(req, res) {
    const out = {};

    const filmId = req.params.id
    // cari film berdasarkan film ID
    Film.findByPk(filmId, { include: [User] })
      .then((film) => {
        if (film === null) throw 'ID FILM TIDAK ADA';
        out.id = film.id;
        out.name = film.name;
        out.poster = film.poster;
        out.description = film.description;
        out.trailer = film.trailer;

        // cari data statistik-nya:
        return UserLikesFilm.filmStatistics(filmId);
      })
      .then((stats) => {
        out.stats = stats;

        // terminal view
        View.success(out);

        // browser view
        // res.send(req.session);
        res.render('movie-detail', { out, session: req.session });
      })
      .catch((err) => View.error(err));
  }

  static showAllFilmsAdmin(req, res) {
    const out = [];

    // cari semua film
    Film.findAll()
      .then((allFilms) => {
        allFilms.forEach((film) => {
          out.push({
            id: film.id,
            name: film.name,
            poster: film.poster,
            description: film.description,
            trailer: film.trailer
          })
        });

        // terminal view
        View.success(out);

        // browser view
        res.render('admin/listMovie', { out, session: req.session });
        // res.send(out);
      })
      .catch((err) => View.error(err));
  }

  static showAllFilms(req, res) {
    const out = [];

    // cari semua film
    Film.findAll()
      .then((allFilms) => {
        allFilms.forEach((film) => {
          out.push({
            id: film.id,
            name: film.name,
            poster: film.poster,
            description: film.description,
            trailer: film.trailer
          })
        });

        // terminal view
        View.success(out);

        // browser view
        res.render('homepage', { out, session: req.session });
        // res.send(req.session);
      })
      .catch((err) => View.error(err));
  }

  static updateFilm(filmId, newValues) {
    const out = {};

    // update the film
    Film.update(newValues, { where: { id: filmId } })
      .then(() => {

        // cari film yg sudah diupdate
        return Film.findByPk(filmId);
      })
      .then((film) => {
        out.id = film.id;
        out.name = film.name;
        out.poster = film.poster;
        out.description = film.description;
        out.trailer = film.trailer;

        // terminal view
        View.success(out);
      })
  }
  static updateMov(req, res) {
    // console.log(req.body)
    // console.log(req.session)
    Film.update(req.body, { where: { id: req.params.id } })
      .then(success => {
        res.redirect('/admin/listMovie')
      })
      .catch(err => {
        res.send(err)
      })
  }
  static generateFormAdd(req, res) {
    let htmlAttr = {
      title: "Add Movie",
      form: {
        name: "",
        desc: "",
        poster: "",
        trailer: "",
        button: "Add Movie"
      }
    }
    res.render('admin/formMovie', { htmlAttr, session: req.session })
  }
  static generateFormEdit(req, res) {
    Film.findOne({ where: req.params })
      .then(dataFilm => {
        let htmlAttr = {
          title: "Edit Movie",
          form: {
            name: dataFilm.name,
            desc: dataFilm.description,
            poster: "",
            trailer: dataFilm.trailer,
            button: "Edit Movie"
          }
        }
        res.render('admin/formMovie', { htmlAttr, session: req.session })
      })
  }

  static deleteFilm(req, res) {
    const filmId = req.params.id
    // hapus relasi di conjunction table
    UserLikesFilm.destroy({ where: { FilmId: filmId } })
      .then(() => {

        // baru hapus film-nya
        return Film.destroy({ where: { id: filmId } })
      })
      .then(() => {

        // terminal view
        View.success('Delete operation done...')
        //browser
        res.redirect('/admin/listMovie')
      })
      .catch((err) => View.error(err));
  }
}

module.exports = FilmController;