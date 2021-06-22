var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed, lastFed;
var hour = 1;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedDog = createButton("Feed Dog");
  feedDog.position(700, 95);
  feedDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  lastfed = database.ref('FeedTime');
  lastfed.on("value", function(data){
    feedtime = data.val()
  })


  fill("black")
  strokeWeight(3)
  text("Feedtime: " + hour, 350, 30)

  

 
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodS += -1
  hour++
  update();
}
  
function update(){
    database.ref('/').update({
    Food:foodS,
    FeedTime: hour
})}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
