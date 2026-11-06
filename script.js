
const target = document.getElementById("target");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const message = document.getElementById("message");
const startBtn = document.getElementById("start-btn");

let score = 0;
let timeLeft = 30;
let gameInterval;
let playing = false;

function moveTarget() {
    const maxX = gameArea.clientWidth - target.offsetWidth;
    const maxY = gameArea.clientHeight - target.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.left = x + "px";
    target.style.top = y + "px";
}

function startGame() {
    if (playing) return;

    score = 0;
    timeLeft = 30;
    playing = true;

    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    message.textContent = "Catch as many boxes as you can!";
    startBtn.textContent = "Playing...";

    target.style.display = "block";
    startBtn.disabled = true;

    moveTarget();

    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    playing = false;

    target.style.display = "none";
    startBtn.disabled = false;
    startBtn.textContent = "Play Again";

    message.textContent = `Game Over! Your final score is ${score}.`;
}

target.addEventListener("click", () => {
    if (!playing) return;

    score++;
    scoreDisplay.textContent = score;

    moveTarget();
});

startBtn.addEventListener("click", startGame);
