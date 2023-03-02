const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT
const { errorHandler } = require('./src/middleware/errorMiddleware')
const connectDB = require('./src/config/db')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
connectDB()


// PROOF of life checking API retrieval
// app.get('/', (request, response) => {
//   response.send('Welcome to DiscoverWare')
// })

app.use(errorHandler)

app.listen(PORT, () => console.log('Server Up and running on port: ', PORT))



// // app.get('/place', verifyUser, getPlace)
// // app.post('/place', verifyUser, postPlace)
// // app.delete('/place/:placeId', verifyUser, deletePlace)
// // app.put('/place/:placeId', verifyUser, putPlace)

// async function getPlace(request, response, next) {
//   try {
//     let results = await Location.find({ email: request.user.email })
//     response.status(200).send(results)
//   } catch (error) {
//     next(error)
//   }
// }

// async function postPlace(request, response, next) {
//   try {
//     const checkBody = request.body.place_id
//     const checkDouble = await Location.find({
//       place_id: checkBody,
//       email: request.user.email,
//     })
//     if (checkDouble.length === 0) {
//       const newPlace = await Location.create({
//         ...request.body,
//         email: request.user.email,
//       })
//       response.status(201).send(newPlace)
//     } else {
//       response.status(201).send(checkDouble)
//     }
//   } catch (error) {
//     next(error)
//   }
// }

// async function deletePlace(request, response, next) {
//   const id = request.params.placeId
//   try {
//     await Location.findByIdAndDelete(id)
//     response.status(204).send('Success!')
//   } catch (error) {
//     next(error)
//   }
// }

// async function putPlace(request, response, next) {
//   let id = request.params.placeId
//   try {
//     const updatePlace = await Location.findByIdAndUpdate(
//       id,
//       { ...request.body, email: request.user.email },
//       { new: true, overwrite: true }
//     )
//     response.status(201).send(updatePlace)
//   } catch (error) {
//     next(error)
//   }
// }

//CATCH ALL, for everything else
// app.get('*', (request, response) => {
//   response.status(404).send('Not available')
// })

// app.use((error, request, response, next) => {
//   response.status(500).send(error.message)
// })

