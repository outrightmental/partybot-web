PartyBot Web Application
========================

author: (http://www.nickkaye.com)[Nick Kaye]
laboratory: (http://www.outrightmental.com)[Outright Mental Inc.]

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

# Production

http://party.botserve.me

# AngularJS + Express Full Stack Generator

Yeoman generator for creating MEAN stack applications, using MongoDB, Express, AngularJS, and Node.

Featuring:

 * Express server integrated with grunt tasks
 * Livereload of client and server files
 * Support for Jade and CoffeeScript
 * Easy deployment workflow.
 * Optional MongoDB integration
 * Optional Passport integration for adding user accounts

## Example project

Generated by saying yes to all questions: http://fullstack-demo.herokuapp.com/.

Have a look at the source code: https://github.com/DaftMonk/fullstack-demo

## Usage

Install `generator-angular-fullstack`:
```bash
npm install -g generator-angular-fullstack
```

Make a new directory, and `cd` into it:
```bash
mkdir my-new-project && cd $_
```

Run `yo angular-fullstack`, optionally passing an app name:
```bash
yo angular-fullstack [app-name]
```

## Express

Launch your express server in development mode.
```bash
grunt serve
```

Launch your express server in production mode, uses the minified/optimized production folder.
```bash
grunt serve:dist
```

### Livereload

`grunt serve` will watch client files in `app/`, and server files inside `lib/`, restarting the Express server when a change is detected.

## Deployment

To generate a dist folder that can easily be deployed use:

```bash
grunt
```

This will run unit tests, jshint, concatenate and minify scripts/css, compress images, add css vendor prefixes, and finally copy all files to a tidy dist folder.

Alternatively to skip tests and jshint, use:

```bash
grunt build
```

### Heroku Deployment

We provide an extremely simplifed deployment process for heroku.

`yo angular-fullstack:deploy heroku` generates a `dist` folder that is deployment ready  for [heroku.com](http://heroku.com/).

**Create and Deploy an app in 4 steps**

1. `mkdir foo && cd foo`

2. `yo angular-fullstack`

3. `yo angular-fullstack:deploy heroku`

4. `cd dist && git push heroku master`

5. Optional (if using mongoDB) `heroku addons:add mongohq`

That's it! Your app should be live and shareable. Type `heroku open` to view it.

## Generators

All of the **generator-angular** client side generators are available, but aliased with `angular-fullstack` to correctly generate with the fullstack folder structure.

Angular sub-generators:

* [angular-fullstack:controller](https://github.com/yeoman/generator-angular#controller)
* [angular-fullstack:directive](https://github.com/yeoman/generator-angular#directive)
* [angular-fullstack:filter](https://github.com/yeoman/generator-angular#filter)
* [angular-fullstack:route](https://github.com/yeoman/generator-angular#route)
* [angular-fullstack:service](https://github.com/yeoman/generator-angular#service)
* [angular-fullstack:provider](https://github.com/yeoman/generator-angular#service)
* [angular-fullstack:factory](https://github.com/yeoman/generator-angular#service)
* [angular-fullstack:value](https://github.com/yeoman/generator-angular#service)
* [angular-fullstack:constant](https://github.com/yeoman/generator-angular#service)
* [angular-fullstack:decorator](https://github.com/yeoman/generator-angular#decorator)
* [angular-fullstack:view](https://github.com/yeoman/generator-angular#view)

Fullstack sub-generators:

* [angular-fullstack:deploy](#deploy)

**Note: Generators are to be run from the root directory of your app.**

Read more on the angular sub-generators from the offical [generator angular documentation][1]

## Fullstack sub-generators

### Deploy
Initalizes a heroku app and generates a `dist` folder which is ready to push to heroku.

To do the same manually, you need to:

1. Build a dist folder
2. Create a Procfile in the dist folder
3. Create a repository: `git init && git add -A && git commit -m "Initial commit"`
4. Create a heroku app: `heroku apps:create && heroku config:set NODE_ENV=production`

Example:
```bash
yo angular-fullstack:deploy heroku
```

After app modifications run:
```bash
grunt build
```
then commit and push the dist folder.

## Options
In general, these options can be applied to any generator, though they only affect generators that produce scripts.

### Jade
For generators that output views, the `--jade` option will output Jade instead of HTML.

For example:
```bash
yo angular-fullstack --jade
```

Changes the rendering engine from EJS to Jade, and generates your views as jade files instead of HTML.

Assets that will be minified or compressed such as scripts, styles, and images, must still use normal html tags so they can be picked up by grunt-usemin and compressed for production builds.

### CoffeeScript
For generators that output scripts, the `--coffee` option will output CoffeeScript instead of JavaScript.

For example:
```bash
yo angular-fullstack:controller user --coffee
```

Produces `app/scripts/controller/user.coffee`:
```coffeescript
angular.module('myMod')
  .controller 'UserCtrl', ($scope) ->
```

A project can mix CoffeScript and JavaScript files.

To output JavaScript files, even if CoffeeScript files exist (the default is to output CoffeeScript files if the generator finds any in the project), use `--coffee=false`.

### Minification Safe

**Deprecated**

[Related Issue #452](https://github.com/yeoman/generator-angular/issues/452): This option is being removed in future versions of the generator.

By default, generators produce unannotated code. Without annotations, AngularJS's DI system will break when minified. [ngMin](https://github.com/btford/ngmin) is used to add these annotations before minification.

### Add to Index
By default, new scripts are added to the index file. However, this may not always be suitable. Some use cases:

* Manually added to the file
* Auto-added by a 3rd party plugin
* Using this generator as a subgenerator

To skip adding them to the index, pass in the skip-add argument:
```bash
yo angular-fullstack:service serviceName --skip-add
```

## Bower Components

The following packages are always installed by the [app](#app) generator:

* angular
* angular-mocks
* angular-scenario


The following additional modules are available as components on bower, and installable via `bower install`:

* angular-cookies
* angular-loader
* angular-resource
* angular-sanitize

All of these can be updated with `bower update` as new versions of AngularJS are released.

## Passport boilerplate

The passport boilerplate requires the `ng-route`, `ng-resource`, and `ng-cookie` modules to work out of the box.

It generates a login, signup, and settings page, and creates the backend support for creating accounts using PassportJS.

### Restricted routes

For restricting server API routes to logged in users, you can pass your routes through the `auth` middleware, which will send a 401 unauthorized error if a request is made from someone thats not authenticated.

The client side will automatically send you to the login page if it receives a 401 error.

However, as this will load part of the page before redirecting, it will cause a flicker. A way to avoid this is to to mark the routes on the client side that you want to require authentication for.

You can do this from your `app.js` by adding the following to any client routes that you want to restrict to logged in users.

```
authenticate: true
```

Keep in mind this client routing is only for improving the user interface. Make sure you secure your server API routes and don't give any sensitive information unless the user is authenticated or authorized.

## Testing

Running `grunt test` will run the unit tests with karma.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a PR, make sure that the commit messages match the [AngularJS conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)


  [1]: https://github.com/yeoman/generator-angular#generators