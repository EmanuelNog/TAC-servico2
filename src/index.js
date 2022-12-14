const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// const routes = require('./routes')
//const {MongoClient, MongoKerberosError} = require("mongodb")
//const uri = "mongodb+srv://miranteazi:emanuel12@cluster0.bf2jvxc.mongodb.net/?retryWrites=true&w=majority";
//const client = new MongoClient(uri);

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const Measurement = require('./models/Measurement.js')

//--------------
app.post('/measurement', async (req, res) => {
  const { name, measurements, deviceId, userId} = req.body

  const measurement = {
    name,
    measurements,
    deviceId,
    userId,
  }

  try {
    await Measurement.create(measurement)

    res.status(201).json({ message: 'Medida registrada com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

app.get('/measurement/:id', async (req, res) => {
  const id = req.params.id

  try {
    const measurement = await Measurement.findOne({ _id: id })

    if (!measurement) {
      res.status(422).json({ message: 'Medida nao encontrada' })
      return
    }

    res.status(200).json(measurement)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

app.get('/measurement/user/:userId', async (req, res) => {
  const userId = req.params.userId

  try {
    const measurement = await Measurement.find({ userId: userId })

    if (!measurement) {
      res.status(422).json({ message: 'Medida nao encontrada' })
      return
    }

    res.status(200).json(measurement)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

app.delete('/measurement/:id', async (req, res) => {
  const id = req.params.id

  const measurement = await Measurement.findOne({ _id: id })

  if (!measurement) {
    res.status(422).json({ message: 'Medida nao encontrada' })
    return
  }

  try {
    await Measurement.deleteOne({ _id: id })

    res.status(200).json({ message: 'Medida removida com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//--------------
const Device = require('./models/Device.js')

app.post('/device', async (req, res) => {
  const { name, description} = req.body

  const device = {
    name,
    description,
  }

  try {
    await Device.create(device)

    res.status(201).json({ message: 'Dispositivo registrado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})


app.get('/device', async (req, res) => {
  try {
    const device = await Device.find()

    res.status(200).json(device)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

app.get('/device/:id', async (req, res) => {
  const id = req.params.id

  try {
    const device = await Device.findOne({ _id: id })

    if (!device) {
      res.status(422).json({ message: 'Dispositivo nao encontrado' })
      return
    }

    res.status(200).json(device)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

app.delete('/device/:id', async (req, res) => {
  const id = req.params.id

  const device = await Device.findOne({ _id: id })

  if (!device) {
    res.status(422).json({ message: 'Dispositivo nao encontrado' })
    return
  }

  try {
    await Device.deleteOne({ _id: id })

    res.status(200).json({ message: 'Dispositivo removido com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

mongoose.connect(
    'mongodb+srv://miranteazi:emanuel12@cluster0.bf2jvxc.mongodb.net/?retryWrites=true&w=majority',
  ).then (()=>{
    console.log('successully connected')
    app.listen(3003)
  }).catch((err)=> console.log(err))

// async function run(){
//   try{
//     const database = client.db('sample_mflix')
//     const movies = database.collection('movies')

//     const query = { title: 'Back to the Future'}
//     const movie = await movies.findOne(query)

//     console.log(movie)

//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir)
