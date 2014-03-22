describe('Controller: MainCtrl', function () {
  'use strict';

  // load the controller's module
  beforeEach(module('partybotWebApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have scope', function () {
    expect(scope).toBeDefined();
  });

});
