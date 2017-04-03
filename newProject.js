function newProject(newProjectName, description){

  var project = new Parse.Object("Projects");

  var user = Parse.User.current()
  var projectArray = user.get("projects");

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
        project.set("name", newProjectName.value);
        project.set("description", description.value);
        projectArray.add(project.id);
        user.save({
          success: function() {
            //console.log("success");
          },
          error: function(error){
          }
        });
      },
      error: function(error){
        //console.log("error");
      }
    });
  }
}

/**Parse.Object current( )
Retrieves the currently logged in ParseUser with a valid session, either from memory or localStorage, if necessary.


Returns: <Parse.Object>
The currently logged in Parse.User.**/
