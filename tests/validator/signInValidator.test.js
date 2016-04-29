'use strict';

var signInValidator = require('../../validator/signInValidator.js');
var assert = require('assert');
var req = {};
var res = {};

describe('Testar signInValidator', function() {

  beforeEach(function() {
    req = {
      body: {
        email: 'lucasnocete@globo.com',
        senha: '123456789'
      }
    };
  });

  it('Testar validação com dados OK', function(done) {
    signInValidator(req, done());
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
    signInValidator(req, res);
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
    signInValidator(req, res);
  }); 

});
