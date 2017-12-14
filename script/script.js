

window.onload = function(){
  quoteGenerator()
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