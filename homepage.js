function getName() {
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

function getProjects() {
  var currentUser = Parse.User.current();
  var projects = currentUser.get("projects");
  var listProjects = document.getElementById("projectsText");
  for (var i = 0; i < projects.length; i++){
    var query = new Parse.Query("Project");
    query.equalTo("objectId", projects[i]);
    query.get({
      success: function(projects[i]) {
        var projectName = projects[i].get("name");
        var entry = document.createElement("li");
        var link = document.createElement("a");
        link.appendChild(document.createTextNode(projectName));
        a.title = projectName;
        //link will have to go to specific page project
        a.href = "homepage.html";
        entry.appendChild(link);
        listProjects.appendChild(entry);
      },
      error: function(projects[i]) {
        alert("Error: Could not find project with id '" + projects[i] + "' in database");
      }
    });
  }
}
