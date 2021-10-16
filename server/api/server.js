const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors('*'));
app.use(express.json());

const authRoutes = require('./controllers/auth');
const userRoutes = require('./controllers/users');
const albumRoutes = require('./controllers/albums');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/albums', albumRoutes);


app.get('/', (req, res) => res.json({ message: 'Welcome to the Stylus record manager API' }));

module.exports = app;