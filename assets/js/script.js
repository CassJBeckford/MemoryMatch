
const board1 = document.getElementById("board1")
const board2 = document.getElementById("board2")
const board3 = document.getElementById("board3")
const gameboard = document.getElementById("game-board");
const gameboard2 = document.getElementById("game-board2");
const gameboard3 = document.getElementById("game-board3");
const easyDifficulty = document.getElementById('easy');
const mediumDifficulty = document.getElementById('medium');
const hardDifficulty = document.getElementById('hard');

const easyCountdown = document.getElementById("easyTime");
setInterval(updateEasyCountdown, 1000);
const mediumCountdown = document.getElementById("mediumTime");
setInterval(updateMediumCountdown, 1000);
const hardCountdown = document.getElementById("hardTime");
setInterval(updateHardCountdown, 1000);

let easyTime = 15;
let mediumTime = 10;
let hardTime = 5;

let cards = [];
let difficulty = "";
let moves = 0;
let flipped = false;
let firstMove, secondMove;

const menuSection = {
    frontpage: 'front-page',
    instructions: 'instructions',
    modeSelection: 'mode-selection'
};

function showSection(sectionId){
    let sections = document.getElementById('menu-section').children;
    for (let section of sections) {
        /** modified code from https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp */
        if (section.id !== sectionId){
            section.classList.add('hidden');
        }
        else {
            section.classList.remove('hidden');
        }
    }
}

function makeFrontPageVisible() {
    showSection(menuSection.frontpage);
}

function makeRulesVisible() {
    showSection(menuSection.instructions);
}

function selectDifficulty() {
    showSection(menuSection.modeSelection);
    makeVisible('difficulty-section')
}

function makeVisible(id){
 
    document.getElementById(id).classList.remove("hidden")
}

function makeInvisible(id){
    document.getElementById(id).classList.add("hidden")
  
}

function returnToMenu(){
    makeVisible('front-page')
    makeInvisible('game-screen');
    restart();
}

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffle(cards);
    addCards();
    addCards2();
    addCards3();
    });

function addCards() {
    for (let card of cards) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card-inner");
      cardElement.setAttribute("data-name", card.name);
      cardElement.innerHTML = `
        <div class="card-front">
          <img class="front-image" src=${card.image} />
        </div>
        <div class="card-back"></div>
      `;
      board1.appendChild(gameboard)
      gameboard.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    }
}

function addCards2() {
    for (let card of cards) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card-inner");
      cardElement.setAttribute("data-name", card.name);
      cardElement.innerHTML = `
        <div class="card-front">
          <img class="front-image" src=${card.image} />
        </div>
        <div class="card-back"></div>
      `;
      board2.appendChild(gameboard2)
      gameboard2.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    }
}

function addCards3() {
    for (let card of cards) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card-inner");
      cardElement.setAttribute("data-name", card.name);
      cardElement.innerHTML = `
        <div class="card-front">
          <img class="front-image" src=${card.image} />
        </div>
        <div class="card-back"></div>
      `;
      board3.appendChild(gameboard3)
      gameboard3.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    }
}

function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex = currentIndex - 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

function flipCard() {
    if (flipped) return;
    if (this === firstMove) return;
  
    this.classList.add("flip");
  
    if (!firstMove) {
      firstMove = this;
      return;
    }
  
    secondMove = this;
    flipped = true;
    cardMatch();
}

function cardMatch() {
    let isMatch = firstMove.dataset.name === secondMove.dataset.name;
    if (!isMatch){
        unflipCards();
  }
  else {
        freezeCards();
  }
}
  
function freezeCards() {
    firstMove.removeEventListener("click", flipCard);
    secondMove.removeEventListener("click", flipCard);
    reset();
}
  
function unflipCards() {
    setTimeout(() => {
      firstMove.classList.remove("flip");
      secondMove.classList.remove("flip");
      reset();
    }, 1000);
}

function reset(){
firstMove = null;
secondMove = null;
flipped = false;
}

function restart(){

    easyCountdown.innerHTML = 15
    easyTime = 15
    let gameboard = document.getElementById("game-board");
    gameboard.innerHTML = "";
    addCards();
    shuffle(cards); 

    mediumCountdown.innerHTML = 10
    mediumTime = 10
    let gameboard2 = document.getElementById("game-board2");
    gameboard2.innerHTML = "";
    addCards2();
    shuffle(cards);

    hardCountdown.innerHTML = 5
    hardTime = 5
    let gameboard3 = document.getElementById("game-board3");
    gameboard3.innerHTML = "";
    addCards3();
    shuffle(cards);
}
function restartEasy(){
    easyCountdown.innerHTML = 15
    easyTime = 15
    let gameboard = document.getElementById("game-board");
    gameboard.innerHTML = "";
    addCards();
    shuffle(cards); 
}

function restartMedium(){
    mediumCountdown.innerHTML = 10
    mediumTime = 10
    let gameboard2 = document.getElementById("game-board2");
    gameboard2.innerHTML = "";
    addCards2();
    shuffle(cards);
     
}

function restartHard(){
    hardCountdown.innerHTML = 5
    hardTime = 5
    let gameboard3 = document.getElementById("game-board3");
    gameboard3.innerHTML = "";
    addCards3();
    shuffle(cards);
     
}

function updateEasyCountdown(){
    if(flipped && easyTime > 0){
        let seconds = easyTime;
        easyCountdown.innerHTML = `${seconds}`;
        easyTime--;
    }
    else if(easyTime === 0){
        restartEasy();
    }
    else{
        easyCountdown.innerHTML = easyTime;  
    }
}


function updateMediumCountdown(){
    if(flipped && mediumTime > 0){
        let seconds = mediumTime;
        mediumCountdown.innerHTML = `${seconds}`
        mediumTime--;
    }
    else if(mediumTime === 0){
        restartMedium();
    }
        else{
        mediumCountdown.innerHTML = mediumTime    
    }
}

function updateHardCountdown(){
    if(flipped && hardTime > 0){
        let seconds = hardTime;
        hardCountdown.innerHTML = `${seconds}`
        hardTime--;
    }
    else if(hardTime === 0){
        restartHard();
    }
        else{
        hardCountdown.innerHTML = hardTime    
    } 
}

function createEasyBoard(){
    addCards();
    makeVisible('game-screen');
    makeVisible('game-board')
    makeVisible('easyTime');
    makeInvisible('difficulty-section');
    makeInvisible('mediumTime');
    makeInvisible('hardTime');
    makeInvisible('game-board2');
    makeInvisible('game-board3');
}

function createMediumBoard(){
    addCards2();
    makeVisible('game-board2');
    makeVisible('game-screen');
    makeVisible('mediumTime');
    makeInvisible('difficulty-section');
    makeInvisible('easyTime')
    makeInvisible('hardTime')
    makeInvisible('game-board');
    makeInvisible('game-board3');
}

function createHardBoard(){
    addCards3();
    makeVisible('game-board3');
    makeVisible('game-screen');
    makeVisible('hardTime');
    makeInvisible('difficulty-section');
    makeInvisible('mediumTime')
    makeInvisible('easyTime')
    makeInvisible('game-board2');
    makeInvisible('game-board');
}

easyDifficulty.addEventListener("click", function () {
    difficulty = "easy";
    createEasyBoard();
})

mediumDifficulty .addEventListener("click", function () {
    difficulty = "medium";
    createMediumBoard();
})

hardDifficulty.addEventListener("click", function () {
    difficulty = "hard";
    createHardBoard();
})
