//HTML elements
var startpageDiv = document.getElementById("startpage");
var startButton = document.getElementById("startbutton");
var quizEl = document.getElementById("quiz");
var quizTimer = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var resultsEl = document.getElementById("results")
var endgameEl = document.getElementById("endgame");
var finalScoreEl = document.getElementById("finalScore");
var submitscoreButton = document.getElementById("submitScore");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscorePage = document.getElementById("highscorePage");
var highscoreHeader = document.getElementById("highscoreHeader");
var highscoreInitials = document.getElementById("highscoreInitials");
var highscoreName = document.getElementById("initials");
var highscoreDisplay = document.getElementById("highscoreScore");
var endgameButton = document.getElementById("endgameButton");
var playagainButton = document.getElementById("playAgain");
var clearscoreButton = document.getElementById("clearHighscore");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

//quiz questions

var quizQuestions = [{
    question: "What does HTML stand for?",
    choiceA: "Hyper Trainer Marking Language",
    choiceB: "Hyper Text Marketing Language",
    choiceC: "Hyper Text Markup Language",
    choiceD: "Hyper Text Markeup Leveler",
    correctAnswer: "c"},
{
    question: "What does DOM stand for?",
    choiceA: "Display Object Management",
    choiceB: "Document Object Model",
    choiceC: "Desktop Object Model",
    choiceD: "Document Object Management",
    correctAnswer: "b"},
{
    question: "What HTML attribute references an external JS file?",
    choiceA: "index",
    choiceB: "src",
    choiceC: "href",
    choiceD: "div",
    correctAnswer: "b"},
{

    question: "Which CSS property is used to change the text color of an element?",
    choiceA: "color",
    choiceB: "text-color",
    choiceC: "fgcolor",
    choiceD: "None of the above",
    correctAnswer: "a"},


];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 25;
var timerInterval;
var score = 0;
var correct;

//cycle through quiz queston arrays
function generateQuizQuestion(){
    endgameEl.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC. innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};
//starts timer
function startQuiz(){
    endgameEl.style.display = "none";
    startpageDiv.style.display = "none";
    generateQuizQuestion();

    timerInterval = setInterval(function(){
        timeLeft --;
        quizTimer.textContent = "time left: " + timeLeft;

        if (timeLeft===0){
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizEl.style.display = "block";
}

//end page
function showScore(){
    quizEl.style.display = "none";
    endgameEl.style.display = "flex";
    clearInterval(timerInterval);
    highscoreName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";


}

submitscoreButton.addEventListener("click", function highscore(){

    if (highscoreName.value === " "){
        alert ("Initials cannot be blank");
        return false;
    } else{
        var savedHighscore = JSON.parse(localStorage.getItem("savedHighscore")) || [];
        var currentUser = highscoreName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        endgameEl.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscorePage.style.display = "block";
        endgameButton. style. display = "flex";

        savedHighscore.push (currentHighscore);
        localStorage.setItem("savedHighscore", JSON.stringify(savedHighscore));
        generateHighscores();
    }
});

//clears list
function generateHighscores(){
    highscoreInitials.innerHTML = " ";
    highscoreDisplay. innerHTML = " ";
    var highscores = JSON.parse(localStorage.getItem("savedHighscore"))|| [];
    for (i=0; i<highscores.length; i++){
        var newNamespan = document.createElement("li");
        var newScorespan = document.createElement("li");
        newNamespan.textContent = highscores[i].name;
        newScorespan.textContent = highscores[i].score;
        highscoreInitials.appendChild(newNamespan);
        highscoreDisplay.appendChild(newScorespan);
    }

}

//displays high score page - hides other pages
function showHighscore(){
    startpageDiv.style.display = "none";
    endgameEl.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscorePage.style.display = "block";
    endgameButton.style.display = "flex";

    generateHighscores();
}

//clears local storage
function clearScore(){
    window.localStorage.clear();
    highscoreInitials.textContent = "";
    highscoreDisplay.textContent = "";
}

//set variables back to original values
function replayQuiz(){
    highscoreContainer.style.display = "none";
    endgameEl.style.display = "none";
    startpageDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

//check answers
function checkAnswer (answer){
    correct = quizQuestions [currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("this is correct!!");
        currentQuestionIndex++;
        generateQuizQuestion();
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("that is incorrect")
        currentQuestionIndex++;
        generateQuizQuestion();
    } else{
        showScore();
    }
}

//start quiz
startButton.addEventListener("click", startQuiz);