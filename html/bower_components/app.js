var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // for parsing application/json
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

var blogSchema = new Schema({
  text: String,
});

var Blog = mongoose.model('Blog', blogSchema);

// app.get('/:name', function(req, res){
//   res.send('hello'+req.params.name+'!');
// });

app.delete('/api/:post', function(req, res){
  console.log(req.params.post);

  Blog.remove({_id: req.params.post},function (err,removed) {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(201).send(removed);
  });
});

app.put('/api/:post',function (req, res) {
  var post = req.body;
  Blog.update({_id:req.params.post}, {$set:post} , function (err) {
    if (err) return handleError(err);
    return res.status(200).send(post);
  });
});

app.post('/api', function(req, res){
  	new Blog(req.body)
  	.save(function(err, data){
  		if(err){
  			return res.status(500).send(err);
  		}
		
		return res.status(201).send(data);
  	});
});
app.get('/api', function(req, res){
  	Blog
  	.find()
  	.exec(function(err, data){
  		if(err){
  			return res.status(500).send(err);
  		}
		console.log("sucsess");
		return res.status(200).send(data);

  	});
});

app.use('/', express.static('./html'));

app.listen(3000);