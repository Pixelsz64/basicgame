const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const fallingObject = document.getElementById('fallingObject');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');
const winDisplay = document.getElementById('win');

let playerPosition = gameContainer.offsetWidth / 2;
let objectPosition = { x: Math.random() * (gameContainer.offsetWidth - 30), y: 0 };
let score = 0;
let isGameOver = false;

document.addEventListener('keydown', (event) => {
    if (isGameOver) return;

    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 20;
    } else if (event.key === 'ArrowRight' && playerPosition < gameContainer.offsetWidth - 50) {
        playerPosition += 20;
    }
    player.style.left = `${playerPosition}px`;
});

function update() {
    if (isGameOver) return;

    objectPosition.y += 5;
    if (objectPosition.y > gameContainer.offsetHeight) {
        objectPosition.y = 0;
        objectPosition.x = Math.random() * (gameContainer.offsetWidth - 30);
        score -= 1;
        updateScore();
        checkGameOver();
    }

    if (
        objectPosition.y + 30 >= gameContainer.offsetHeight - 60 &&
        objectPosition.x > playerPosition - 30 &&
        objectPosition.x < playerPosition + 50
    ) {
        objectPosition.y = 0;
        objectPosition.x = Math.random() * (gameContainer.offsetWidth - 30);
        score += 1;
        updateScore();
        checkWin();
    }

    fallingObject.style.top = `${objectPosition.y}px`;
    fallingObject.style.left = `${objectPosition.x}px`;

    requestAnimationFrame(update);
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function checkGameOver() {
    if (score <= -3) {
        isGameOver = true;
        gameOverDisplay.style.display = 'block';
    }
}

function checkWin() {
    if (score >= 20) {
        isGameOver = true;
        winDisplay.style.display = 'block';
    }
}

update();
