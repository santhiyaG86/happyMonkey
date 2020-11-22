var monkey , monkey_running;
var banana , bananaImage, obstacle, obstacleImage;
var Background, BackgroundImage;


var monkeySound
var gameoverSound

var FoodGroup, obstacleGroup;

var survivalTime = 0;
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  BackgroundImage = loadImage("background.PNG");
  
  monkeySound = loadSound("monkey.wav");
  gameoverSound = loadSound("gameover.flac");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
    ground = createSprite(width-50, height-220,1250,10);
    ground.visible = false;
  
    Background = createSprite(100, height-420,1250,10);
    Background.addImage("Background", BackgroundImage);
    Background.scale = 2
  
    monkey = createSprite(width-510, height-220, 20,20);
    monkey.addAnimation("running", monkey_running);
    monkey.scale = 0.4/3;
    
    foodGroup = new Group();
    obstacleGroup = new Group();

    //monkey.debug = true;
    monkey.setCollider("circle",0,0,250);
}


function draw() {
  
  background("white");
    
  //monkey collision with invisible ground
  monkey.collide(ground);
  
  //If condition for gamestates
  
   //score
    stroke("white");
    textSize = 20
    fill("black");
    text("Score: " + score ,500,50);
  
  if (gameState === PLAY){
  //Jump command
    if (touches.length < 0 || keyDown("space") && monkey.y >= 210){
      monkey.velocityY = -12;
      touches = [];
  }
    
    
    //SurvivalTime
    stroke("white");
    textSize = 20;
    fill("black");
    text("SurvivalTime: " + survivalTime, 50, 50);
    survivalTime = Math.round(frameCount/frameRate());
    
       
    //Monkey velocity
    monkey.velocityY = monkey.velocityY + 0.9;
    
    
    if (Background.x < 0){
      Background.x = Background.width/2;
    }
    
    //Ground velocity
    Background.velocityX = -(5 + 0.5 * score/3);
    
    //Score for each food 
    if (foodGroup.isTouching(monkey)){
    score = score + 1;
    foodGroup.destroyEach();
    monkeySound.play();
    
    }
    
    if (obstacleGroup.isTouching(monkey)){
      gameoverSound.play();
      gameState = END;
    }
    
    //Spawning food
    food();
  
    //spawning obstacles
    Obstacle();
  
  } else if(gameState === END){
    
    monkey.velocityY = 0;
    Background.velocityX = 0;
    
    //score
    stroke("white");
    textSize = 20
    fill("black");
    text("Score: " + score ,500,50);

    //SurvivalTime
    stroke("white");
    textSize = 20;
    fill("black");
    text("SurvivalTime: " + survivalTime, 50, 50);
    
    //to stop all objects from disappearing 
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    //make velocity 0
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);    
  }
  
  //Drawing sprites
  drawSprites();
}

function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(650,200,20,20);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    
    banana.velocityX = -(7 + 1.5 * score/3); 
    banana.y = Math.round(random(80,170));
    
    banana.lifeTime = 200;
    
    foodGroup.add(banana);
  }
}

function Obstacle(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(width-50, height-200, 40, 40);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.2;
    obstacle.y = 280;
    
    obstacle.velocityX = -(7 + 1.5 * score/3); 
    
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,200);
    
    obstacle.lifeTime = 200;
    obstacleGroup.add(obstacle);
  }
}

