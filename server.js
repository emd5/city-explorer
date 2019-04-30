'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/hello', (request, response) => {
  response.status(200).send('Hello');
});

app.get('/data', (request, response) => {
  let airplanes = {
    departure: Date.now(),
    canFly: true,
    pilot: 'Well Trained'
  };
  response.status(200).json(airplanes);
});

// custom create get request
app.get('/bailey', (request,response) => {
  let baileyData = require('./data/puppy.json');
  response.send(baileyData);
});

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
