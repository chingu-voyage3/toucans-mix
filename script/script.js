

window.onload = function() {
  var dateObj = new Date();

  var h = dateObj.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });

  document.getElementById("clock").innerHTML= h;

}
