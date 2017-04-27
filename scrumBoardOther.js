// Do something similar but instead of a table use 5 different lists as the columns.


var projectId = getVar(window.location.href);//global variable for the projectId

function loadScrumBoard() {
  var board = document.getElementById("scrumBoard");
  var table = document.createElement("div");
  table.setAttribute("class", "table");
  var tableBody = document.createElement("div");
  tableBody.setAttribute("class", "tableBody");
  var headerRow = document.createElement("div");
  headerRow.setAttribute("class", "tableRow");

  var pblHeader = document.createElement("div");
  pblHeader.setAttribute("class", "tableHeader");
  pblHeader.innerHTML = "Product Backlog";
  headerRow.appendChild(pblHeader);

  var sblHeader = document.createElement("div");
  sblHeader.setAttribute("class", "tableHeader");
  sblHeader.innerHTML = "Sprint Backlog";
  headerRow.appendChild(sblHeader);

  var todoHeader = document.createElement("div");
  todoHeader.setAttribute("class", "tableHeader");
  todoHeader.innerHTML = "TODO";
  headerRow.appendChild(todoHeader);

  var doingHeader = document.createElement("div");
  doingHeader.setAttribute("class", "tableHeader");
  doingHeader.innerHTML = "Doing";
  headerRow.appendChild(doingHeader);

  var completeHeader = document.createElement("div");
  completeHeader.setAttribute("class", "tableHeader");
  completeHeader.innerHTML = "Complete";
  headerRow.appendChild(completeHeader);
  tableBody.appendChild(headerRow);

  var query = new Parse.Query("ScrumBoardItems");
  query.equalTo("projectId", projectId);
  query.find({
    success: function(sb) {
      var totalRow = 0;
      for (var j = 0; j < sb.length; j++) {
        if (sb[j].get("row") > totalRow) {
          totalRow = sb[j].get("row");
        }
      }

      var cell0 = document.createElement("div");
      var cell1 = document.createElement("div");
      var cell2 = document.createElement("div");
      var cell3 = document.createElement("div");
      var cell4 = document.createElement("div");
      var moveUp = document.createElement("button");
      moveUp.innerHTML = "Move up";
      var moveDown = document.createElement("button");
      moveDown.innerHTML = "Move down";
      var rows = [];

      for (var i = 0; i <= totalRow; i++){
        var row = document.createElement("div");
        row.setAttribute("class", "tableRow");

        for (var currentColumn = 0; currentColumn <= 4; currentColumn++){
          switch (currentColumn) {
            case 0:
            // pbl items
            var pblQuery = new Parse.Query("ScrumBoardItems");
            pblQuery.equalTo("projectId", projectId).equalTo("column", 0).equalTo("row", i);
            pblQuery.first({
              success: function(item) {
                if (item == null) {
                  cell0.setAttribute("class", "tableHiddenCell");
                } else {
                  cell0.setAttribute("class", "tableCell");
                  var cellText = "Description: " + item.get("description") +
                  "<br><br>As a " + item.get("role") + " I want " + item.get("functionality") + " so I " + item.get("value") +
                  "<br><br>Acceptance criteria: " + item.get("acceptanceCriteria") +
                  "<br><br>Size: " + item.get("size");
                  cell0.innerHTML = cellText;
                  moveUp.addEventListener ("click", function() {
                    reorder(item, -1);
                  });
                  moveDown.addEventListener ("click", function() {
                    reorder(item, 1);
                  });
                  cell0.appendChild(document.createElement("br"));
                  cell0.appendChild(moveUp);
                  cell0.appendChild(moveDown);
                }
              }
            });
            break;

            case 1:
            // sbl items
            var sblQuery = new Parse.Query("ScrumBoardItems");
            sblQuery.equalTo("projectId", projectId).equalTo("column", 1).equalTo("row", i);
            sblQuery.first({
              success: function(item) {
                var childBefore = row.firstChild;
                if (item == null) {
                  cell1.setAttribute("class", "tableHiddenCell");
                } else {
                  cell1.setAttribute("class", "tableCell");
                  var cellText = "Description: " + item.get("description") +
                  "<br><br>As a " + item.get("role") + " I want " + item.get("functionality") + " so I " + item.get("value") +
                  "<br><br>Acceptance criteria: " + item.get("acceptanceCriteria") +
                  "<br><br>Size: " + item.get("size");
                  cell1.innerHTML = cellText;
                }
              }
            });
            break;

            case 2:
            // todo items
            var todoQuery = new Parse.Query("ScrumBoardItems");
            todoQuery.equalTo("projectId", projectId).equalTo("column", 2).equalTo("row", i);
            todoQuery.first({
              success: function(item) {
                if (item == null) {
                  cell2.setAttribute("class", "tableHiddenCell");
                } else {
                  cell2.setAttribute("class", "tableCell");
                  var cellText = "test2"; // replace "test" with the text that you want
                  cell2.innerHTML = cellText;
                }
              }
            });
            break;

            case 3:
            // doing items
            var doingQuery = new Parse.Query("ScrumBoardItems");
            doingQuery.equalTo("projectId", projectId).equalTo("column", 3).equalTo("row", i);
            doingQuery.first({
              success: function(item) {
                if (item == null) {
                  cell3.setAttribute("class", "tableHiddenCell");
                } else {
                  cell3.setAttribute("class", "tableCell");
                  var cellText = "test3"; // replace "test" with the text that you want
                  cell3.innerHTML = cellText;
                }
              }
            });
            break;

            case 4:
            // complete items
            var completeQuery = new Parse.Query("ScrumBoardItems");
            completeQuery.equalTo("projectId", projectId).equalTo("column", 4).equalTo("row", i);
            completeQuery.first({
              success: function(item) {
                if (item == null) {
                  cell4.setAttribute("class", "tableHiddenCell");
                } else {
                  cell4.setAttribute("class", "tableCell");
                  var cellText = "test4"; // replace "test" with the text that you want
                  cell4.innerHTML = cellText;
                }
              }
            });
            break;
          }
        }
        row.appendChild(cell0);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        board.innerHTML = row.textContent;
        tableBody.appendChild(row);
        // rows.push(row);
      }
      // for (var r = 0; r < rows.length; r++) {
      //   tableBody.appendChild(r);
      // }
      table.appendChild(tableBody);
      board.appendChild(table);
    }
  });
}

function getVar(str) {
  var point = str.lastIndexOf("=");
  return str.substring(point+1,str.length);
}

function reorder(item, dir) {
  var change = true;
  var oldRow = item.get("row");
  var query = new Parse.Query("ScrumBoardItems");
  query.equalTo("projectId", projectId).equalTo("column", item.get("column")).equalTo("row", oldRow + dir);
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
    var newItem = Parse.Object.extend("ScrumBoardItems");
    newItem = item;
    newItem.set("row", oldRow + dir);
    newItem.save();
    location.reload();
  }
}
