$(function() {

  var resetForm = function() {
    $("input[type='text']").val("");
  }

  $("form#new-task").submit(function(event) {
    event.preventDefault();

    var description = $("input#description").val();
    var urgency     = $("input[name=urgency]:checked").val();

    var task = {description: description, urgency: urgency}

    $("#uncompleted-tasks").append("<li class='uncompleted-task " + assignUrgencyColor(task.urgency) + "'>"
    + "<span class='icon checkmark text-success glyphicon glyphicon-ok'>" +
    "</span><span class='icon delete-icon text-danger glyphicon glyphicon-remove'></span>" + task.description + "</li>");

    $(".checkmark").last().click(function() {
      $(".uncompleted-task").last().remove();
      $("#completed-tasks").append("<li class='text-success'>" + task.description + "</li>");
    });

    $(".delete-icon").click(function() {
      $(this).parent().remove();
    });

    resetForm();
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
