'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.LOCATION_DB_URL);

const Location = require('./modules/place.js')

async function seed() {

    await Location.create({
        email: 'jacobdang',
        name: 'seattle',
        address: '1234 street',
        image: 'cat',
        types: ['park', 'restaurant'],
        lat: 10,
        lng: 15,
        place_id: 9876
    })
    console.log('Location 1 was added')

    await Location.create({
        email: 'timtraylor',
        name: 'bellevue',
        address: '4321 street',
        image: 'dog',
        types: ['restaurant', 'park'],
        lat: 20,
        lng: 25,
        place_id: 4567
    })
    console.log('Location 2 was added')

    mongoose.disconnect();
}

seed();