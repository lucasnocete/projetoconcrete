'use strict';

module.exports = function(req, res) {
  var signInController = require('../controllers/signInController.js');
  var utils = require('../utils/').validator;
  if (!utils.validEmail(req.body.email)) {
    return res.status(400).json({mensagem: 'Envie no objeto o campo email e valor'});
  } else if (!req.body.senha) {
    return res.status(400).json({mensagem: 'Envie no objeto o campo senha e valor'});
  } else {
    signInController(req, res);
  }
};
