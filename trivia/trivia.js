$(document).ready(function(){

  // event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);

})
var trivia = {
  // trivia properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 15,
  timerOn: false,
  timerId : '',
  // questions options and answers data
  questions: {
    q1: 'Who is the assistant to the regional manager?',
    q2: 'What kind of farm does Dwight own?',
    q3: 'Which office employee did Michael hit with his car?',
    q4: 'What is the name of the company that bought out Dunder Mifflin?',
    q5: "What type of car does Dwight drive?",
    q6: 'Whose mother does Michael date?',
    q7: "What is Scranton's nickname?"
  },
  options: {
    q1: ['Jim', 'Dwight', 'Pam', 'Oscar'],
    q2: ['Corn', 'Apple', 'Beat', 'Orange'],
    q3: ['Meredith', 'Kevin', 'Creed', 'Stanley'],
    q4: ['Staples', 'Office Max', 'Sabre', 'PaperNet'],
    q5: ['BMW M3','Ford F-150','Honda Accord','Pontiac Trans Am'],
    q6: ['Pam','Kelly','Phyllis','Angela'],
    q7: ['The Big Apple', 'The Electric City', 'The Windy City','The Green City ']
  },
  answers: {
    q1: 'Dwight',
    q2: 'Beat',
    q3: 'Meredith',
    q4: 'Sabre',
    q5: 'Pontiac Trans Am',
    q6: 'Pam',
    q7: 'The Electric City'
  },
  // Start Game
startGame: function(){
  // game results reset
  trivia.currentSet = 0;
  trivia.correct = 0;
  trivia.incorrect = 0;
  trivia.unanswered = 0;
  clearInterval(trivia.timerId);

  // Show the Game
  $('#game').show();

  //  Empty previous results
  $('#results').html('');

  // show timer
  $('#timer').text(trivia.timer);

  // hide start button
  $('#start').hide();

  $('#remaining-time').show();

  // ask first question
  trivia.nextQuestion();

},
//  loop and display questions and answers
nextQuestion : function(){

  // 15 second timer
  trivia.timer = 15;
   $('#timer').removeClass('last-seconds');
  $('#timer').text(trivia.timer);

  // Control the time
  if(!trivia.timerOn){
    trivia.timerId = setInterval(trivia.timerRunning, 1000);
  }

  // question name value pair
  var questionContent = Object.values(trivia.questions)[trivia.currentSet];
  $('#question').text(questionContent);

  // options for the current question
  var questionOptions = Object.values(trivia.options)[trivia.currentSet];

  // guess choice  html
  $.each(questionOptions, function(index, key){
    $('#options').append($('<button class="option btn btn-primary btn-lg ml-1">'+key+'</button>'));
  })

},
//timer functinos
  timerRunning : function(){
    // if timer still has time left and there are still questions left to ask
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    // when time runs out and increment unanswered, run result
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    //  show results
  else if(trivia.currentSet === Object.keys(trivia.questions).length){

    // results
    $('#results')
      .html('<h3>"When I discovered YouTube, I didn\'t work for five days. I did nothing. I watched Cookie Monster sing Chocolate Rain about a thousand times."-Michael Scott</h3>'+
      '<p>Correct: '+ trivia.correct +'</p>'+
      '<p>Incorrect: '+ trivia.incorrect +'</p>'+
      '<p>Unaswered: '+ trivia.unanswered +'</p>'+
      '<p>play again?</p>');

    // hide game sction
    $('#game').hide();

    // show start button to begin a new game
    $('#start').show();
  }

},
// method to evaluate the option clicked
  guessChecker : function() {

    // timer ID for gameResult setTimeout
    var resultId;

    // the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    // if the text of the option picked matches the answer of the current question, increment correct
    if($(this).text() === currentAnswer){
      // turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-primary');

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct!</h3>');
    }
    // else the user picked the wrong option, increment incorrect
  else{
    // turn button clicked red for incorrect
    $(this).addClass('btn-danger').removeClass('btn-primary');

    trivia.incorrect++;
    clearInterval(trivia.timerId);
    resultId = setTimeout(trivia.guessResult, 1000);
    $('#results').html('<h3>Wrong! '+ currentAnswer +'</h3>');
  }

},
// method to remove previous question results and options
guessResult : function(){

  // increment to next question set
  trivia.currentSet++;

  // remove the options and results
  $('.option').remove();
  $('#results h3').remove();

  // begin next question
  trivia.nextQuestion();

}

}
