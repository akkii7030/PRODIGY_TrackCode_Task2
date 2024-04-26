document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");
    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];

    // Function to handle cell click
    function handleCellClick(index) {
        if (boardState[index] === "") {
            boardState[index] = currentPlayer;
            render();
            if (checkWin()) {
                status.innerText = `${currentPlayer} wins!`;
                board.removeEventListener("click", handleCellClick);
            } else if (checkDraw()) {
                status.innerText = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.innerText = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Function to render the board
    function render() {
        board.innerHTML = "";
        boardState.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.innerText = cell;
            cellElement.addEventListener("click", () => handleCellClick(index));
            board.appendChild(cellElement);
        });
    }

    // Function to check for a win
    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winConditions.some(condition =>
            condition.every(index => boardState[index] === currentPlayer)
        );
    }

    // Function to check for a draw
    function checkDraw() {
        return boardState.every(cell => cell !== "");
    }

    // Function to reset the game
    function resetGame() {
        boardState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        render();
        status.innerText = `Player ${currentPlayer}'s turn`;
        board.addEventListener("click", handleCellClick);
    }

    // Event listener for reset button
    resetButton.addEventListener("click", resetGame);

    // Initial render
    render();
    status.innerText = `Player ${currentPlayer}'s turn`;
});
