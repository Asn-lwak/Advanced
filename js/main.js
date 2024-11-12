document.addEventListener("DOMContentLoaded", function () {
    // Function to navigate to a different page
    function navigateTo(page) {
        window.location.href = page;
    }

    // Example usage: Add event listeners to buttons that navigate to different pages
    const playButton = document.getElementById("play-button");
    if (playButton) {
        playButton.addEventListener("click", function () {
            const playerName = document.getElementById("player-name").value;
            if (playerName.trim() === "") {
                alert("Please enter your name.");
            } else {
                navigateTo("mode-selection.html");
            }
        });
    }

    const singlePlayerButton = document.getElementById("single-player-button");
    if (singlePlayerButton) {
        singlePlayerButton.addEventListener("click", function () {
            navigateTo("difficulty-selection.html");
        });
    }

    const twoPlayerButton = document.getElementById("two-player-button");
    if (twoPlayerButton) {
        twoPlayerButton.addEventListener("click", function () {
            navigateTo("game.html");
        });
    }

    const easyButton = document.getElementById("easy-button");
    if (easyButton) {
        easyButton.addEventListener("click", function () {
            navigateTo("game.html?difficulty=easy");
        });
    }

    const mediumButton = document.getElementById("medium-button");
    if (mediumButton) {
        mediumButton.addEventListener("click", function () {
            navigateTo("game.html?difficulty=medium");
        });
    }

    const hardButton = document.getElementById("hard-button");
    if (hardButton) {
        hardButton.addEventListener("click", function () {
            navigateTo("game.html?difficulty=hard");
        });
    }

    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.addEventListener("click", function () {
            navigateTo("mode-selection.html");
        });
    }
});
