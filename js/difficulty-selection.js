document.addEventListener("DOMContentLoaded", function () {
    const easyButton = document.getElementById("easy-button");
    const hardButton = document.getElementById("hard-button");

    easyButton.addEventListener("click", function () {
        window.location.href = "game.html?difficulty=easy";
    });

    hardButton.addEventListener("click", function () {
        window.location.href = "game.html?difficulty=hard";
    });
});
