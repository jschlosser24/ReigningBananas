$(document).ready(function () {

  QUnit.test("login", function(assert) {
    var username = "user4";
    var password = "pass4";
    var usernameText = $("input[id$=usernameText]");
    var passwordText = $("input[id$=passwordText]");
    var loginButton = $("input[id$=loginButton]");
    assert.ok(usernameText, "usernameText input exists");
    assert.ok(passwordText, "passwordText input exists");

    usernameText.val(username);
    passwordText.val(password);
    loginButton.trigger("click");
  });

  QUnit.test("homepage", function(assert) {
    var nameText = $("div[id$=nameText]");
    var name = "Kevin";
    
    assert.ok(nameText, "nameText input exists and made it to the homepage");

    assert.equal(getName(), name, "The logged in user should have the name kevin");

  });
});
