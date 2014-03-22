'use strict';

describe('Service: Broadcast', function () {

  // load the service's module
  beforeEach(module('partybotWebApp'));

  // instantiate service
  var Broadcast;
  beforeEach(inject(function (_Broadcast_) {
    Broadcast = _Broadcast_;
  }));

  it('should do something', function () {
    expect(!!Broadcast).toBe(true);
  });

});
