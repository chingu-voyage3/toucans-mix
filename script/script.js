

//WEATHER MODULE FUNCTIONS////////////////////////////////////////////////////////////////////////////
function userInputLocation(){
	let input = prompt("Enter your city");
	getWeatherData(input);
}

function getWeatherData(input){
	let apiKey = "http://api.apixu.com/v1/current.json?key=844930d1fa3949a8a44111252170512%20&q=";
	let location = input;
	let apiCall = apiKey+location;
	let result;
	
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
