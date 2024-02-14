const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = 1000;


c = canvas.getContext('2d');
const gravity = 0.9;
class Player{
    constructor () {
        this.height = 100
        this.position = {
            x:100,
            y:canvas.height - this.height - 10
        }
        this.width = 100
        this.velocity = {
            x:0,
            y:10
        }
    }

    draw(){
        let dinoImage = document.getElementById('dino');
        c.drawImage(dinoImage, this.position.x, this.position.y);
    }

    update(){
        this.draw();
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }else{
            this.velocity.y = 0;
        }

       
        
    }
}

class Ground{
    constructor(){
        this.position={
            x: 0,
            y: canvas.height - 40
        }
        this.width = 50;
        this.velocity = 8;
    }

    draw(){
        let groundImage = document.getElementById('ground');
        c.drawImage(groundImage, this.position.x, this.position.y)
        c.drawImage(groundImage, this.position.x + 2399, this.position.y)

      
    }

    update(){
        this.draw();
        this.position.x -= this.velocity;

        
    }
}

const player = new Player();
const ground = new Ground();





function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    ground.update();
    player.update();
    if (ground.position.x <= -2399){
        ground.position.x = 0 
    }
}

animate();
addEventListener('keydown', ({code})=>{
    console
    if (code == 'Space' && player.velocity.y == 0){
        player.velocity.y = -20; 
        console.log(player.position.y)
    }    
})