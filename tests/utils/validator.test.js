'use strict';

var utils = require('../../utils/').validator;
var assert = require('assert');

describe('Testar funções de validação', function() {

  describe('função validPhones', function() {

    it('testar validação de telefone e ddd OK', function(done) {
      var result = utils.validPhones([{telefone: '960678047', ddd: '11'}]);
      assert.equal(result, false);
      done();
    });  

    it('testar validação de telefone e ddd com mais de um OK', function(done) {
      var result = utils.validPhones([{telefone: '960678047', ddd: '11'}, {telefone: '960678048', ddd: '11'}]);
      assert.equal(result, false);
      done();
    });  

    it('testar validação de telefone e ddd com propriedade telefone inválida', function(done) {
      var result = utils.validPhones([{telefon: '960678047', ddd: '11'}]);
      assert.equal(result, true);
      done();
    });  

    it('testar validação de telefone e ddd com propriedade ddd inválido', function(done) {
      var result = utils.validPhones([{telefone: '960678047', dd: '11'}]);
      assert.equal(result, true);
      done();
    });  

    it('testar validação de telefone e ddd com telefone inválido', function(done) {
      var result = utils.validPhones([{telefone: '9999999', ddd: '11'}]);
      assert.equal(result, true);
      done();
    });  

    it('testar validação de telefone e ddd com ddd inválido', function(done) {
      var result = utils.validPhones([{telefone: '960678047', ddd: '01'}]);
      assert.equal(result, true);
      done();
    });  

    it('testar validação de telefone e ddd com mais de um telefone e ddd valido e outro inválido', function(done) {
      var result = utils.validPhones([{telefone: '960678047', ddd: '11'}, {telefone: '9999999', ddd: '11'}]);
      assert.equal(result, true);
      done();
    });  

    it('testar validação de telefone e ddd com mais de um telefone e ddd inválidos', function(done) {
      var result = utils.validPhones([{telefone: '9999991', ddd: '01'}, {telefone: '1999999', ddd: '01'}]);
      assert.equal(result, true);
      done();
    });  

    it('testar validação de telefone e ddd com mais de 2 propriedade', function(done) {
      var result = utils.validPhones([{telefone: '960678047', ddd: '11', ddi: '55'}]);
      assert.equal(result, true);
      done();
    });  

    it('testar validação de telefone e ddd com array vazio', function(done) {
      var result = utils.validPhones([]);
      assert.equal(result, true);
      done();
    });
    
  });  

  describe('função validEmail', function() {    

    it('testar validação de email OK', function(done) {
      var result = utils.validEmail('lucasnocete@hotmail.com');
      assert.equal(result, true);
      done();
    });

    it('testar validação de email sem @', function(done) {
      var result = utils.validEmail('lucasnocetehotmail.com');
      assert.equal(result, false);
      done();
    });

    it('testar validação de email sem dominio', function(done) {
      var result = utils.validEmail('lucasnocete@');
      assert.equal(result, false);
      done();
    });

    it('testar validação de email vazio', function(done) {
      var result = utils.validEmail('');
      assert.equal(result, false);
      done();
    });

  });

});
