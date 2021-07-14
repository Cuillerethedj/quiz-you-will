//variables
var time = 100;
var questionIndex = 0;
var timerInterval;
var score;

//Selectors
var timerEl = document.querySelector("#timer")
var questionsScreen = document.querySelector("#questionsScreen");
var answersEl = document.querySelector("#answers")


var questions = [{
		question: "Who is Han Solos Best Friend?",
		choices: ["Chewbaca", "Princess Leia", "Luke Skywalker", "Lando"],
		correctAnswer: "Chewbaca"
	},
	{
		question: "In Star Wars, what do they call the invisible power that binds the galaxy together?",
		choices: ["The Funk", "The Saab", "The Force", "The Darkness"],
		correctAnswer: "The Force"
	},
	{
		question: "How old was Yoda when he died",
		choices: ["19", "86", "4000", "900"],
		correctAnswer: "900"
	},
	{
		question: "What species is Jabba?",
		choices: ["Turtle", "Lizard", "Hutt", "Hippo"],
		correctAnswer: "Hutt"
	}
]



function start() {
	var startScreen = document.querySelector("#startScreen");
	startScreen.setAttribute("class", "hide");
	questionsScreen.removeAttribute("class", "hide");

	timerInterval = setInterval(timer, 1000);
	timerEl.textContent = time;
	startQuestions();
}

function timer() {
	time--;
	timerEl.textContent = time;

	if (time <= 0) {
		endGame();
	}
}

function startQuestions() {
	var currentQuestion = questions[questionIndex];

	var questionEl = document.querySelector("#question-title")
	questionEl.textContent = currentQuestion.question;

	answersEl.innerHTML = "";

	currentQuestion.choices.forEach(function (choice, i) {
		var choiceBtn = document.createElement("button");
		choiceBtn.setAttribute("class", "choice");
		choiceBtn.setAttribute("value", choice);
		choiceBtn.textContent = i + 1 + ". " + choice;
		choiceBtn.addEventListener("click", answerBtnClicked);
		answersEl.appendChild(choiceBtn);
	})
}

function answerBtnClicked() {
	
}







function endGame() {
	clearInterval(timerInterval);
}
document.querySelector("#startGame").addEventListener("click", start)