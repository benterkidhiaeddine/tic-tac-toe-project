const gameContainer = document.getElementById("game-container");

//create  a game board array ,since a gameBoard is only singular we are going to create one single instance of it with module pattern

const gameBoard = (function () {
  const gameBoardArray = [];

  //empty board at the beginning
  for (let i = 0; i < 9; i++) {
    gameBoardArray.push({
      clicked: false,
      symbol: "",
    });
  }
  let currentPlayerTurn = "X";

  //create square element function

  function createSquareElement(square, index) {
    const squareElement = document.createElement("div");
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
    gameContainer.innerHTML = "";
    gameBoardArray.map(createSquareElement);

    const squares = document.querySelectorAll(".square");

    for (let square of squares) {
      square.addEventListener("click", handlePlay);
    }
  }

  function handlePlay(e) {
    console.log(e);
    console.log("click being handled");

    const clickedSquareIndex = e.target.dataset.indexID;
    //if the square was already clicked return
    if (gameBoardArray[clickedSquareIndex].clicked) {
      return;
    }
    gameBoardArray[clickedSquareIndex].symbol = currentPlayerTurn;
    gameBoardArray[clickedSquareIndex].clicked = true;
    updateCurrentPlayerTurn();
    renderGameBoard();
  }

  return {
    gameBoardArray,
    updateCurrentPlayerTurn,
    renderGameBoard,
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
