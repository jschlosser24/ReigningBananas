function createProject(newProjectName, d){
  var description = d;
  if (newProjectName.length == 0) {
    alert("Error: Project name required.");
    return;
  }

  var project = new Parse.Object("Projects");
  project.set("name", newProjectName);
  if (description.length == 0) {
    description = "#empty#";
  }
  project.set("description", description);
  var projectId = project.id;

  var user = Parse.User.current();

  var query = new Parse.Query("Projects");
  query.equalTo("name", newProjectName);
  query.count({
    success: function(number){
      if(number == 0){
        project.save(null, {
          success: function() {
            var userProject = new Parse.Object("UserProjectLookup");
            userProject.set("user", user.id);
            userProject.set("project", project.id);
            userProject.save(null, {
              success: function(){
                alert("Project " + newProjectName + " was created successfully.");
                window.location.href = "createProject.html";
              },
              error: function(error){
                alert("Error: " + error.code + " " + error.message);
              }
            });
          },
          error: function(error){
            alert("Error: " + error.code + " " + error.message);
          }
        });
      }
      if (number == 1) {
        alert("Error: Cannot create project that already exists. Try a different project name.")
      }
    },
    error: function(error){
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
