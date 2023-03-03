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

  const checkWin = () => {
    for (let i = 0; i < 9; i++) {
      if (
        winConditions[i][0] === board[0] &&
        winConditions[i][1] === board[1] &&
        winConditions[i][2] === board[2]
      ) {
        alert("Game Over");
        return;
      }
    }
  };

  return {
    displayBoard,
    addMarker,
    markerMode,
    checkWin,
  };
})();

const squares = document.querySelectorAll(".square");
squares.forEach((square) =>
  square.addEventListener("click", (e) => {
    gameBoard.markerMode();
    gameBoard.addMarker(e);
    gameBoard.checkWin();
  })
);
