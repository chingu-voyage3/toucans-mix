

//WEATHER MODULE FUNCTIONS////////////////////////////////////////////////////////////////////////////
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(usePosition);
  } else {
      console.log("Geolocation is not supported by this browser. You can still use manuel search.");
  }
}

function usePosition(position){
	let lon = position.coords.latitude;
	let lat = position.coords.longitude;
	autoLocation(lon,lat);
}

function userInputLocation(){
	let input = prompt("Enter your city");
	getWeatherData(input);
}

function autoLocation(lon,lat){
	getWeatherData(lon,lat);
}

function getWeatherData(lon,lat){
	let apiKey = "http://api.apixu.com/v1/current.json?key=844930d1fa3949a8a44111252170512%20&q=";
	let apiCall = apiKey+lon+","+lat;

	$.getJSON(apiCall, function(data) {
		assignWeatherData(data);
	});
}

function assignWeatherData(data){
	let locationOutput = data.location.name;
	let region = data.location.region;
	let weatherDesc = data.current.condition.text;
	let icon = data.current.condition.icon
	let tempC = data.current.temp_c;
	let tempF = data.current.temp_f;

	print(locationOutput,weatherDesc,icon,tempC,tempF,region)
}

function print(locationOutput,weatherDesc,icon,tempC,tempF,region){
	console.log("Location: "+locationOutput+", Region: "+region+", Current weather: "+weatherDesc+", Temperature Celcius: "+tempC+", Temperature farenheit: "+tempF);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
