'use strict';

module.exports = function(req, res) {
  var signUpController = require('../controllers/signUpController.js');
  var utils = require('../utils/').validator;
  if (!req.body.nome) {
    return res.status(400).json({mensagem: 'Envie no objeto o campo nome e valor'});
  } else if (!utils.validEmail(req.body.email)) {
    return res.status(400).json({mensagem: 'Envie no objeto o campo email e valor'});
  } else if (!req.body.senha) {
    return res.status(400).json({mensagem: 'Envie no objeto o campo senha e valor'});
  } else if (utils.validPhones(req.body.telefones)) {
    var warning = 'Envie na propriedade telefones um array com um ou mais objetos contendo, telefone e ddd';
    return res.status(400).json({mensagem: warning});
  } else {
    signUpController(req, res);
  }
};
