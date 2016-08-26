$("nav").on("click", "a", function(e) {
  e.preventDefault();

  var id = $(e.target).attr("href");

  updateSelected(id);
  history.pushState({id: id}, id, location.pathname + id);
});

$(window).on("popstate", function(e) {
  var state = e.originalEvent.state;
  if (!state) { state = { id: "#page_1"} }
  updateSelected(state.id);
});

if (location.hash) {
  updateSelected(location.hash);
}

function updateSelected(id) {
  $(".selected").removeClass("selected");
  $(".visible").removeClass("visible");
  $(id).addClass("visible");
  $("[href='" + id + "']").addClass("selected");
}