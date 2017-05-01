var projectID = getVar(window.location.href);

function addingPBL(storyDescription, role, functionality, val, acceptanceCriteria, size){
  var user = Parse.User.current();

  var description = storyDescription.value;
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
      pbl.set("projectId", projectID);
      pbl.set("column", 0);
      pbl.set("row", 0);
      var id = pbl.id;
      var query = new Parse.Query("ScrumBoardItems");
      query.equalTo("projectId", projectID).notEqualTo("objectId", id);
      query.find({
        success: function(items) {
          for (var i = 0; i < items.length; i++){
            var row = items[i].get("row");
            items[i].set("row", row + 1);
            items.save();
          }
        }
    }, error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

function getVar(str) {
  var point = str.lastIndexOf("=");
  return str.substring(point+1,str.length);
}
