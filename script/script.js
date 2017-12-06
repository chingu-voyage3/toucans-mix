

window.onload = function startTime() {
  var dateObj = new Date();

  var h = dateObj.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });

  document.getElementById("clock").innerHTML= h;

  var t = setTimeout(startTime, 1000); //this calls the fuction after every second
}
