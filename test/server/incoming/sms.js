'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('GET /api/incoming/voice', function() {
  it('should respond with TwiML', function(done) {
    request(app)
      .get('/api/incoming/voice')
      .expect(200)
      .expect('Content-Type', /xml/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

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