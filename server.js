'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');


//Database for profile logins
mongoose.connect(process.env.PROFILE_DB_URL);

const app = express();

app.use(cors());
app.use(express.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { console.log('Mongoose is connected');});


//Sets variable Profile to the Schema of Profile.js
const Profile = require('./modules/profile.js')


app.get('/test', (req, res) => {
  res.send('test is good');
});


//Using profile.js, once profile is LOGGED, this retreives the profile.js data
app.get('/profile', getProfile)
async function getProfile(request, response, next) {
  try {
    let results = await Profile.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

//Using profile.js, once the profile is FOUND, this creates the profile.js data
app.post('/profile', postProfile);

async function postProfile(request, response, next) {
  console.log('request.body: ')
  console.table(request.body)
  try {
    const newProfile = await Profile.create(request.body);
    console.log('newProfile: ')
    console.table(newProfile)
    response.status(201).send(newProfile);
  } catch (error) {
    next(error);
  }
}

//Once the profile is FOUND, this finds and DELETES the profile data
app.delete('/profile/:profileid', deleteProfile);

async function deleteProfile(request, response, next) {
  const id = request.params.profileid;
  console.log('id: ')
  console.table(id);
  try {
    await Profile.findByIdAndDelete(id);
    response.status(204).send('Success!');
  } catch (error) {
    next(error)
  }
}


//Once chosen profile is found, this UPDATES the profile with new data
app.put('/profile/:profileid', putProfile)

async function putProfile(request, response, next) {
  let id = request.params.profileid;
  try {
    let data = request.body;
    const updateProfile = await Profile.findByIdAndUpdate(id, data, {new: true, overwrite: true});
    response.status(201).send(updateProfile);
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

