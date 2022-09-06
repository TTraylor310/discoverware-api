'use strict';

const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema(
    {
        placename: {type: String, required: true},
        typeOfPlace: {type: String, required: true},
        lat: {type: Number, required: true},
        lon: {type: Number, required: true},
        //placeImage: img-url,
        email: { type: String, required: true },
    }  
);

const profileModel = mongoose.model('profile', locationSchema);

module.exports = profileModel;