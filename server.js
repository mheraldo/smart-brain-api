const express = require('express');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('success') })

// checks if credentials match info from database
app.post('/signin', (req, res) => signin.handleSignin(req, res, db))

// checks to see if they can register
app.post('/register', (req, res) => { register.handleRegister(req, res, db) })

// get the profile of current user
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// update the amount of images posted
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

// update the amount of images posted
/*app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })*/

/*app.listen(3000, () => {
	console.log('app is running on port 3000');
});*/

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user
*/

