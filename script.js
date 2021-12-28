const choices = ["rock", "paper", "scissors"];

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
    userInput = userInput.toLowerCase();
    userInput.trim();

    if (wins_against[userInput]===computerInput) {
        console.log(`You rolled ${userInput}, and the computer rolled ${computerInput}`);
        console.log("You beat the computer!");
        return 0;
    } else if (wins_against[computerInput]===userInput) {
        console.log(`You rolled ${userInput}, and the computer rolled ${computerInput}`);
        console.log("The computer beat you!");
        return 1;
    } else {
        console.log(`You rolled ${userInput}, and the computer rolled ${computerInput}`);
        console.log("You tied the computer!"); 
        return 2;   
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;

    let playerChoice;
    let computerChoice;
    let winCode;

    while (true) {
        if (playerScore >= 5 || computerScore >= 5)
            break;

        console.log(`Current Score: Player: ${playerScore}, Computer: ${computerScore}`);

        playerChoice = prompt("Choose `rock`, `paper`, or `scissors` without the backticks\n \
                               to make your selection");
        computerChoice = computerPlay();

        winCode = playRound(playerChoice, computerChoice);

        if (winCode===0)
            playerScore++;
        else if (winCode===1)
            computerScore++;
        else 
            continue;
    }

    console.log(`Final Score: Player: ${playerScore}, Computer: ${computerScore}`);
}

game();