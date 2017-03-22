$(document).ready(function () {

QUnit.module("Good accounts");
  QUnit.test("Create Account good", function(assert) {
    var username = "resu";
    var password = "ssap";
    var firstName = "tsrif";
    var lastName = "tsal";

    createAccount(username, password, firstName, lastName);
    var query = new Parse.Query("User");
    query.equalTo("username", "resu");
    query.find({
      success: function() {
        window.location.href = "test/success.html";
      },
      error: function() {
        window.location.href = "test/failed.html";
      }
    });
  });

QUnit.module("Bad accounts");
  QUnit.test("Create Account missing username", function(assert) {
    var username = "";
    var password = "ssap";
    var firstName = "tsrif";
    var lastName = "tsal";

    createAccount(username, password, firstName, lastName);
    setTimeout(function () {
      assert.notEqual(window.location.href, "http://localhost/ReigningBananas/test/login.html", "does not go to login page after creating a new user");
      start();
    }, 1000);
  });

});
