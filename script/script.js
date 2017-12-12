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
	let apiKey = "https://api.apixu.com/v1/current.json?key=844930d1fa3949a8a44111252170512%20&q=";
	let apiCall = apiKey+lon+","+lat;

	$.getJSON(apiCall, function(data) {
		assignWeatherData(data);
	})
}

function getWeatherDataUserInput(input){
	let apiKey = "http://api.apixu.com/v1/current.json?key=844930d1fa3949a8a44111252170512%20&q=";
	let apiCall = apiKey+input;

		$.getJSON(apiCall, function(data) {
			assignWeatherData(data);
		})
}

function assignWeatherData(data){
	let locationOutput = data.location.name;
	let region = data.location.region;
	let weatherDesc = data.current.condition.text;
	let icon = data.current.condition.icon
	let tempC = data.current.temp_c;
	let tempF = data.current.temp_f;

	print(locationOutput,weatherDesc,icon,tempC,tempF,region);
	toHtml(locationOutput,tempC,tempF,icon);
}

function print(locationOutput,weatherDesc,icon,tempC,tempF,region){
	console.log("Location: "+locationOutput+", Region: "+region+", Current weather: "+weatherDesc+", Temperature Celcius: "+tempC+", Temperature farenheit: "+tempF+", Icon: "+icon);
}

function toHtml(locationOutput,tempC,tempF,icon){
	let imgPre = '<img src = "https:';
	$("#wm-icon").html(imgPre+icon+'">')
	$("#wm-temp").html(tempC+"&#176;");
	$("#wm-location").html(locationOutput);
}
//MAIN INPUT//////////////////////////////////////////////////////////////////////////////////////

function getMainFocus() {
    var mainFocus = document.getElementById('mainFocusQuestion').value;
    document.getElementById('mainFocusParagraph').innerHTML = mainFocus
}

//TO DO LIST//////////////////////////////////////////////////////////////////////////////////////

var todoList = {
    todos: [{todoText: "task 1", completed: true}, {todoText: "task 2", completed: true}, {todoText: "task 3", completed:true}],
    displayTodos: function() {
        console.clear();
        for (i = 0; i < this.todos.length; i++) {
            if (this.todos[i].completed === true) {
                console.log("(x) " + this.todos[i].todoText);
            } else {
                console.log("( ) " + this.todos[i].todoText);
            }
        }
    },
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        this.displayTodos();
    },
    changeTodo: function(index, todoText) {
        this.todos[index].todoText = todoText;
        this.displayTodos();
    },
    deleteTodo: function(index) {
        this.todos.splice(this.todos(index, 1));
        this.displayTodos();
    },
    toggleCompleted: function(index) {
        this.todos[index].completed = !this.todos[index].completed;
        this.displayTodos();
    },
    toggleAll: function() {
        var all = true;
        for (i=0; i<this.todos.length; i++) {
            if (this.todos[i].completed === false) {
                this.todos[i].completed = true;
                all = false;
            }
        }
        if (all === true) {
            for (i=0; i<this.todos.length; i++) {
                this.todos[i].completed = false;
            }
        }
        this.displayTodos();
    }
};
