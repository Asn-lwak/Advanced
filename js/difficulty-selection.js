document.addEventListener("DOMContentLoaded", function () {
    const easyButton = document.getElementById("easy-button");
    const mediumButton = document.getElementById("medium-button");
    const hardButton = document.getElementById("hard-button");

    easyButton.addEventListener("click", function () {
        window.location.href = "game.html?difficulty=easy";
    });

    mediumButton.addEventListener("click", function () {
        window.location.href = "game.html?difficulty=medium";
    });

    hardButton.addEventListener("click", function () {
        window.location.href = "game.html?difficulty=hard";
    });
});
