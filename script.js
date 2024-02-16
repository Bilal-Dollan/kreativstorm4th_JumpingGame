const canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 720;
c = canvas.getContext("2d");
const gravity = 0.9;

class Player {
  constructor() {
    this.height = 100;
    this.position = {
      x: 100,
      y: canvas.height - this.height,
    };
    this.width = 88;
    this.height = 94;
    this.velocity = {
      x: 0,
      y: 10,
    };
  }

  draw() {
    let dinoImage = document.getElementById("dino");
    c.drawImage(dinoImage, this.position.x, this.position.y);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

class Ground {
  constructor() {
    this.position = {
      x: 0,
      y: canvas.height - 40,
    };
    this.width = 50;
    this.velocity = 8;
  }

  draw() {
    let groundImage = document.getElementById("ground");
    c.drawImage(groundImage, this.position.x, this.position.y);
    c.drawImage(groundImage, this.position.x + 2399, this.position.y);
  }

  update() {
    this.draw();
    this.position.x -= this.velocity;
  }
}

class Obstacle {
  constructor() {
    this.position = {
      x: Math.floor(Math.random() * 100 + 100),
      y: canvas.height - 80,
    };
    this.width = 34;
    this.height = 70;
    this.velocity = 8;
  }

  draw1() {
    let obstacleImage = document.getElementById("obstacle");
    c.drawImage(obstacleImage, this.position.x + 1280, this.position.y);
  }

  draw2() {
    let obstacleImage = document.getElementById("obstacle");
    c.drawImage(obstacleImage, this.position.x + 2000, this.position.y);
  }

  draw3() {
    let obstacleImage = document.getElementById("obstacle");
    c.drawImage(obstacleImage, this.position.x + 3000, this.position.y);
  }

  update() {
    this.draw1();
    this.draw2();
    this.draw3();
    this.position.x -= this.velocity;
  }
}

const player = new Player();
const ground = new Ground();
const obstacle = new Obstacle();
ground.update();
player.update();
obstacle.update();
let startGame = false;
let score = 0;

function animate() {
  if (!startGame) return;
  score += 0.01;
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  ground.update();
  player.update();
  obstacle.update();
  playerJump();
  levelMovment();
  collisionDetection();
}

function endGame() {
  startGame = false;

  let container = document.createElement("div");
  container.classList.add('container');
  scoreCount.classList.add('score');
  scoreCount.textContent = "Your Score is:" + Math.round(score);
  document.body.appendChild(container);

}

function playerJump() {
  addEventListener("keydown", ({ code }) => {
    if (code == "Space" && player.velocity.y == 0) {
      player.velocity.y = -20;
    }
  });
}

function levelMovment() {
  if (obstacle.position.x <= -3000) {
    obstacle.position.x = Math.floor(Math.random() * 100);
    obstacle.update();
    obstacle.update();
  }

  if (ground.position.x <= -2399) {
    ground.position.x = 0;
  }
}

function collisionDetection() {
  if (
    obstacle.position.x + 1280 + obstacle.width - player.position.x - player.width <= 9 &&
    obstacle.position.x + 1280 + obstacle.width - player.position.x - player.width >= -9 &&
    player.position.y > 570
  ) {
    endGame();
  } else if (
    obstacle.position.x + 2000 + obstacle.width - player.position.x - player.width <= 9 &&
    obstacle.position.x + 2000 + obstacle.width - player.position.x - player.width >= -9 &&
    player.position.y > 570
  ) {
    endGame();
  } else if (
    obstacle.position.x + 3000 + obstacle.width - player.position.x - player.width <= 9 &&
    obstacle.position.x + 3000 + obstacle.width - player.position.x - player.width >= -9 &&
    player.position.y > 570
  ) {
    endGame();
  } 
}

const button = document.querySelector("button");
button.addEventListener("click", () => {
  startGame = true;
  animate();
  button.remove();
});


function playJumpSound() {
  jumpSound.currentTime = 0; 
  jumpSound.play();
}

function playerJump() {
  addEventListener("keydown", ({ code }) => {
    if (code == "Space" && player.velocity.y == 0) {
      player.velocity.y = -20;
      playJumpSound();
    }
  });
}
jumpSound.preload = "auto";
