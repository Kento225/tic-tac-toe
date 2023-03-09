const gamemodes = (() => {
  const unbeatableMode = document.querySelector(".unbeatable");
  const gamemodePopUp = document.querySelector(".gamemode-pop-up");
  const body = document.querySelector("body");
  closeGamemodePopUp = () => {
    gamemodePopUp.style.display = "none";
    body.style.backgroundColor = "rgb(255 255 255)";
  };
  setAiMode = () => {
    gameBoard.mode = "a";
    closeGamemodePopUp();
    playerNames.playerO = "CPU";
  };
  setUnbeatableMode = () => {
    closeGamemodePopUp();
    gameBoard.mode = "u";
  };
  setPlayerMode = () => {
    closeGamemodePopUp();
    playerNames.openPlayerPopUp();
    gameBoard.mode = "p";
  };
  return {
    setPlayerMode,
    setAiMode,
  };
})();
const playerNames = (() => {
  const pxField = document.querySelector("#px");
  const poField = document.querySelector("#po");
  const popUp = document.querySelector(".player-pop-up");
  const body = document.querySelector("body");
  let playerX = "";
  let playerO = "";

  const openPlayerPopUp = () => {
    popUp.style.display = "flex";
    body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  };
  const closePlayerPopUp = () => {
    popUp.style.display = "none";
    body.style.backgroundColor = "rgb(255 255 255)";
  };

  const setPlayerNames = () => {
    playerNames.playerX = pxField.value;
    playerNames.playerO = poField.value;
  };
  return {
    setPlayerNames,
    playerX,
    playerO,
    closePlayerPopUp,
    openPlayerPopUp,
  };
})();

const gameBoard = (() => {
  const board = new Array(9).fill("");
  const displayBoard = document.querySelectorAll(".square");
  const displayArr = Array.from(displayBoard);
  let marker = "X";
  const mode = "";

  const aiTurn = () => {
    for (let i = 0; i < 9; i++) {
      let ranSquare = Math.floor(Math.random() * 9);
      if (board[ranSquare] === "") {
        console.log(ranSquare);
        board[ranSquare] = "O";
        displayBoard[ranSquare].textContent = "O";
        return;
      }
    }
  };

  const addMarker = (event) => {
    const index = displayArr.indexOf(event.target);
    console.log(index);
    if (event.target.textContent === "") {
      event.target.textContent = marker;
    } else {
      return;
    }
    board[index] = marker;
    console.log(board);
  };
  const markerMode = () => {
    if (marker === "X") {
      marker = "O";
    } else if (marker === "O") {
      marker = "X";
    }
    return marker;
  };

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinO = () => {
    for (let i = 0; i < 8; i++) {
      if (
        board[winConditions[i][0]] === "O" &&
        board[winConditions[i][1]] === "O" &&
        board[winConditions[i][2]] === "O"
      ) {
        setTimeout(() => {
          alert(`${playerNames.playerO} Wins!`);
          boardReset();
          return;
        }, 2);
      } else {
        return false;
      }
    }
  };
  const checkWinX = () => {
    for (let i = 0; i < 8; i++) {
      if (
        board[winConditions[i][0]] === "X" &&
        board[winConditions[i][1]] === "X" &&
        board[winConditions[i][2]] === "X"
      ) {
        setTimeout(() => {
          switch (gameBoard.mode) {
            case "p":
              alert(`${playerNames.playerX} Wins!`);
              boardReset();
              return;
            case "a":
              alert("You Win!");
              boardReset();
              return;
          }
        }, 2);
      } else {
        return false;
      }
    }
  };
  const checkTie = () => {
    if (
      board.includes("") === false &&
      checkWinO() === false &&
      checkWinX() === false
    ) {
      alert("It's a tie!");
      boardReset();
    }
  };

  const boardReset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
    displayBoard.forEach((square) => (square.textContent = ""));
  };
  return {
    displayBoard,
    addMarker,
    markerMode,
    checkWinO,
    checkWinX,
    aiTurn,
    checkTie,
  };
})();

const squares = document.querySelectorAll(".square");
squares.forEach((square) =>
  square.addEventListener("click", (e) => {
    if (e.target.textContent !== "") {
      return;
    }
    gameBoard.addMarker(e);
    switch (gameBoard.mode) {
      case "p":
        gameBoard.markerMode();
        break;
      case "a":
        gameBoard.aiTurn();
    }
    gameBoard.checkWinO();
    gameBoard.checkWinX();
    gameBoard.checkTie();
  })
);

const playerModalBtn = document.querySelector(".pmodal-submit");
playerModalBtn.addEventListener("click", () => {
  playerNames.setPlayerNames();
  playerNames.closePlayerPopUp();
  console.log(playerNames.playerO);
});

const playerModeBtn = document.querySelector(".player");
playerModeBtn.addEventListener("click", () => {
  gamemodes.setPlayerMode();
});

const aiModeBtn = document.querySelector(".ai");
aiModeBtn.addEventListener("click", () => {
  gamemodes.setAiMode();
});
