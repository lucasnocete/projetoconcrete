'use strict';

module.exports = function(req, res) {
  var userModel = require('../models/userModel.js');
  var jwt = require('jwt-simple');
  var secret = 'projetoConcrete123';
  userModel.findById({_id: req.params._id}, function(err, data) {
    if (err) {
      console.log('Erro: ', err);
      return res.status(401).json({mensagem: 'Não autorizado'});
    } else if (!data) {
      return res.status(401).json({mensagem: 'Não autorizado'});
    } else if (data.token !== req.headers.bearer) {
      return res.status(401).json({mensagem: 'Não autorizado'});
    } else {
      var decoded = jwt.decode(req.headers.bearer, secret);

      if (decoded.exp <= Date.now()) {
        return res.status(401).json({mensagem: 'Não autorizado'});
      } else {
        return res.status(200).json(data);
      }
    }
  });
};
