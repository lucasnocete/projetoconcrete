'use strict';

module.exports = function(req, res) {
  var userController = require('../controllers/userController.js');
  if (!req.headers.bearer) {
    return res.status(401).json({mensagem: 'Não autorizado'});
  } else if (!req.params._id && req.params._id.length < 25) {
    return res.status(400).json({mensagem: 'Faltou o id do usuário'});
  } else {
    userController(req, res);
  }
};
