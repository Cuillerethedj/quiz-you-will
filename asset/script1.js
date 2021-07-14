//variables
var time = 100;
var questionIndex = 0;
var timerInterval;
var score;

//Selectors
var timerEl = document.querySelector("#timer");
var questionsScreen = document.querySelector("#questionsScreen");
var answersEl = document.querySelector("#answers");
var scoreEl = document.querySelector("#score");
var nameInput = document.querySelector("#nameInput")
var submitEl = document.querySelector("#submit")
var highScore = document.querySelector("#highscoreList")


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
		choiceBtn.value = choice;
		choiceBtn.textContent = i + 1 + ". " + choice;
		choiceBtn.addEventListener("click", answerBtnClicked);
		answersEl.appendChild(choiceBtn);
	})
}

function answerBtnClicked() {
	if (questions[questionIndex].correctAnswer == this.value)
	{
		if (questionIndex < questions.length -1){
			questionIndex++ 
			startQuestions()
		}
		else {
			endGame()
		}
	}
	else{
		if (questionIndex < questions.length -1){
			time = time -15
			questionIndex++ 
			startQuestions()
		}
		else { time = time -15
			endGame()
		}
	}
}

function createList() {
	var list = document.createElement("li");
	return list;
}






function endGame() {
	questionsScreen.setAttribute("class", "hide");
	clearInterval(timerInterval);
	scoreEl.removeAttribute("class", "hide");
	score = getLocalStorage()
	submitEl.addEventListener("click",store);
}
function store()
{
	var name = nameInput.value;
	var person = 
	{
		name: name,
		score: time,
	}
	score.push(person);
	sort(score);
	localStorage.setItem("highscore", JSON.stringify(score));
	outputHighscore(score, highScore);
}
function getLocalStorage() {
	if (localStorage.getItem("highscore") === null) {
		return [];
	} else {
		return JSON.parse(localStorage.getItem("highscore"));
	}
}
function sort(highscore) {
	highscore = highscore.sort(function(a, b) {
		return a.score - b.score
	});
	highscore = highscore.reverse();
	return highscore;
}
function outputHighscore(score, highScore) {
	for (var i = 0; i < score.length; i++) {
		var currentPerson = score[i];
		var listItem = createList();
		listItem.textContent = "Name: " + currentPerson.name + " Score: " + currentPerson.score;
		highScore.appendChild(listItem);
	}
}
document.querySelector("#startGame").addEventListener("click", start)