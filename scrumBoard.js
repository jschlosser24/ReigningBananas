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
  query.equalTo("projectId", projectId).ascending("column,row");
  query.find({
    success: function(sb) {
      board.innerHTML = JSON.stringify(sb);

      var totalRow = 0;
      for (var j = 0; j < sb.length; j++) {
        if (sb[j].get("row") > totalRow) {
          totalRow = sb[j].get("row");
        }
      }

      for (var i = 0; i <= totalRow; i++){
        var row = document.createElement("div");
        row.setAttribute("class", "tableRow");

        // pbl items
        var pblQuery = new Parse.Query("ScrumBoardItems");
        pblQuery.equalTo("projectId", projectId).equalTo("column", 0).equalTo("row", i);
        pblQuery.first({
          success: function(item) {
            if (item == null) {
              var cell = document.createElement("div");
              cell.setAttribute("class", "tableHiddenCell");
              row.appendChild(cell);
            } else {
              var cell = document.createElement("div");
              cell.setAttribute("class", "tableCell");
              var cellText = "Description: " + item.get("description") +
              "\n\nAs a " + item.get("role") + " I want " + item.get("functionality") + " so I " + item.get("value") +
              "\n\nAcceptance criteria: " + item.get("acceptanceCriteria") +
              "\n\nSize: " + item.get("size");
              cell.innerHTML = cellText;
              row.appendChild(cell);
            }
          }
        });

      // sbl items
      var sblQuery = new Parse.Query("ScrumBoardItems");
      sblQuery.equalTo("projectId", projectId).equalTo("column", 1).equalTo("row", i);
      sblQuery.first({
        success: function(item) {
          if (item == null) {
            var cell = document.createElement("div");
            cell.setAttribute("class", "tableHiddenCell");
            row.appendChild(cell);
          } else {
            var cell = document.createElement("div");
            cell.setAttribute("class", "tableCell");
            var cellText = "test1"; // replace "test" with the text that you want
            cell.innerHTML = cellText;
            row.appendChild(cell);
          }
        }
      });

      // todo items
      var todoQuery = new Parse.Query("ScrumBoardItems");
      todoQuery.equalTo("projectId", projectId).equalTo("column", 2).equalTo("row", i);
      todoQuery.first({
        success: function(item) {
          if (item == null) {
            var cell = document.createElement("div");
            cell.setAttribute("class", "tableHiddenCell");
            row.appendChild(cell);
          } else {
            var cell = document.createElement("div");
            cell.setAttribute("class", "tableCell");
            var cellText = "test2"; // replace "test" with the text that you want
            cell.innerHTML = cellText;
            row.appendChild(cell);
          }
        }
      });

      // doing items
      var doingQuery = new Parse.Query("ScrumBoardItems");
      doingQuery.equalTo("projectId", projectId).equalTo("column", 3).equalTo("row", i);
      doingQuery.first({
        success: function(item) {
          if (item == null) {
            var cell = document.createElement("div");
            cell.setAttribute("class", "tableHiddenCell");
            row.appendChild(cell);
          } else {
            var cell = document.createElement("div");
            cell.setAttribute("class", "tableCell");
            var cellText = "test3"; // replace "test" with the text that you want
            cell.innerHTML = cellText;
            row.appendChild(cell);
          }
        }
      });

      // complete items
      var completeQuery = new Parse.Query("ScrumBoardItems");
      completeQuery.equalTo("projectId", projectId).equalTo("column", 4).equalTo("row", i);
      completeQuery.first({
        success: function(item) {
          if (item == null) {
            var cell = document.createElement("div");
            cell.setAttribute("class", "tableHiddenCell");
            row.appendChild(cell);
          } else {
            var cell = document.createElement("div");
            cell.setAttribute("class", "tableCell");
            var cellText = "test4"; // replace "test" with the text that you want
            cell.innerHTML = cellText;
            row.appendChild(cell);
          }
        }
      });
      tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    board.appendChild(table);
  }
});
}

function getVar(str) {
  var point = str.lastIndexOf("=");
  return str.substring(point+1,str.length);
}

function reorder(item) {
  var newItem = Parse.Object.extend("ScrumBoardItems");
  newItem = item;
  newItem.set("row", 0);
  newItem.save();
  var query = new Parse.Query("ScrumBoardItems");
  query.equalTo("projectId", projectId).equalTo("column", item.get("column")).notEqualTo("objectId", item.id);
  query.find({
    success: function(items) {
      for (var i = 0; i < items.length; i++) {
        var newRow = items[i].get("row") + 1;
        var editedItem =  Parse.Object.extend("ScrumBoardItems");
        editedItem = items[i];
        editedItem.set("row", newRow);
        editedItem.save();
      }
    }
  });
}
