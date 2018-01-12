window.onload = function(){
  retName();
  retCheckbox();
  clockFormat();
  checkboxWeather();
  checkboxToDo();
  settingMenu();
  quoteGenerator();
  toDoMenu();
  getLocation();
  checkForMainFocus();
  checkForTodos();
  displayTodayOrQuestion();
  backgroundLoader()
}


//BACKGROUND LOADER/////////////////////////////////////////////////////////////////////////////////

function backgroundLoader(){
	let imageURL = 'https://source.unsplash.com/1900x768/?nature,skyline';	
	$('#background-container').css('background-image', 'url('+ imageURL +')');
	$('#background-container').animate({ opacity: 0.4 }, { duration: 2500 });
}

//MAIN FOCUS//////////////////////////////////////////////////////////////////////////////////////

function checkForMainFocus() {
  if (localStorage.getItem('output') !== null) {
    clearInput();
    displayMainFocus();
  }
}

function displayMainFocus() {
    var checkbox = createCheckbox();
    var label = document.createElement('label');
        label.setAttribute('for', 'checkbox');
    var mainFocusContainer = document.getElementById('mainFocusContainer');
    mainFocusContainer.innerHTML = '';
    var output = localStorage.getItem('output');
    var checkboxContainer = document.createElement('div');
        checkboxContainer.className = "checkboxContainer";
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
    mainFocusContainer.appendChild(checkboxContainer);
    mainFocusContainer.append(output);
    if (checkbox.checked) {
        mainFocusContainer.className = 'complete';
        checkbox.checked = true;
        mainFocusContainer.append(createAddButton());
    }
    else {
        mainFocusContainer.append(createDeleteButton());
        mainFocusContainer.className = '';
    }
}

function getUserInput() {
  var userInput = document.getElementById('main-focus-input');
  localStorage.setItem('output', userInput.value);
  clearInput();
  displayMainFocus();
}

function clearInput() {
  var userInput = document.getElementById('main-focus-input');
  userInput.style.display = 'none';
  displayTodayOrQuestion();
}

function displayTodayOrQuestion() {
  var display = document.getElementById('main-focus-question');
  var question = "What is your main focus today?";
  var today = "TODAY";
  if (display.innerHTML === question) {
    display.innerHTML = today;
    display.setAttribute('id', 'main-focus-question');
  }
  else {
    display.innerHTML = question;
  }
}

function resetDisplay() {
  localStorage.removeItem('output');
  localStorage.removeItem('checkbox');
  document.getElementById('mainFocusContainer').innerHTML = '';
  document.getElementById('main-focus-input').style.display = 'inline';
  document.getElementById('main-focus-input').value = '';
  displayTodayOrQuestion();
}

function createCheckbox() {
    var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
    if (JSON.parse(localStorage.getItem('checkbox')) === true) {
        checkbox.checked = true;
  }
    return checkbox;
}

function createDeleteButton() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  }

function createAddButton() {
  var addButton = document.createElement('button');
  addButton.textContent = '+';
  addButton.className = 'addButton';
  return addButton;
}

function setEventListeners() {
    var mainFocusContainer = document.getElementById('mainFocusContainer');
    mainFocusContainer.addEventListener('click', function() {
      var elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
        resetDisplay();
      }
      if (elementClicked.className === 'checkbox') {
        var checkbox = elementClicked;
        if (checkbox.checked) {
          localStorage.setItem('checkbox', true);
          displayMainFocus();
        }
        else {
          localStorage.setItem('checkbox', false);
          displayMainFocus();
        }
      }
      if (elementClicked.className === 'addButton') {
        resetDisplay();
      }
  });
  }

setEventListeners();



//TO DO LIST//////////////////////////////////////////////////////////////////////////////////////

function checkForTodos() {
  if (localStorage.getItem('todos')) {
    todoList.todos = JSON.parse(localStorage.getItem('todos'));
    display.displayTodos();
  }
}

