
const gameboard = document.getElementById("game-board");
const easyDifficulty = document.getElementById('easy');
const mediumDifficulty = document.getElementById('medium');
const hardDifficulty = document.getElementById('hard');

let cards = [];
let difficulty = "";
let flipped = false;
let firstMove, secondMove;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    addCards();
});

const menuSection = {
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
      cardMatch();
    }
}

function shuffleCards(){
    // TO DO
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

function cardMatch(){
    let match = firstMove === secondMove;
    if (!match){
        unflipCard();
    }
    else {
        reset();
    }
}

function reset(){
    firstMove = null;
    secondMove = null;
    flipped = false;
}

function freezeCards(){
   
}

function unflipCard(){
    setTimeout(() => {
    firstMove.classList.remove("flip")
    secondMove.classList.remove("flip")
    }, 1000);
;
}

function restart(){
    // TO DO 
}

function updateEastCountdown(){
    // TO DO
}

function updateMediumCountdown(){
    // TO DO 
}

function updateHardCountdown(){
    // TO DO   
}

function createEasyBoard(){
    addCards();
    makeVisible('game-screen');
    makeInvisible('menu-section')
    makeInvisible('difficulty-selection');
}

function createMediumBoard(){
    addCards();
    makeVisible('game-screen');
    makeInvisible('menu-section')
    makeInvisible('difficulty-selection');
}

function createHardBoard(){
    addCards();
    makeVisible('game-screen');
    makeInvisible('menu-section')
    makeInvisible('difficulty-selection');
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
