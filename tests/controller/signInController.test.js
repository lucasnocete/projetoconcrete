'use strict';

var signInController = require('../../controllers/signInController.js');
var userModel = require('../../models/userModel.js');
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

describe('Testar signInController', function() {

  this.timeout(10000);

  after(function() {
    userModel.remove({}, function() {});
  });

  before(function(done) {
    var model = new userModel({
      nome: 'Lucas Nocete',
      email: 'lucasnocete@hotmail.com',
      senha: '123456789',
      telefones: [{telefone: '960678047', ddd: '11'}]
    });

    model.save(done());
  });

  beforeEach(function() {
    req = {
      body: {
        email: 'lucasnocete@hotmail.com',
        senha: '123456789'
      }
    };
  });

  it('Testar login com sucesso', function(done) {
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
    signInController(req, res);
  }); 

  it('Testar login com email não encontrado', function(done) {
    req.body.email = 'lucasnocete@lucas.com';
    res = {
      status: function(status) {
        assert.equal(status, 401);
        return { 
          json: function(json) {
            assert.ok(json.mensagem, 'E-mail não encontrado');
            done();
          }
        };
      }
    };
    signInController(req, res);
  }); 

  it('Testar login com senha inválida', function(done) {
    req.body.senha = '123';
    res = {
      status: function(status) {
        assert.equal(status, 401);
        return { 
          json: function(json) {
            assert.ok(json.mensagem, 'senha inválida');
            done();
          }
        };
      }
    };
    signInController(req, res);
  }); 

});
