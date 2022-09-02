'use strict';

require('dotevn').config();
const express = require('express');
const cors = require('cors');

// const mongoose = require('mongoose');
// mongoose.connect(process.env.DB_URL);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('Mongoose is connected');
// });

const app = express();

app.use(cors());
app.use(express.json());



app.get('/test', (req, res) => {
  res.send('test is good');
});








app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
const PORT = process.env.PORT || 3001;
