// initialise global variables 

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

// menu section Ids
const menuSection = {
    frontpage: 'front-page',
    instructions: 'instructions',
    modeSelection: 'mode-selection'
};

// menu navigation 
function showSection(sectionId){
    // set variable equal to all menu sections
    let sections = document.getElementById('menu-section').children;
    for (let section of sections) {
        /** modified code from https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp */
        if (section.id !== sectionId){
            // Unselected menu sections are hidden
            section.classList.add('hidden');
        }
        else {
            // Selected menu sections are visible
            section.classList.remove('hidden');
        }
    }
}

/** Make main menu section visible */
function makeFrontPageVisible() {
    showSection(menuSection.frontpage);
}

/** Make how to play section visible */
function makeRulesVisible() {
    showSection(menuSection.instructions);
}

/** Make difficulty select section visible */
function selectDifficulty() {
    showSection(menuSection.modeSelection);
    // show difficulty select buttons visible
    makeVisible('difficulty-section');
    makeVisible('difficulty-title');
}

 /** make section visible using id */
function makeVisible(id){
    document.getElementById(id).classList.remove("hidden")
}

/** make section Invisible using id */
function makeInvisible(id){
    document.getElementById(id).classList.add("hidden")
}

 /** make menu section visible using id */
function returnToMenu(){
    // make menu visible
    makeVisible('front-page')
    // hide game screen
    makeInvisible('game-screen');
    makeInvisible('instructions');
    makeInvisible('difficulty-title');
    // restart all gameboards
    restart();
}

// gameplay
/** https://www.geeksforgeeks.org/read-json-file-using-javascript/ Fetch API locates data */
fetch("./data/cards.json")
  // promise chain
  // parse the data in JSON format
  .then((res) => res.json())
  // initialise cards array
  .then((data) => {
    // spread every value into cards array twice 
    cards = [...data, ...data];
    // shuffle and generate cards
    shuffle(cards);
    addCards();
    addCards2();
    addCards3();
    });

// gameplay functions
/** Add cards function for first board */
function addCards() {
    // Loop over cards 
    for (let card of cards) {
      // create card container and add a class 
      const cardElement = document.createElement("div");
      cardElement.classList.add("card-inner");
      // Make it equal to a name value set in the JSON file
      cardElement.setAttribute("data-name", card.name);
      // Inner structure of card container 
      // Template literals to set card image value to front of card
      cardElement.innerHTML = `
        <div class="card-front">
          <img class="front-image" src=${card.image}>
        </div>
        <div class="card-back"></div>
      `;
      // append gameboard to board1 and append cards to gameboard 
      board1.appendChild(gameboard)
      gameboard.appendChild(cardElement);
      // add event listener to flip card elements
      cardElement.addEventListener("click", flipCard);
    }
}

/** Add cards function for second board */
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
      // append gameboard2 to board2 and append cards to gameboard2
      board2.appendChild(gameboard2)
      gameboard2.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    }
}

/** Add cards function for third board */
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
      // append gameboard3 to board3 and append cards to gameboard3
      board3.appendChild(gameboard3)
      gameboard3.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    }
}
/** Fisher-Yates shuffle algorithm https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/ */
function shuffle(array) {
    // Declare variables
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // Loop through array back to front
    while (currentIndex !== 0) {
      // Pick random index
      randomIndex = Math.floor(Math.random() * currentIndex);
      // Decrease current index 
      currentIndex = currentIndex - 1;
      // Swap items
      // Store temporary value
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  /** Flip cards on first and second move */
function flipCard() {
    // If flipped is equal to false nothing will execute
    if (flipped) return;
    // If first move is already defined return as first move 
    if (this === firstMove) return;
  
    this.classList.add("flip");
    // If first move is not defined this will be the first move
    if (!firstMove) {
      firstMove = this;
      return;
    }
    // Otherwise it's the second move 
    secondMove = this;
    // Set flipped to true so no other comparisons can be executed
    flipped = true;
    // Check if match
    cardMatch();
}

/** Determine whether cards have or have not matched */
function cardMatch() {
    // Define variable equal to first and second move being the same card 
    let isMatch = firstMove.dataset.name === secondMove.dataset.name;
    // If the the variable is false unflip cards
    if (!isMatch){
        unflipCards();
    }
    // Else freeze them in place 
    else {
        freezeCards();
    }
}
 
/** Freeze first and second move cards in place */
function freezeCards() {
    // Remove abilty to flip card cards
    firstMove.removeEventListener("click", flipCard);
    secondMove.removeEventListener("click", flipCard);
    // end turn
    reset();
}

/** Unflip first and second move cards */
function unflipCards() {
    setTimeout(() => {
      // Unlfip both cards
      firstMove.classList.remove("flip");
      secondMove.classList.remove("flip");
      // end turn 
      reset();
    }, 1000);
}

/** Add cards function for third board */
function reset(){
    firstMove = null;
    secondMove = null;
    flipped = false;
}

/** Add cards function for third board */
function restart(){
    restartEasy();
    restartMedium();
    restartHard();
}

// easy gameplay functions
easyDifficulty.addEventListener("click", function () {
    difficulty = "easy";
    createEasyBoard();
})

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
    makeInvisible('difficulty-title');
}

function restartEasy(){
    easyCountdown.innerHTML = 15
    easyTime = 15
    let gameboard = document.getElementById("game-board");
    gameboard.innerHTML = "";
    addCards();
    shuffle(cards); 
}
/**  */
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

// medium gameplay functions
mediumDifficulty .addEventListener("click", function () {
    difficulty = "medium";
    createMediumBoard();
})

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
    makeInvisible('difficulty-title');
}

function restartMedium(){
    mediumCountdown.innerHTML = 10
    mediumTime = 10
    let gameboard2 = document.getElementById("game-board2");
    gameboard2.innerHTML = "";
    addCards2();
    shuffle(cards);
}
/**  */
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

// hard gameplay functions
hardDifficulty.addEventListener("click", function () {
    difficulty = "hard";
    createHardBoard();
})

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
    makeInvisible('difficulty-title');
}

function restartHard(){
    hardCountdown.innerHTML = 5
    hardTime = 5
    let gameboard3 = document.getElementById("game-board3");
    gameboard3.innerHTML = "";
    addCards3();
    shuffle(cards);
     
}
/**  */
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






