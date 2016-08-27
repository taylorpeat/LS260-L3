var workers = {},
    canvas,
    ctx,
    image = document.createElement("img");

image.src = "images/675px-Dülmen,_Göversheide_--_2015_--_7718-22.jpg";

workers.brightness = new Worker("javascripts/brightness.js");
workers.saturation = new Worker("javascripts/saturation.js");
workers.invert = new Worker("javascripts/invert.js");
workers.horizontal_flip = new Worker("javascripts/horizontal_flip.js");
workers.vertical_flip = new Worker("javascripts/vertical_flip.js");


$(window).on("load", initialImgSetup);

$(function() {

  $("form").on("change", function(e) {
    var worker_name = $(e.target).attr("data-method"),
        old_percentage = +$(e.target).siblings("span").eq(0).html().slice(0, -1),
        percentage;

    if ( worker_name === "brightness" ) {
      percentage = e.target.value - 50;
    } else {
      percentage = (e.target.value - 50) * 2;
    }

    $(e.target).siblings("span").eq(0).html(percentage + "%");
    workers[worker_name].postMessage({
      img: getImg(),
      brightness: +$("[data-method='brightness']").val() - 50,
      saturation: (+$("[data-method='saturation']").val() - 50) * 2,
      old_percentage: old_percentage
    });
  });

  $("form").on("click", "a", function(e) {
    e.preventDefault();

    var worker_name = $(e.target).attr("data-method");

    workers[worker_name].postMessage({ img: getImg() });
  });

  for ( worker in workers ) {
    console.log(workers[worker]);
    workers[worker].addEventListener("message", setImg);
  };
});



function initialImgSetup() {
  canvas = $("canvas")[0];
  ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);
}

function setImg(data) {
  ctx.putImageData(data.data, 0, 0);
}

function getImg() {
  return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
}