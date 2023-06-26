//different container variables

const appContainer = document.getElementById("app-container");
const gameContainer = document.getElementById("game-container");
const boardContainer = document.getElementById("board-container");

const addPLayerFormContainer = document.getElementById(
  "add-player-form-container"
);

/// the app Container will contain only the form that input the name of the players first

gameContainer.style.display = "none";

// then after player names are inputed the add player form container will be replaced by the game container

//create  a game board array ,since a gameBoard is only singular we are going to create one single instance of it with module pattern

const gameBoard = (function () {
  let numberOfTurns = 1;
  let gameBoardArray = [];
  let currentPlayerTurn;

  let gamePlayers = {
    X: null,
    O: null,
  };

  //function thhat adds players to the game

  function addPlayers(player1, player2) {
    gamePlayers[player1.symbol] = player1.name;
    gamePlayers[player2.symbol] = player2.name;
  }

  //function that resets the gameBoard
  function resetGameBoard() {
    numberOfTurns = 1;
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

  //create a function that return winning squares if there winning squares else it returns null
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

  //create square element and adds it to the game Container

  function createSquareElement(square, index) {
    const squareElement = document.createElement("div");
    squareElement.addEventListener("click", handlePlay);
    squareElement.dataset.indexID = index;
    squareElement.innerText = square.symbol;
    squareElement.classList.add("square");
    boardContainer.appendChild(squareElement);
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
    boardContainer.innerHTML = "";
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
    //fill the square object when the corresponding dom squareElement is clicked
    gameBoardArray[clickedSquareIndex].symbol = currentPlayerTurn;
    gameBoardArray[clickedSquareIndex].clicked = true;

    if (winningSquares()) {
      console.log("the winner is " + gamePlayers[currentPlayerTurn]);
    } else if (winningSquares() === null && numberOfTurns === 9) {
      console.log("the game is a draw");
    }
    numberOfTurns++;
    updateCurrentPlayerTurn();
    renderGameBoard();
  }

  return {
    renderGameBoard,
    resetGameBoard,
    addPlayers,
  };
})();

//create the factory function that creates players (since we are going to have two players we created a factory)

const playerFactory = (symbol, name) => {
  //create a function that updates if it's the player turn or no

  return { symbol, name };
};

//select the input elements in the form

const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");

///select the submit button of the player names

const submitNames = document.getElementById("submit-names");

//add the functionality when the submit names button is clicked get the names and create player objects and pass them to add players functions and allow the game to start

submitNames.addEventListener("click", (e) => {
  e.preventDefault();

  //get player names from inputs
  const player1Name = player1Input.value;
  const player2Name = player2Input.value;

  // create player objects
  let firstPLayer = playerFactory("X", player1Name);
  let secondPlayer = playerFactory("O", player2Name);

  //add the player to the game board
  gameBoard.addPlayers(firstPLayer, secondPlayer);

  addPLayerFormContainer.style.display = "none";
  gameContainer.style.display = "block";
});

gameBoard.renderGameBoard();

//reset the board  button functionality -----------------------------------------------------------------------------------------------------------------------

const resetGameButton = document.getElementById("reset-game");

resetGameButton.addEventListener("click", () => {
  gameBoard.resetGameBoard();
  gameBoard.renderGameBoard();
});

// -----------------------------------------------------------------------------------------------------------------------

//functionality for the player to enter their names
