const choices = ["rock", "paper", "scissors"];
const userOptions = document.querySelectorAll('.user > div');
let comparisonBoard = undefined;

let playerScore = 0;
let computerScore = 0;

const wins_against = {
    "rock": "scissors",
    "scissors": "paper",
    "paper": "rock"
}

/**
 * @returns A random choice for use by the computer
 */
function computerPlay() {
    let randomNum = Math.random();
    
    if (randomNum < (1/3)) {
        return choices[0];
    } else if (randomNum > (1/3) && randomNum < (2/3)) {
        return choices[1];
    } else {
        return choices[2];
    }
}

/**
 * Returns 0 if the player won,
 * 1 if the computer won, or 
 * 2 if the player and computer tied
 * 
 * @param {string} userInput 
 * @param {string} computerInput 
 */
function playRound(userInput, computerInput) {
    if (wins_against[userInput]===computerInput) {
        return 0;
    } else if (wins_against[computerInput]===userInput) {
        return 1;
    } else {
        return 2;   
    }
}

function updateScore(winCode) {
    const playerScoreReference = document.querySelector('#user-score');
    const computerScoreReference = document.querySelector('#computer-score');

    switch (winCode) {
        case 0:
            playerScore++;
            break;
        case 1:
            computerScore++;
            break;
    }

    playerScoreReference.textContent = playerScore;
    computerScoreReference.textContent = computerScore;
}

function addComparisonBoard() {
    comparisonBoard = document.querySelector('.comparison');

    comparisonBoard.innerHTML = '<div class="npc-choice"></div> \
                                 <div class="player-choice"></div> \
                                 <div class="winner"></div> \
                                 <button id="next-round">Next round</button>';

    const nextRoundButton = document.querySelector('#next-round');

    nextRoundButton.addEventListener('click', () => {
        userOptions.forEach((each) => {
            each.classList.remove('disabled');
            each.classList.remove('selected');
        });
        
        computerOptions = document.querySelectorAll('.computer div');
        computerOptions.forEach((each) => {
            each.classList.remove('selected');
        });
    });
}

function updateComparisonBoard(playerChoice, npcChoice, winCode) {
    const comparisonUserDiv = document.querySelector('.player-choice');
    const comparisonNPCDiv = document.querySelector('.npc-choice');
    const comparisonWinnerDiv = document.querySelector('.winner');
    const nextRoundButton = document.querySelector('#next-round');

    comparisonUserDiv.textContent = `You chose ${playerChoice}`;
    comparisonNPCDiv.textContent = `The computer chose ${npcChoice}`;

    switch (winCode) {
        case 0:
            comparisonWinnerDiv.textContent =  'You won!';
            break;
        case 1:
            comparisonWinnerDiv.textContent =  'The computer won!';
            break;
        case 2:
            comparisonWinnerDiv.textContent =  'It was a draw!';
            break;
    }

    if (nextRoundButton.classList.contains('disabled')) {
        nextRoundButton.classList.remove('disabled');
    }
}

userOptions.forEach((div) => {
    div.addEventListener('click', () => {
        let userSelection = div.classList[0];

        div.classList.toggle('selected');
        userOptions.forEach((each) => each.classList.toggle('disabled'));

        let computerSelection = computerPlay();
        const computerChoice = document.querySelector(`.computer > .${computerSelection}`);
        computerChoice.classList.toggle('selected');

        let winCode = playRound(userSelection, computerSelection);
        updateScore(winCode);

        if (!comparisonBoard)
            addComparisonBoard();

        updateComparisonBoard(userSelection, computerSelection, winCode);

        if (playerScore === 5 || computerScore === 5) {
            const nextRoundButton = document.querySelector('#next-round');
            nextRoundButton.classList.add('disabled')

            if (playerScore > computerScore) {
                alert("You won! Reload the page to play again!");
            }
            else {
                alert("The computer won! Reload the page to play again!");
            }
        }
    });
});