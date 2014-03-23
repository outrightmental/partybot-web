/**
 * @author Nick Kaye <nick@outrightmental.com>
 * @lab Outright Mental Inc.
 */
var
  should = require('should'),
  moment = require('moment');

// tolerance for 'now' in seconds
var nowToleranceSeconds = 1;

/**
 * Asserts
 */
exports.shouldBeNow = function (time) {
  (moment(time).unix()).should.not.be.below(moment().unix()-nowToleranceSeconds);
  (moment(time).unix()).should.not.be.above(moment().unix()+nowToleranceSeconds);
};
