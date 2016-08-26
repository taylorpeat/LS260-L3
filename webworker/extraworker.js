self.addEventListener('message', function(e) {
  var largest_product = largestProduct(e.data[0], e.data[1]);
  self.postMessage(largest_product);
}, false);



function largestProduct(number_string, seq_length) {
  var current_set,
      current_max = 0;

  for ( var i = 0; i < number_string.length - seq_length; i++ ) {
    current_set = number_string.slice(i, i + seq_length);
    if ( findProduct(current_set) > current_max ) {
      current_max = findProduct(current_set);
    }
  }

  return current_max;
}


function findProduct(string) {
  var numbers = string.split("");
  numbers = numbers.map(function(num) { return +num } );
  return  numbers.reduce(function(prev, current) { return prev * current } );
}
