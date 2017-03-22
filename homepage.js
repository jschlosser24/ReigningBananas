function getName(){
  var currentUser = Parse.User.current();
  if (currentUser.get("firstName") != null) {
    if (currentUser.get("lastName") != null) {
      document.getElementById("nameText").innerHTML = currentUser.get("firstName") + " " + currentUser.get("lastName") + "!";
    } else {
      document.getElementById("nameText").innerHTML = currentUser.get("firstName") + "!";
    }
  } else {
    document.getElementById("nameText").innerHTML = currentUser.getUsername() + "!";
  }
}
