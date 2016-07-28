var express = require('express');
var app = express();

app.get('/', function(req, res){
  app.use(express.static('public'));
});

app.get('/:name', function(req, res){
  res.send('hello'+req.params.name+'!');
});

app.listen(3000);

