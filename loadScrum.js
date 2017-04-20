//Init
init();

//Button Functions------------------------------------------
function init() {
  $(".button-backlog").on("click", function() {
    if (!($(this).closest(".backlog").length > 0)) {
      $(this).parents(".input-group").appendTo(".backlog").css({
        "background-color": "",
        "border": ""
      });
    }
  });
  $(".button-progress").on("click", function() {
    if (!($(this).closest(".in-progress").length > 0)) {
      $(this).parents(".input-group").appendTo(".in-progress").css({
        "background-color": "#ffdfbc",
        "border": "none"
      });
    }
  });
  $(".button-done").on("click", function() {
    if (!($(this).closest(".done").length > 0)) {
      $(this).parents(".input-group").appendTo(".done").css({
        "background-color": "#cfffd0",
        "border": "none"
      });

    }
  });
  $(".button-delete").on("click", function() {
    $(this).parents(".input-group").remove();
  });

  var placeholderDiv = document.createElement("div");
  var placeholderAtt = document.createAttribute("class");
  var taskDivAttVal = placeholderAtt.value = "placeholder";
  placeholderDiv.setAttributeNode(placeholderAtt);
}

//Create Task------------------------------------------
$("#add-button").on("click", function() {

  var taskDiv = document.createElement("div");
  var taskSpan = document.createElement("span");
  var buttonsDiv = document.createElement("div");
  var buttonBacklog = document.createElement("button");
  var buttonProgress = document.createElement("button");
  var buttonDone = document.createElement("button");
  var buttonDelete = document.createElement("button");

  var taskDivAtt = document.createAttribute("class");
  var buttonsDivAtt = document.createAttribute("class");
  var buttonBacklogAtt = document.createAttribute("class");
  var buttonProgressAtt = document.createAttribute("class");
  var buttonDoneAtt = document.createAttribute("class");
  var buttonDeleteAtt = document.createAttribute("class");

  var taskDivAttVal = taskDivAtt.value = "input-group overflow";
  var buttonsDivAttVal = buttonsDivAtt.value = "margin-top-10";
  var buttonBacklogAttVal = buttonBacklogAtt.value = "button button-backlog";
  var buttonProgressAttVal = buttonProgressAtt.value = "button button-progress";
  var buttonDoneAttVal = buttonDoneAtt.value = "button button-done";
  var buttonDeleteAttVal = buttonDeleteAtt.value = "button button-delete";

  taskDiv.setAttributeNode(taskDivAtt);
  buttonsDiv.setAttributeNode(buttonsDivAtt);
  buttonBacklog.setAttributeNode(buttonBacklogAtt);
  buttonProgress.setAttributeNode(buttonProgressAtt);
  buttonDone.setAttributeNode(buttonDoneAtt);
  buttonDelete.setAttributeNode(buttonDeleteAtt);

  var taskText = document.createTextNode($("#task").val());
  var buttonBacklogText = document.createTextNode("Backlog");
  var buttonProgressText = document.createTextNode("In Progress");
  var buttonDoneText = document.createTextNode("Done");
  var buttonDeleteText = document.createTextNode("Delete");

  taskSpan.appendChild(taskText);
  taskDiv.appendChild(taskSpan);
  taskDiv.appendChild(buttonsDiv);
  buttonBacklog.appendChild(buttonBacklogText);
  buttonProgress.appendChild(buttonProgressText);
  buttonDone.appendChild(buttonDoneText);
  buttonDelete.appendChild(buttonDeleteText);
  buttonsDiv.appendChild(buttonBacklog);
  buttonsDiv.appendChild(buttonProgress);
  buttonsDiv.appendChild(buttonDone);
  buttonsDiv.appendChild(buttonDelete);

  $('.backlog').append(taskDiv);

  init();

});
