var Browser = require('zombie');

var browser = new Browser({ debug: true, runSctipts: true, maxWait: 10000, waitFor: 1000 });
browser.visit("https://localhost/login.html", function() {
  browser.assert.text('title', 'Reigning Bananas Login');
});
describe('login page', function () {
  // before(function(done) {
  //   var browser = new Browser({ debug: true, runSctipts: true, maxWait: 10000, waitFor: 1000 });
  //   browser.visit("login.html", done);
  // });

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

// module.exports = {
//   'Test login' : function (browser) {
//     browser
//       .url('login.html')
//       .waitForElementVisible('body', 1000)
//       .setValue('input[id=usernameText]', 'user4')
//       .setValue('input[id=passwordText]', 'pass4')
//       .click('input[id=loginButton]')
//       .pause(1000)
//       .waitForElementVisible('body', 1000)
//       .assert.containsText('h1', 'Welcome to the page Kevin!')
//       .end();
//   }
// };
