onmessage = function(e) {
  e.data.img.data = invertImgData(e.data.img.data);
  postMessage(e.data.img);
}

function invertImgData(data) {
  for ( pixel in data ) {
    if ((+pixel + 1) % 4 === 0) { continue; }
    data[pixel] = 255 - data[pixel];
  }

  return data;
}