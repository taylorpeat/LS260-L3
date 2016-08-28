onmessage = function(e) {
  e.data.img.data = flipImgData(e.data.img);
  postMessage(e.data.img);
}

function flipImgData(img) {
  var data = img.data,
      rows = img.height,
      row_length = img.width * 4;

  for ( var y = 0; y < rows; y++ ) {
    var new_row = [];
    for ( var x = y * row_length; x < (y + 1) * row_length; x += 4) {
      new_row[x + 3 - y * row_length] = data[x];
      new_row[x + 2 - y * row_length] = data[x + 1];
      new_row[x + 1 - y * row_length] = data[x + 2];
      new_row[x - y * row_length] = data[x + 3];
    }

    new_row = new_row.reverse();

    for ( var x = y * row_length; x < (y + 1) * row_length; x++) {
      data[x] = new_row[x - y * row_length];
    }
  }

  return data;
}