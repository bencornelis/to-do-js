var tasks = [];

$(function() {

  var resetForm = function() {
    $("input[type='text']").val("");
  }

  $("form#new-task").submit(function(event) {
    event.preventDefault();

    var description = $("input#description").val();
    var urgency     = $("input[name=urgency]:checked").val();

    var task = {description: description, urgency: urgency};
    tasks.push(task);

    appendTask(task);

    resetForm();
  });

  $("#sort").click(function() {
    $("#uncompleted-tasks").empty();
    displayTasks(sortByUrgency(tasks));
  });

});

var assignUrgencyColor = function(urgency) {
  if (urgency === "not-urgent") {
    return "text-info";
  } else if (urgency === "sorta-urgent") {
    return "text-warning";
  } else {
    return "text-danger";
  }
}

var sortByUrgency = function(taskArray) {
  return taskArray.sort(function(task1, task2) {
    if (task1.urgency < task2.urgency) {
      return 1;
    }
    if (task1.urgency > task2.urgency) {
      return -1;
    }
    return 0;
  });
};

var displayTasks = function(taskArray) {
  taskArray.forEach (function(task) {
    appendTask(task);
  });
};

var appendTask = function(task) {
  $("#uncompleted-tasks").append("<li class='uncompleted-task " + assignUrgencyColor(task.urgency) + "'>"
  + "<span class='icon checkmark text-success glyphicon glyphicon-ok'>" +
  "</span><span class='icon delete-icon text-danger glyphicon glyphicon-remove'></span>" + task.description + "</li>");

  $(".checkmark").last().click(function() {
    $(this).parent().remove();
    removeTask(task);
    $("#completed-tasks").append("<li class='text-success'>" + task.description + "</li>");
  });

  $(".delete-icon").last().click(function() {
    $(this).parent().remove();
    removeTask(task);
  });
}

var removeTask = function(task) {
  var index = tasks.indexOf(task);
  tasks.splice(index, 1);
}
