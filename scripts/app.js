const buttons = document.querySelectorAll('.selection-button');
const playerScoreEl = document.querySelector('#player-score');
const computerScoreEl = document.querySelector('#computer-score');
const playerChoiceEl = document.querySelector('#player-choice');
const computerChoiceEl = document.querySelector('#computer-choice');
const resultText = document.querySelector('#result-text');
const possibleChoices = ['rock', 'paper', 'scissors'];

const state = {
  playerScore: 0,
  computerScore: 0,
  playing: false,
  maxScore: 5
};

function getComputerSelection() {
  return Math.floor(Math.random() * 3);
}

function translateChoiceToEmoji(choice) {
  switch (choice) {
    case 'rock':
      return '✊';
    case 'paper':
      return '✋';
    case 'scissors':
      return '✌️';
  }
}


function getWinner(player, computer) {
  if (player === computer) {
    return 'draw';
  } else if (player === 0 && computer === 2) {
    return 'player';
  } else if (player === 1 && computer === 0) {
    return 'player';
  } else if (player === 2 && computer === 1) {
    return 'player';
  } else {
    return 'computer';
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (state.playing) { return; }
    state.playing = true;
    console.log(button.getAttribute('data-selection'));
    const playerSelection = possibleChoices.indexOf(button.getAttribute('data-selection'));
    const computerSelection = getComputerSelection();
    const winner = getWinner(playerSelection, computerSelection);
    winner == 'player' ? state.playerScore++ : winner != 'draw' ? state.computerScore++ : null;

    // update dom
    playerChoiceEl.textContent = translateChoiceToEmoji(possibleChoices[playerSelection]);

    // cycle through the possible choices on the computer selection
    // computerSelection = 0, 1, 2
    computerChoiceEl.style.opacity = 0.3;
    let i = 0;
    const intervalId = setInterval(() => {
      computerChoiceEl.textContent = translateChoiceToEmoji(possibleChoices[i]);
      i++;
      if (i >= possibleChoices.length) {
        clearInterval(intervalId); // Clear the interval after all choices have been displayed
        state.playing = false;
        computerChoiceEl.style.opacity = 1; // Reset the opacity to 1 after the animation
        handleGameResult(winner, playerSelection, computerSelection);

        
      }
    }, 120);
  });


  function handleGameResult(winner, playerSelection, computerSelection) {
    computerChoiceEl.textContent = translateChoiceToEmoji(possibleChoices[computerSelection]);

    playerScoreEl.textContent = state.playerScore;
    computerScoreEl.textContent = state.computerScore;
    resultText.textContent = `The winner is ${winner}!`

    if (winner === 'player') {
      playerScoreEl.textContent = state.playerScore;
      resultText.textContent = `${winner} wins!`;
    } else if (winner === 'computer') {
      computerScoreEl.textContent = state.computerScore;
      resultText.textContent = `${winner} wins!`;
    } else {
      resultText.textContent = `It's a draw!`;
    }

    if (state.playerScore === state.maxScore || state.computerScore === state.maxScore) {
      resultText.textContent = `${winner} wins the game! Click a button to play again`;
      state.playerScore = 0;
      state.computerScore = 0;
    }
  }
});