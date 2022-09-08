'use strict';

const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema(
  {
      email: { type: String, required: true },
      name: {type: String, required: true},
      address: {type: String, required: true},
      lat: {type: Number, required: true},
      lng: {type: Number, required: true},
      place_id: {type: String, required: true},
      images: {type: Array, required: true},
      types: {type: Array},
      notes: {type: String}
  }
);

const locationModel = mongoose.model('Location', locationSchema);

module.exports = locationModel;
