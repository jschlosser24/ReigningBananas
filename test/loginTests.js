$(document).ready(function () {

  QUnit.test("login", function(assert) {
    assert.expect(1);
    login("user4", "pass4")
    assert.equal(window.location.href, "../homepage.html", "login goes to homepage with accurate user")
  });

  // QUnit.test("homepage", function(assert) {
  //   assert.expect(2);
  //
  //   var nameText = $("div[id$=nameText]");
  //   var name = "Kevin";
  //
  //   assert.ok(nameText, "nameText input exists and made it to the homepage");
  //
  //   assert.equal(getName(), name, "The logged in user should have the name kevin");
  //
  // });
});
