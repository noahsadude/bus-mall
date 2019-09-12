'use strict';
//global variables

var votes = 25;
var allItems = [];
var itemNames = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var itemContainer = document.getElementById('item-container');
var itemOne = document.getElementById('item-one');
var itemTwo = document.getElementById('item-two');
var itemThree = document.getElementById('item-three');
var result = document.getElementById('result');
var previousItems = [];
//constructor function
function ItemCreator(itemName){
  this.name = itemName;
  this.file = `img/${itemName}`;
  this.votes = 0;
  this.views = 0;
  allItems.push(this);
}
//random integer function
function randomInt(max){
  return Math.floor(Math.random()*max);
}

function threeRandomNonRepeatingNumbers(){
  var randomItemOne = randomInt(allItems.length);
  while(previousItems.includes(randomItemOne)){
    randomItemOne = randomInt(allItems.length);
  }
  var randomItemTwo = randomInt(allItems.length);
  while(previousItems.includes(randomItemTwo) || randomItemTwo === randomItemOne){
    randomItemTwo = randomInt(allItems.length);
  }
  var randomItemThree = randomInt(allItems.length);
  while(previousItems.includes(randomItemThree) || randomItemThree === randomItemTwo || randomItemThree === randomItemOne){
    randomItemThree = randomInt(allItems.length);
  }
  previousItems = [];
  previousItems.push(randomItemOne,randomItemTwo,randomItemThree);
  return [randomItemOne,randomItemTwo,randomItemThree];
}

function assign(id,item){
  id.src=allItems[item].file;
  id.alt=allItems[item].name;
  id.title=allItems[item].name;
}

function renderItems(){
  var randomItems = threeRandomNonRepeatingNumbers();
  allItems[randomItems[0]].views++;
  allItems[randomItems[1]].views++;
  allItems[randomItems[2]].views++;

  assign(itemOne,randomItems[0]);
  assign(itemTwo,randomItems[1]);
  assign(itemThree,randomItems[2]);
}

//push all the items to the allItems array
for(var i = 0;i<itemNames.length;i++){
  new ItemCreator(itemNames[i]);
}

renderItems();
itemContainer.addEventListener('click',renderItems);


