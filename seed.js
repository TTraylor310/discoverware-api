'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.LOCATION_DB_URL);

const Location = require('./modules/place.js')

async function seed() {

    await Location.create({
        email: 'isaiah.keller@gmail.com',
        name: 'seattle',
        address: '1234 street',
        image: 'cat',
        types: ['park', 'restaurant'],
        lat: 10,
        lng: 15,
        notes: 'notes display',
        place_id: 9876
    })
    console.log('Location 1 was added')

    await Location.create({
        email: 'jacobohdang@gmail.com',
        name: 'bellevue',
        address: '4321 street',
        image: 'dog',
        types: ['restaurant', 'park'],
        lat: 20,
        lng: 25,
        notes: 'notes display',
        place_id: 4567
    })
    console.log('Location 2 was added')

    await Location.create({
        email: 'ttraylor83@gmail.com',
        name: 'seattle',
        address: '1234 street',
        image: 'cat',
        types: ['park', 'restaurant'],
        lat: 10,
        lng: 15,
        notes: 'notes display',
        place_id: 9876
    })
    console.log('Location 3 was added')

    await Location.create({
        email: 'brandenge@protonmail.com',
        name: 'seattle',
        address: '1234 street',
        image: 'cat',
        types: ['park', 'restaurant'],
        lat: 10,
        lng: 15,
        notes: 'notes display',
        place_id: 9876
    })
    console.log('Location 4 was added')

    mongoose.disconnect();
}

seed();