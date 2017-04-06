function createProject(newProjectName, description){

  var project = new Parse.Object("Projects");
  project.set("name", newProjectName);
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
    },
    error: function(error){
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
