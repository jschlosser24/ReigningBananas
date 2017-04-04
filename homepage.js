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
  var query = new Parse.Query("UserProjectLookup");
  query.equalTo("user", currentUser.id);
  query.find({
    success: function(projects) {
      var listProjects = document.getElementById("projectsListText");
      for (var i = 0; i < projects.length; i++){
        var query2 = new Parse.Query("Projects");
        query2.get(projects[i].get("project"), {
          success: function(project) {
            var projectName = project.get("name");
            var entry = document.createElement("li");
            var link = document.createElement("a");
            var text = document.createTextNode(projectName);
            link.appendChild(text);
            link.title = projectName;
            link.href = "homepage.html";  //link will have to go to specific project page
            entry.appendChild(link);
            listProjects.appendChild(entry);
          },
          error: function() {
            alert("Error: Could not find project with id '" + projects[i] + "' in database");
          }
        });
      }
    }
  });
}
