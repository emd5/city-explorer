'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./'));

app.get('/hello', (request, response) => {
  response.status(200).send('Hello');
});

// custom create get request
app.get('/location', (request,response) => {
  try{
    let geoData = require('./data/geo.json');
    const newData = new Location(geoData.results[0]);
    response.send(newData);
  } catch(error){
    console.log('There was an error')
    response.status(500).send('Status: ', error);
  }
  
});

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

//create a constructor
function Location(searchQuery){
  this.searchQuery = searchQuery.formatted_address;
  this.latitude = searchQuery.geometry.location.lat;
  this.longitude = searchQuery.geometry.location.lng;
}
