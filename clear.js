'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.PROFILE_DB_URL);

const Profile = require('./modules/profile.js');

async function clear() {
  try {
    await Profile.deleteMany({});
    console.log('Profile cleared from DB');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();