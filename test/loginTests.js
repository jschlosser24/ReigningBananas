$(document).ready(function () {

  QUnit.test("login", function(assert) {
    login("user4", "pass4")
    assert.equal(window.location.href, "homepage.html", "login goes to homepage with accurate user")
  });
});
