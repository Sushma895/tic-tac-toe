const board = document.getElementById("board");
const winnerMessage = document.getElementById("winner-message");
let cells = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
    board.innerHTML = "";
    cells.forEach((_, i) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (cells[index] || !gameActive) return;

    cells[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        winnerMessage.textContent = ${currentPlayer} wins!;
        gameActive = false;
        return;
    }

    if (!cells.includes(null)) {
        winnerMessage.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => cells[index] === currentPlayer)
    );
}

function restartGame() {
    cells.fill(null);
    currentPlayer = "X";
    gameActive = true;
    winnerMessage.textContent = "";
    createBoard();
}

createBoard();
