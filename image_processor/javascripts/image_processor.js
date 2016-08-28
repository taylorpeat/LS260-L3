// create array in workers, transfer it to image data in setImg function

var workers = {},
    canvas,
    ctx,
    image = document.createElement("img"),
    params = {
      brightness: 0,
      saturation: 0,
    },
    current_image,
    raw_image_data = [];

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
        new_param = +$(e.target).val();

    $(e.target).siblings("span").eq(0).html(e.target.value + "%");

    workers[worker_name].postMessage({
      raw_image_data: raw_image_data,
      width: current_image.width,
      height: current_image.height,
      param: new_param,
      old_param: params[worker_name]
    });

    params[worker_name] = new_param;
  });

  $("form").on("click", "a", function(e) {
    e.preventDefault();

    var worker_name = $(e.target).attr("data-method");

    workers[worker_name].postMessage({
      raw_image_data: raw_image_data,
      width: current_image.width,
      height: current_image.height
    });
  });

  for ( worker in workers ) {
    if (["brightness", "saturation"].includes(worker)) {
      workers[worker].addEventListener("message", setImgAndData);
    } else {
      workers[worker].addEventListener("message", setImgAndData);
    }
  };
});

å

function initialImgSetup() {
  canvas = $("canvas")[0];
  ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);
  createImgDataArray();
}

function createImgDataArray() {
  current_image = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  for ( pixel in current_image.data ) {
    raw_image_data[pixel] = current_image.data[pixel];
  }
}

function setImg(data) {

  for ( pixel in current_image.data ) {
    current_image.data[pixel] = data[pixel];
  }

  ctx.putImageData(current_image, 0, 0);
}

function setImgAndData(data) {
  raw_image_data = data.data;
  setImg(raw_image_data);
}