function invite(username, projectName) {
  if (username == null || projectName == null){
    alert("Please fill out all fields before submitting.");
  }
  var user = Parse.Object.extend("User");
  var project = Parse.Object.extend("Project");
  var query = new Parse.Query("User");
  query.equalTo("username", username);
  user = query.getFirst();  //get user
  var projectArray = user.get("projects");  //get array of projects the user is a part of
  var query2 = new Parse.Query("Project");
  query2.equalTo("name", projectName);
  project = query2.getFirst();  //get project
  var projectId = project.get("objectId");  //get object id of project
  projectArray.push(projectId); //add object id to array of projects the user is a part of
  user.set("projects", projectArray); //set the new project array to include the added project
  // query.get({
  //   success: function(user) {
  //     var query2 = new Parse.Query("Project");
  //     query.equalTo("name", projectName);
  //     query.get({
  //       success: function(project) {
  //         var objectId = project.get("objectId");
  //         var projectArray = user.get("projects");
  //         projectArray.push(objectId);
  //         user.set("projects", projectArray);
  //         alert("User " + username + " was added to group " + projectName + " successfully.")
  //         window.location.href = "invite.html"
  //       },
  //       error: function(projectName) {
  //         alert("Error: Could not find project '" + projectName + "' in database");
  //       }
  //     });
  //   },
  //   error: function(username) {
  //     alert("Error: Could not find user '" + username + "' in database.");
  //   }
  // });
}
