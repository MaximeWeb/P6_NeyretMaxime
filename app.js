const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv')
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');






mongoose.connect('mongodb+srv://MaximeWeb:azerty91@cluster0.htxre6g.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});





app.use('/api/auth', userRoutes);
app.use('/api', sauceRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;