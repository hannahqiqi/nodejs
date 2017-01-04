const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors')
const bodyParser = require("body-parser")


app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

const url = 'mongodb://achen:th123456@ds151028.mlab.com:51028/aaronchlab'

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
        collection.insert({post:post, postTime:new Date()}, function() {
            db.close()
            res.send('ok')
        })
    })
})

app.get('/delblog', function(req, res) {
    var del = req.body.del
    var postId = req.query.id
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('post')
        collection.remove({"_id": ObjectId(postId)})
        db.close()
        res.send('ok')
    })
})

app.get('/searchblog', function(req, res) {
    var search = req.body.search
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('post')
        collection.find()
        console.log('connected')
        db.close()
        res.send('ok')
    })
})



app.listen(2000)