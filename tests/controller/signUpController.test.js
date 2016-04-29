'use strict';

var userModel = require('../../models/userModel.js');
var signUpController = require('../../controllers/signUpController.js');
var assert = require('assert');
var mongoose   = require('mongoose'); 
var req = {};
var res = {};

if (mongoose.connection.readyState < 1) {
  mongoose.connect('mongodb://projetoconcreteteste:projetoconcreteteste@ds021701.mlab.com:21701/projetoconcreteteste', function(err) {
    if (err) {
      console.log('Erro ao connectar', err);
    }
  });
}

describe('Testar signUpController', function() {

  this.timeout(10000);

  after(function() {
    userModel.remove({}, function() {});
  });

  before(function(done) {
    req = {
      body: {
        nome: 'Lucas Nocete',
        email: 'lucasnocete@gmail.com',
        senha: '123456789',
        telefones: [{telefone: '960678047', ddd: '11'}]
      }
    };
    done();
  });

  it('Testar inclusão de registro com sucesso.', function(done) {
    res = {
      status: function(status) {
        assert.equal(status, 200);
        return { 
          json: function(json) {
            assert.ok(json);
            done();
          }
        };
      }
    };
    signUpController(req, res);
  }); 

  it('Testar inclusão de registro com email já cadastrado.', function(done) {
    res = {
      status: function(status) {
        assert.equal(status, 422);
        return { 
          json: function(json) {
            assert.equal(json.mensagem, 'E-mail já existente');
            done();
          }
        };
      }
    };
    signUpController(req, res);
  }); 

});
