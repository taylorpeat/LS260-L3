var worker = new Worker("extraworker.js");

worker.addEventListener('message', function(e) {
  console.log("The highest combo is: ", e.data);
}, false);

$(function() {

  $("form").on("submit", function(e) {
    e.preventDefault();

    var number_string = $("textarea").val().replace(/\s/gm, ""),
        seq_length = +$("[type='number']").val();

    worker.postMessage([number_string, seq_length]);
  });

});

