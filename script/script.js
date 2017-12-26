window.onload = function(){
  getCheckedOnLoad();
  startTime();
  phrase();
  randomCompliment();
  settingMenu();
  quoteGenerator();
  toDoMenu();
  checkboxToDo(); //checkboxToDo & checkboxWeather are needed here to make the first click works.
  checkboxWeather();
  retName();
}

function quoteGenerator(){
  $.get('https://quotes.rest/qod.json', function(responseText) {
      formatter(responseText);
  });

  function formatter(response){
    let quote = JSON.stringify(response.contents.quotes[0].quote);
    let author = JSON.stringify(response.contents.quotes[0].author);
    let regEx = /[a-z]|\s/gi;
    author = author.match(regEx);
    render(quote,author);
  }

  function render(output,author){
    $(".quote").html(output);
    $(".author").html(author);
  }
}


//declaring variables of clock
var dateObj = new Date();
var internalhour = dateObj.getHours();
var person = null;

//phrase below the time
function phrase() {
  if (internalhour>=0 && internalhour<12) {
      $("#phrase").append("Good Morning, ");
}

else if (internalhour>=12 && internalhour<17) {
      $("#phrase").append("Good Afternoon, ");
}

else {
      $("#phrase").append("Good Evening, ");
}
}


function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;}

// the clock function
function startTime() {
  var dateObj = new Date();

if ($('#timeCheck').is(':checked') === true)

{
  var getHours = dateObj.getHours();
  var getMinutes = dateObj.getMinutes();
  h= checkTime(getHours);
  m = checkTime(getMinutes);
  document.getElementById("clock").innerHTML= h + ":" + m;
  var t = setTimeout(startTime, 1000); //this calls the fuction after every second
}

else  {

  var h = dateObj.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
  document.getElementById("clock").innerHTML= h;
  var t = setTimeout(startTime, 1000); //this calls the fuction after every second
}

}

//Compliments next to phrase
function randomCompliment () {

if (person !== null) {
  $("#phrase").append(person);
}

else {
  var arrayOfCompliments = ["handsome.", "cutie.", "human.", "pal.", "smart.", "sexy.","classy."];
  var randomCompliment = Math.floor(Math.random()*arrayOfCompliments.length);
  $("#phrase").append(arrayOfCompliments[randomCompliment]);
}
}

//setting Menu slide 
function settingMenu() {

$("#menu").hide();
$( "#setting" ).click(function() {

	$( "#menu" ).toggle("slide");

if ($("#grayBackground").length)
{$("#grayBackground").remove();}

else
{$("body").append("<div id='grayBackground'> </div>");}

});
}


//Get all checkboxes in Settings checked on Load

function getCheckedOnLoad () {
	$(':checkbox').each(
		function() {this.checked = true;});
}

//Hide and show weather module on click
function checkboxWeather () {
$("#weatherCheck").click( function ()
	{if ( $("#weatherCheck").is(":checked") === true) {
		$("#current-weather-wrapper").show();
	}

	else {
		$("#current-weather-wrapper").hide();
	}}
);}

//Hide and show ToDo module on click
function checkboxToDo () {
	$("#toDoCheck").click( function () {
		
		if (this.checked === true)
		{
				$("#toDo").show();
		}
	
		else {
			$("#toDo").hide();
		}
	});
}

//Function to change name of the greeting phrase
function nameChange () {
  $("#phrase").empty();
	person = document.getElementById("enterName").value;
  phrase();
  randomCompliment();
}

//Function to store setting name data.

function saveName () {
	 var textNameInput = document.getElementById("enterName").value;
	localStorage.setItem("Name", JSON.stringify(textNameInput));
}

//Function to retrieve name data and set var person on load

 function retName () {
	var storedName =  JSON.parse(localStorage.getItem("Name"));
	 
	if ( storedName !== undefined || storedName !== null || storedName.length !== 0) 
	{document.getElementById("enterName").value = storedName;
	person = storedName;
	$("#phrase").empty();
	phrase();
	randomCompliment();}
	}


//Functions to clear name data 

function clearName () {
	document.getElementById("enterName").value = "";
	localStorage.removeItem("Name");
	person=null;
	$("#phrase").empty();
	phrase();
	randomCompliment();
}



//toDoMenu
function toDoMenu() {

	$("#toDoMenu").hide();
	$( "#toDo" ).click(function() {
	$( "#toDoMenu" ).toggle("slide", {direction: "right"});

	if ($("#grayBackground").length)
		{$("#grayBackground").remove();}

	else
		{$("body").append("<div id='grayBackground'> </div>");}
	});
}

//WEATHER MODULE FUNCTIONS////////////////////////////////////////////////////////////////////////////
let flag = 0;
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

function weatherSlider(){
	

	if(flag == 0){
		$("#forecast-wrapper").addClass("weather-slide-in");
		$("#forecast-wrapper").removeClass("weather-slide-out");
		flag = 1;
	}

	else if(flag == 1){
		$("#forecast-wrapper").addClass("weather-slide-out");
		$("#forecast-wrapper").removeClass("weather-slide-in");
		flag = 0;
	}
}