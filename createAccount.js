function createAccount(){
  var usernameText = document.getElementById('usernameText');
  var passwordText = document.getElementById('passwordText');
  var firstNameText = document.getElementById('firstNameText');
  var lastNameText = document.getElementById('lastNameText');

  var user = new Parse.User();
  user.set("username", usernameText.value);
  user.set("password", passwordText.value);
  if (firstNameText.value != null){
    user.set("firstName", firstNameText.value);
  } else {
    user.set("firstName", "");
  }
  if (lastNameText.value != null){
    user.set("lastName", lastNameText.value);
  } else {
    user.set("lastName", "");
  }

  user.signUp(null, {
    success: function(user) {
      Parse.User.logOut();
      window.location.href = 'login.html';
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
