const express = require('express')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const bodyParser = require("body-parser")

app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

const url = 'mongodb://192.168.1.102:27017/blog'

app.get('/blogs', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('post')
        collection.find().toArray(function (err, docs) {
            db.close()
            res.send(docs)
        })
    })
})

app.post('/blog', function(req, res) {
    var post = req.body.post
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('post')
        collection.insertOne({post: post}, function() {
            db.close()
            res.send('ok')
        })
    })
})



app.listen(2000)