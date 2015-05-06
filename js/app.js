var a = new Audio("assets/die.mp3");
var s = new Audio("assets/begin.mp3");

 function myFunction() {
    s.play();
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
  this.x;
  this.y;
  this.speed = Math.floor((Math.random() * 100) + 20);
  this.sprite = 'images/enemy-bug.png';
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  if(this.x > 505){
    this.restart();
  }
  this.x += dt * this.speed;   
}

Enemy.prototype.restart = function(){
  this.x = -20;
  this.y = 80;
  this.diffrentPosition();
}

Enemy.prototype.diffrentPosition = function(){
  var yPosition = Math.floor((Math.random() * 4 ) + 1)
   if(yPosition == 1){
      this.y = 300;
   }else if(yPosition == 2){
      this.y = 220;
   }else if(yPosition == 3){
      this.y = 140;
   }else if(yPosition == 4){
      this.y = 60;
   }    
 };

 
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    accident(this, player);
}

function accident(enemy, player){
  if(enemy.y == player.y){
    if((player.x <= enemy.x + 75) && (player.x >= enemy.x - 50) ){
      player.x = 201;
      player.y = 380;
      player.removelife();
      a.play();
    }
  }
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


var allEnemies = [];
for(x = 1; x <= 3; x++){
 var enemy = new Enemy();
  enemy.restart();
  allEnemies.push(enemy); 
}

/*var date = new Date();*/

// Place the player object in a variable called player
function Player(){
  this.x = 200;
  this.y = 350;
  this.sprite = 'images/char-boy.png';
  this.life = 5;
  this.level = 1;
  this.gameOver = false;
  document.getElementById("lifeSpan").innerHTML= this.life;
  document.getElementById("Level").innerHTML=this.level;
  this.removelife = function(){
      this.life -=1;
      document.getElementById("lifeSpan").innerHTML= this.life;
      if(this.life == 0){
        gameOver = true;
        this.life = 5;
      if(gameOver){
         this.sprite = "";
         document.getElementById("button").style.display="block";
         document.getElementById("gameOver").innerHTML="Game Over";
        }
      }
  }
  this.addLevel = function(){
    function myLevel(){
      this.level += 1;
      document.getElementById("Level").innerHTML=this.level;
      console.log(this.level);
    }
  }

  this.restart = function(){
    this.x = 200;
    this.y = 350;
   }
   this.update =  function(){
      
   }
   this.render = function(){
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

setInterval(player.addLevel(this), 3000)

  
this.handleInput = function(arg){  
if (arg == 'left') {
   // deduct 100 from x coordinate after checking for the boundary
     if (this.x - 100 >= 1) {
       this.x = this.x - 100;
     }
} else if (arg == 'right') {
     // Add 100 to x coordinate after checking for the boundary
     if (this.x + 100 <= 401) {
       this.x = this.x + 100;
     }
} else if (arg == 'up') {
     // Deduct 80 from y coordinate after checking for the boundary
     if (this.y - 80 >= 60) {
       this.y = this.y - 80;
     } else {
       this.x = 201;
       this.y = 380;
       player.removelife();
     }
} else if (arg == 'down') {
     // Add 80 to y coordinate after checking for the boundary
     if (this.y + 80 <= 380) {
       this.y = this.y + 80;
     }
    }
     }
};


var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
