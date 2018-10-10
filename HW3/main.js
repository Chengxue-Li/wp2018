$(document).ready(function() {
    bindListButton();
    bindSearchButton();
    bindAddButton();
    bindDeleteButton();
});
function bindListButton() {
  $("#list_form button").click(function(event) {
    $("#list_text").text("loading...");
    $.ajax({
      method: "get",
      url: "/ajax",
      data: {
        type: "list"
      },
      success: function(data) {
        var str = "";
        var text = $("#list_text");
        text.text("");
        $.each(data, function(index, value) {
          str += ("\"" + index + "\": \"" + value + "\"\n");
        });
        text.text(str);
        text.html(text.html().replace(/\n/g, '<br/>'));
      }
    });
  });
}
function bindSearchButton() {
  $("#search_form button").click(function(event) {
    $("#search_text").text("loading...");
    $.ajax({
      method: "get",
      url: "/ajax",
      data: {
        type: "search",
        id_num: $("#search_form input[name='student_id']").val()
      },
      success: function(data) {
        $("#search_text").text(data);
      }
    });
  });
}
function bindAddButton() {
  $("#add_form button").click(function(event) {
    $("#add_text").text("adding...");
    $.ajax({
      method: "get",
      url: "/ajax",
      data: {
        type: "add",
        id_num: $("#add_form input[name='student_id']").val(),
        name: $("#add_form input[name='student_name']").val()
      },
      success: function(data) {
        $("#add_text").text(data);
      }
    });
  });
}
function bindDeleteButton() {
  $("#delete_form button").click(function(event) {
    $("#delete_text").text("deleting");
    $.ajax({
      method: "get",
      url: "/ajax",
      data: {
        type: "delete",
        id_num: $("#delete_form input[name='student_id']").val()
      },
      success: function(data) {
        $("#delete_text").text(data);
      }
    });
  });
}
