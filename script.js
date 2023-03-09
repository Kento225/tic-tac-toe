const gameBoard = (() => {
  const board = new Array(9).fill("");
  const displayBoard = document.querySelectorAll(".square");
  const displayArr = Array.from(displayBoard);
  let marker = "X";

  const addMarker = (event) => {
    const index = displayArr.indexOf(event.target);
    console.log(index);
    if (event.target.textContent === "") {
      event.target.textContent = marker;
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
  ];

  const checkWinO = () => {
    for (let i = 0; i < 6; i++) {
      if (
        board[winConditions[i][0]] === "O" &&
        board[winConditions[i][1]] === "O" &&
        board[winConditions[i][2]] === "O"
      ) {
        setTimeout(() => {
          alert("Player O Wins!");
          boardReset();
          return;
        }, 1);
      }
    }
  };
  const checkWinX = () => {
    for (let i = 0; i < 6; i++) {
      if (
        board[winConditions[i][0]] === "X" &&
        board[winConditions[i][1]] === "X" &&
        board[winConditions[i][2]] === "X"
      ) {
        setTimeout(() => {
          alert("Player X Wins!");
          boardReset();
          return;
        }, 1);
      }
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
  };
})();

const squares = document.querySelectorAll(".square");
squares.forEach((square) =>
  square.addEventListener("click", (e) => {
    gameBoard.markerMode();
    gameBoard.addMarker(e);
    gameBoard.checkWinO();
    gameBoard.checkWinX();
    console.log();
  })
);
