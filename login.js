function login(username, password){
  Parse.User.logIn(username, password, {
    success: function(user) {
      window.location.href = 'homepage.html';
    },
    error: function(user, error) {
      alert("Error: " + error.code + " " + error.message);
    }
});
}
