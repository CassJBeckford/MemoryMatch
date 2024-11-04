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
