//difficulty checker and applys colors and time
let up = 0;
let op = 0;
let rc = 1;
let counting;
let timeMax;
function timerFunction(diff, time) {
    difficulty = diff;
    if (difficulty == 'e') {
        opponentText.style.color = "green";
        opponentPoints.style.color = "green";
    } else if (difficulty == 'm') {
        opponentText.style.color = "yellow";
        opponentPoints.style.color = "yellow";
    } else if (difficulty == 'h') {
        opponentText.style.color = "red";
        opponentPoints.style.color = "red";
    }
    timer.innerText = time;
    timeMax = time;
    decrement();
}