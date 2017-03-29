function invite(username, projectName) {
  if (username == null || projectName == null){
    alert("Please fill out all fields before submitting.");
  }
  var user = Parse.Object.extend("User");
  var project = Parse.Object.extend("Project");
  var query = new Parse.Query("User");
  query.equalTo("username", username);
  query.get({
    success: function(user) {
      var query2 = new Parse.Query("Project");
      query.equalTo("name", projectName);
      query.get({
        success: function(project) {
          var objectId = project.get("objectId");
          var projectArray = user.get("projects");
          projectArray.push(objectId);
          user.set("projects", projectArray);
          window.location.href = "invite.html"
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
