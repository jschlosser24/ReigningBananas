function loadScrumBoard() {//for all the ___.className, need to make CSS that formats those things
  var projectId = getVar(window.location.href);

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

  var row = document.createElement("div");
  row.setAttribute("class", "tableRow");
  var cell = document.createElement("div");
  cell.setAttribute("class", "tableCell");
  cell.innerHTML = "Test";
  row.appendChild(cell);
  cell = document.createElement("div");
  cell.setAttribute("class", "tableCell");
  cell.innerHTML = "Test2";
  row.appendChild(cell);
  cell = document.createElement("div");
  cell.setAttribute("class", "tableCell");
  cell.innerHTML = "Test3";
  row.appendChild(cell);
  cell = document.createElement("div");
  cell.setAttribute("class", "tableCell");
  cell.innerHTML = "Test4";
  row.appendChild(cell);
  cell = document.createElement("div");
  cell.setAttribute("class", "tableCell");
  cell.innerHTML = "Test5";
  row.appendChild(cell);
  tableBody.appendChild(row);


  var query = new Parse.Query("ScrumBoardItems");
  query.equalTo("projectId", projectId).ascending("column,row");
  query.find({
    success: function(sb) {
      board.innerHTML = JSON.stringify(sb);
      var pblCount = 0;
      var sblCount = 0;
      var todoCount = 0;
      var doingCount = 0;
      var completeCount = 0;
      var currentRow = 0;
      var row = document.createElement("div");
      row.setAttribute("class", "tableRow");

      for (var i = 0; i < sb.length; i++) {
        if (sb[i].get("row") != currentRow){//only works if sorted by row
          tableBody.appendChild(row);
          currentRow++;
          var row = document.createElement("div");
          row.setAttribute("class", "tableRow");
        }

        //this will only work if the data is sorted by row. May have to change it so that the items are put in the correct columns (may have to sort by column too)
        //might not need the second part of the if statement if everything is sorted
        if (sb[i].get("column") == 0 && sb[i].get("row") == pblCount) { //pbl item
          var cell = document.createElement("div");
          cell.setAttribute("class", "tableCell");
          var cellText = "Description: " + sb[i].get("description") +
          "\n\nAs a " + sb[i].get("role") + " I want " + sb[i].get("functionality") + " so I " + sb[i].get("value") +
          "\n\nAcceptance criteria: " + sb[i].get("acceptanceCriteria") +
          "\n\nSize: " + sb[i].get("size");
          cell.innerHTML = cellText;
          row.appendChild(cell);
          pblCount++;
        } else {//create items until there is not one in the table then create a hidden cell to allow the spacing to be correct for the rest of the table (have to have row and column sorted)
          var cell = document.createElement("div");
          cell.setAttribute("class", "tableHiddenCell");
          row.appendChild(cell);
        }

        if (sb[i].get("column") == 1 && sb[i].get("row") == sblCount) { //sbl item
          //add sbl item
          sblCount++;
        } else {
          var cell = document.createElement("div");
          cell.setAttribute("class", "tableHiddenCell");
          row.appendChild(cell);
        }

        if (sb[i].get("column") == 2 && sb[i].get("row") == todoCount) { //todo item
          //add todo item
          todoCount++;
        } else {
          var cell = document.createElement("div");
          cell.setAttribute("class", "tableHiddenCell");
          row.appendChild(cell);
        }

        if (sb[i].get("column") == 3 && sb[i].get("row") == doingCount) { //doing item
          //add doing item
          doingCount++;
        } else {
          var cell = document.createElement("div");
          cell.setAttribute("class", "tableHiddenCell");
          row.appendChild(cell);
        }

        if (sb[i].get("column") == 4 && sb[i].get("row") == completeCount) { //complete item
          //add complete item
          completeCount++;
        } else {
          var cell = document.createElement("div");
          cell.setAttribute("class", "tableHiddenCell");
          row.appendChild(cell);
        }


        //possible other way to do it
        // var pblQuery = new Parse.Query("ScrumBoardItems");
        // pblQuery.equalTo("projectId", projectId).equalTo("column", 0).equalTo("row", currentRow).first({
        //   success: function() {
        //     //do something with the first product backlog item
        //   }
        // });
        //copy this for each column to add the correct item in the correct row (only the first column is shown)
        //query will find all of the first elements in the columns then the row will increment

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
