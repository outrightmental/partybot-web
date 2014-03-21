/**
 * Author: Nick Kaye <nick@outrightmental.com>
 * Laboratory: Outright Mental Inc.
 */
describe('Public Relations: Cosmetic Details', function () {
  'use strict';

  // start at root before every test is run
  beforeEach(function() {
    browser().navigateTo('/');
  });

  /*
  // test default route
  it('should jump to the /home path when / is accessed', function() {
    browser().navigateTo('#/');
    expect(browser().location().path()).toBe("/login");
  });

  it('ensures user can log in', function() {
    browser().navigateTo('#/login');
    expect(browser().location().path()).toBe("/login");

    // assuming inputs have ng-model specified, and this conbination will successfully login
    input('email').enter('test@test.com');
    input('password').enter('password');
    element('submit').click();

    // logged in route
    expect(browser().location().path()).toBe("/dashboard");

    // my dashboard page has a label for the email address of the logged in user
    expect(element('#email').html()).toContain('test@test.com');
  });

  it('should keep invalid logins on this page', function() {
    browser().navigateTo('#/login');
    expect(browser().location().path()).toBe("/login");

    // assuming inputs have ng-model specified, and this conbination will successfully login
    input('email').enter('invalid@test.com');
    input('password').enter('wrong password');
    element('submit').click();

    expect(element('#message').html().toLowerCase()).toContain('failed');

    // logged out route
    expect(browser().location().path()).toBe("/login");

  });

*/

});
