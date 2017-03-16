var Browser = require('zombie');

var browser = new Browser({ debug: true, runSctipts: true, maxWait: 10000, waitFor: 1000 });
browser.visit('https://localhost:8080/login', function() {
  browser.assert.text('title', 'Reigning Bananas Login');
});

describe('login page', function () {
  before(function(done) {
    browser.fill('usernameText', 'user4').fill('passwordText', 'pass4').pressButton('loginButton', done());
  });

  it('should be successful', function() {
    browser.assert.success();
  });

  it('should see the welcome page', function() {
    browser.assert.text('h1', 'Welcome to the page Kevin!');
  });
});
