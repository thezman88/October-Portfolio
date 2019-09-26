var APIKey = "1"

    // Here we are building the URL we need to query the database
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/"+ APIKey+"/search.php?s=margarita" ;
    // api.openweathermap.org/data/2.5/weather?q={city name}

    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

});
