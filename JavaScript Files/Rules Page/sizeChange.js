const handsignsContainer = document.getElementById('handsigns-container');
const levelContainer = document.getElementById('level-container');
const timerContainer = document.getElementById('timer-container');
const winningContainer = document.getElementById('winning-container');
const play = document.getElementById('play');
const win = document.getElementById('win');
const playElement = document.getElementsByClassName('play-element');
const winElement = document.getElementsByClassName('win-element');
let small = true;
function grow(element, parentElement) {
    console.log(parentElement);
    if (small == true) {
        small = false;
        if (parentElement == play) {
            
            for (let i = 0; i < playElement.length; i++) {
                if (playElement[i] == element) {
                    continue;
                } else {
                    playElement[i].style.display = "none";
                }
            }
        } else if (parentElement == win) {
            for (let i = 0; i < winElement.length; i++) {
                if (winElement[i] == element) {
                    continue;
                } else {
                    winElement[i].style.display = "none";
                }
            }
        }
        
        element.style.width = "87vh";
        element.style.height = "66vh";
        element.firstElementChild.style.fontSize = "8vh";
        element.lastElementChild.style.fontSize = "2.5vh";
    } else if (small == false) {
        small = true;
        
        element.style.width = "87vh";
        element.style.height = "33vh";
        element.firstElementChild.style.fontSize = "4vh";
        element.lastElementChild.style.fontSize = "1.25vh";
        if (parentElement == play) {
            for (let i = 0; i < playElement.length; i++) {
                playElement[i].style.display = "flex";
            }
        } else if (parentElement == win) {
            for (let i = 0; i < winElement.length; i++) {
                winElement[i].style.display = "flex";
            }
        }
    }
}

const playWord = document.getElementById('play-word');

function change(text) {
    if (text == 'PLAY') {
        playWord.innerText = 'WIN';
        playWord.style.color = 'red';
        play.style.display = 'none';
        win.style.display = 'flex';
    } else if (text == 'WIN') {
        playWord.innerText = 'PLAY';
        playWord.style.color = 'green';
        win.style.display = 'none';
        play.style.display = 'flex';
    }
}