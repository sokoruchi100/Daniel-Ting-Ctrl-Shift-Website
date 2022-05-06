const timeCounter = document.getElementById("time-counter");
const largeDiv = document.getElementsByClassName("large-div");
const beatContainer = document.getElementById('beat-container');
const buttonContainer = document.getElementById('button-container');
const userText = document.getElementById('user');
const opponentText = document.getElementById('opponent');
const midText = document.getElementById('mid-text');
const nextRound = document.getElementById('next-round');
const userPoints = document.getElementById('user-points');
const opponentPoints = document.getElementById('opponent-points');
const winLose = document.getElementById('win-lose');
const winLoseContainer = document.getElementById('winlose-container');
const endChoice = document.getElementById('end-choice');
const roundCounter = document.getElementById('round-counter');
const timer = document.getElementById('timer');
const secondPart = document.getElementById('second-part');
const exitButton = document.getElementById('exit-button');
const endChoiceButton = document.getElementById('end-choice-button');
const outOfTime = document.getElementById('out-of-time');
const firstTime = true;
const rps = ["r", "p", "s"];
let difficulty;
let lastRound;
let previousChoice;
let repeat = 0;
let wStreak = 0;
let lStreak = 0;

const pairs = {
    'r':'s',
    's':'p',
    'p':'r'
}

const nextChoice = {
    'r':'p',
    'p':'s',
    's':'r'
}

//Hides all game game functions eg YOU WIN
function hide() {
    secondPart.style.display = 'block';
    for (let i = 0; i < largeDiv.length; i++) {
        if (largeDiv[i].id == 'button-container' || largeDiv[i].id == 'next-round' || largeDiv[i].id == 'out-of-time') {
        continue;
        }
    largeDiv[i].style.opacity = 0;
    }
    endChoice.style.display = "none";
    buttonContainer.style.display = "flex";
    outOfTime.style.display = "none";
}

function opponent() {
    if (difficulty == 'e') {
        opponentText.style.color = "green";
        return beginnerOpponent();
    } else if (difficulty == 'm') {
        opponentText.style.color = "yellow";
        return experiencedOpponent();
    } else if (difficulty == 'h'){
        opponentText.style.color = "red";
        return championOpponent();
    }
}

function beginnerOpponent(){
    if (lastRound == 'l') {
        return previousChoice
    } else if (lastRound == 'w' || lastRound == 't') {
        previousChoice = nextChoice[previousChoice];
        return previousChoice;
    } else {
        previousChoice = 'r';
        return previousChoice;
    }
}

function experiencedOpponent(){
    if (lastRound == 'l') {
        previousChoice = nextChoice[previousChoice];
        return previousChoice;
    } else if (lastRound == 'w') {
        previousChoice = nextChoice[yourPreviousChoice];
        return previousChoice;
    } else if (lastRound == 't'){
        const rng = Math.floor(Math.random()*100) + 1;
        if (rng <= 35) {
            previousChoice = 'r';
            return previousChoice;
        } else if (rng <= 70) {
            previousChoice = 's';
            return previousChoice;
        } else {
            previousChoice = 'p';
            return previousChoice;
        }
    } else {
        const rng = Math.floor(Math.random()*2);
        if (rng < 1) {
            previousChoice = 'r';
            return previousChoice;
        } else {
            previousChoice = 'p';
            return previousChoice;
        }
    }
}

function championOpponent(){
    if (lastRound == 'l') {
        const rng = Math.floor(Math.random()*4);
        if (rng < 3) {
            previousChoice = pairs[previousChoice];
            return previousChoice;
        } else {
            previousChoice = nextChoice[previousChoice];;
            return previousChoice;
        }
    } else if (lastRound == 'w') {
        const rng = Math.floor(Math.random()*4);
        if (rng < 3) {
            return previousChoice;
        } else {
            previousChoice = nextChoice[yourPreviousChoice];
            return previousChoice;
        }
    } else if (lastRound == 't'){
        const rng = Math.floor(Math.random()*100) + 1;
        if (rng <= 35) {
            previousChoice = 'p';
            return previousChoice;
        } else if (rng <= 70) {
            previousChoice = 'r';
            return previousChoice;
        } else {
            previousChoice = 's';
            return previousChoice;
        }
    } else {
        const rng = Math.floor(Math.random()*2);
        if (rng < 1) {
            previousChoice = 'p';
            return previousChoice;
        } else {
            previousChoice = 's';
            return previousChoice;
        }
    }
}

function win() {
    up++
    userPoints.innerText = up;
    if (up == 3) {
        winLose.innerText = "Win!";
        winLoseContainer.style.opacity = 1;
        if (difficulty == 'h') {
            endChoice.style.display = "none";
        } else {
            endChoice.style.display = "flex";
            endChoice.style.opacity = 1;
            endChoiceButton.style.display = "none";
            exitButton.style.display = "flex";
        }
    }
}

function lose() {
    op++
    opponentPoints.innerText = op;
    if (op == 3) {
        winLose.innerText = "Lose!";
        winLoseContainer.style.opacity = 1;
        endChoice.style.display = "flex";
        endChoice.style.opacity = 1;
        endChoiceButton.style.display = "flex";
        exitButton.style.display = "none";
    }
}

function next() {
    beatContainer.style.opacity = 0;
    beatContainer.style.display = "flex";
    outOfTime.style.display = "none";
    nextRound.style.display = "none";
    buttonContainer.style.display = "flex";
    rc++;
    roundCounter.innerText = rc;
    decrement();
}

function again() {
    up = 0;
    op = 0;
    opponentPoints.innerText = op;
    userPoints.innerText = up;
    beatContainer.style.display = "flex";
    hide();
    rc = 1;
    roundCounter.innerText = rc;
    decrement();
    lastRound = null;
    previousChoice = null;
    repeat = 0;
    wStreak = 0;
    lStreak = 0;
}

function decrement() {
    let i = timeMax;
    function count() {
        if (i == -1) {
            clearInterval(counting);
            lose();
            outOfTime.style.display = "flex";
            beatContainer.style.display = "none";
            if (up == 3 || op == 3) {
                nextRound.style.display = "none";
            } else {
                nextRound.style.display = "flex";
            }
            buttonContainer.style.display = 'none';
        } else {
            timer.innerText = i--;
        } 
    }
    counting = setInterval(count, 1000);
    count();
}

function nextLevel(){
    up = 0;
    op = 0;
    opponentPoints.innerText = op;
    userPoints.innerText = up;
    hide();
    rc = 1;
    roundCounter.innerText = rc;
    lastRound = null;
    previousChoice = null;
    if (difficulty == 'e') {
        timerFunction('m', 10);
    } else if (difficulty == 'm') {
        timerFunction('h', 5);
    }
}