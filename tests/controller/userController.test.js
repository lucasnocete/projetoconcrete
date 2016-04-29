'use strict';

var userModel = require('../../models/userModel.js');
var userController = require('../../controllers/userController.js');
var moment = require('moment');
var jwt = require('jwt-simple');
var assert = require('assert');
var mongoose   = require('mongoose'); 
var secret = 'projetoConcrete123';
var req = {};
var res = {};

if (mongoose.connection.readyState < 1) {
  mongoose.connect('mongodb://projetoconcreteteste:projetoconcreteteste@ds021701.mlab.com:21701/projetoconcreteteste', function(err) {
    if (err) {
      console.log('Erro ao connectar', err);
    }
  });
}

describe('Testar userController', function() {

  this.timeout(10000);

  after(function() {
    userModel.remove({}, function() {});
  });

  before(function(done) {
    var models = new userModel({
      nome: 'Lucas Nocete',
      email: 'lucasnocete@globo.com',
      senha: '123456789',
      telefones: [{telefone: '960678047', ddd: '11'}]
    });

    models.save(function(err, data) {
      if (err) {
        console.log('Erro:', err);
      }
      
      var exp = moment().add(30, 'minutes').valueOf();
      var token = jwt.encode({
        iss: data._id,
        exp: exp
      }, secret);

      var expNeg = moment().add(-30, 'minutes').valueOf();
      var tokenNeg = jwt.encode({
        iss: data._id,
        exp: expNeg
      }, secret);

      userModel.update({_id: data._id}, {$set: {token: token}}).exec();
      req = {
        params: {
          _id: data._id
        },
        headers: {
          bearer: token
        },
        tokenNeg: tokenNeg,
        _id: data._id
      };
      done();
    });
  });

  it('Testar busca com sucesso.', function(done) {
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
    userController(req, res);
  }); 

  it('Testar busca com id inválido.', function(done) {
    req.params._id = '5722a641c220e2f11828ab07';
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
    userController(req, res);
  }); 

  it('Testar busca com token diferente.', function(done) {
    req.params._id = req._id;
    req.headers.bearer = req.tokenNeg;
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
    userController(req, res);
  }); 

  it('Testar busca com token expirado.', function(done) {
    req.params._id = req._id;
    req.headers.bearer = req.tokenNeg;
    userModel.update({_id: req._id}, {$set: {token: req.tokenNeg}}).exec();
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
    userController(req, res);
  }); 

});
