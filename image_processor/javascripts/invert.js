onmessage = function(message) {
  postMessage(invertImgData(message));
}

function invertImgData(message) {
  var data = message.data.raw_image_data
  for ( pixel in data ) {
    if ((+pixel + 1) % 4 === 0) { continue; }
    data[pixel] = 255 - data[pixel];
  }

  return data;
}