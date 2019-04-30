'use strict';

require('dotenv').config();
const express require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(static('./public'));

app.get('/hello', (request, response) => {
  response.status(200).send('Hello');
});

// custom create get request
app.get('/location', (request,response) => {
  try{
    // JSON.parse(request);
    // let geoData = require('./data/geo.json');
    response.send(Location(request));
  } catch(error){
    console.log('There was an error')
    response.status(500).send('Status: ', error);
  }
  
});

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

//create a constructor
function Location(searchQuery){
  this.searchQuery = searchQuery;
}
//query that talks to json files