'use strict';

var signUpValidator = require('../../validator/signUpValidator.js');
var assert = require('assert');
var req = {};
var res = {};

describe('Testar signUpValidator', function() {

  beforeEach(function() {
    req = {
      body: {
        nome: 'Lucas Nocete',
        email: 'lucasnocete@globo.com',
        senha: '123456789',
        telefones: [{telefone: '960678047', ddd: '11'}]
      }
    };
  });

  it('Testar validação com dados OK', function(done) {
    signUpValidator(req, done());
  });  

  it('Testar validação sem nome', function(done) {
    req.body.nome = '';
    res = {
      status: function(status) {
        assert.equal(status, 400);
        return {
          json: function(json) {
            assert.equal(json.mensagem, 'Envie no objeto o campo nome e valor');
            done();
          }
        };
      }
    };
    signUpValidator(req, res);
  }); 

  it('Testar validação sem email', function(done) {
    req.body.email = '';
    res = {
      status: function(status) {
        assert.equal(status, 400);
        return {
          json: function(json) {
            assert.equal(json.mensagem, 'Envie no objeto o campo email e valor');
            done();
          }
        };
      }
    };
    signUpValidator(req, res);
  }); 

  it('Testar validação sem senha', function(done) {
    req.body.senha = '';
    res = {
      status: function(status) {
        assert.equal(status, 400);
        return {
          json: function(json) {
            assert.equal(json.mensagem, 'Envie no objeto o campo senha e valor');
            done();
          }
        };
      }
    };
    signUpValidator(req, res);
  }); 

  it('Testar validação sem array de telefones', function(done) {
    req.body.telefones = '';
    res = {
      status: function(status) {
        assert.equal(status, 400);
        return {
          json: function(json) {
            assert.equal(json.mensagem, 'Envie na propriedade telefones um array com um ou mais objetos contendo, telefone e ddd');
            done();
          }
        };
      }
    };
    signUpValidator(req, res);
  }); 

});
