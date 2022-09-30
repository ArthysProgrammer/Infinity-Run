var Tábua_de_MadeiraImg, Tábua_de_Madeira;
var PregoImg, Prego, pregoGroup;
var PorcaImg, Porca, porcaGroup;
var Furadeira, FuradeiraImg;
var gameState = "play";

function preload(){
  Tábua_de_MadeiraImg = loadImage("Tábua de MadeiraImg.jpg");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  FuradeiraImg = loadImage("Furadeira-removebg-preview.png");
}

function setup(){
  createCanvas(600,600);
  Tábua_de_Madeira = createSprite(300,300);
  Tábua_de_Madeira.addImage("Tábua_de_Madeira",Tábua_de_MadeiraImg);
  tower.velocityY = 1;
  
  pregoGroup = new Group();
  porcaGroup = new Group();
  
  Furadeira = createSprite(200,200,50,50);
  Furadeira.scale = 0.3;
  Furadeira.addImage("Furadeira", FuradeiraImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      Furadeira.x = Furadeira.x - 3;
    }
    
    if(keyDown("right_arrow")){
      Furadeira.x = Furadeira.x + 3;
    }
    
    if(keyDown("space")){
      Furadeira.velocityY = -10;
    }
    
    Furadeira.velocityY = Furadeira.velocityY + 0.8
    
    if(Tábua_de_Madeira.y > 400){
      Tábua_de_Madeira.y = 300
    }
    spawnPrego();

    
    if(porcaGroup.isTouching(Furadeira) || Furadeira.y > 600){
      Furadeira.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("red");
    fill("black");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnPrego() {
  if (frameCount % 240 === 0) {
    var Prego = createSprite(200, -50);
    var Porca = createSprite(200,10);
    
    Prego.x = Math.round(random(120,400));
    
    Prego.addImage(PregoImg);
    Porca.addImage(PorcaImg);
    
    Prego.velocityY = 1;
    Porca.velocityY = 1;
    
    Furadeira.depth = Prego.depth;
    Furadeira.depth +=1;
   
    //atribua tempo de vida à variável
    Furadeira.lifetime = 800;
    Prego.lifetime = 800;
    
    //adicione cada porta ao grupo
    pregoGroup.add(door);
    porcaGroup.add(Porca);
  }
}