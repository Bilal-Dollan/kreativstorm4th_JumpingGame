alert('This is a simple jumping game inspired by the classic Chrome dinosaur game, where the player controls a character and jumps over obstacles to avoid collision.')

const canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 720;
const c = canvas.getContext("2d");

const backgroundMusic = document.getElementById("backgroundMusic");
const gravity = 0.9;
let startGame = false;
let score = 0;
let gameSpeedMultiplayer = 0;

class Player {
  constructor() {
    this.height = 100;
    this.position = {
      x: 100,
      y: canvas.height - this.height,
    };
    this.width = 88;
    this.velocity = {
      x: 0,
      y: 10,
    };

    this.animationFrames = [document.getElementById("dino1"), document.getElementById("dino2")];
    this.currentFrame = 0;
    this.frameCount = 0;
    this.frameSpeed = 15;
  }

  draw() {
     let currentFrameImage = this.animationFrames[this.currentFrame];
     c.drawImage(currentFrameImage, this.position.x, this.position.y);
  }

  update() {
    this.draw();
    this.animate();
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }

  animate(){
    this.frameCount++;
    if (this.frameCount >= this.frameSpeed) {
      this.frameCount = 0;
      this.currentFrame = (this.currentFrame + 1) % this.animationFrames.length;}
  }
}

class Ground {
  constructor() {
    this.position = {
      x: 0,
      y: canvas.height - 40,
    };
    this.width = 50;
    this.velocity = 6;
  }

  draw() {
    let groundImage = document.getElementById("ground");
    c.drawImage(groundImage, this.position.x, this.position.y);
    c.drawImage(groundImage, this.position.x + 2399, this.position.y);
  }

  update() {
    this.draw();
    this.position.x -= (this.velocity + gameSpeedMultiplayer);
    if (this.position.x <= -2399) {
      this.position.x = 0;
    }
  }
}

class Obstacle {
  constructor() {
    this.position = {
      x: Math.floor(Math.random() * 100 + 100),
      y: canvas.height - 80 ,
    };
    this.width = 34;
    this.height = 70;
    this.velocity = 6;
  }

  draw() {
    let obstacleImage = document.getElementById("obstacle");
    let obstacle2Image = document.getElementById("obstacle2")
    c.drawImage(obstacleImage, this.position.x + 1280, this.position.y);
    c.drawImage(obstacle2Image, this.position.x + 2000, this.position.y - 35);
    c.drawImage(obstacleImage, this.position.x + 3000, this.position.y);
  }

  update() {
    this.draw();
    this.position.x -= (this.velocity + gameSpeedMultiplayer);
    if (this.position.x <= -3000) {
      this.position.x = Math.floor(Math.random() * 100) + 100;
    }
  }
}

const player = new Player();
const ground = new Ground();
const obstacle = new Obstacle();

function animate() {
  if (!startGame) return;
  
  if (gameSpeedMultiplayer < 8){
     gameSpeedMultiplayer += 0.001;
  }
 
  score += 0.01;
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  ground.update();
  player.update();
  obstacle.update();
  collisionDetection();
  if (player.velocity.y === 0 && !isBackgroundMusicPlaying) {
    playBackgroundMusic();
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

function endGame() {
  startGame = false;
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  playGameOverSound();
  let p = document.createElement("div");
  p.classList.add('score')
  p.textContent = "Your Score is: " + Math.round(score);
  document.body.appendChild(p);
  let btn = document.createElement("button");
  btn.textContent = "Restart";
  document.body.appendChild(btn);
  btn.addEventListener('click', () => {
    resetGame();
    p.remove();
    btn.remove();
  })
}

const button = document.getElementById('startGame');
button.addEventListener("click", () => {
  startGame = true;
  score = 0;
  button.remove();
  playBackgroundMusic();
  animate();
});

let isBackgroundMusicPlaying = false;

function playBackgroundMusic() {
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
  isBackgroundMusicPlaying = true;
}

function pauseBackgroundMusic() {
  backgroundMusic.pause();
  isBackgroundMusicPlaying = false;
}

backgroundMusic.addEventListener(
  "ended",
  function () {
    this.currentTime = 0;
    this.play();
  },
  false
);

function playGameOverSound() {
  let gameOverSound = document.getElementById("gameOverSound");
  gameOverSound.currentTime = 0;
  gameOverSound.play();
}

function playJumpSound() {
  let jumpSound = document.getElementById("jumpSound");
  jumpSound.currentTime = 0;
  jumpSound.play();
}

addEventListener("keydown", ({ code }) => {
  if (code === "Space" && player.velocity.y === 0) {
    playJumpSound();
    player.velocity.y = -20;
    pauseBackgroundMusic();
  }
});

function resetGame (){
  score = 0;
  ground.position.x = 0  
  obstacle.position.x = Math.floor(Math.random() * 100 + 100),
  gameSpeedMultiplayer = 0;
  startGame = true;
  playBackgroundMusic();
  animate();
}
