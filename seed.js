'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.PROFILE_DB_URL);

const Profile = require('./modules/profile.js')

async function seed() {

    await Profile.create({
        name: 'Name 1',
        biography: 'description 1'
    })
    console.log('Person 1 was added')

    await Profile.create({
        name: 'Name 2',
        biography: 'description 2'
    })
    console.log('Person 2 was added')

    mongoose.disconnect();
}

seed();