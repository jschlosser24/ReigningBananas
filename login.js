function login(){
  var usernameText = document.getElementById('usernameText');
  var passwordText = document.getElementById('passwordText');

  Parse.User.logIn(usernameText.value, passwordText.value, {
    success: function(user) {
      window.location.href = 'homepage.html';
    },
    error: function(user, error) {
      alert("Error: " + error.code + " " + error.message);
    }
});
