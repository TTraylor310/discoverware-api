'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const verifyUser = require('./auth.js')

//Database for place logins
mongoose.connect(process.env.LOCATION_DB_URL);

const app = express();

app.use(cors());
app.use(express.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { console.log('Mongoose is connected');});


//Sets variable Location to the Schema of place.js
const Location = require('./modules/place.js')


app.get('/test', (req, res) => {
  res.send('test is good');
});

//Auth Middleware
app.use(verifyUser);

//Using place.js, once place is LOGGED, this retreives the place.js data
app.get('/place', getPlace)
async function getPlace(request, response, next) {
  try {
    let results = Location.find({email: req.user.email});
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

//Using place.js, once the place is FOUND, this creates the place.js data
app.post('/place', postPlace);

async function postPlace(request, response, next) {
  console.log('request.body: ')
  console.table(request.body)
  try {
    const newPlace = await Location.create({...request.body, email: req.user.email});
    console.log('newPlace: ')
    console.table(newPlace)
    response.status(201).send(newPlace);
  } catch (error) {
    next(error);
  }
}

//Once the place is FOUND, this finds and DELETES the place data
app.delete('/place/:placeid', deletePlace);

async function deletePlace(request, response, next) {
  const id = request.params.placeid;
  console.log('id: ')
  console.table(id);
  try {
    Location.findByIdAndDelete(id);
    response.status(204).send('Success!');
  } catch (error) {
    next(error)
  }
}


//Once chosen place is found, this UPDATES the place with new data
app.put('/place/:placeid', putPlace)

async function putPlace(request, response, next) {
  let id = request.params.placeid;
  try {
    let data = request.body;
    const updatePlace = Location.findByIdAndUpdate(id, {...request.body, email: req.user.email}, data, {new: true, overwrite: true});
    response.status(201).send(updatePlace);
  } catch (error) {
    next(error);
  }
}


//CATCH ALL, for everything else
app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

