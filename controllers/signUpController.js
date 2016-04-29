'use strict';

module.exports = function(req, res) {
  var moment = require('moment');
  var userModel = require('../models/userModel.js');
  var jwt = require('jwt-simple');
  var secret = 'projetoConcrete123';
  userModel.findOne({email: req.body.email}, function(err, data) {
    if (err) {
      console.log('Erro s: ', err);
      return res.status(503).json({mensagem: err});
    } else if (data) {
      return res.status(422).json({mensagem: 'E-mail já existente'});
    }

    var model = new userModel({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      telefones: req.body.telefones
    });

    model.save(function(err, data) {
      if (err) {
        console.log('Erro s', err);
        return res.status(503).json({mensagem: err});
      } else {
        var exp = moment().add(30, 'minutes').valueOf();
        var token = jwt.encode({
          iss: data._id,
          exp: exp
        }, secret);
        userModel.update({_id: data._id}, {$set: {token: token}}).exec();
        data.token = token;
        return res.status(200).json(data);
      }
    });
  });
};
