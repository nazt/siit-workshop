const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');

// Set canvas size
canvas.width = 600;
canvas.height = 800;

let score = 0;
let isGameOver = false;

// Game State
const keys = {};

// Player
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    draw() {
        ctx.fillStyle = '#00f2ff';
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00f2ff';
    }
};

// Projectiles
const bullets = [];
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 4;
        this.speed = 7;
    }
    draw() {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        this.y -= this.speed;
    }
}

// Enemies
const enemies = [];
class Enemy {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height;
        this.speed = 2 + Math.random() * 2;
        this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
    update() {
        this.y += this.speed;
    }
}

// Input Handling
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (e.code === 'Space' && !isGameOver) {
        bullets.push(new Bullet(player.x + player.width / 2, player.y));
    }
    if (e.code === 'KeyR' && isGameOver) {
        restartGame();
    }
});
window.addEventListener('keyup', (e) => keys[e.code] = false);

function restartGame() {
    score = 0;
    isGameOver = false;
    enemies.length = 0;
    bullets.length = 0;
    player.x = canvas.width / 2 - 25;
    scoreElement.innerText = `Score: ${score}`;
    gameOverElement.classList.add('hidden');
    animate();
}

function spawnEnemy() {
    if (!isGameOver && Math.random() < 0.03) {
        enemies.push(new Enemy());
    }
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function update() {
    if (isGameOver) return;

    // Move player
    if ((keys['ArrowLeft'] || keys['KeyA']) && player.x > 0) player.x -= player.speed;
    if ((keys['ArrowRight'] || keys['KeyD']) && player.x < canvas.width - player.width) player.x += player.speed;

    // Update bullets
    bullets.forEach((bullet, index) => {
        bullet.update();
        if (bullet.y < 0) bullets.splice(index, 1);
    });

    // Update enemies
    enemies.forEach((enemy, index) => {
        enemy.update();
        
        // Check collision with player
        if (checkCollision(player, enemy)) {
            isGameOver = true;
            gameOverElement.classList.remove('hidden');
        }

        // Check collision with bullets
        bullets.forEach((bullet, bIndex) => {
            if (bullet.x > enemy.x && bullet.x < enemy.x + enemy.width &&
                bullet.y > enemy.y && bullet.y < enemy.y + enemy.height) {
                enemies.splice(index, 1);
                bullets.splice(bIndex, 1);
                score += 10;
                scoreElement.innerText = `Score: ${score}`;
            }
        });

        if (enemy.y > canvas.height) enemies.splice(index, 1);
    });

    spawnEnemy();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background stars (simple)
    ctx.fillStyle = '#fff';
    for(let i=0; i<5; i++) {
        ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 1, 1);
    }

    player.draw();
    bullets.forEach(bullet => bullet.draw());
    enemies.forEach(enemy => enemy.draw());
}

function animate() {
    update();
    draw();
    if (!isGameOver) {
        requestAnimationFrame(animate);
    }
}

animate();
