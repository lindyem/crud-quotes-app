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
    app.use(bodyParser.json())
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    

    

     // ========================
       // Routes
     // ========================

    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(quotes => {
          res.render('index.ejs', { quotes: quotes })
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

    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: 'Replacement' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name },
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted Quote!')
        })
      .catch(error => console.error(error))
    })

  }) 
  .catch(console.error)



