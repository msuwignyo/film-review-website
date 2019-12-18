class View {
  static success(obj) {
    console.log('SUCCESS -------');
    console.table(obj);
  }

  static error(err) {
    console.log('SUCCESS -------');
    console.log(err);
  }
}

module.exports = View