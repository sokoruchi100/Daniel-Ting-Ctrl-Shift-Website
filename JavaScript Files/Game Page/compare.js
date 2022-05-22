let yourPreviousChoice;
function compare (playerChoice, opponentChoice) {
    clearInterval(counting);
    yourPreviousChoice = playerChoice;
    switch (playerChoice) {
        case 'r':
        userText.innerText = 'Rock';
        break;
        case 'p':
        userText.innerText = 'Paper';
        break;
        case 's':
        userText.innerText = 'Scissors';
        break;
    }
    
    switch (opponentChoice) {
        case "r":
        opponentText.innerText = 'Rock';
        break;
        case "p":
        opponentText.innerText = 'Paper';
        break;
        case "s":
        opponentText.innerText = 'Scissors';
        break;
    }
    
    if (playerChoice == opponentChoice) {
        //TIE
        midText.innerText = 'Ties With'
        lastRound = 't';
    } else if (pairs[playerChoice] == opponentChoice) {
        //WIN
        lastRound = 'w';
        win()
        midText.innerText = 'Beats'
    } else {
        //LOSE
        lastRound = 'l';
        lose()
        midText.innerText = 'Was Beaten By'
    }

    beatContainer.style.opacity = 1;

    if (up == 3 || op == 3) {
        nextRound.style.display = "none";
    } else {
        nextRound.style.display = "flex";
    }
    
    buttonContainer.style.display = 'none';
}