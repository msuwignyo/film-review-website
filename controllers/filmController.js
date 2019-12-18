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
  static addFilm(nextFilm) {
    const out = {};

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
        return UserLikesFilm.filmStatistics(filmId);
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

  static deleteFilm(filmId) {
    // hapus relasi di conjunction table
    UserLikesFilm.destroy({ where: { FilmId: filmId } })
      .then(() => {

        // baru hapus film-nya
        return Film.destroy({ where: { id: filmId } })
      })
      .then(() => {

        // terminal view
        View.success('Delete operation done...')
      })
      .catch((err) => View.error(err));
  }
}

module.exports = FilmController;