class View {
  static success(obj) {
    console.log('SUCCESS -------');
    console.table(obj);
  }

  static error(err) {
    console.log('ERROR -------');
    console.log(err);
  }
}

module.exports = View