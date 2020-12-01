var PLAY=1;
var END=0;
var gameState=1;
 
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0, survivalTime=0;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background(255);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100,50);
  
  if (gameState === PLAY) {
    if(ground.x<0) {
      ground.x=ground.width/2;
    }
  
    if(keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -17;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    spawnBanana();

    if (spawnBanana.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score+2;
    }
  
    spawnObstacle();
  
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  } else if (gameState === END){
    monkey.velocityX=0;
    ground.velocityX=0;
    foodGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
  }
  monkey.collide(ground);
  
  drawSprites();
}
  
function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,120,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(400,310,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
    obstacle.lifetime = 200;
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    obstacleGroup.add(obstacle);
  }
}
