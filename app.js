'use strict';

var express    = require('express');
var bodyParser = require('body-parser');
var routes     = require('./routes/');
var mongoose   = require('mongoose');
var port       = process.env.PORT || 3000,
  app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.use(function(req, res) {
  res.status(404).json({mensagem: 'endpoint não encontrado'}); 
});

app.listen(port, function () {
  console.log('Server iniciado com sucesso', port);
});

mongoose.connect('mongodb://projetoconcrete:projetoconcrete@ds055885.mlab.com:55885/projetoconcrete', function(err) {
  if (err) {
    console.log('Erro ao connectar', err);
  } else {
    console.log('MongoDB iniciado com sucesso');
  }
});
