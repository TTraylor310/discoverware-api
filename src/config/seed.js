'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.LOCATION_DB_URL);

const Location = require('./modules/place.js')

async function seed() {

    await Location.create({
        email: 'isaiah.keller@gmail.com',
        name: 'Seattle',
        address: 'Seattle, Wa, USA',
        image: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAeJbb3d936CZDTW5hwENPoqBYi3MezdwRcp9CnBXK7nImo9R9xT1CybXV8cTwQ7irp4PVmQQhvuZVkEIuo3CbxFYwFGyHtTMHX_G3NX9Ni4jvy6mzgkwZMZSdZI8Dlc4-KgRkJZQc03nObpgxbcQ-WYndiIejv-CaSLwmKc-f2kZOI6G6LpL&3u1080&5m1&2e1&callback=none&key=AIzaSyDRK7hroantwXL1hhRr1zmZrZshbD3Nmjk&token=57874',
        types: ['locality', 'political'],
        lat: 47.6062095,
        lng: -122.3320708,
        notes: 'isaiah location 1',
        place_id: 'ChIJVTPokywQkFQRmtVEaUZlJRA',
    })
    console.log('Isaiah info added')

    await Location.create({
        email: 'jacobohdang@gmail.com',
        name: 'Goose Creek',
        address: 'Goose Creek, SC, USA',
        image: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAeJbb3cC_xooPRkmc2TjlIXGR8EaxW8lR54IGMErsi18L7EbjJ0JWsJyfJlEZFI0lLCoSQF0MjFZlju7ijLq7dcQo5Av51NBZ3ArmFeiqVOF-U2ZaJHfd0FcOyORVePcTizCmMfj8UhzKpVcaO40C00lyJNOOBghWscidpeBDdkxCmTDeat0&3u3024&5m1&2e1&callback=none&key=AIzaSyDRK7hroantwXL1hhRr1zmZrZshbD3Nmjk&token=7980',
        types: ['locality', 'political'],
        lat: 32.9810059,
        lng: -80.03258670000001,
        notes: 'jacob place',
        place_id: 'ChIJh8AOFANh_ogRL_vuk6FDucU'
    })
    console.log('Jacob info added')

    await Location.create({
        email: 'ttraylor83@gmail.com',
        name: 'San Pedro',
        address: 'San Pedro, Los Angeles, CA, USA',
        image: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAeJbb3eAOIUxCYW1XzFNuKHYhPMXgLr4MUppeAohFP6Ab8RRPuFnqpamE7xrg2-DAGtIaj0Jh9b7UAfSCHtqNQm9MhiZEszRGqthnmwL8oVx2UumdPm6ytDfVra8bvvoqNBjPcgvlPFGGjV_E3DW16jsStyUcYFkkPcKlPZe9kxBF0h3yOiy&3u2576&5m1&2e1&callback=none&key=AIzaSyDRK7hroantwXL1hhRr1zmZrZshbD3Nmjk&token=60428',
        types: ['neighborhood', 'political'],
        lat: 33.7360619,
        lng: -118.2922461,
        notes: 'hometown',
        place_id: 'ChIJpYrtFq413YARX4eG8Fd9FAQ',
    })
    console.log('Tim info added')

    await Location.create({
        email: 'brandenge@protonmail.com',
        name: 'Las Vegas',
        address: 'Las Vegas, NV, USA',
        image: 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAeJbb3c0j9KJcn-ldzk0Cne2_-WgFGVY8L7GOTpBYfC7QsFJ7ZmCls12MsUHmteYuIxAZoVhWd46qMhTZMqQscJJ1WP_MZbz3gHo8R95NGcAHB1gJnhw5XuVL8WxeNlONdyeu9LX1pclBc7h_U_6mle0kx4UB50cY9-TEE_OnayvWM2mD3KZ&3u1284&5m1&2e1&callback=none&key=AIzaSyDRK7hroantwXL1hhRr1zmZrZshbD3Nmjk&token=21153',
        types: ['locality', 'political'],
        lat: 36.171563,
        lng: -115.1391009,
        notes: 'brandon thing',
        place_id: 'ChIJ0X31pIK3voARo3mz1ebVzDo'
    })
    console.log('Branden info added')

    mongoose.disconnect();
}

seed();