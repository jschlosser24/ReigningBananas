function newProject(newProjectName, description){

  var project = new Parse.Object("Projects");
  project.set("name", newProjectName);
  project.set("description", description);

  var user = Parse.User.current()
  var projectArray = user.get("projects");
  var query = new Parse.Query("Projects")
  query.equalTo("name", newProjectName);
  query.count({
    success: function(number){
      if(number == 0){
        project.save(null, {
          success: function() {
            projectArray.push(project.id);
            user.set("projects", projectArray);
            user.save(null, {
              success: function() {
                alert("success");
              },
              error: function(error){
              }
            });
          },
          error: function(error){
          }
        });
    }

    },
    error: function(error){

    }
  });
}

/**Parse.Object current( )
Retrieves the currently logged in ParseUser with a valid session, either from memory or localStorage, if necessary.


Returns: <Parse.Object>
The currently logged in Parse.User.**/
