
/*
********************************************
AUTHUR: OBOGBARE ALEX
********************************************
ORGANISATION: ANDELA
********************************************
DATE: 07/06/2015
********************************************
*/


// Global varables
var deadSound = new Audio("assets/die.mp3");
var beginSound = new Audio("assets/begin.mp3");
var levelSound = new Audio("assets/levels.mp3");
var WaterSound = new Audio("assets/water.mp3");
var countDown = 10;
var gameOver = false; //This will turn true if the user life has finish

 // This function make the first statement when the game start
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
  this.speed = Math.floor((Math.random() * 80) +2);
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
  var yPosition = Math.floor((Math.random() * 5 ) + 1)
  if(yPosition == 1){
      this.y = 300;
   }else if(yPosition == 2){
      this.y = 220;
   }else if(yPosition == 3){
      this.y = 140;
   }else if(yPosition == 4){
      this.y = 60;
   }else if(yPosition == 5){
      this.y = 380;
   }    
};

 
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  accident(this, player);
}


//This Enemy Class function, is been called on collition.
function accident(enemy, player){
  if(enemy.y == player.y){
    if((player.x <= enemy.x + 75) && (player.x >= enemy.x - 50) ){
      player.x = 201;
      player.y = 380;
      player.removelife();
      deadSound.play();
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
  this.x = 201;
  this.y = 380;
  this.sprite = 'images/char-boy.png';
  this.life = 5;
  this.level = 1;
  this.higScore = 0;
  this.gameOver = false;
  document.getElementById("lifeSpan").innerHTML= this.life;
  document.getElementById("Level").innerHTML=this.level;
  document.getElementById("previous").innerHTML = localStorage.getItem("higScore");
  var  storedScore = localStorage.getItem("higScore");

if(this.y == 350){
   var myVar=setInterval(function () {myTimer()}, 1000);
  function myTimer() {
    countDown -=1;
    document.getElementById("demo").style.display="block";
    document.getElementById("demo").innerHTML = countDown;
    if(countDown == 0){
    document.getElementById("demo").style.display="none";  
    }
  }
}
  // this class Method will minus one life from the players five life
  // and if the life get to zero, it turns the gameOver variable to true
this.removelife = function(){
    this.life -=1;
    document.getElementById("lifeSpan").innerHTML= this.life;
  if(this.life == 0){
    gameOver = true;
  if(gameOver == true){
    this.sprite = ""; // setting the player to an empty string makes it disappare
    this.higScore = 0;
    document.getElementById("button").style.display="block";
    document.getElementById("gameOver").innerHTML="Game Over";
    document.getElementById("previous").innerHTML = localStorage.getItem("higScore");
    }
  }
}

// this the statement will only run of the layer has life or 
// the game is still on.
if(this.life > 0 && this.gameOver == false){  
  this.addLevel = function(){
  if (this.life > 0 && this.gameOver == false){
  levelSound.play();
  this.level += 1;
  this.higScore +=5;
// first if statement check if the player highscore is grater that 
// the previous/stored one, and if that is true, it move one to the next
//state ment
if(this.higScore >= localStorage.higScore || localStorage.length > 0){
  //this statement will check if the player has reach the stored highscore
  if(this.higScore == localStorage.higScore){
    document.getElementById("recoredAlert").style.display="block";
    this.life += 5;
  }
//Am using HTML5 Localstorage Api to store the highscore 
  if (typeof(Storage) != "undefined") {
    localStorage.setItem("higScore", this.higScore.toString());
 // Retrieve
    document.getElementById("previous").innerHTML = localStorage.getItem("higScore");
   } else {
    document.getElementById("previous").innerHTML = "Sorry, your browser does not support Web Storage...";
   }
  }
  document.getElementById("Level").innerHTML=this.level;
  document.getElementById("Present").innerHTML=this.higScore;   
 }else{
  document.getElementById("lifeSpan").innerHTML= 1;
  document.getElementById("Level").innerHTML= 0;
 }
   // loop through the allEnemy array
  for (var x in allEnemies) {
     allEnemies[x].speed += 50;
  }
 } 
} 

 
  // This class Method will restart the players position
this.restart = function(){
  this.x = 200;
  this.y = 350;
}

this.update =  function(){
      
}   
   // this class function will render the canvas of the player
   //Note: this is called from the engin.js file, just incase of any modification
this.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



// This function listen to the direction events  
//if(gameOver == true){ 
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
       WaterSound.play();
       deadSound.play()
    }
} else if (arg == 'down') {
     // Add 80 to y coordinate after checking for the boundary
     if (this.y + 80 <= 380) {
       this.y = this.y + 80;
     }
    }
  }
};
//}
 // This is the point i instantiate a new player
var player = new Player();

//confirming when the player addLevel should be called on the bellow condition  
if(player.life > 0 || player.life != nil){
 setInterval(function(){player.addLevel();}, 10000);
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
if(player.life > 0 || player.life != nil){
  document.addEventListener('keyup', function(e) {
      var allowedKeys = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down'
      };

      player.handleInput(allowedKeys[e.keyCode]);
  });
}