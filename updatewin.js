const {ipcRenderer} = require('electron')


// Submit buttons
const searchButton = document.getElementById("searchButton");
const updateButton = document.getElementById("updateButton");

// Button event listeners
searchButton.addEventListener('click', searchShip);
updateButton.addEventListener('click', updateShip);

// Search Ships
function searchShip(){
	var sID = parseInt(document.getElementById("ship_id_search").value);
	ipcRenderer.send('item:search', sID) //call to index.js
}

// Update Ship - send to main.js
function updateShip(){
        let itemInfo = [];
		
		itemInfo.push(document.getElementById('ship_id_found').value); 	
		itemInfo.push(document.getElementById('ship_name').value); 
		itemInfo.push(document.getElementById('ship_role').value); 
		itemInfo.push(document.getElementById('ship_size').value); 
		itemInfo.push(document.getElementById('ship_hp').value); 
		itemInfo.push(document.getElementById('ship_dimensions').value); 
		itemInfo.push(document.getElementById('ship_mass').value); 
		itemInfo.push(document.getElementById('ship_speed').value); 
		itemInfo.push(document.getElementById('ship_ab_speed').value); 
		itemInfo.push(document.getElementById('ship_pitch').value); 
		itemInfo.push(document.getElementById('ship_yaw').value); 
		itemInfo.push(document.getElementById('ship_roll').value); 
		itemInfo.push(document.getElementById('ship_hydrogen_cap').value); 
		itemInfo.push(document.getElementById('ship_qt_fuel_cap').value); 
		itemInfo.push(document.getElementById('ship_cargo_grid').value); 
		itemInfo.push(document.getElementById('ship_weapon_id').value); 
		itemInfo.push(document.getElementById('ship_quant_id').value); 
		itemInfo.push(document.getElementById('ship_shield_id').value); 
		itemInfo.push(document.getElementById('ship_ship_url').value); 
		
		ipcRenderer.send('item:update', itemInfo);
}

//Received from main.js
ipcRenderer.on('item:found', (event, rows) => {
	rows.forEach(function(row){
		
		document.getElementById('ship_id_found').value = row.id; 	
		document.getElementById('ship_name').value = row.name; 
		document.getElementById('ship_role').value = row.role; 
		document.getElementById('ship_size').value = row.size; 
		document.getElementById('ship_hp').value = row.hp; 
		document.getElementById('ship_dimensions').value = row.dimensions; 
		document.getElementById('ship_mass').value = row.mass; 
		document.getElementById('ship_speed').value = row.speed; 
		document.getElementById('ship_ab_speed').value = row.ab_speed; 
		document.getElementById('ship_pitch').value = row.pitch; 
		document.getElementById('ship_yaw').value = row.yaw; 
		document.getElementById('ship_roll').value = row.roll; 
		document.getElementById('ship_hydrogen_cap').value = row.hydrogen_cap; 
		document.getElementById('ship_qt_fuel_cap').value = row.qt_fuel_cap; 
		document.getElementById('ship_cargo_grid').value = row.cargo_grid; 
		document.getElementById('ship_weapon_id').value = row.weapon_id; 
		document.getElementById('ship_quant_id').value = row.quant_id; 
		document.getElementById('ship_shield_id').value = row.shield_id; 
		document.getElementById('ship_ship_url').value = row.ship_url;
	})
})



