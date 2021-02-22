const express = require('express');
const bodyParser= require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://lindy:blueman1a@cluster0.uexxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
  useUnifiedTopology: true
  })
  .then(client => {
  console.log('Im in DB')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    
    app.listen(3000, function () {
      console.log('listening on 3000')
    })

    // ========================
      // Middlewares
    // ========================
    app.use(bodyParser.urlencoded({ extended: true }))
    app.set('view engine', 'ejs')

    

     // ========================
       // Routes
     // ========================

    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(quotes => {
          res.render('index.ejs', { quotes: results })
        })
        .catch()
    })

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
      })
      .catch()
    })
  }) 
  .catch(console.error)



