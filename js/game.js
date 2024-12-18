document.addEventListener("DOMContentLoaded", function () {
    const resetButton = document.getElementById("reset-button");
    const backButton = document.getElementById("back-button");
    const board = document.querySelector(".board");
    const result = document.getElementById("result");
    const currentPlayerDisplay = document.getElementById("current-player");
    let currentPlayer = "X";
    let boardArray = ["", "", "", "", "", "", "", "", ""];
    let difficulty = new URLSearchParams(window.location.search).get("difficulty") || "easy";
    let isSinglePlayer = window.location.search.includes("difficulty");
    let gameInProgress = true;

    // Set background color based on difficulty
    document.body.style.backgroundColor = difficulty === "hard" ? 'white' : 'white';

    // Hide the current player display initially
    currentPlayerDisplay.style.display = "none";

    function checkWinner(boardArray) {
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
                console.log(`Winning pattern found: ${a}, ${b}, ${c}`);
                console.log(`Board state: ${boardArray}`);
                board.children[a].style.backgroundColor = "#32cd32";
                board.children[b].style.backgroundColor = "#32cd32";
                board.children[c].style.backgroundColor = "#32cd32";
                return boardArray[a];
            }
        }

        if (boardArray.includes("")) {
            return null;
        }

        return "Tie";
    }

    function handleClick(event) {
        if (!gameInProgress) return;

        const cell = event.target;
        const cellIndex = Array.from(board.children).indexOf(cell);
        console.log(`Cell clicked: ${cellIndex}`);

        if (boardArray[cellIndex] === "") {
            boardArray[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;
            console.log(`Board state after move: ${boardArray}`);

            const winner = checkWinner(boardArray);
            if (winner) {
                gameInProgress = false;
                result.textContent = winner === "Tie" ? "It's a tie!" : `${winner} wins!`;
            } else {
                if (isSinglePlayer) {
                    currentPlayer = "O";
                    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
                    aiMove();
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
                }
            }
        }
    }

    function aiMove() {
        if (!gameInProgress) return;

        let emptyCells = boardArray.map((val, index) => val === "" ? index : null).filter(val => val !== null);
        if (emptyCells.length > 0 && !checkWinner(boardArray)) {
            let moveIndex;
            if (difficulty === "easy") {
                moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            } else if (difficulty === "hard") {
                moveIndex = getBestMove();
            }
            boardArray[moveIndex] = currentPlayer;
            board.children[moveIndex].textContent = currentPlayer;
            console.log(`AI move: ${moveIndex}`);
            console.log(`Board state after AI move: ${boardArray}`);

            const winner = checkWinner(boardArray);
            if (winner) {
                gameInProgress = false;
                result.textContent = winner === "Tie" ? "It's a tie!" : `${winner} wins!`;
            } else {
                currentPlayer = "X";
                currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
            }
        }
    }

    function getBestMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < boardArray.length; i++) {
            if (boardArray[i] === "") {
                boardArray[i] = "O";
                let score = minimax(boardArray, 0, false);
                boardArray[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        console.log(`Best move: ${move}, Score: ${bestScore}`);
        return move;
    }

    function minimax(board, depth, isMaximizing) {
        let scores = {
            X: -1,
            O: 1,
            Tie: 0
        };

        let result = checkWinner(board);
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

    function startGame() {
        boardArray = ["", "", "", "", "", "", "", "", ""];
        result.textContent = "";
        currentPlayer = "X";
        currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
        gameInProgress = true;
        currentPlayerDisplay.style.display = "block";

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

    function resetGame() {
        const confirmReset = window.confirm("Are you sure you want to reset the game?");
        if (confirmReset) {
            boardArray = ["", "", "", "", "", "", "", "", ""];
            result.textContent = "";
            currentPlayer = "X";
            currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
            gameInProgress = true;

            Array.from(board.children).forEach(cell => {
                cell.textContent = "";
                cell.style.backgroundColor = "";
            });

            currentPlayerDisplay.style.display = "block";
        }
    }

    resetButton.addEventListener("click", resetGame);

    backButton.addEventListener("click", function () {
        window.history.back();
    });

    // Automatically start the game when the page loads
    startGame();
});
