$(document).ready(function () {

  QUnit.test("login", function(assert) {
    var done = assert.async();
    var signedin = false;
    login("user4", "pass4");
    var query = new Parse.Query("Session");
    query.equalTo("user", "cMZToXCuDY");
    query.find({
      success: function() {
        window.location.href = "test/success.html";
      },
      error: function() {
        window.location.href = "test/failed.html";
      }
    });
  });
});
