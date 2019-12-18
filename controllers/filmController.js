// TODO: Markus

const Film = require('../models').Film;
const User = require('../models').User;
const UserLikesFilm = require('../models').UserLikesFilm;
const View = require('../views/view');

class FilmController {
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

  static showOneFilm(filmId) {
    const out = {};

    // cari film berdasarkan film ID
    Film.findByPk(filmId, { include: [User] })
      .then((film) => {
        out.id = film.id;
        out.name = film.name;
        out.poster = film.poster;
        out.description = film.description;
        out.trailer = film.trailer;
        out.totalUsers = film.dataValues.Users.length;

        // cari siapa yang like film tersebut
        return UserLikesFilm.findAll({
          where: { FilmId: filmId, status: true }
        });
      })
      .then((userLikes) => {
        out.totalLikes = userLikes.length;

        // cari siapa yang dislike film tersebut
        return UserLikesFilm.findAll({
          where: { FilmId: filmId, status: false }
        });
      })
      .then((userDislikes) => {
        out.totalDisLikes = userDislikes.length;

        // terminal view
        View.success(out);
      })
      .catch((err) => View.error(err));
  }

  static showAllFilms() {
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
    // hapus relasi di conjungtion table
    UserLikesFilm.destroy({ where: { FilmId: filmId } })
      .then(() => {

        // baru hapus film-nya
        return Film.destroy({ where: { id: filmId } })
      })
      .then(() => View.success('Delete operation done...'))
      .catch((err) => View.error(err));
  }
}

module.exports = FilmController;