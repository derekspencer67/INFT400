const {ipcRenderer} = require('electron')


// Submit button
const deleteButton = document.getElementById("deleteButton");

// Button event listeners
deleteButton.addEventListener('click', deleteShip);


// Delete Ship
function deleteShip(){
	var sID = parseInt(document.getElementById("id").value);
	ipcRenderer.send('item:delete', sID) //call to index.js
	
}
