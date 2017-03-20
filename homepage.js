function getName(){
  var currentUser = Parse.User.current();
  if (currentUser.get("name") != null) {
    document.getElementById('nameText').innerHTML = currentUser.get("name") + "!";
  } else {
    document.getElementById('nameText').innerHTML = currentUser.getUsername() + "!";
  }
}
window.onload = getName;
