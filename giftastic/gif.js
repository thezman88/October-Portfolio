$(document).ready(function() {
  //Array for  topics to be added
  var topics = [];


  function showAthlete() {

    var x = $(this).data("search");
    console.log(x);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=91d03pTQbsRiE7nbBXrjjBMkEZnnZNmL&limit=10";

    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {

        var showDiv = $("<div class='col-lg-4'>");

        var rating = results[i].rating;
        var defaultAnimatedSrc = results[i].images.fixed_height.url;
        var staticSrc = results[i].images.fixed_height_still.url;
        var showImage = $("<img>");
        var p = $("<p>").text("Rating: " + rating);

        showImage.attr("src", staticSrc);
        showImage.addClass("athleteGiphy");
        showImage.attr("data-state", "still");
        showImage.attr("data-still", staticSrc);
        showImage.attr("data-animate", defaultAnimatedSrc);
        showDiv.append(p);
        showDiv.append(showImage);
        $("#gifArea").prepend(showDiv);

      }
    });
  }
  //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
  $("#addShow").on("click", function(event) {
    event.preventDefault();
    var newAthlete = $("#athleteInput").val().trim();
    topics.push(newAthlete);
    console.log(topics);
    $("#athleteInput").val('');
    displayButtons();
  });
  //Function iterates through topics array to display button with array values in "myButtons" section of HTML
  function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn mr-1">');
      a.attr("id", "show");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $(".btn-group").append(a);
    }
  }


  displayButtons();

  //Click event on button with id of "show" executes display athlete function
  $(document).on("click", "#show", showAthlete);

  //Click event on gifs with class of "athleteGiphy" executes pausePlayGifs function
  $(document).on("click", ".athleteGiphy", pausePlayGifs);

  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pausePlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

});
