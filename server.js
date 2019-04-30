'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('./'));

app.get('/hello', (request, response) => {
  response.status(200).send('Hello');
});

// Request for location (lat & lng)
app.get('/location', (request,response) => {
  try{
    let geoData = require('./data/geo.json');
    const newLocation = new Location(geoData[0], geoData[0].formatted_address, geoData[0].geometry.location.lat, geoData[0].geometry.lng)
    // const newData = locationHelper(geoData);
    response.send(newLocation);
  } catch(error){
    console.log('There was an error with location')
    response.status(500).send('Status: ', error);
  }
});

// Request for weather (time & forecast)
app.get('/weather', (request,response) => {
  let darkSky = require('./data/darksky.json');
  try{
    const newWeatherData = new Weather(darkSky);
    response.send(newWeatherData);

  } catch(error){
    console.log('There was an error with weather')
    response.status(500).send('Status: ', error);
  }
})

//helper function

function weatherHelper()
// function locationHelper(geoData){
//   const location = new Location(geoData, geoData.formatted_address, geoData.geometry.lat, geoData.geometry.lng );
//   return location;
// }

// Location Constructor
function Location(query, format, latitude, longitude){
  this.searchQuery = query;
  this.formattedQuery = format;
  this.latitude = latitude;
  this.longitude = longitude;
}

// Weather Constructor
function Weather(searchQuery){
  this.forecast = searchQuery.minutely.summary;
  this.time = searchQuery.currently.time;
}

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

