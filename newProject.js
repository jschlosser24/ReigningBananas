function newProject(newProjectName, description){

  Parse.User.projects.add(newProjectName, {
    success: function(user) {
      window.location.href = "homepage.html";
    },
    error: function(user, error) {
      alert("Error: " + error.code + " " + error.message);
    }
});
}

/**Parse.Object current( )
Retrieves the currently logged in ParseUser with a valid session, either from memory or localStorage, if necessary.


Returns: <Parse.Object>
The currently logged in Parse.User.**/