var todoList = {
    todos: [],
    addTodo: function(todoText) {
      this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(index, todoText) {
        this.todos[index].todoText = todoText;
    },
    deleteTodo: function(index) {
        this.todos.splice(index, 1);
    },
    //Toggle one specific todo
    toggleCompleted: function(index) {
      var todo = this.todos[index];
      todo.completed = !todo.completed;
    },
    //Toggle all todos to incomplete or to complete
    toggleAll: function() {
        var all = true;
        //If a todo is not complete, change to completed
        this.todos.forEach(function(todo) {
          if (todo.completed === false) {
            todo.completed = true;
            all = false;
          }
        });
          if (all === true) {
             this.todos.forEach(function(todo) {
               todo.completed = false;
           });
         }
    }
};

var handlers = {
  addTodo: function() {
    var textInput = document.getElementById('textInput');
    todoList.addTodo(textInput.value);
    textInput.value = '';
    display.displayTodos();
  },

  deleteTodo: function(index) {
    todoList.deleteTodo(index);
    display.displayTodos();
  },

  completeTodo: function(index) {
    todoList.completeTodo(index);
    display.displayTodos();
  },

  toggleCompleted: function(index) {
    todoList.toggleCompleted(index);
    display.displayTodos();
  },

  toggleAll: function() {
    todoList.toggleAll();
    display.displayTodos();
  }
};

var display = {
  displayTodos: function() {
    localStorage.setItem('todos', JSON.stringify(todoList.todos));
    var todosUl = document.getElementById('todosUl');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, index) {
      var todoLi = document.createElement('li');
      var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
      var label = document.createElement('label');
        label.setAttribute('for', 'checkbox');
      var checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkboxContainer';
        checkboxContainer.id = 'todoCheckboxContainer';
      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(label);
      var todoTextWithCompletion = '';
      if (todo.completed === true) {
        todoLi.className = "complete";
        checkbox.checked = true;
        todoTextWithCompletion = todo.todoText;
       }
       else {
         todoLi.className = "incomplete";
         todoTextWithCompletion = todo.todoText;
       }
       todoLi.id = index;
       todoLi.append(checkboxContainer);
       var textNode = document.createTextNode(todoTextWithCompletion);
       todoLi.append(textNode);
       todoLi.append(this.createDeleteButton());
       todosUl.appendChild(todoLi);
   }, this);
  },

  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'deleteButton';
        deleteButton.id = 'deleteTodo';
    return deleteButton;
  },

    setEventListeners: function() {
        var todosUl = document.getElementById('todosUl');
        todosUl.addEventListener('click', function() {
            var elementClicked = event.target;
            if (elementClicked.className === 'deleteButton') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
            if (elementClicked.className === 'checkbox') {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.parentNode.id));
            }
        });
    }
};

display.setEventListeners();

////////////////////// RANDOM QUOTES MODULE ////////////////////////////////////
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

///////////////////////////// CLOCK ELEMENT ////////////////////////////////////
//declaring variables of clock
var dateObj = new Date();
var internalhour = dateObj.getHours();
var person = null;
var clockChange;


function clockFormat () {
	if ($('#timeCheck').is(':checked'))
	{
		clockChange = true;
		startTime();
	}

	else
	{
		clockChange = false;
		startTime();
	}
}


//////////////////////// WELCOME MESSAGE (PHRASE) //////////////////////////////
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


/////////////// COMPLIMENT OR NAME AFTER PHRASE ////////////////////////////////
function randomCompliment () {

if (person !== null)
{
  $("#phrase").append(person);
}

else {
  var arrayOfCompliments = ["handsome.", "cutie.", "human.", "pal.", "smart.", "sexy.","classy."];
  var randomCompliment = Math.floor(Math.random()*arrayOfCompliments.length);
  $("#phrase").append(arrayOfCompliments[randomCompliment]);
}
}


////////////////////////////// CLOCK ///////////////////////////////////////////

function checkTime(i) {
    if (i < 10) {i = "0" + i;}  // add zero in front of numbers < 10
    return i;}

