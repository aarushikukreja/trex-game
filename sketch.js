var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var PLAY=1
var END=0
var gameState=PLAY
var gameOver, gameOverImage
var restart, restartImage
var score=0
var jump
var die
var checkpoint

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
   obstacle2=loadImage("obstacle2.png")
   obstacle3=loadImage("obstacle3.png")
   obstacle4=loadImage("obstacle4.png")
   obstacle5=loadImage("obstacle5.png")
   obstacle6=loadImage("obstacle6.png")
  
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  
  jump= loadSound("jump.mp3")
  
  die= loadSound("die.mp3")
  
  checkpoint= loadSound("checkPoint.mp3")

  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  trex.addAnimation("collided", trex_collided)
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup= new Group()
 obstaclesGroup= new Group()
  
  gameOver=createSprite(300, 100)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.5
  gameOver.visible=false
  
  restart= createSprite(300, 140)
  restart.addImage(restartImage)
  restart.scale=0.5
  restart.visible=false
  

}

function draw() {
  background(180);
  
  if(gameState===PLAY){
    
        
    if (score>0 && score%100 === 0){
      checkpoint.play()
    }
    
  score= score+ Math.round(getFrameRate()/60)
  if(keyDown("space")&&trex.y>=159) {
    trex.velocityY = -12;
    jump.play()
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
     ground.velocityX = -(2+ 3*score/100);
  
  trex.collide(invisibleGround);
  
  spawnClouds();
  spawnObstacles(); 
    if(obstaclesGroup.isTouching(trex)){
       gameState=END
      die.play()
       
  }
  }
  
  else if(gameState===END){
     trex.changeAnimation("collided", trex_collided)
  trex.velocityY=0
    ground.velocityX=0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    gameOver.visible=true
    restart.visible=true
    obstaclesGroup.setLifetimeEach(-3)
    cloudsGroup.setLifetimeEach(-3)
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
    
  drawSprites();

  
  
  text("Score: " +score, 500, 50)
}

function spawnClouds(){
  if(frameCount% 60 ===0){
    
    var cloud= createSprite(600, 120, 40, 10)
    cloud.y= random(80, 120)
    cloud.addImage(cloudImage)
    cloud.scale=0.5
    cloud.velocityX=-3
    
    cloud.lifetime=200
    cloud.depth=trex.depth
    trex.depth= trex.depth+1
    
    cloudsGroup.add(cloud)
  }
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle= createSprite(600,165, 10, 40)
    obstacle.velocityX=-(6+ 3*score/100);
    var rand= Math.round (random(1,6))
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break; 
      case 2: obstacle.addImage(obstacle2);
        break;
        case 3:obstacle.addImage(obstacle3);
        break;
         case 4:obstacle.addImage(obstacle4);
        break;
         case 5:obstacle.addImage(obstacle5);
        break;
         case 6:obstacle.addImage(obstacle6);
        break;
        default: break;
    }
        
    obstacle.scale=0.5
        obstacle.lifetime=100
        obstaclesGroup.add(obstacle)
    
  }
  
}

function reset(){
  gameState=PLAY
  gameOver.visible=false
  restart.visible=false
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running", trex_running)
  score=0
}
