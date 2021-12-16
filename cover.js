const electron = require('electron');
const {ipcRenderer} = electron;


// Submit button
const enterButton = document.getElementById("new");

// Button event listeners
enterButton.addEventListener('click', () => {
    create()
});

function create() {
    ipcRenderer.send('create')
}






