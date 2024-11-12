document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("play-button");

    playButton.addEventListener("click", function () {
        const playerName = document.getElementById("player-name").value;
        if (playerName.trim() === "") {
            alert("Please enter your name.");
        } else {
            window.location.href = "mode-selection.html";
        }
    });
});
