var projectId = getVar(window.location.href);//global variable for the projectId

function loadScrumBoard() {
  var board = document.getElementById("board");
  var pblList = document.getElementById("pblList");
  var sblList = document.getElementById("sblList");
  var todoList = document.getElementById("todoList");
  var doingList = document.getElementById("doingList");
  var completeList = document.getElementById("completeList");

  var query = new Parse.Query("ScrumBoardItems");
  query.equalTo("projectId", projectId).ascending("row");
  query.find({
    success: function(sb) {
      for (var i = 0; i < sb.length; i++) {
        var moveUp = document.createElement("button");
        moveUp.innerHTML = "Move up";
        var moveDown = document.createElement("button");
        moveDown.innerHTML = "Move down";
        var item = sb[i];
        if (item.get("column") == 0){
          var listItem = document.createElement("li");
          listItem.setAttribute("class", "item");
          listItem.innerHTML = "Description: " + item.get("description") +
          "<br><br>As a " + item.get("role") + " I want " + item.get("functionality") + " so I " + item.get("value") +
          "<br><br>Acceptance criteria: " + item.get("acceptanceCriteria") +
          "<br><br>Size: " + item.get("size") + "<br><br>";
          moveUp.item = item;
          moveDown.item = item;
          moveUp.onclick = buttonUp;
          moveDown.onclick = buttonDown;
          listItem.appendChild(moveUp);
          listItem.appendChild(moveDown);
          pblList.appendChild(listItem);
        } else if (item.get("column") == 1){
          var listItem = document.createElement("li");
          listItem.setAttribute("class", "item");
          listItem.innerHTML = "Description: " + item.get("description") +
          "<br><br>As a " + item.get("role") + " I want " + item.get("functionality") + " so I " + item.get("value") +
          "<br><br>Acceptance criteria: " + item.get("acceptanceCriteria") +
          "<br><br>Size: " + item.get("size") + "<br><br>";
          moveUp.item = item;
          moveDown.item = item;
          moveUp.onclick = buttonUp;
          moveDown.onclick = buttonDown;
          listItem.appendChild(moveUp);
          listItem.appendChild(moveDown);
          sblList.appendChild(listItem);
        } else if (item.get("column") == 2){
          var listItem = document.createElement("li");
          listItem.setAttribute("class", "item");
          listItem.innerHTML = "Task"; // enter info for task item
          moveUp.item = item;
          moveDown.item = item;
          moveUp.onclick = buttonUp;
          moveDown.onclick = buttonDown;
          listItem.appendChild(moveUp);
          listItem.appendChild(moveDown);
          todoList.appendChild(listItem);
        } else if (item.get("column") == 3){
          var listItem = document.createElement("li");
          listItem.setAttribute("class", "item");
          listItem.innerHTML = "Task"; // enter info for task item
          moveUp.item = item;
          moveDown.item = item;
          moveUp.onclick = buttonUp;
          moveDown.onclick = buttonDown;
          listItem.appendChild(moveUp);
          listItem.appendChild(moveDown);
          doingList.appendChild(listItem);
        } else if (item.get("column") == 4){
          var listItem = document.createElement("li");
          listItem.setAttribute("class", "item");
          listItem.innerHTML = "Task"; // enter info for task item
          moveUp.item = item;
          moveDown.item = item;
          moveUp.onclick = buttonUp;
          moveDown.onclick = buttonDown;
          listItem.appendChild(moveUp);
          listItem.appendChild(moveDown);
          completeList.appendChild(listItem);
        } else {
          alert("Task with description: '" + item.get("description") + "' is not in a available column.")
        }
      }
    }
  });
}

function getVar(str) {
  var point = str.lastIndexOf("=");
  return str.substring(point+1,str.length);
}

function buttonUp() {
  var change = true;
  var oldRow = this.item.get("row");
  var newRow = oldRow - 1;
  if (newRow >= 0) {
    var query = new Parse.Query("ScrumBoardItems");
    query.equalTo("projectId", projectId).equalTo("column", this.item.get("column")).equalTo("row", newRow);
    query.first({
      success: function(switchItem) {
        if (switchItem == null){
          change = false;
        } else {
          switchItem.set("row", oldRow);
          switchItem.save();
        }
      }
    });
    if (change) {
      this.item.set("row", newRow);
      this.item.save();
    }
  } else {
    alert("Cannot move this item any further up");
    return;
  }
  alert("BEFORE CONTINUING EDITING: Refresh the page for the changes to take effect.");
}

function buttonDown() {
  var change = true;
  var tempItem = this.item;
  var column = tempItem.get("column");
  var oldRow = tempItem.get("row");
  var newRow = oldRow + 1;
  var maxRow = 1;
  var query2 = new Parse.Query("ScrumBoardItems");
  query2.equalTo("projectId", projectId).equalTo("column", column).descending("row");
  query2.first({
    success: function(maxItem) {
      maxRow = maxItem.get("row");
      if (newRow <= maxRow) {
        var query = new Parse.Query("ScrumBoardItems");
        query.equalTo("projectId", projectId).equalTo("column", column).equalTo("row", newRow);
        query.first({
          success: function(switchItem) {
            if (switchItem == null){
              change = false;
            } else {
              switchItem.set("row", oldRow);
              switchItem.save();
            }
          }
        });
        if (change) {
          tempItem.set("row", newRow);
          tempItem.save();
        }
      } else {
        alert("Cannot move this item any further down");
        return;
      }
    }
  });
  alert("BEFORE CONTINUING EDITING: Refresh the page for the changes to take effect.");
}
