const gameContainer = document.getElementById("game-container");

//create  a game board array ,since a gameBoard is only singular we are going to create one single instance of it with module pattern

const gameBoard = (function () {
  let gameBoardArray = [];
  let currentPlayerTurn;
  //function that resets the gameBoard
  function resetGameBoard() {
    gameBoardArray = [];
    currentPlayerTurn = "X";
    for (let i = 0; i < 9; i++) {
      gameBoardArray.push({
        clicked: false,
        symbol: "",
      });
    }
  }
  //populate the game Board at the begining
  resetGameBoard();

  //create a function that return winning squares if there winning squares
  function winningSquares() {
    const winingLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winingLines.length; i++) {
      let [a, b, c] = winingLines[i];
      if (
        gameBoardArray[a].symbol &&
        gameBoardArray[a].symbol === gameBoardArray[b].symbol &&
        gameBoardArray[b].symbol === gameBoardArray[c].symbol
      ) {
        return [a, b, c];
      }
    }

    return null;
  }

  //create square element function this

  function createSquareElement(square, index) {
    const squareElement = document.createElement("div");
    squareElement.addEventListener("click", handlePlay);
    squareElement.dataset.indexID = index;
    squareElement.innerText = square.symbol;
    squareElement.classList.add("square");
    gameContainer.appendChild(squareElement);
  }

  //create a function that updates the current player state

  function updateCurrentPlayerTurn() {
    currentPlayerTurn === "X"
      ? (currentPlayerTurn = "O")
      : (currentPlayerTurn = "X");
  }

  //create a function that renders the gameBoard

  function renderGameBoard() {
    //empty the board
    gameContainer.innerHTML = "";
    //fill the board with squares
    gameBoardArray.map(createSquareElement);
  }

  function handlePlay(e) {
    //check if the game already ended
    if (winningSquares()) {
      console.log("press the reset button to play again");
      return;
    }

    const clickedSquareIndex = e.target.dataset.indexID;
    //if the square was already clicked return
    if (gameBoardArray[clickedSquareIndex].clicked) {
      return;
    }
    gameBoardArray[clickedSquareIndex].symbol = currentPlayerTurn;
    gameBoardArray[clickedSquareIndex].clicked = true;

    if (winningSquares()) {
      console.log("the winner is " + currentPlayerTurn);
    }

    updateCurrentPlayerTurn();
    renderGameBoard();
  }

  return {
    gameBoardArray,
    updateCurrentPlayerTurn,
    renderGameBoard,
    resetGameBoard,
  };
})();

//create the factory function that creates players (since we are going to have two players we created a factory)

const playerFactory = (symbol, isMyTurn) => {
  //create a function that updates if it's the player turn or no

  function updateTurn() {
    this.isMyTurn ? (this.isMyTurn = false) : (this.isMyTurn = true);
  }

  return Object.assign({}, { symbol }, { isMyTurn }, { updateTurn });
};

let firstPLayer = playerFactory("X", true);
let secondPlayer = playerFactory("O", false);

console.log(gameBoard.gameBoardArray);

gameBoard.renderGameBoard();

const resetGameButton = document.getElementById("reset-game");

resetGameButton.addEventListener("click", () => {
  gameBoard.resetGameBoard();
  gameBoard.renderGameBoard();
});
