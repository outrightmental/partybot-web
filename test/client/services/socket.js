'use strict';

describe('Service: socket', function () {

  console.log('balls');

  // load the service's module
  beforeEach(module('partybotWebApp'));

  // instantiate service
  var socket;
  beforeEach(inject(function (_socket_) {
    socket = _socket_;
  }));

  it('should do something', function () {
    expect(socket).toBeDefined();
  });

});