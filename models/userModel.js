'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var signUp = new Schema({
  nome: String,
  email: String,
  senha: String,
  telefones: [{
    telefone: String,
    ddd: String
  }],
  data_criacao: {
    type: Date, 
    default: Date.now
  },
  data_atualizacao: {
    type: Date, 
    default: Date.now
  },
  ultimo_login: {
    type: Date, 
    default: Date.now
  },
  token: String
});

signUp.pre('save', function(next) {
  var user = this;
  if (!user.isModified('senha')) { 
    return next();
  }

  bcrypt.genSalt(5, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.senha, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.senha = hash;
      return next();
    });
  });
});

signUp.methods.validPassword = function(senha, next) {
  bcrypt.compare(senha, this.senha, function(err, isMatch) {
    if (err) {
      return next(err);
    }
    return next(isMatch);
  });
};

module.exports = mongoose.model('signUp', signUp);
