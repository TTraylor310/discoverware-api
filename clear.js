'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const Location = require('./modules/place.js');

async function clear() {
  try {
    await Location.deleteMany({});
    console.log('Location cleared from DB');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();