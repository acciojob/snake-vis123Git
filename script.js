let gameContainer = document.getElementById('gameContainer');
let scoreBoard = document.getElementById('score');
let snake = [{ x: 0, y: 19 }];
let direction = 'right';
let food = { x: 10, y: 20 };
let score = 0;
let gameInterval;

function createGrid() {
    for (let i = 0; i < 1600; i++) {
        let pixel = document.createElement('div');
        pixel.id = `pixel${i}`;
        gameContainer.appendChild(pixel);
    }
}

function updateSnake() {
    let newHead = { ...snake[0] };

    switch (direction) {
        case 'right':
            newHead.x += 1;
            break;
        case 'left':
            newHead.x -= 1;
            break;
        case 'up':
            newHead.y -= 1;
            break;
        case 'down':
            newHead.y += 1;
            break;
    }

    if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        scoreBoard.innerText = score;
        snake.unshift(newHead);
        generateFood();
    } else {
        snake.pop();
        snake.unshift(newHead);
    }

    checkGameOver();
    render();
}

function render() {
    gameContainer.innerHTML = '';

    snake.forEach(segment => {
        let pixelId = segment.y * 40 + segment.x;
        let snakePixel = document.getElementById(`pixel${pixelId}`);
        snakePixel.classList.add('snakeBodyPixel');
    });

    let foodPixel = document.getElementById(`pixel${food.y * 40 + food.x}`);
    foodPixel.classList.add('food');
}

function generateFood() {
    let randomPixel = Math.floor(Math.random() * 1600);
    food = { x: randomPixel % 40, y: Math.floor(randomPixel / 40) };
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37:
            if (direction !== 'right') direction = 'left';
            break;
        case 38:
            if (direction !== 'down') direction = 'up';
            break;
        case 39:
            if (direction !== 'left') direction = 'right';
            break;
        case 40:
            if (direction !== 'up') direction = 'down';
            break;
    }
}

function checkGameOver() {
    let head = snake[0];

    if (head.x < 0 || head.x >= 40 || head.y < 0 || head.y >= 40) {
        clearInterval(gameInterval);
        alert('Game Over!');
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            clearInterval(gameInterval);
            alert('Game Over!');
        }
    }
}

document.addEventListener('keydown', changeDirection);

createGrid();
render();
generateFood();

gameInterval = setInterval(updateSnake, 100);
