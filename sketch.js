var backgroungimg
var database
var gameState = 0;
var playerCount
var form, player, game
var allPlayers
var car1, car2, car3, car4, carA
var white, red, blue, black, track, ground

function preload(){
    white = loadImage("images/car1.png");
    red = loadImage("images/car2.png");
    blue = loadImage("images/car3.png");
    black = loadImage("images/car4.png");
    track = loadImage("images/track.jpg");
    ground = loadImage("images/ground.png");
}

function setup(){
    database = firebase.database();
    createCanvas(displayWidth -20, displayHeight -30);
    game = new Game();
    game.getState();
    game.start();
    
    
}

function draw(){
  if(playerCount === 4){
      game.update(1);
  }
  if(gameState === 1){
      clear();
      game.play();
  }
  if(gameState === 2){
      game.end();
  }
}
