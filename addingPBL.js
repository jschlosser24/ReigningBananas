var projectID = getVar(window.location.href);

function addingPBL(sd, r, f, v, a){
  var storyDescription = sd;
  var role = r;
  var functionality = f;
  var val = v;
  var acceptanceCriteria = a;

  var sizes = document.getElementsByName("size");
  var size = "S";
  for (var i = 0, length = sizes.length; i < length; i++) {
    if (sizes[i].checked) {
      size = sizes[i].value;
      break;
    }
  }

  if(storyDescription.length == 0) {
    storyDescription = "#empty#";
    if(role.length == 0  || functionality.length == 0 || val.length == 0 || acceptanceCriteria.length == 0) {
      alert("You do not have all of the necessary fields completed. Please fill out the description and/or the template and acceptance criteria");
      return;
    }
  }
  if(role.length == 0) {
    role = "#empty#";
  }
  if(functionality.length == 0) {
    functionality = "#empty#";
  }
  if(val.length == 0) {
    val = "#empty#";
  }
  if (acceptanceCriteria.length == 0) {
    acceptanceCriteria = "#empty#";
  }

  var user = Parse.User.current();

  var query = new Parse.Query("ScrumBoardItems");
  query.equalTo("projectId", projectID).equalTo("column", 0);
  query.find({
    success: function(items) {
      for (var i = 0; i < items.length; i++){
        var row = items[i].get("row");
        items[i].set("row", row + 1);
        items[i].save();
      }
      var pbl = new Parse.Object("ScrumBoardItems");
      pbl.set("description", storyDescription);
      pbl.set("role", role);
      pbl.set("functionality", functionality);
      pbl.set("value", val);
      pbl.set("acceptanceCriteria", acceptanceCriteria);
      pbl.set("size", size);
      pbl.set("addedBy", user.id);
      pbl.set("projectId", projectID);
      pbl.set("column", 0);
      pbl.set("row", 0);
      pbl.save();
    }
  });
  alert("Your item was successfully saved");
}

function getVar(str) {
  var point = str.lastIndexOf("=");
  return str.substring(point+1,str.length);
}

function sendProjectId() {
  var link = document.getElementById("goBackButton");
  link.href = "scrumBoard.html?project=" + projectID;
}
