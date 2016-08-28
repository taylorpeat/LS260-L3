onmessage = function(message) {
  postMessage(adjustBrightness(message));
}

function adjustBrightness(message) {
  var bright_change = message.data.param - message.data.old_param,
      data = message.data.raw_image_data;

  for ( pixel in data ) {
    if ((+pixel + 1) % 4 === 0) { continue }
    data[pixel] = data[pixel] + bright_change / 100 * 255;
  }

  return data;
}