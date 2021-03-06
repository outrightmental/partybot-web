'use strict';

var chai = require('chai'),
  should = require('should'),
  mongoose = require('mongoose');

// mock the database
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var app = require('../../../../server'),
    request = require('supertest');

describe('GET /api/incoming/sms', function() {
  it('should respond with TwiML', function(done) {
    request(app)
      .get('/api/incoming/sms')
      .expect(200)
      .expect('Content-Type', /xml/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/incoming/sms', function() {
  it('should respond with TwiML', function(done) {
    request(app)
      .post('/api/incoming/sms')
      .expect(200)
      .expect('Content-Type', /xml/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});