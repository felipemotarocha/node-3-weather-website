const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Felipe Rocha',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Felipe Rocha',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        contact: 'help@approacher.com.br',
        name: 'Felipe Rocha',
        errorText: 'Help article not found!',
    })
});

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({ error: 'You must provide an adress!'});
    };
    // Geocoding and forecasting
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error, });
        };
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error, })
            };
            return res.send({
                location,
                forecast: forecastData,
            });
        });
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Felipe Rocha',
        errorText: 'Help article not found!',
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!',
        });
    };

    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Felipe Rocha',
        errorText: 'Page not found!',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
