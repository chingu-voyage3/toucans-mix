//WEATHER MODULE FUNCTIONS////////////////////////////////////////////////////////////////////////////
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(usePosition);
  } else {
      alert("Geolocation is not supported by this browser. You can still use manuel search.");
      userInputLocation();
  }
}

function usePosition(position){
	let lon = position.coords.latitude;
	let lat = position.coords.longitude;
	getWeatherDataCoords(lon,lat);
}

function userInputLocation(){
	let input = prompt("Enter your city");
	getWeatherDataUserInput(input);
}


function getWeatherDataCoords(lon,lat){
	let apiKey = "https://api.apixu.com/v1/forecast.json?key=844930d1fa3949a8a44111252170512%20&q=";
	let days = "&days=7";
	let apiCall = apiKey+lon+","+lat+days;

	$.getJSON(apiCall, function(data) {
		assignWeatherData(data);
	})
}

function getWeatherDataUserInput(input){
	let apiKey = "https://api.apixu.com/v1/forecast.json?key=844930d1fa3949a8a44111252170512%20&q=";
	let days = "&days=7";
	let apiCall = apiKey+input+days;

		$.getJSON(apiCall, function(data) {
			assignWeatherData(data);
		})
}

function assignWeatherData(data){
	//Current weather data
	let locationOutput = data.location.name;
	let region = data.location.region;
	let weatherDesc = data.current.condition.text;
	let icon = data.current.condition.icon
	let tempC = data.current.temp_c;
	let fcData=[];
	//Forecast data
	
	for(let i=0;i<7;i++){
		fcData.push({
			fcIcon:data.forecast.forecastday[i].day.condition.icon,
			fcWeatherDesc:data.forecast.forecastday[i].day.condition.text,
			fcTempC:data.forecast.forecastday[i].day.avgtemp_c
		})
	}
	let fcIcon = data.forecast.forecastday[0].day.condition.icon;
	let fcWeatherDesc = data.forecast.forecastday[0].day.condition.text;
	let fcTempC = data.forecast.forecastday[0].day.avgtemp_c;

	toHtml(locationOutput,tempC,icon);
	toForecast(fcWeatherDesc,fcTempC,fcIcon,fcData)

}



function toHtml(locationOutput,tempC,icon){
	let imgPre = '<img src = "https:';
	$("#wm-icon").html(imgPre+icon+'">')		
	$("#wm-temp").html(tempC+"&#176;");
	$("#wm-location").html(locationOutput);
}

function toForecast(fcWeatherDesc,fcTempC,fcIcon,fcData){

	let imgPre = '<img src = "https:';
	let today = new Date();
	let tomorrow = new Date(today);
	let todayResult = tomorrow.toString().split(" ",3).join(" ");
	let result;


	$("#day1").html(todayResult);

	for(let i=1;i<8;i++){
		tomorrow.setDate(today.getDate()+i);
		result = tomorrow.toString().split(" ",3).join(" ");
		$("#day"+(i+1)).html(result);
		$("#wm-fcTemp"+i).html(fcData[i-1].fcTempC+"&#176;");
		$("#wm-fcDesc"+i).html(fcData[i-1].fcWeatherDesc);
		$("#wm-fcIcon"+i).html(imgPre+fcData[i-1].fcIcon+'">')	
	}

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
