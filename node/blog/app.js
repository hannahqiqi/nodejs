const express = require('express')
const app = express()
const pug = require('pug')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

const url = 'mongodb://192.168.1.102:27017/blog'

app.use(express('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function(req, res) {
    
      res.render('post')
    })
 

app.post('/blog', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        console.log('connected')
        var collection = db.collection('post')
        collection.insertOne({post:req.body.comment}, function(err) {
            collection.find().toArray(function(err, docs) {
                db.close()
                res.render('post', {posts: docs})
            })
        })
    })
})

app.listen(3006)