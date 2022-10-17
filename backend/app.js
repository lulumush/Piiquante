/* import Express */
const express = require('express');
/* import helmet to securise headers*/
const helmet = require('helmet');
/* import Mongoose */
const mongoose = require('mongoose');
/* import body parsing middleware */
const bodyParser = require("body-parser");
/* import middleware which sprevent MongoDB injection */
const mongoSanitize = require('express-mongo-sanitize');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express(); //create express app
const dotenv = require('dotenv'); //loads environment variables
dotenv.config();

app.use(helmet());

/* connect to MongoDB */
mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.at0v76y.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* headers settings */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');//allow API acces from all origins
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//add headers to request send to API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//send requests with specified methods(get, post,..)
  next();
});

app.use(bodyParser.json());
app.use(express.json());
app.use(mongoSanitize());

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;
