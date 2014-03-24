PartyBot Web Application
========================

![PartyBot in the Wild](https://raw.githubusercontent.com/outrightmental/partybot-web/master/doc/2014-03-24-partybot-in-the-wild.jpg)

by [Outright Mental Inc.](http://www.outrightmental.com)

[![Build Status](https://travis-ci.org/outrightmental/partybot-web.png?branch=master)](https://travis-ci.org/outrightmental/partybot-web)

# Production

PartyBot runs full-stack Javascript: MongoDB, Node.js and the Express framework, and Angular on the front-end.

Check out the live broadcast at [http://party.botserve.me](http://party.botserve.me).

Call or text PartyBot at **+1 (718) 690-7272**.

# Integration Testing

PartyBot is fully self-tested, with Mocha &amp; Chai for server unit tests and Karma &amp; Jasmine for client acceptance tests.

[https://travis-ci.org/outrightmental/partybot-web](https://travis-ci.org/outrightmental/partybot-web)

Read all about the [Testing Details](doc/testing.md).

# Workflow

PartyBot is built with the mighty yeoman angular-fullstack generator.

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

