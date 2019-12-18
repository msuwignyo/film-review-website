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