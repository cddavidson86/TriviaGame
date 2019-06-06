var triviaArray = [
    {
        q: "In the arcade game Joust, the player controls a knight riding what flying animal?",
        a: ["Horse", "Elephant", "Ostrich", "Tiger"],
        c: 2,
        image: "assets/images/joust.jpg",

    },
    {
        q: "Who said, 'It's time to kick ass, and chew bubble gum....and I'm all out of gum.'",
        a: ["Duke Nukem", "Kratos", "Master Chief", "Agent 47"],
        c: 0,
        image: "<src html='' width= '200px'>",
    },   
    {
        q: "What does Geralt of Rivia name every horse he owns?",
        a: ["Artax", "Sophia", "Rudolf", "Roach"],
        c: 3,
        image: "<src html='' width= '200px'>",
    }
]


var question = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;

//STARTING FUNCTIONS
startTimer();
populateQuestion();
populateAnswers();


// populates the answers in the array of objects
function populateAnswers() {
    for (var i = 0; i < triviaArray[question].a.length; i++) {
        // building buttons
        var answerButtons = $("<button>");
        answerButtons.text(triviaArray[question].a[i]);
        answerButtons.addClass("when-clicked answer-buttons-animation");
        answerButtons.attr("id", i);
        $("#answer-box").append(answerButtons);
    }
}

// POPULATES THE QUESTION
function populateQuestion() {
    $("#question-box").text(triviaArray[question].q);
}

// IF THE ANSWER IS CORRECT
function correct() {
    correctAnswers++;
    $("#question-box").text("You got it right!");
    $("#answer-box").empty();
    question++;
    populateQuestion();
    populateAnswers();
}

// IF THE ANSWER IS INCORRECT
function incorrect() {
    incorrectAnswers++;
    $("#question-box").text("Sorry, the correct answer is " + 
    triviaArray[question].a[triviaArray[question].c] + "!");
    $("#answer-box").empty();
    question++;
    populateQuestion();
    populateAnswers();
}

function unanswered() {
    unansweredQuestions++;
    $("#question-box").text("Sorry, the correct answer is " + 
    triviaArray[question].a[triviaArray[question].c] + "!");
    $("#answer-box").empty();
    question++;
    populateQuestion();
    populateAnswers();
}

// RUN AFTER THE LAST QUESTION IS ANSWERED TO END THE GAME
function endGame() {
    $("#question-box").html("<h2>FINISH HIM!!</h2>" 
    + "<h2>Number you got right:</h2>" + correctAnswers
    + "<h2>Number you got wrong:</h2>" + incorrectAnswers
    + "<h2>Unanswered:</h2>" + unansweredQuestions);

}

// STARTING ON TIMING FUNCTIONS AFTER THIS LINE


var time = 10;
var intervalId;

// RESETS THE TIME TO 30 SECONDS
function reset() {
    time = 10;
    // DONE: Change the "display" div to "00:00."
    $("#timer-box").text("00:00");
  }

// BEGINS THE TIMER
  function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }

// DECREMENT FUNCTIONS
  function decrement() {
    time--;

    $("#timer-box").html("<p>00:" + time + "</p>");

    if (time === 0) {
      reset();
      incorrect();
    }
  }

// STARTING ON CLICK FUNCTIONS AFTER THIS LINE

$(document).ready(function(){

  $(".when-clicked").click(function(){

    alert($(this).attr("id"));
    console.log($(this).attr("id"));

  });

function displayImage () {
    $("#answer-box").html("<img src='" + triviaArray[question].image + "' width=200px height=200px align=right />");
}

});