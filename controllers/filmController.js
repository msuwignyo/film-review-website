// TODO: Markus

const Film = require('../models').Film;
const User = require('../models').User;
const UserLikesFilm = require('../models').UserLikesFilm;
const View = require('../views/view');

class FilmController {

  static openHomePage(req, res) {
    FilmController.showAllFilms(res);
  }

  static openMovieDetailPage(req, res) {
    const filmId = req.params.id;
    FilmController.showOneFilm(filmId, res);
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
    const nextFilm = req.body
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

  static showOneFilm(filmId, res) {
    const out = {};

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
        return UserLikesFilm.filmStatistics(filAddmId);
      })
      .then((stats) => {
        out.stats = stats;

        // terminal view
        View.success(out);

        // browser view
        res.render('movie-detail', { out });
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
        res.render('admin/listMovie', { out });
        // res.send(out);
      })
      .catch((err) => View.error(err));
  }

  static showAllFilms(res) {
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
        res.render('homepage', { out });
        // res.send(out);
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
    res.render('admin/formMovie', { htmlAttr })
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
        res.render('admin/formMovie', { htmlAttr })
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