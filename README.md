PartyBot Web Application
========================

![PartyBot in the Wild](https://raw.githubusercontent.com/outrightmental/partybot-web/master/doc/2014-03-24-partybot-in-the-wild.jpg)

Author: [Nick Kaye](http://www.nickkaye.com)

Laboratory: [Outright Mental Inc.](http://www.outrightmental.com)

[![Build Status](https://travis-ci.org/outrightmental/partybot-web.png?branch=master)](https://travis-ci.org/outrightmental/partybot-web)

# Production

PartyBot runs full-stack [Javascript](http://en.wikipedia.org/wiki/JavaScript): [MongoDB](https://www.mongodb.org/), [Node.js](http://nodejs.org/) and the [Express](http://expressjs.com/) framework, and [Angular](http://angularjs.org/) on the front-end.

Check out the live broadcast at [http://party.botserve.me](http://party.botserve.me).

Call or text PartyBot at **+1 (718) 690-7272**.

# Integration Testing

PartyBot is fully self-tested, with [Mocha](http://mochajs.org/) &amp; [Chai](http://chaijs.com/) for server unit tests and [Karma](http://karma-runner.github.io/0.12/index.html) &amp; [Jasmine](http://jasmine.github.io/) for client acceptance tests.

[https://travis-ci.org/outrightmental/partybot-web](https://travis-ci.org/outrightmental/partybot-web)

Read all about the [Testing Details](doc/testing.md).

# Workflow

PartyBot is built with [Daftmonk](https://github.com/daftmonk)'s mighty yeoman angular-fullstack generator.

Read all about the [Workflow Details](doc/workflow.md).

# Data

PartyBot is built on MongoDB wrapped with Mongoose.

Read all about the [Data Details](doc/data.md).

# Environment Variables

MongoDB

    MONGOLAB_URI

Facebook

    AUTH_FACEBOOK_CLIENTID
    AUTH_FACEBOOK_CLIENTSECRET
    AUTH_FACEBOOK_CALLBACKURL

Twitter

    AUTH_TWITTER_CONSUMERKEY
    AUTH_TWITTER_CONSUMERSECRET
    AUTH_TWITTER_CALLBACKURL

