function addingPBL(storyDescription, role, functionality, val, acceptanceCriteria, size){
  var user = Parse.User.current();

  var description = stortDescription.value;
  var acceptance = acceptanceCriteria.value

  var pbl = new Parse.Object("ScrumBoardItems");

  pbl.save(null, {
    success: function() {
      pbl.set("description", description);
      pbl.set("role", role);
      pbl.set("functionality", functionality);
      pbl.set("value", val);
      pbl.set("acceptanceCriteria", acceptance);
      pbl.set("size", size);
      pbl.set("addedBy", user.id);
    }, error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
