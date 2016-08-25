var GOOGLE_KEY = "AIzaSyCcEaXwRVe1eh785KPucSqvSM2pmkO2B5o",
    WEATHER_KEY = "77df2059c0add274ef6f2feb97ba7359",
    map_height = 400,
    map_width = 600;

function createMap(geo) {
  var url = "https://maps.googleapis.com/maps/api/staticmap?",
      coords = "markers=" + geo.coords.latitude + "," + geo.coords.longitude,
      size = "&size=" + map_width + "x" + map_height,
      type = "&maptype=satellite",
      img_el;

  url += coords + size + type;
  img_el = document.createElement("img");
  img_el.setAttribute("src", url);
  img_el.setAttribute("height", map_height);
  img_el.setAttribute("width", map_width);
  $("i").remove();
  $("section").append(img_el);
  getWeather(geo);
}

function getWeather(geo) {
  var url = "http://api.openweathermap.org/data/2.5/weather?",
      coord = "lat=" + geo.coords.latitude + "&lon=" + geo.coords.longitude,
      key = "&APPID=" + WEATHER_KEY;


  $.ajax({
    url: url + coord + key,
    success: function(weather_info) {
      parseWeatherInfo(weather_info);
    }
  });
}

function parseWeatherInfo(weather_info) {
  var location = weather_info.name,
      temperature = Math.round(weather_info.main.temp - 273) + "&deg;C",
      description = weather_info.weather[0].description;

  console.log(weather_info);
  [location, temperature, description].forEach(function(info) {
    $("div").append("<p>" + info + "</p>");
  });
  $("div").addClass("show");
}


navigator.geolocation.getCurrentPosition(createMap);


