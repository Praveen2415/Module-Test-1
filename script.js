const rules = document.querySelector('#rules-btn');
const showRules = document.querySelector('.game-rules');
const crossButton = document.querySelector('#cross');
const play = document.querySelector('.play')

rules.addEventListener('click',showHideRules)
crossButton.addEventListener('click',showHideRules)

function showHideRules() {
    const newRightValue = showRules.style.getPropertyValue('right') === '1rem' ? '-70rem' : '1rem';
    const newDisplayValue = crossButton.style.getPropertyValue('display') === 'inline-block' ? 'none' : 'inline-block';

    showRules.style.right = newRightValue;
    crossButton.style.display = newDisplayValue;
}

const pcChoice = ['rock','paper','scissors'];
const resultSection = document.querySelector('.result');
const selectedItem = document.querySelectorAll('.play div');

function handleButtonClick(e) {
    const random = Math.floor(Math.random() * pcChoice.length);
    checkWhoWon(e.currentTarget.getAttribute('value'), pcChoice[random]);
    play.classList.add('inactive');
    resultSection.classList.remove('inactive');
}  
    for (const btn of selectedItem) {
    btn.addEventListener('click', handleButtonClick);
}  

function checkWhoWon(player,computer) {
    let result;

    if(player === computer) {result = 'tie';}
    else if(
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
        ){
            result = 'playerwins';
        }
        else{
            result = 'pcwins';
        }

        updatePage(player,computer,result);
}

const playerScoreDisplay = document.querySelector('#player-score-number');
const pcScoreDisplay = document.querySelector('#comp-score-number');
let playerScore = parseInt(localStorage.getItem('playerwins'))||0;
let pcScore = parseInt(localStorage.getItem('pcwins')) || 0;
playerScoreDisplay.textContent = playerScore;
pcScoreDisplay.textContent = pcScore;

function updatePage(player, computer, status) {
    document.querySelector('.player-choice img').src = `./${player}.png`;
    document.querySelector('.pc-choice img').src = `./${computer}.png`;

    const resultText = document.querySelector('.won-lost');
    const nextBtn = document.querySelector('#next-btn');

    if (status === 'tie') {
        resultText.textContent = 'TIE UP';
        document.querySelector('.won-lost + div').classList.add('inactive');
    } else if (status === 'playerwins') {
        resultText.textContent = 'YOU WON';
        nextBtn.classList.remove('inactive');
        rules.style.marginRight = '4rem';
        playerScore++;
    } else if (status === 'pcwins') {
        resultText.textContent = 'YOU LOST';
        pcScore++;
    }
    localStorage.setItem('playerwins', playerScore);
    localStorage.setItem('pcwins', pcScore);
    playerScoreDisplay.textContent = playerScore;
    pcScoreDisplay.textContent = pcScore;
}

function resetGame() {
    play.classList.add('inactive');
    resultSection.classList.add('inactive');
    document.querySelector('header').classList.add('inactive');
    document.querySelector('.hurray').classList.remove('inactive');
    document.querySelector('#next-btn').classList.add('inactive');
    rules.style.marginRight = '0%';
}

const playAgainButtons = document.querySelectorAll('.play-again-btn');
playAgainButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        window.location.reload();
    });
});

const nextBtn = document.querySelector('#next-btn');
nextBtn.addEventListener('click', resetGame);
