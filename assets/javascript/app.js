$(document).ready(function() {
  var triviaArray = [
    {
      q:
        "In the arcade game Joust, the player controls a knight riding what flying animal?",
      a: ["Horse", "Elephant", "Ostrich", "Tiger"],
      c: 2,
      image: "assets/images/joust.jpg"
    },
    {
      q:
        "Who said, 'It's time to kick ass, and chew bubble gum....and I'm all out of gum.'",
      a: ["Duke Nukem", "Kratos", "Master Chief", "Agent 47"],
      c: 0,
      image: "assets/images/dukenukem.jpg"
    },
    {
      q: "What does Geralt of Rivia name every horse he owns?",
      a: ["Artax", "Sophia", "Rudolf", "Roach"],
      c: 3,
      image: "assets/images/roach.jpg"
    }
  ];

  // THE VARIABLES FOR THE GAME
  var question = 0;
  var correctAnswers = 0;
  var incorrectAnswers = 0;
  var unansweredQuestions = 0;
  var clockRunning = false;
  var time = 10;
  var intervalId;

  beginGame();

  //STARTING FUNCTIONS
  function beginGame() {
    question = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    unansweredQuestions = 0;
    reset();
    $("#question-box").html(
      "<h2>Welcome to the game!</h2>" + "<h2>Press start to play!</h2>"
    );
    var startButton = $("<button>");
    startButton.text("START");
    startButton.addClass("answer-buttons-animation start");
    $("#answer-box").append(startButton);
    // WHEN THE START BUTTON IS CLICKED RUN FUNCTIONS AND CLEAR THE ANSWER BOX
    $(".start").click(function() {
      $("#answer-box").empty();
      startTimer();
      populateQuestion();
      populateAnswers();
    });
  }

  // POPULATES THE ANSWERS IN THE OBJECT
  function populateAnswers() {
    for (var i = 0; i < triviaArray[question].a.length; i++) {
      // CREATING BUTTONS
      var answerButtons = $("<button>");
      answerButtons.text(triviaArray[question].a[i]);
      answerButtons.addClass("when-clicked answer-buttons-animation");
      answerButtons.attr("value", i);
      $("#answer-box").append(answerButtons);
    }
    console.log(triviaArray[question].a);
  }

  // POPULATES THE QUESTION
  function populateQuestion() {
    $("#question-box").text(triviaArray[question].q);
    console.log(triviaArray[question].q);
  }

  // IF THE ANSWER IS CORRECT
  function correct() {
    correctAnswers++;
    $("#question-box").text("You got it right!");
    displayImage();
    console.log("correct " + correctAnswers);
  }

  // IF THE ANSWER IS INCORRECT
  function incorrect() {
    incorrectAnswers++;
    $("#question-box").text(
      "Sorry, the correct answer is " +
        triviaArray[question].a[triviaArray[question].c] +
        "!"
    );
    displayImage();
    console.log("incorrect " + incorrectAnswers);
  }

  // WHEN THE TIME IS UP AND NO ANSWER IS INPUT
  function unanswered() {
    unansweredQuestions++;
    $("#question-box").text(
      "Sorry, the correct answer is " +
        triviaArray[question].a[triviaArray[question].c] +
        "!"
    );
    displayImage();
    console.log("unanswered " + unansweredQuestions);
  }

  // DISPLAY THE IMAGE AFTER ANSWER
  function displayImage() {
    $("#answer-box").html(
      "<img src='" +
        triviaArray[question].image +
        "' width=200px height=200px />"
    );
    $("#answer-box").addClass("pretty");
    stop();
    setTimeout(function() {
      resetImageBox();
    }, 2000);
  }

  // RESETS THE IMAGE BOX AND QUESTIONS AND INCREASED QUESTION NUMBER AND REPOPULATES QUESTIONS AND ANSWERS AND CHECKS TO SEE IF THE GAME IS OVER
  function resetImageBox() {
    $("#answer-box").empty();
    if (question === triviaArray.length - 1) {
      $("#answer-box").removeClass("pretty");
      endGame();
    } else {
      $("#answer-box").removeClass("pretty");
      question++;
      populateQuestion();
      populateAnswers();
      console.log(question);
      reset();
      startTimer();
    }
  }

  // RUN AFTER THE LAST QUESTION IS ANSWERED TO END THE GAME
  function endGame() {
    $("#question-box").html(
      "<h2>FINISH HIM!!</h2>" +
        "<h2>Number you got right:</h2>" +
        correctAnswers +
        "<h2>Number you got wrong:</h2>" +
        incorrectAnswers +
        "<h2>Unanswered:</h2>" +
        unansweredQuestions
    );
    var restartButton = $("<button>");
    restartButton.text("RESTART");
    restartButton.addClass("answer-buttons-animation restart");
    $("#answer-box").append(restartButton);
    // WHEN THE RESTART BUTTON IS CLICKED RUN FUNCTIONS AND CLEAR THE ANSWER BOX
    $(".restart").click(function() {
      $("#answer-box").empty();
      beginGame();
    });
    console.log("Game is over.");
  }

  // STARTING ON TIMING FUNCTIONS AND VARIABLES AFTER THIS LINE

  // RESETS THE TIME TO 10 SECONDS
  function reset() {
    time = 10;
    $("#timer-box").text("00:00");
  }

  // BEGINS THE TIMER
  function startTimer() {
    if (!clockRunning) {
      intervalId = setInterval(decrement, 1000);
      clockRunning = true;
    }
  }

  // STOP THE CLOCK
  function stop() {
    clearInterval(intervalId);
    clockRunning = false;
    console.log("stop time");
  }

  // DECREMENT FUNCTIONS
  function decrement() {
    time--;
    $("#timer-box").html("<p>00:" + time + "</p>");
    if (time === 0) {
      reset();
      unanswered();
    }
  }

  // ON CLICK METHODS AND TESTING IF ANSWERS ARE CORRECT OR NOT
  $(document).on("click", ".when-clicked", function(event) {
    console.log(parseInt("the value of this " + this.value));
    console.log(
      parseInt("the value of the array c " + triviaArray[question].c)
    );
    if (parseInt(this.value) === parseInt(triviaArray[question].c)) {
      correct();
    } else {
      incorrect();
    }

    console.log(parseInt(this.value));
  });
});
