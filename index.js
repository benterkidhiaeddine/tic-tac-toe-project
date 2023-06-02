//create  a game board array ,since a gameBoard is only singular we are going to create one single instance of it with module pattern

const gameBoard = (function () {
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  let currentPlayerTurn = "X";

  //create a function that takes the a number , index of the array and updates it with the current player symbol

  function updateGameBoard(squareId) {
    gameBoardArray[squareId] = currentPlayerTurn;
  }

  //create a function that updates the current player state

  function updateCurrentPlayerTurn() {
    currentPlayerTurn === "X"
      ? (currentPlayerTurn = "O")
      : (currentPlayerTurn = "X");
  }

  //create a function that renders the gameBoard

  function renderGameBoard() {
    gameBoardArray.map((symbol, index) => {});
  }

  return {
    gameBoardArray,
    updateCurrentPlayerTurn,
  };
})();

//create the factory function that creates players (since we are going to have two players we created a factory)

const playerFactory = (symbol, isMyTurn) => {
  //create a function that updates if it's the player turn or no

  function updateTurn() {
    this.isMyTurn = true;
  }

  return Object.assign({}, { symbol }, { isMyTurn }, { updateTurn });
};

let player1 = playerFactory("X", true);
let player2 = playerFactory("O", false);

console.log(gameBoard.gameBoardArray);
