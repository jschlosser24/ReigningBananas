function addingPBL(storyDescription, role, functionality, val, acceptanceCriteria, size){
  var user = Parse.User.current();

  var description = stortDescription.value;
  var acceptance = acceptanceCriteria.value

  var pbl = new Parse.Object("ProductBacklog");

  pbl.save({
    success: function() {
      pbl.set("Description", description);
      pbl.set("Role", role);
      pbl.set("Functionality", functionality);
      pbl.set("Value", val);
      pbl.set("AcceptanceCriteria", acceptance);
      pbl.set("Size", size);
      pbl.set("AddedBy", user.id);
    }, error: function(error) {
      alert("what the fuck");
      alert(error);
    }
  });
}
