document.addEventListener("DOMContentLoaded", function () {
    const easyButton = document.getElementById("easy-button");
    const hardButton = document.getElementById("hard-button");
    const backButton = document.getElementById("back-button");

    easyButton.addEventListener("click", function () {
        window.location.href = "game.html?difficulty=easy";
    });

    hardButton.addEventListener("click", function () {
        window.location.href = "game.html?difficulty=hard";
    });

    backButton.addEventListener("click", function () {
        window.location.href = "mode-selection.html";
    });
});
