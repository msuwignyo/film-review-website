const express = require('express')
const app = express()
const port = 3000
const Admin = require('./router').Admin
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.use(express.static('./'))
app.get('/', (req, res) => { res.render('index'); });
app.use('/admin', Admin)

app.listen(port, () => console.log(`This App running on Port : ${port}!`))