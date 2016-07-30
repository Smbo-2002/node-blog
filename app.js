'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

//app.get('/:name', function (req, res) {
//  res.send('hello'+req.params.name+'!');
//});

var blogSchema = new Schema({
    text: String
});

var Blog = mongoose.model('Blog', blogSchema);

app.get('/api', function (req, res) {
   
    Blog.find()
		.then(function (data) {
			res.status(200).send(data);
		})
		.catch(function (err) {
			return console.log(err);
		});
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/api', function (req, res) {
    var post = new Blog(req.body);
    post.save()
        .then(function (data) {
            res.status(201).send(data);
        }).catch(function (err) {
            console.log(err);
        });
});

app.delete('/api/:id', function (req, res) {
    Blog.findByIdAndRemove(req.params.id)
		.then(function (data) {
			return res.status(200).send(data);
		})
		.catch(function (err) {
			return console.log(err);
		});
});

app.put('/api/:id', function (req, res) {
	var query = {'_id': req.params.id};
	
	Blog.update(req.params.id, {$set:req.body})
	.then(function(){
		return Blog.findOne(req.params.id).exec();	
	})
	.then(function(data) {
		res.status(200).send(data);
	})
	.catch(function(err){
		console.error(err);
	});
});

app.use('/', express.static('html'));

app.listen(3000);
