$(function() {
	$("#datepicker").datepicker();
});

var changePriority = function(priority) {
	var priority = priority;
	$(".dropdown-toggle .text").html(priority);
	$("#priorityHidden").val(priority);
	clearError();
}

var showDescription = function(target) {
	var target = target;

	var desDiv = $(target).parent().children("div.description");
	if (desDiv.css("display") == "block") {
		$(target).html("Show Description");
	} else {
		$(target).html("Hide Description");
	}

	$(desDiv).slideToggle();

}
var deleteTask = function(target) {
	var target = target;
	var desDiv = $(target).parent();
	alert("Do you want to delete task?");
	$(desDiv).slideUp(800, function() {
		$(desDiv).remove();
	});

}
var clearError = function() {
	$("#errors").slideUp();
}

var showErrors = function(badInputs) {
	$("#errors").html("");
	var badInputs = badInputs.split("|");
	for (i = 0; i < badInputs.length; i++) {
		$("#errors").append(badInputs[i] + "</br>");
	}
	$("#errors").slideDown();
}
var validate = function() {
	var badInputs = "";
	var flag = true;
	if ($("#nametask").val().trim() == "") {
		badInputs += "Please Enter a Task Name|";
		flag = false;
	}
	if ($("#priorityHidden").val().trim() == "") {
		badInputs += "Please Select a Task Priority";
		flag = false;
	}

	if (badInputs.trim() != "")
		showErrors(badInputs);

	return flag;
}
$(function() {
	$(".taskArea").sortable();
	$(".taskArea").disableSelection();
})
var addTask = function() {

	if (validate()) {
		var taskName = $("#nametask").val();
		var date = $("#datepicker").val();
		var priority = $("#priorityHidden").val();
		var desc = $(".descriptionText").val();

		var taskHTML = '<div class="task"> <b class="taskName">'
				+ taskName
				+ '</b><strong>Complete By:'
				+ date
				+ '<span class="date"></span></strong><span onclick="deleteTask(this);" style="cursor:pointer; float:right;"><img src="images/erase.png" title="Delete Task"></img></span><span class="showDescription" style="cursor:pointer; float:right;margin-right:10px" onclick="showDescription(this);">Show Description</span><div class="description"><div >'
				+ desc + '</br><span>Priority: ' + priority
				+ '</span></div></div> </div>';
		$(".taskArea").append(taskHTML);
		$(".noTaskAdded").html("");
	}

}