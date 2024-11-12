document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("play-button");
    if (playButton) {
        playButton.addEventListener("click", function () {
            window.location.href = "mode-selection.html";
        });
    }
});