function startTime() {
  var dateObj = new Date();

if ( clockChange === true)
{
  var getHours = dateObj.getHours();
  var getMinutes = dateObj.getMinutes();
  var h= checkTime(getHours);
  var m = checkTime(getMinutes);
  document.getElementById("clock").innerHTML= h + ":" + m;
  var t = setTimeout(startTime, 1000); //this calls the fuction after every second
}

else  {

  var h = dateObj.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
  document.getElementById("clock").innerHTML= h;
  var t = setTimeout(startTime, 1000); //this calls the fuction after every second
}

}


/////////////////////////////// SETTING MENU ///////////////////////////////////
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


//Hide and show weather module on click
function checkboxWeather () {
	if ( $("#weatherCheck").prop("checked") === true)
	{
		$("#current-weather-wrapper").show();
    $("#invisible-flex-item").show();
    $("#top-row-container").css("justify-content","space-between");
	}

	else if ( $("#weatherCheck").prop("checked") === false)
	{
		$("#current-weather-wrapper").hide();
    $("#invisible-flex-item").hide();
    $("#top-row-container").css("justify-content","center") ;
	}
}

//Hide and show ToDo module on click
function checkboxToDo () {

		if ($("#toDoCheck").prop("checked") === true)
		{
				$("#toDo").show();
		}

		else if ($("#toDoCheck").prop("checked") === false)

		{
			$("#toDo").hide();
		}
}


//Function to store setting name data.

function saveName () {
	 var textNameInput = document.getElementById("enterName").value;
	localStorage.setItem("Name", textNameInput);
}

//Function to retrieve name data and set var person on load // Note: When you concatenate undefined with a string it becomes a string

 function retName () {
	var string = "";
	var storedName = localStorage.getItem("Name") + string;

		if ( storedName !== "null" && storedName !== "" && storedName !== undefined && storedName.length>0)
	{
	document.getElementById("enterName").value = storedName;
	person = storedName;
	$("#phrase").empty();
	phrase();
	randomCompliment();
	}

	else if (storedName == null) {
		$("#phrase").empty();
		person = null;
  		phrase();
  		randomCompliment();
	}

	else {
		$("#phrase").empty();
		phrase();
  		randomCompliment();
	}
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

//Function to store setting checkboxes data

function saveCheckbox () {
   var savCheck;
   var savedChecks = [];

   $('.settingCheck').each (
	   function () {
		savCheck = {id: $(this).attr('id'), value: $(this).prop('checked')};
		savedChecks.push(savCheck);
		localStorage.setItem("checkedCheckboxes", JSON.stringify(savedChecks));
	});
}
// Function to retrieve checkboxes data and check all by default

function retCheckbox () {
	var checkedCheckboxes = JSON.parse(localStorage.getItem('checkedCheckboxes'));
	if (checkedCheckboxes === null) {
		$('.settingCheck').each(
			function() {this.checked = true;});
	}

	else {
			for (var i=0; i<checkedCheckboxes.length; i++)
			{$('#' + checkedCheckboxes[i].id ).prop('checked', checkedCheckboxes[i].value);}
	}
}


// clear checkbox

function clearCheckbox () {
	localStorage.removeItem("checkedCheckboxes");

	$('.settingCheck').prop('checked', true);
}

//setting buttons
function saveSettings(){
	saveName();
	saveCheckbox();
	retName();
	retCheckbox();
	clockFormat();
	checkboxWeather();
	checkboxToDo();
	$("#menu").hide();
	$("#grayBackground").hide();
}


function clearSettings () {
	clearName();
	clearCheckbox();
	clockFormat();
	checkboxWeather();
	checkboxToDo();
	$("#menu").hide();
	$("#grayBackground").hide();
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

////////////////////////// WEATHER MODULE FUNCTIONS ////////////////////////////

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



///Test review, it still got some issues with z-index and the hide/show grayBackground. They aren't that bad.
