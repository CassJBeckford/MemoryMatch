// initialise global variables

const board1 = document.getElementById("board1");
const gameboard = document.getElementById("game-board");
const easyDifficulty = document.getElementById("easy");
const mediumDifficulty = document.getElementById("medium");
const hardDifficulty = document.getElementById("hard");

const countdown = document.getElementById("time");
setInterval(updateCountdown, 1000);

let difficulty = "";
let counter = 15;
let score = 0;

let cards = [
  {
    image: "./assets/img/cheeky.png",
    name: "cheeky",
  },

  {
    image: "./assets/img/cheeky.png",
    name: "cheeky",
  },

  {
    image: "./assets/img/excited.png",
    name: "excited",
  },

  {
    image: "./assets/img/excited.png",
    name: "excited",
  },

  {
    image: "./assets/img/flirting.png",
    name: "flirting",
  },

  {
    image: "./assets/img/flirting.png",
    name: "flirting",
  },

  {
    image: "./assets/img/guilty.png",
    name: "guilty",
  },

  {
    image: "./assets/img/guilty.png",
    name: "guilty",
  },

  {
    image: "./assets/img/nervous.png",
    name: "nervous",
  },

  {
    image: "./assets/img/nervous.png",
    name: "nervous",
  },

  {
    image: "./assets/img/romantic.png",
    name: "romantic",
  },

  {
    image: "./assets/img/romantic.png",
    name: "romantic",
  },

  {
    image: "./assets/img/shocked.png",
    name: "shocked",
  },

  {
    image: "./assets/img/shocked.png",
    name: "shocked",
  },

  {
    image: "./assets/img/halo.png",
    name: "halo",
  },

  {
    image: "./assets/img/halo.png",
    name: "halo",
  },
];
let flipped = false;
let firstMove, secondMove;

// menu section Ids
const menuSection = {
  frontpage: "front-page",
  instructions: "instructions",
  modeSelection: "mode-selection",
};

// menu navigation
function showSection(sectionId) {
  // set variable equal to all menu sections
  let sections = document.getElementById("menu-section").children;
  for (let section of sections) {
    /** modified code from https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp */
    if (section.id !== sectionId) {
      // Unselected menu sections are hidden
      section.classList.add("hidden");
    } else {
      // Selected menu sections are visible
      section.classList.remove("hidden");
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
  makeVisible("difficulty-section");
  makeVisible("difficulty-title");
}

/** make section visible using id */
function makeVisible(id) {
  document.getElementById(id).classList.remove("hidden");
}

/** make section Invisible using id */
function makeInvisible(id) {
  document.getElementById(id).classList.add("hidden");
}

/** make menu section visible using id */
function returnToMenu() {
  // make menu visible
  makeFrontPageVisible();
  // hide game screen
  makeInvisible("game-screen");
  makeInvisible("instructions");
  makeInvisible("mode-selection");
  // restart all gameboards
  restart();
}

// gameplay

// gameplay functions
/** Add cards function for first board */
function addCards() {
  // Loop over cards
  for (let card of cards) {
    // create card container and add a class
    const cardElement = document.createElement("div");
    cardElement.classList.add("card-inner");
    // Make it equal to a name value set in the cards array
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
    gameboard.appendChild(cardElement);
    // add event listener to flip card elements
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
  // If flipped is equal to true nothing will execute
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
  if (!isMatch) {
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
  score++;
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

/** reset turn */
function reset() {
  // empty first and second move and set flipped back to false
  firstMove = null;
  secondMove = null;
  flipped = false;
}

/** Add cards function for third board */
function restart() {
  // restart all gameboards
  let gameboard = document.getElementById("game-board");
  gameboard.innerHTML = "";
  let time = document.getElementById("time");
  time.innerHTML = "";
  time.classList.remove("regular");
  time.classList.remove("medium");
  time.classList.remove("hard");
  score = 0;
  counter = 15;
}

function restartBoard() {
  // restart all gameboards
  restart();
  selectDifficulty();
}

/** Turn counter */
function updateCountdown() {
  // if a pair of cards unflip and the counter is larger than zero, count down once.
  if (flipped && counter > 0) {
    let seconds = counter;
    time.innerHTML = `${seconds}`;
    counter--;
  }
  // if counter reaches zero reset board
  else if (counter === 0) {
    time.innerHTML = "GAME OVER";
    setTimeout(() => {
      restartBoard();
    }, 700);
  }
  // if player reaches max score then display victory message
  else if (score === 8) {
    time.innerHTML = "COMPLETE!";
  }
  // else keep counting down
  else {
    time.innerHTML = counter;
  }
}

// easy gameplay functions
/** Add event listener to difficulty select button */
easyDifficulty.addEventListener("click", function () {
  createEasyBoard();
});

/** create easy gameboard */
function createEasyBoard() {
  // add and shuffle cards
  difficulty = "easy";
  shuffle(cards);
  addCards();
  counter = 15;
  let time = document.getElementById("time");
  time.classList.add("regular");
  time.innerHTML = 15;
  // make all easy gameboard components visible
  makeVisible("game-screen");
  makeVisible("game-board");
  // hide all medium and hard gameboard components
  makeInvisible("mode-selection");
}

// medium gameplay functions
/** Add event listener to difficulty select button */
mediumDifficulty.addEventListener("click", function () {
  createMediumBoard();
});

/** create medium gameboard */
function createMediumBoard() {
  // add and shuffle cards
  difficulty = "medium";
  shuffle(cards);
  addCards();
  counter = 10;
  let time = document.getElementById("time");
  time.classList.add("medium");
  time.innerHTML = 10;
  // make all easy gameboard components visible
  makeVisible("game-screen");
  makeVisible("game-board");
  // hide all medium and hard gameboard components
  makeInvisible("mode-selection");
}

// hard gameplay functions
/** Add event listener to difficulty select button */
hardDifficulty.addEventListener("click", function () {
  createHardBoard();
});

/** create hard gameboard */
function createHardBoard() {
  // add and shuffle cards
  difficulty = "hard";
  restart();
  shuffle(cards);
  addCards();
  counter = 5;
  let time = document.getElementById("time");
  time.classList.add("hard");
  time.innerHTML = 5;
  // make all easy gameboard components visible
  makeVisible("game-screen");
  makeVisible("game-board");
  // hide all medium and hard gameboard components
  makeInvisible("mode-selection");
}




