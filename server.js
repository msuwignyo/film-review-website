<<<<<<< HEAD
// routes
const { movieRoute, loginRoute, registerRoute } = require('./router');

// server setup
const express = require('express');
const app = express();
const port = 3003;

// ejs setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// home page
app.get('/', (req, res) => res.redirect('/movie'));

// routes to different pages
app.use('/movie', movieRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.listen(port, () => console.log(`Movie Review listening at port ${port}`));
=======
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
>>>>>>> bayuoktari
