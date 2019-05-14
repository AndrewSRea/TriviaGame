$(document).ready(function () {
    var options = [
        {
            question: "Mexican Radio", 
            choice: ["The Kinks", "Wall of Voodoo", "Kajagoogoo", "Talking Heads"],
            answer: 1,
            photo: "assets/images/wall-of-voodoo.jpg"
         },
         {
            question: "Union of the Snake", 
            choice: ["Iron Maiden", "Judas Priest", "Duran Duran", "Whitesnake"],
            answer: 2,
            photo: "assets/images/duran-duran.jpg"
         }, 
         {
            question: "Der Kommissar", 
            choice: ["Berlin", "Kraftwerk", "The Clash", "Falco"],
            answer: 3,
            photo: "assets/images/falco.jpg"
        }, 
        {
            question: "Come Dancing", 
            choice: ["David Bowie", "The Kinks", "Men Without Hats", "Wang Chung"],
            answer: 1,
            photo: "assets/images/the-kinks.jpg"
        }, 
        {
            question: "Whip It", 
            choice: ["Michael Jackson", "The B-52's", "Devo", "The Motels"],
            answer: 2,
            photo: "assets/images/devo.jpg"
        }, 
        {
            question: "Video Killed the Radio Star", 
            choice: ["Queen", "The Art of Noise", "The Go-Go's", "The Buggles" ],
            answer: 3,
            photo: "assets/images/the-buggles.jpg"
        }, 
        {
            question: "Roxanne", 
            choice: ["Poison", "The Police", "Bon Jovi", "Warrant" ],
            answer: 1,
            photo: "assets/images/the-police.jpg"
        }, 
        {
            question: "True Faith", 
            choice: ["New Order", "The Church", "The Cult", "George Michael" ],
            answer: 0,
            photo: "assets/images/new-order.jpg"
        },
        {
            question: "The One I Love", 
            choice: ["INXS", "U2", "The Smiths", "R.E.M." ],
            answer: 3,
            photo: "assets/images/REM.jpg"
        },
        {
            question: "Master and Servant", 
            choice: ["Dead or Alive", "Adam Ant", "Depeche Mode", "Billy Idol"],
            answer: 2,
            photo: "assets/images/depeche-mode.jpg"
        },
        {
            question: "Don't You Want Me", 
            choice: ["Roxy Music", "The Human League", "ABC", "Eurythmics"],
            answer: 1,
            photo: "assets/images/the-human-league.jpg"
        },
        {
            question: "Some Like It Hot", 
            choice: ["Van Halen", "Donna Summer", "ZZ Top", "The Power Station"],
            answer: 3,
            photo: "assets/images/the-power-station.jpg"
        },
        {
            question: "Radio Ga Ga", 
            choice: ["Queen", "Kajagoogoo", "Wang Chung", "Devo"],
            answer: 0,
            photo: "assets/images/queen.jpg"
        },
        {
            question: "Girlfriend in a Coma", 
            choice: ["They Might Be Giants", "The Smiths", "Weird Al Yankovic", "Violent Femmes"],
            answer: 1,
            photo: "assets/images/the-smiths.jpg"
        },
        {
            question: "Let's Dance", 
            choice: ["Madonna", "Cyndi Lauper", "David Bowie", "Lionel Richie"],
            answer: 2,
            photo: "assets/images/david-bowie.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })
        
