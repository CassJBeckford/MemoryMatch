
const gameboard = document.getElementById("game-board");
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
        if (section.id === "menu-title"){
            section.classList.add('visible');
        }
        else if (section.id !== sectionId){
            section.classList.add('hidden');
        }
        else {
            section.classList.add('visible');
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
}

function makeVisible(id){
    document.getElementById(id).classList.add("visible")
}

function makeInvisible(id){
    document.getElementById(id).classList.add("hidden")
}

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffle(cards);
    addCards();
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
      gameboard.appendChild(cardElement);
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
    // TO DO 
}

function updateEasyCountdown(){
    if(flipped && easyTime > 0){
    let seconds = easyTime;
    easyCountdown.innerHTML = `${seconds}`
    easyTime--;
    }
    else{
    easyCountdown.innerHTML = easyTime    
    }
}


function updateMediumCountdown(){
    if(flipped && mediumTime > 0){
        let seconds = mediumTime;
        mediumCountdown.innerHTML = `${seconds}`
        mediumTime--;
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
        else{
        hardCountdown.innerHTML = hardTime    
    } 
}

function createEasyBoard(){
    addCards();
    makeVisible('game-screen');
    makeInvisible('menu-section')
    makeInvisible('mode-selection');
    makeInvisible('difficulty-section');
    makeInvisible('mediumTime');
    makeInvisible('hardTime');
}

function createMediumBoard(){
    addCards();
    makeVisible('game-screen');
    makeInvisible('menu-section')
    makeInvisible('mode-selection');
    makeInvisible('difficulty-section');
    makeInvisible('easyTime');
    makeInvisible('hardTime');
}

function createHardBoard(){
    addCards();
    makeVisible('game-screen');
    makeInvisible('menu-section')
    makeInvisible('mode-selection');
    makeInvisible('difficulty-section');
    makeInvisible('easyTime');
    makeInvisible('mediumTime');
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
