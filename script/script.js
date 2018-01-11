$(document).ready(function(){
	let imageURL = 'https://source.unsplash.com/1900x768/?nature,skyline,beach';	
	$('#background-container').css('background-image', 'url('+ imageURL +')');
	$('#background-container').animate({ opacity: 0.6 }, { duration: 3000 });

});