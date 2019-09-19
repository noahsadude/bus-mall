'use strict';
//global variables

var votes = 5;
var allItems = [];
var itemNames = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var itemContainer = document.getElementById('item-container');
var itemOne = document.getElementById('item-one');
var itemTwo = document.getElementById('item-two');
var itemThree = document.getElementById('item-three');
var result = document.getElementById('result');
var ctx = document.getElementById('myChart').getContext('2d');
var previousItems = [];
//constructor function
function ItemCreator(itemName){
  this.name = itemName;
  this.file = `img/${itemName}`;
  this.votes = 0;
  this.views = 0;
  this.colors = randomColor();
  allItems.push(this);
}
//random integer function
function randomInt(max){
  return Math.floor(Math.random()*max);
}
//random color function
function randomColor(){
  return 'rgba('+randomInt(255)+' ,'+randomInt(255)+' ,'+randomInt(255)+')';
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

function renderVotes(){
  result.style.visibility = 'visible';
  var labels = [];
  var votes = [];
  var views = [];
  var color = [];
  for(var i = 0;i<allItems.length;i++){
    labels.push(allItems[i].name);
    votes.push(allItems[i].votes);
    views.push(allItems[i].views);
    color.push(allItems[i].colors);
  }
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: '# of Votes',
              data: votes,
              backgroundColor: color,
              borderColor: color,
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}

function pushClicks(e){
  var name = e.target.title;
  for(var i = 0; i<allItems.length;i++){
    if(name === allItems[i].name){
      allItems[i].votes++;
      votes--;
      console.log(`votes remaining: ${votes}`);
    }
  }
  if(votes === 0){
    itemContainer.removeEventListener('click',pushClicks);
    renderVotes();
    var pushed = JSON.stringify(allItems);
    localStorage.setItem('itemString',pushed);
  }
  renderItems();
}

var pulled = localStorage.getItem('itemString');
if(pulled){
  pulled = JSON.parse(pulled);
  console.log(pulled);
  allItems = pulled;
} else{
 //push all the items to the allItems array
  for(var i = 0;i<itemNames.length;i++){
    new ItemCreator(itemNames[i]);
  }
}

renderItems();
itemContainer.addEventListener('click',pushClicks);
