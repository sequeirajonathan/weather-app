//declare variables and select elements
var ROOT_URL = "http://api.openweathermap.org/data/2.5/weather?zip=";
var API_KEY = "b7ca37300085807a9fecff914d096ff2";
var cityTitle = document.querySelector(".cityTitle");
var zip = document.querySelector(".zip");
var weather = document.querySelector(".weather");
var icon = document.querySelector(".icon");
var temp = document.querySelector(".temp");
var humid = document.querySelector(".humid");
var deg = document.querySelector(".deg");
var kelvin;
var convert = document.querySelector(".convert");

var weatherPics = {
  Clouds: "img/cloudy.png",
  Mist: "img/rain.png",
  Rain: "img/rain.png",
  Snow: "img/snow.png",
  Sun: "img/sun.png",
  Thunderstorm: "img/thunderstorm.png"
};

// //select the elements cityTitle, zip input bar, weather div,
// img with class icon, span with class temp, span with class humid,
// select the span with the class deg

//define functions

function kToF(kelvin) {
  return Math.floor(kelvin * 1.8 - 459.67);
}

function kToC(kelvin) {
  return Math.floor(kelvin - 273.15);
}

function iconSelector(weather) {
  return weatherPics[weather];
}

convert.addEventListener("click", function() {
  if (convert.innerHTML === "Convert to C") {
    temp.textContent = kToC(kelvin);
    deg.innerHTML = "&deg; C";
    convert.innerHTML = "Convert to F";
  } else if (convert.innerHTML === "Convert to F") {
    temp.textContent = kToF(kelvin);
    deg.innerHTML = "&deg; F";
    convert.innerHTML = "Convert to C";
  }
});

function getWeather() {
  $.ajax({
    type: "GET",
    url: "http://ip-api.com/json",
    dataType: "JSON",
    success: function(data) {
      var city = data.city;
      var country = data.country;
      var countryCode = data.countryCode;
      var ISP = data.isp;
      var IP = data.query;
      var region = data.region;
      var regionName = data.regionName;
      var zip = data.zip;
      $.ajax({
        type: "GET",
        url: `${ROOT_URL}${zip},${countryCode}&appid=${API_KEY}`,
        dataType: "JSON",
        success: function(data) {
          cityTitle.textContent = data.name;
          weather.textContent = data.weather[0].description;
          humid.textContent = data.main.humidity;
          kelvin = data.main.temp;
          temp.innerHTML = kToF(kelvin);
          icon.src = iconSelector(data.weather[0].main);

          console.log(
            city,
            counrty,
            countryCode,
            ISP,
            IP,
            region,
            regionName,
            country
          );
        },
        error: function(error) {
          console.log("There was an error");
        }
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
}

//call functions and/or add Event Listeners

zip.addEventListener("keypress", function(e) {
  if (e.keyCode == 13) {
    console.log(e);
    getWeather(zip.value);
  }
});

getWeather();
