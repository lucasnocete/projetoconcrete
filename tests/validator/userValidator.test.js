'use strict';

var userValidator = require('../../validator/userValidator.js');
var assert = require('assert');
var req = {};
var res = {};

describe('Testar userValidator', function() {

  beforeEach(function() {
    req = {
      params: {
        _id: '5722a6b3ab262c541968c9c6'
      },
      headers: {
        bearer: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NzIyYTZiM2FiMjYyYzU0MTk2OGM5YzYiLCJleHAiOjE0NjE4OTA0OTE5Nzl9.fJraDX76RUFWrYeWaqi3EuLoCLJ-8zmHoi1ZEqXOZB8'
      }
    };
  });

  it('Testar validação com dados OK', function(done) {
    userValidator(req, done());
  });  

  it('Testar validação sem id', function(done) {
    req.params._id = '';
    res = {
      status: function(status) {
        assert.equal(status, 400);
        return {
          json: function(json) {
            assert.equal(json.mensagem, 'Faltou o id do usuário');
            done();
          }
        };
      }
    };
    userValidator(req, res);
  });  

  it('Testar validação sem token', function(done) {
    req.headers.bearer = '';
    res = {
      status: function(status) {
        assert.equal(status, 401);
        return {
          json: function(json) {
            assert.equal(json.mensagem, 'Não autorizado');
            done();
          }
        };
      }
    };
    userValidator(req, res);
  });  

});
