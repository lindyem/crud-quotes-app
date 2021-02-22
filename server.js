const express = require('express');
const bodyParser= require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://lindy:blueman1a@cluster0.uexxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
  console.log('im in DB')
})

app.listen(3000, function () {
  console.log('listening on 3000')
})

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
  console.log(req.body)
})
