$(document).ready(function () {

        var urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams.get("location"));
        var location = urlParams.has("location") ? urlParams.get("location") : "";
        var city = urlParams.has("city") ? urlParams.get("location") : "";
        var state = urlParams.has("state") ? urlParams.get("state") : "";
        var date = urlParams.has("date") ? urlParams.get("date") : "";
        console.log(date);
        var startDate = date + 'T01:01:01Z'
        var endDate = date + 'T23:00:00Z'
        console.log(startDate);
        console.log(endDate);

        var zip = urlParams.has("zip") ? urlParams.get("zip") : "";
        $("#startbtn").on("click", function (event) {
            event.preventDefault();

            location = $("#inputLocationCity").val().trim();
            city = location;
            state = $("#inputLocationState").val().trim();
            date = $("#inputDate").val().trim();
            zip = $('#zip-code').val().trim();

            //Input validation happening here...
            if (state === '' || date === '' || city === '' || zip === '') {
                var inputError = $('<p>').addClass('text-white').text('All fields are required');
                $('#inputError').html(inputError);
            }
            else {
                // Load the next page
                window.location.href = `D8nite.html?location=${location}&city=${city}&zip=${zip}&date=${date}&state=${state}`;
            };
        });

        //Display user input criteria on results page
        function displayCriteria() {
            $('#userLocation').html(city + ', ' + state);
            $("#userZip").html(zip);
            $("#userDate").html(date);
        }
        displayCriteria();

        function displayResultsWeather() {
            var APIKey = "166a433c57516f51dfab1f7edaed8413";

            // Here we are building the URL we need to query the database
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
                "q=" + location + "&units=imperial&appid=" + APIKey;

            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                // Log the resulting object
                console.log('-----WEATHER-----')

                var windMPH = Math.floor(response.wind.speed * 2.237);
                var tempF = Math.floor(response.main.temp);

                // Log the data in the console as well
                console.log("Temperature (F): " + tempF);
                console.log("Wind Speed: " + windMPH);
                console.log("Humidity: " + response.main.humidity + ' %');

                var weatherDiv = $('<div>');
                var pTemp = $('<p>').append("Temperature: " + tempF + 'F');
                var pWind = $('<p>').append("Wind Speed: " + windMPH + 'mph');
                var pHumidity = $('<p>').append("Humidity: " + response.main.humidity + '%');

                weatherDiv.append(pTemp);
                weatherDiv.append(pWind);
                weatherDiv.append(pHumidity);
                $('#weatherResults').append(weatherDiv);
            });
        };

        function displayResultsEvents() {
            // Here we are building the URL we need to query the database
            var queryURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=R6DhROIJxrsIGyZyaj1qzfCpwqb7IsA9&locale=*&city=' + city + '&stateCode=' + state + '&startDateTime=' + startDate + '&endDateTime=' + endDate

            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var events = response._embedded.events;
                console.log('-----EVENTS-----')

                for (var i = 0; i < events.length; i++) {
                    console.log(events[i].name);
                    console.log(events[i].dates.start.localDate);
                    try {
                        console.log(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
                    } catch (err) {
                        console.log(err);
                    }
                    console.log(events[i].url);

                    var eventCard = $('<div>').addClass('card');
                    var pEventName = $('<h5>').addClass('card-title');
                    pEventName.append(events[i].name);

                    var pEventDate = $('<h6>').addClass('card-text')
                    pEventDate.append(events[i].dates.start.localDate);

                    var pEventVenue = $('<p>').addClass('card-text');
                    pEventVenue.append(events[i]._embedded.venues[0].name + ' , ' + events[i]._embedded.venues[0].city.name);

                    var pEventTickets = $('<a href=' + events[i].url + '>').addClass('btn btnbook btn-primary').text('Get Tickets')

                    eventCard.append(pEventName);
                    eventCard.append(pEventDate);
                    eventCard.append(pEventVenue);
                    eventCard.append(pEventTickets);
                    $('#eventResults').append(eventCard);
                }

            });
        };

        function displayResultsFood() {
            var queryURL = 'https://opentable.herokuapp.com/api/restaurants?city=' + city + '&state=' + state + '&per_page=5';
            // Here we run our AJAX call to the OpenTable API
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (response) {
                console.log('-----RESTAURANTS-----')

                var restaurants = response.restaurants;
                for (var i = 0; i < restaurants.length; i++) {
                    console.log(response.restaurants[i].image_url);
                    console.log(response.restaurants[i].name);
                    console.log(response.restaurants[i].address);
                    console.log(response.restaurants[i].city);
                    console.log(response.restaurants[i].phone);
                    console.log(response.restaurants[i].reserve_url);

                    var restCard = $('<div>').addClass('card');
                    var pRestName = $('<h5>').addClass('card-title');
                    pRestName.append(response.restaurants[i].name);

                    var pRestAddress = $('<h6>').addClass('card-text')
                    pRestAddress.append(response.restaurants[i].address + ' , ' + response.restaurants[i].city);

                    var pRestPhone = $('<p>').addClass('card-text');
                    pRestPhone.append(response.restaurants[i].phone);

                    var pRestReserve = $('<a href=' + response.restaurants[i].reserve_url + '>').addClass('btn btnbook btn-primary').attr('id', 'reserveBtn').text('Reserve Now')

                    restCard.append(pRestName);
                    restCard.append(pRestAddress);
                    restCard.append(pRestPhone);
                    restCard.append(pRestReserve);
                    $('#restResults').append(restCard);
                };
            });
        };



        var apiURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&zip=" + zip + "&api_key=bdkdrx4f9j4p22xfhn8afxj8";

        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(handleMovies).catch((req, res, error) => {
            console.log(error);
        });

        function handleMovies(response) {
            var results = response;
            // debugger;
            results.forEach(getMovieInfo);
            console.log(results);
        }

        function getMovieInfo(movie) {
            var myMovie = {};
            myMovie.title = movie.title;
            myMovie.genres = movie.genres[0];
            myMovie.theater = movie.showtimes[0].theatre.name;
            myMovie.fandango = movie.showtimes[0].ticketURI
            myMovie.rating = '';
            if (movie.ratings) {
                myMovie.rating = movie.ratings[0].code;
            }

            $.ajax({

                url: "https://www.omdbapi.com/?t=" + encodeURI(movie.title) + "&apikey=698e080b",
                method: "GET"

            }).done(function (resp) {
                var res = resp;
                myMovie.poster = res.Poster;
                console.log(myMovie);
                // add movie to DOM
                var movieDiv = $('<div>').addClass('card');
                var movieName = $('<h5>').addClass('card-title')
                movieName.append(myMovie.title);
                var movieGenre = $('<h6>').addClass('card-text')
                movieGenre.append(myMovie.genres);
                var movieTheater = $('<p>').addClass('card-text')
                movieTheater.append(myMovie.theater);
                var movieDango = $('<a href=' + myMovie.fandango + '>').addClass('btn btnbook btn-primary').attr('id', 'dangoBtn').text('Buy Now');

                var movieRating = $('<p>').append(myMovie.rating);
                var showImage = $("<img>");
                showImage.attr("src", myMovie.poster)

                movieDiv.append(movieName);
                movieDiv.append(movieGenre);

                movieDiv.append(movieTheater);
                movieDiv.append(movieRating);

                movieDiv.append(showImage);

                movieDiv.append(movieDango);
                $('#movieResults').append(movieDiv);
            });

        };
        displayResultsWeather();
        displayResultsFood();
        displayResultsEvents();

        handleMovies();
        handleMovies();

    });
