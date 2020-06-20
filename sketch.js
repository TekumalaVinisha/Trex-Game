var trex,trexrunning,groundimage,invisibleground,ground,PLAY = 1,END = 0,gameStates = PLAY,cloudimage,cloudGroup,obstaclesGroup,score=0,reset,gameover,reset1,gameover2;
var obs1,obs2,obs3,obs4,obs5,obs6,trexcollide;
function preload (){
  trexrunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage = loadImage("ground2.png");
  cloudimage = loadImage ("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  trexcollide = loadImage("trex_collided.png");
  gameover = loadImage("gameOver.png");
  reset = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trexrunning);
  trex.addAnimation("collided",trexcollide);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundimage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameover2 = createSprite(300,100,10,10);
  gameover2.addImage("gameOver",gameover);
  gameover2.visible = false;
  gameover2.scale = 0.7;
  reset1 = createSprite(300,140,10,10);
  reset1.addImage("resart",reset);
  reset1.visible = false;
  reset1.scale = 0.7;
  
  obstaclesGroup = new Group();
  cloudGroup = new Group();
}

function draw() {
  background(180);
  text ("Score : "+ score,500,50);
  ground.velocityX = -(6+3*score/100);
  
  if(gameStates == PLAY){
    console.log (trex.y);
    score = score + Math.round(getFrameRate()/60);
    if(keyDown("space") && trex.y >=161) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    spawnCloud();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameStates = END;
    }
  }
   else if(gameStates == END){
      ground.velocityX = 0;
      trex.velocityY = 0;
      obstaclesGroup.setVelocityXEach (0);
      cloudGroup.setVelocityXEach (0);
      trex.changeAnimation("collided",trexcollide);
      gameover2.visible = true;
      reset1.visible = true;
  }
  if(mousePressedOver(reset1)){
    reset();
  }
  
  trex.collide(invisibleGround);

  drawSprites();
}
function reset(){
  gameStates = PLAY;
  score = 0;
 trex.changeAnimation("trexrunnning",trexrunninig);
}

function spawnCloud(){
  if(World.frameCount % 60 == 0){
    var cloud = createSprite(600,random(80,120),10,10);
    cloud.addImage(cloudimage);
    cloud.velocityX = -3;
    cloud.scale = 0.5;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = -1;
    cloudGroup.add(cloud);
}
}
 function spawnObstacles(){
   if(World.frameCount % 60 == 0){
     var obstacle = createSprite(600,165,10,10);
     var rand = Math.round(random(1,6));
   switch(rand){
     case 1:obstacle.addImage(obs1);
     break;
     case 2 :obstacle.addImage(obs2);
     break;
     case 3 :obstacle.addImage(obs3);
     break;
     case 4 :obstacle.addImage(obs4);
     break;
     case 5 :obstacle.addImage(obs5);
     break;
     case 6 :obstacle.addImage(obs6);
     break;
     default: break;
   }
     obstacle.scale = 0.5
     obstacle.velocityX = -(6+3*score/100);
     obstacle.lifetime = -1;
     obstaclesGroup.add(obstacle);
 }
 }
