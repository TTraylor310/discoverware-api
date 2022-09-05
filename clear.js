'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.PROFILE_DB_URL);

const Cat = require('./model/cat');

async function clear() {
  try {
    await Cat.deleteMany({});
    console.log('cats cleared from DB');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();