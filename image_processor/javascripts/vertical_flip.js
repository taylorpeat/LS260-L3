onmessage = function(message) {
  postMessage(flipImgData(message));
}

function flipImgData(message) {
  var data = message.data.raw_image_data,
      rows = message.data.height,
      row_length = message.data.width * 4,
      new_array = [];

  for ( var y = 0; y < rows; y++ ) {
    for ( var x = y * row_length, z = (rows - y - 1) * row_length; x < (y + 1) * row_length; x++, z++) {
      new_array[x] = data[z];
    }
  }

  for ( var i = 0; i < row_length * rows; i++ ) {
    data[i] = new_array[i];
  }

  return data;
}