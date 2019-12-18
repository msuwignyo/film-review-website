class View {
  static success(username) {
    console.log(`${username} Has been registered`)
  }
  static findONe(data) {
    console.table(data)
  }
  static findAll(data) {
    let allData = []
    data.forEach(e => {
      allData.push(e.dataValues)
    })
    console.table(allData)
  }
  static error(err) {
    console.log(err)
  }
  static deleteUser(id) {
    console.log(`user dengan ID : ${id} berhasil di delete `)
  }
}


module.exports = View