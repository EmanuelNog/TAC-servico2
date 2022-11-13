const express = require('express')
const app = express()
const mongoose = require('mongoose')
//const {MongoClient, MongoKerberosError} = require("mongodb")
//const uri = "mongodb+srv://miranteazi:emanuel12@cluster0.bf2jvxc.mongodb.net/?retryWrites=true&w=majority";
//const client = new MongoClient(uri);

app.use(express.urlencoded({extended: true}))

app.use(express.json())

const Device = require('./models/Device.js')


app.post('/device', async (req, res) => {
  const { name, measurements} = req.body

  const device = {
    name,
    measurements,
  }

  try {
    await Device.create(device)

    res.status(201).json({ message: 'Device recorded successfully!' })
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
      res.status(422).json({ message: 'Device not found!' })
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
    res.status(422).json({ message: 'Device not found!' })
    return
  }

  try {
    await Device.deleteOne({ _id: id })

    res.status(200).json({ message: 'Device removed successfully!' })
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
    app.listen(3000)
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