let ground;
let lander;
var lander_img;
var bg_img;
var PLAY=1
var END=0
var score=0;
var life,heart;
var gameState=PLAY



var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  obs = loadImage("obs.png");
  coinimg= loadImage("coin.png");
  h2= loadImage("heart-1.png");
  h3= loadImage("heart.png");
  h1= loadImage("heart-2.png");


}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
life=3
  heart=createSprite(800,40,100,70)
 heart.addImage(h3)
 heart.scale=0.3
  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
obstacleGroup=createGroup();
coinGroup=createGroup();
  rectMode(CENTER);
  Edges=createEdgeSprites();
  textSize(15);
}

function draw() 
{
  background(51);
  if(gameState===PLAY){
    if(coinGroup.isTouching(lander)){
      score=score+2
      coinGroup.destroyEach();
    }
      if(keyDown("UP_ARROW")){
    lander.y=lander.y-5
  }
  if(keyDown("DOWN_ARROW")){
    lander.y=lander.y+5
  }
  if(keyDown("LEFT_ARROW")){
    lander.x=lander.x-5
  }
  if(keyDown("RIGHT_ARROW")){
    lander.x=lander.x+5
  } 
  if(obstacleGroup.isTouching(lander)){
    life=life-1
    obstacleGroup.destroyEach();
    console.log(life)
   if(life!=0){
     if(life===1){
      heart.addImage(h1)
     }
     if(life===2){
      heart.addImage(h2)
     }
   
   } 
    if(life===0){
      gameState=END
      heart.destroy();
     }
  }

  spawnobstactle();
  spawncoins();
  }else if(gameState===END){
    lander.destroy();
  }
  lander.collide(Edges)

  image(bg_img,0,0);
  push()
  fill(255);
  text("Score: "+score,800,75);
  pop();

  //fall down
  //vy +=g;
  //lander.position.y+=vy;
 lander.debug=true
 lander.setCollider("circle",0,0,250)  
  drawSprites();
}
function spawnobstactle(){
  if(frameCount%80===0){
    var obstacle=createSprite(900,650,20,20)
    obstacle.addImage(obs)
    obstacle.velocityX=-7
    obstacle.scale=0.3
    obstacle.y=Math.round(random(50,650))
    obstacleGroup.add(obstacle)
  }
}
function spawncoins(){
  if(frameCount%120===0){
    var coin=createSprite(900,650,20,20)
    coin.addImage(coinimg)
   coin.velocityX=-7
    coin.scale=0.1
    coin.y=Math.round(random(50,650))
    coin.x=Math.round(random(650,950))
    coinGroup.add(coin)
  }
}
