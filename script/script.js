let images = ['beach-1.jpg','mountain-1.jpg','beach-2.jpg','mountain-2.jpg','skyline-1.jpeg','window-1.jpg','lake-1.jpg','desert-1.jpg','boats-1.jpg','toucan-1.jpg'];

window.onload = function(){
	let max = images.length-1;
	let min = 1 ;
	let random = Math.floor(Math.random()*(max-min+1)+min);
			
	$('#background-container').css('background-image', 'url('+ images[random] +')');
	$('#background-container').animate({ opacity: 0.6 }, { duration: 1000 });
}