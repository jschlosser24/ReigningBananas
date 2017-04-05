function invite(username, projectName) {
  if (username == "" || projectName == ""){
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
          var query3 = new Parse.Query("UserProjectLookup");
          query3.equalTo("project", project.id).equalTo("user", Parse.User.current().id);
          query3.count({
            success: function(number) {
              if (number == 1){
                var query4 = new Parse.Query("UserProjectLookup");
                query4.equalTo("project", project.id).equalTo("user", user.id);
                query4.count({
                  success: function(number2) {
                    if (number2 == 0) {
                      var projectUser = new Parse.Object("UserProjectLookup");
                      projectUser.set("project", project.id);
                      projectUser.set("user", user.id);
                      projectUser.save(null, {
                        success: function() {
                          alert("User " + username + " was added to group " + projectName + " successfully.");
                          window.location.href = "invite.html";
                        },
                        error: function(error) {
                            alert("Error: " + error.code + " " + error.message);
                        }
                      });
                    } else {
                      alert("Error: Cannot add a user to a project that they are already in.");
                      return;
                    }
                  },
                  error: function() {
                    alert("Error: " + error.code + " " + error.message);
                  }
                });
              }
              if (number == 0){
                alert("Error: Could not invite user to project '" + projectName + "' because you are not a member of that project or user '" + username + "' does not exists.");
                return;
              }
            },
            error: function() {
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
