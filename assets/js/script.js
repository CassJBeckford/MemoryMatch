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

function createBoard(){
    let gameboard = document.getElementById("game-board");
    gameboard.innerHTML = "";
    for (let i = 0; i < 20; i++) {
        gameboard.innerHTML += 
        `<div class="card">
            <div class="card-inner">
                <div class="card-front">
                    <img src="img/card-back.png" alt="back" style="width:200px;height:300px;">
                </div>
                <div class="card-back">
                    <img src="img/card-front.jpg" alt="peach" style="width:200px;height:300px;">
                </div>
            </div>
        </div>` 
    }
    makeVisible('game-screen');
    makeInvisible('menu-section')
    makeInvisible('difficulty-selection');
}

