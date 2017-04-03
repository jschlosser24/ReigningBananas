function createAccount(username, password, firstName, lastName){
  var user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  if (firstName != null){
    user.set("firstName", firstName);
  } else {
    user.set("firstName", "");
  }
  if (lastName != null){
    user.set("lastName", lastName);
  } else {
    user.set("lastName", "");
  }
  var projects = [];
  user.set("projects", projects);

  user.signUp(null, {
    success: function(user) {
      Parse.User.logOut();
      window.location.href = "login.html";
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
