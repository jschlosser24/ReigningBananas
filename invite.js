function invite(username, projectName) {
  if (username == null || projectName == null){
    alert("Please fill out all fields before submitting.");
    return;
  }
  var user = Parse.User;
  var project = Parse.Object.extend("Projects");
  var query = new Parse.Query(Parse.User);
  query.equalTo("username", username);
  query.first({
    success: function(foundUser) {
      user = foundUser;
      var query2 = new Parse.Query("Projects");
      query2.equalTo("name", projectName);
      query2.first({
        success: function(foundProject) {
          project = foundProject;
          var projectObjectId = project.id;
          var userObjectId = user.id;
          var projectUser = new Parse.Object("UserProjectLookup");
          projectUser.set("project", projectObjectId);
          projectUser.set("user", userObjectId);
          projectUser.save(null, {
            success: function() {
              alert("User " + username + " was added to group " + projectName + " successfully.");
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
          });
        },
        error: function(projectName) {
          alert("Error: Could not find project '" + projectName + "' in database");
        }
      });
    },
    error: function(username) {
      alert("Error: Could not find user '" + username + "' in database.");
    }
  });
}
