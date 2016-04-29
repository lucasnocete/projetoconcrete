'use strict';

module.exports = function(req, res) {
  var moment = require('moment');
  var userModel = require('../models/userModel.js');
  var jwt = require('jwt-simple');
  var secret = 'projetoConcrete123';
  userModel.findOne({email: req.body.email}, function(err, data) {
    if (err) {
      console.log('Erro: ', err);
      return res.status(503).json({mensagem: err});
    } else if (!data) {
      return res.status(401).json({mensagem: 'E-mail não encontrado'});
    } else {
      data.validPassword(req.body.senha, function(isMatch) {
        if (!isMatch) {
          return res.status(401).json({mensagem: 'senha inválida'});
        } else {
          var date = moment().format();
          var exp = moment().add(30, 'minutes').valueOf();

          var token = jwt.encode({
            iss: data._id,
            exp: exp
          }, secret);
          
          userModel.update({_id: data._id}, {$set: {token: token, ultimo_login: date, data_atualizacao: date}}).exec();
          data.token = token;
          data.ultimo_login = date;
          data.data_atualizacao = date;

          return res.status(200).json(data);
        }
      });
    }
  });
};
