onmessage = function(e) {
  e.data.img.data = adjustBrightness(e.data.img.data, e.data.brightness, e.data.old_percentage);
  postMessage(e.data.img);
}

function adjustBrightness(data, brightness, old_percentage) {
  var bright_change = brightness - old_percentage;
  for ( pixel in data ) {
    if ((+pixel + 1) % 4 === 0) { continue }
    data[pixel] = data[pixel] * (100 + bright_change) / 100;
    if (data[pixel] > 255) { data[pixel] = 255 }
  }

  return data;
}