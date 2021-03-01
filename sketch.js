var balloonImg, balloon;
var bckgrnd;
var position;

function preload() {
balloonImg = loadAnimation("Images/HotAirBallon-02.png", "Images/HotAirBallon-03.png", "Images/HotAirBallon-04.png");
bckgrnd = loadImage("Images/HotAirBallon-01.png");
}

function setup() {
  createCanvas(900,600);
  database = firebase.database();
  var BalloonPosition = database.ref("balloon/position");
  BalloonPosition.on("value", readPos, showErr)

  balloon = createSprite(180, 520, 40, 40);
  balloon.addAnimation("balloon", balloonImg);

  balloon.scale = 0.3;

  //database = firebase.database();
}

function draw() {
  background(bckgrnd);

  if(keyDown (UP_ARROW)){
    //balloon.y = balloon.y-2;
    updateHeight(0, -2);
    //console.log(balloon.y);
  }

  else if(keyDown (DOWN_ARROW)){
    //balloon.y = balloon.y+2;
    updateHeight(0, +2);
  }

  else if(keyDown (RIGHT_ARROW)){
    //balloon.x = balloon.x+2;
    updateHeight(+2, 0);
  }

  else if(keyDown (LEFT_ARROW)){
    //balloon.x = balloon.x-2;
    updateHeight(-2, 0);
  }

  //if(balloon.position.y < 300 && keyDown(UP_ARROW)){
    //balloon.scale = balloon.scale-0.001;
  //}

  //if(balloon.position.y < 100){
  //  balloon.scale = 0.2;
  //}

  //if(balloon.position.y < 300 && keyDown(DOWN_ARROW)){
    //balloon.scale = balloon.scale+0.001;
  //}

  drawSprites();
}

function updateHeight(x, y){
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readPos(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showErr(){
  console.log("Error in writing to the database");
}