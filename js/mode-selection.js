document.addEventListener("DOMContentLoaded", function () {
    const singlePlayerButton = document.getElementById("single-player-button");
    const twoPlayerButton = document.getElementById("two-player-button");
    const backButton = document.getElementById("back-button");

    singlePlayerButton.addEventListener("click", function () {
        window.location.href = "difficulty-selection.html";
    });

    twoPlayerButton.addEventListener("click", function () {
        window.location.href = "game.html";
    });

    backButton.addEventListener("click", function () {
        window.history.back();
    });
});
