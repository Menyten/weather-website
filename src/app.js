const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Joel Pedersen'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'did something go worng?',
    title: 'Help',
    name: 'Joel Pedersen'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Joel Pedersen'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address!"
    });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err })
      }
      res.send({
        forecast: forecastData,
        location,
        adress: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term!'
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Joel Pedersen',
    message: 'Help article doesnt exist'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Joel Pedersen',
    message: 'Soomething went wrong'
  });
});

const din = "mamma";
const svamp = "WHAT! you've never played tuber simulator. Pfft"
const pwedie = "You know it's fun ihgrt?"
const pie = "oyu nkow hwat, ryt ti uot nda hent uyo acn ysa fi uoy"
const hey = "kiel ti ro otn"

app.listen(port, console.log('Listening on port ' + port));