document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const backButton = document.getElementById("back-button");
    const board = document.querySelector(".board");
    const result = document.getElementById("result");
    const currentPlayerDisplay = document.getElementById("current-player");
    let currentPlayer = "X";
    let boardArray = ["", "", "", "", "", "", "", "", ""];
    let difficulty = new URLSearchParams(window.location.search).get("difficulty") || "easy"; // Default to "easy"
    let isSinglePlayer = window.location.search.includes("difficulty");
    let gameInProgress = true; // Track whether the game is in progress or not

    // Set background color based on difficulty
    if (difficulty === "hard") {
        document.body.style.backgroundColor = 'lightblue'; // Example color for hard mode
    } else {
        document.body.style.backgroundColor = 'white'; // Default color for easy mode
    }

    // Hide the current player display initially
    currentPlayerDisplay.style.display = "none";

    // Function to check the winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardArray[a] && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c]) {
                // Highlight winning cells with green only if there's a valid winner
                board.children[a].style.backgroundColor = "#32cd32";
                board.children[b].style.backgroundColor = "#32cd32";
                board.children[c].style.backgroundColor = "#32cd32";
                return boardArray[a]; // Return the winner ("X" or "O")
            }
        }

        if (boardArray.includes("")) {
            return null; // No winner yet, continue the game
        }

        return "Tie"; // All cells are filled, it's a tie
    }

    // Function to handle a click on the board
    function handleClick(event) {
        if (!gameInProgress) return; // Prevent clicks when the game is over

        const cell = event.target;
        const cellIndex = Array.from(board.children).indexOf(cell);

        if (boardArray[cellIndex] === "") {
            boardArray[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                gameInProgress = false; // Stop the game when there's a winner or tie
                if (winner === "Tie") {
                    result.textContent = "It's a tie!";
                } else {
                    result.textContent = `${winner} wins!`;
                }
            } else {
                if (isSinglePlayer) {
                    currentPlayer = "O";
                    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
                    aiMove(); // Make AI move after player's move
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
                }
            }
        }
    }

    // AI makes a move
    function aiMove() {
        if (!gameInProgress) return; // Avoid AI move if game is over

        let emptyCells = boardArray.map((val, index) => val === "" ? index : null).filter(val => val !== null);
        if (emptyCells.length > 0 && !checkWinner()) {
            let moveIndex;
            if (difficulty === "easy") {
                // Easy AI: Random move
                moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            } else if (difficulty === "hard") {
                // Hard AI: Best move using minimax
                moveIndex = getBestMove();
            }

            boardArray[moveIndex] = currentPlayer;
            board.children[moveIndex].textContent = currentPlayer;

            // After the AI's move, check for winner
            const winner = checkWinner();
            if (winner) {
                gameInProgress = false;
                if (winner === "Tie") {
                    result.textContent = "It's a tie!";
                } else {
                    result.textContent = `${winner} wins!`;
                }
            } else {
                // Switch player after the AI move
                currentPlayer = "X";  // Switch to player X after AI's turn
                currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
            }
        }
    }

    // Minimax algorithm for the "hard" difficulty AI
    function getBestMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < boardArray.length; i++) {
            if (boardArray[i] === "") {
                boardArray[i] = "O"; // AI is "O"
                let score = minimax(boardArray, 0, false);
                boardArray[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    // Minimax algorithm to calculate the best score
    function minimax(board, depth, isMaximizing) {
        let scores = {
            X: -1,
            O: 1,
            Tie: 0
        };

        let result = checkWinner();
        if (result !== null) {
            return scores[result];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "O";
                    let score = minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "X";
                    let score = minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    // Function to start the game
    function startGame() {
        boardArray = ["", "", "", "", "", "", "", "", ""];
        result.textContent = "";
        currentPlayer = "X";
        currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
        gameInProgress = true; // Reset game state to in-progress
        currentPlayerDisplay.style.display = "block"; // Show current player display when game starts

        while (board.firstChild) {
            board.removeChild(board.firstChild);
        }

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.addEventListener("click", handleClick);
            board.appendChild(cell);
        }
    }

    // Function to reset the game
    function resetGame() {
        const confirmReset = window.confirm("Are you sure you want to reset the game?");
        if (confirmReset) {
            boardArray = ["", "", "", "", "", "", "", "", ""];
            result.textContent = "";
            currentPlayer = "X";
            currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
            gameInProgress = true; // Set game state back to in-progress

            Array.from(board.children).forEach(cell => {
                cell.textContent = "";
                cell.style.backgroundColor = "";
            });

            currentPlayerDisplay.style.display = "block"; // Ensure it's visible after reset
        }
    }

    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);

    backButton.addEventListener("click", function () {
        window.history.back();
    });
});
