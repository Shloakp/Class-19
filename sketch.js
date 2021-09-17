var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale = 0.4;

doorsGroup = new Group();
climbersGroup = new Group();
invisibleBlockGroup = new Group();
  
}

function draw() {
  background(200);

  


  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
      ghost.velocityY = -5;
    }
      ghost.velocityY += 0.8;
   
     if(keyDown("right")){ 
       ghost.x += 4;
     } 
   
     if(keyDown("left")){
       ghost.x -= 4;
  }
  

  spawnDoor();
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
  ghost.destroy();
  gameState ="end"
  }
  drawSprites();



  } 
  
  if(gameState === "end"){
    background("black");
  
    stroke(random(0,255), random(0,255), random(0,255));
  fill(random(0,255), random(0,255), random(0,255));
  textSize(40);
  text("Game Over!", 230,250);

  }

  
 
    
}


function spawnDoor(){
  if(frameCount % 240 == 0){

  
door = createSprite(200,-50);
door.addImage(doorImg);
door.x = Math.round(random(120,400));
door.velocityY = 1;
door.lifetime = 800;
doorsGroup.add(door);

climber = createSprite(200,10);
climber.addImage(climberImg);
climber.velocityY = 1;
climber.x = door.x
climber.liftetime = 800;
climbersGroup.add(climber);

ghost.depth = door.depth;
ghost.depth += 1;

invisibleBlock = createSprite(200,15)
invisibleBlock.width = climber.width;
invisibleBlock.height = 2;
invisibleBlock.x = door.x;
invisibleBlock.velocityY = 1

invisibleBlock.debug = true;
invisibleBlockGroup.add(invisibleBlock);
  }
}
