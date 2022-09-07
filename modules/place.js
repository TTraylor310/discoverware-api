'use strict';

const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        name: {type: String, required: true},
        address: {type: String, required: true},
        image: {type: String, required: true},
        types: {type: Array, required: true},
        lat: {type: Number, required: true},
        lng: {type: Number, required: true},
        notes: {type: String},
        place_id: {type: String, required: true}
    }  
);

const locationModel = mongoose.model('Location', locationSchema);

module.exports = locationModel;