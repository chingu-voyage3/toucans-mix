

window.onload = function(){
  startTime();
  phrase();
  randomCompliment();
}
//declaring variables
var dateObj = new Date();
var internalhour = dateObj.getHours();

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


function startTime() {
  var dateObj = new Date();
  var h = dateObj.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', second: 'numeric', hour12: true });
  document.getElementById("clock").innerHTML= h;
  var t = setTimeout(startTime, 1000); //this calls the fuction after every second
}

function randomCompliment () {
  var arrayOfCompliments = ["handsome", "cutie", "human", "pal", "smart", "sexy"];
  var randomCompliment = Math.floor(Math.random()*arrayOfCompliments.length);
  $("#phrase").append(arrayOfCompliments[randomCompliment]);
}
