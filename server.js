'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyUser = require('./auth.js')

mongoose.connect(process.env.LOCATION_DB_URL);

const app = express();

app.use(cors());
app.use(express.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { console.log('Mongoose is connected');});

const Location = require('./modules/place.js')
//Auth Middleware
// app.use(verifyUser);

app.get('/', (request, response) => {
  response.send('Welcome to DiscoverWare');
});
app.get('/test', (request, response) => {
  response.send('test is good');
});

app.get('/place', verifyUser, getPlace)
app.post('/place', verifyUser, postPlace);
app.delete('/place/:placeid', verifyUser, deletePlace);
app.put('/place/:placeid', verifyUser, putPlace)

async function getPlace(request, response, next) {
  try {
    let results = await Location.find({email: request.user.email});
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function postPlace(request, response, next) {
  try {
    const checkBody = request.body.place_id;
    const checkDouble = await Location.find({place_id: checkBody, email: request.user.email});
    if (checkDouble.length === 0) {
      const newPlace = await Location.create({...request.body, email: request.user.email});
      response.status(201).send(newPlace);
    } else {
      response.status(201).send(checkDouble);
    }
  } catch (error) {
    next(error);
  }
}

async function deletePlace(request, response, next) {
  const id = request.params.placeid;
  try {
    await Location.findByIdAndDelete(id);
    response.status(204).send('Success!');
  } catch (error) {
    next(error)
  }
}

async function putPlace(request, response, next) {
  let id = request.params.placeid;
  try {
    const updatePlace = await Location.findByIdAndUpdate(id, {...request.body, email: request.user.email}, {new: true, overwrite: true});
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
