// HTML RECALLS----------------------------------
questionaireHTML = document.querySelector(".questionaire");
listHTML = document.querySelector("#list");
highscoreHTML = document.querySelector("#highscore");
questionHTML = document.querySelector("#question");
answer1HTML = document.querySelector("#answer1");
answer2HTML = document.querySelector("#answer2");
answer3HTML = document.querySelector("#answer3");
answer4HTML = document.querySelector("#answer4");
startGameHTML = document.querySelector("#startGame");
time = document.querySelector("#timer");
titlePageHTML = document.querySelector(".titlePage");
scoreHTML = document.querySelector("#score");
hListHTML = document.querySelector("#highscoreList");
nameHTML = document.querySelector("#nameInput");
submitHTML = document.querySelector("#submit");

startGameHTML.addEventListener("click", function(a) {
    a.stopPropagation();
    start();
})

// Javascript Variables----------------------------------------

// Time Left For Game
timeLeft = 100;

// Keeps track of high score
var highscore = [];

// Questions to be asked
var questions = [
    {
        question: "Who is Han Solos Best Friend?",
        choices: ["Chewbaca","Princess Leia","Luke Skywalker","Lando"],
        correctAnswer: "Chewbaca"
    },
    {
        question: "In Star Wars, what do they call the invisible power that binds the galaxy together?",
        choices: ["The Funk","The Saab","The Force","The Darkness"],
        correctAnswer: "The Force"
    },
    {
        question: "How old was Yoda when he died",
        choices: ["19","86","4000","900"],
        correctAnswer: "900"
    },
    {
        question: "What species is Jabba?",
        choices: ["Turtle","Lizard","Hutt","Hippo"],
        correctAnswer: "Hutt"
    }]

// Creates List To Be Outputted
    function createList() {
        var list = document.createElement("li");
        return list;
    }

    function hideTitle() {
        titlePageHTML.setAttribute("class", "hide")
    }

    function showGame() {
        questionaireHTML.removeAttribute("class", "hide");
    }

    function showHighscore() {
        scoreHTML.setAttribute("class", "hide");
    }

       

    function intro() {
        
        questionaireHTML.setAttribute("class", "hide");
        scoreHTML.setAttribute("class", "hide");
        titlePageHTML.removeAttribute("class", "hide");

        highscoreHTML.addEventListener("click", function(a) {
            a.stopPropagation();
            getHighscore();
        })
    }

    function start() {
        // Show the questionaire:
        questionaireHTML.removeAttribute("class", "hide");

        // Hide the title:
        titlePageHTML.setAttribute("class", "hide");

        var timeInterval = setInterval(function() {
            timeLeft--;
            time.innerHTML = "Time: " + timeLeft;

            if (timeLeft == 0) {
                clearInterval(timeInterval);
                gameOver();
            }
        }, 1000);

        var i = 0;

        function changeQuestion(i) {
            if (i < questions.length) {
                questionHTML.innerHTML = questions[i].question;
                answer1HTML.innerHTML = questions[i].answer1.text;
                answer2HTML.innerHTML = questions[i].answer2.text;
                answer3HTML.innerHTML = questions[i].answer3.text;
                answer4HTML.innerHTML = questions[i].answer4.text;
            } else {
                clearInterval(timeInterval);
                gameOver();
            }
        }

        // First Choice
        answer1HTML.addEventListener("click", function(event) {
            event.stopPropagation();
            debugger;
            if (questions[i].answer1.correct == true) {
                i++;
                changeQuestion(i);
            } else {
                timeLeft = timeLeft - 15;
                i++;
                changeQuestion(i);

            }
        });

        //Second Choice
        answer2HTML.addEventListener("click", function(event) {
            event.stopPropagation();
            debugger;
            if (questions[i].answer2.correct == true) {
                i++;
                changeQuestion(i);
            } else {
                timeLeft = timeLeft - 15;
                i++;
                changeQuestion(i);
            }
        });

        // Third Choice
        answer3HTML.addEventListener("click", function(event) {
            event.stopPropagation();
            debugger;
            if (questions[i].answer3.correct == true) {
                i++;
                changeQuestion(i);
            } else {
                timeLeft = timeLeft - 15;
                i++;
                changeQuestion(i);
            }
        });

        //Fourth Choice
        answer4HTML.addEventListener("click", function(event) {
            event.stopPropagation();
            debugger;
            if (questions[i].answer4.correct == true) {
                i++;
                changeQuestion(i);
            } else {
                timeLeft = timeLeft - 15;
                i++;
                changeQuestion(i);
            }
        });

    }

    function getLocalStorage(highscore) {
        if (localStorage.getItem("highscore") === null) {
            return highscore;
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

    function outputHighscore(highscore, hListHTML) {
        for (var i = 0; i < highscore.length; i++) {
            var currentPerson = highscore[i];
            var listItem = createList();
            listItem.textContent = "Name: " + currentPerson.name + " Score: " + currentPerson.score;
            hListHTML.appendChild(listItem);
        }
    }

    function getHighscore() {
        questionaireHTML.setAttribute("class", "hide");
        titlePageHTML.setAttribute("class", "hide");
        scoreHTML.removeAttribute("class", "hide");
        nameHTML.setAttribute("class", "hide");
        submitHTML.setAttribute("class", "hide");
        highscore = getLocalStorage(highscore);
        outputHighscore(highscore, hListHTML);

        highscoreHTML.addEventListener("click", function() {
            hListHTML.innerHTML = "";
            debugger;
            intro();
        })
    }

    function gameOver() {
        questionaireHTML.setAttribute("class", "hide");
        titlePageHTML.setAttribute("class", "hide");
        scoreHTML.removeAttribute("class", "hide");
        highscoreHTML.setAttribute("class", "hide");
        nameHTML.removeAttribute("class", "hide");
        submitHTML.removeAttribute("class", "hide");

        highscore = getLocalStorage(highscore);
        time = timeLeft;

        submitHTML.addEventListener("click", function() {
            nameHTML.setAttribute("class", "hide");
            submitHTML.setAttribute("class", "hide");
            var name = nameHTML.value
            var person = {
                name: name,
                score: timeLeft
            }

            highscore.push(person);
            sort(highscore);
            outputHighscore(highscore, hListHTML);
            localStorage.setItem("highscore", JSON.stringify(highscore));
        })

    }