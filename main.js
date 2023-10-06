const cellElements = document.querySelectorAll("[data-cell]");
board = document.querySelector("[data-container]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");
let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start Game
const startGame = () => {
  for (const cell of cellElements) {
    //Clean all cells before start game
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);

    cell.addEventListener("click", handleClick, { once: true });
  }

  isCircleTurn = false;

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

// End Game
const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "O venceu!"
      : "X venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};

// Check for win
const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

//Check for draw
const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

// Set cell class after click
const setCellClass = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

//Set cell class while hover mouse
const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

// Change the turns of X or O
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

// Click
const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  setCellClass(cell, classToAdd);

  const isWin = checkForWin(classToAdd);
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    swapTurns();
  }
};

// Event click
for (const cell of cellElements) {
  cell.addEventListener("click", handleClick, { once: true });
}

// Call startGame
startGame();

// Call restart button
restartButton.addEventListener("click", startGame);
