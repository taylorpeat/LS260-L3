$("nav").on("click", "a", function(e) {
  e.preventDefault();

  var id = $(e.target).attr("href");

  updateSelected(id);
});

function updateSelected(id) {
  $(".selected").removeClass("selected");
  $(".visible").removeClass("visible");
  $(id).addClass("visible");
  $("[href='" + id + "']").addClass("selected");
}