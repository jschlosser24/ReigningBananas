function newProject(newProjectName, description){

  var project = new Parse.Object("Projects");
  project.add(newprojectName, "name");
  project.add(description, "description");

  var user = ParseUser.current()
  var projectArray = user.get("project");

  var count = 0;
  var query = new Parse.Query("Projects")
  query.equalTo("name", newProjectName);
  query.count({
    success: function(number){
      count = number;
    },
    error: function(error){

    }
  });
  if(count == 0){
    project.save({
      success: function() {
        projectArray.add(project.id);
        user.save({
          success: function() {
            console.log("success");
          },
          error: function(error){
          }
          }
        });
      },
      error: function(error){
        console.log("error");
      });
    }
}

/**Parse.Object current( )
Retrieves the currently logged in ParseUser with a valid session, either from memory or localStorage, if necessary.


Returns: <Parse.Object>
The currently logged in Parse.User.**/
