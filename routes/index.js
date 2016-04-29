'use strict';

module.exports = function(app) {
  var signUpValidator = require('../validator/signUpValidator.js');
  app.post('/sign_up', signUpValidator);

  var signInValidator = require('../validator/signInValidator.js');
  app.post('/sign_in', signInValidator);

  var userValidator = require('../validator/userValidator.js');
  app.get('/user/:_id', userValidator);
};
