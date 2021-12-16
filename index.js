//imports
const path = require('path');
let knex = require("knex")({
    client: "sqlite3",
    connection:{
        filename:"starcitizen.db"
    },
    useNullAsDefault: true
});


//deconstruct imports
const { app, BrowserWindow, Menu, ipcMain } = require('electron');

//variables for windows
let coverWindow;
let mainWindow;
let addWindow;
let updateWindow;



//CREATE WINDOWS

//function to create main window
function createWindow() {
  mainWindow = new BrowserWindow({
	width: 1680,
	height: 930,
  show: false,
  title: "Star Citzen Hangar - Welcome ",
  icon: path.resolve("images/SC.jpg"),
  webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('mainwindow.html');

  mainWindow.once('ready-to-show', () => {
    readDB()
    mainWindow.show()
  })
  
  mainWindow.on('closed', function() {
    app.quit();
  });

  let menu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(menu)

}//end createWindow

//function to create window for Adding
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    icon: path.resolve("images/SC.jpg"),
    autoHideMenuBar: true,
    title: 'Add Item',
    webPreferences: {
      nodeIntegration: true
    }
  });

  addWindow.loadFile('addwindow.html');
	addWindow.on('close', function() {
		addWindow = null;
	})
}

//end createAddWindow

//function to create update window
function createUpdateWindow(){
  updateWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    show: false,
    icon: path.resolve("images/SC.jpg"),
	autoHideMenuBar: true,
    title: 'Update Wine',
    webPreferences: {
      nodeIntegration: true
    },
  })

  updateWindow.once('ready-to-show', () => {
    updateWindow.show()
  })

  updateWindow.loadFile('updateWindow.html')

  updateWindow.on('close', function() {
    updateWindow = null;
  })

}


function createCoverWindow() {
   coverWindow = new BrowserWindow({
    width: 1680,
    height: 930,
    title: 'Star Citizen Hangar',
    icon: path.resolve("images/SC.jpg"),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    },
  })

  coverWindow.loadFile('cover.html');

  coverWindow.on('close', function() {
    coverWindow = null;
  })
}

// enter main page
ipcMain.on('create', function(e) {
  createWindow()
  coverWindow.close()
})

// Add New Ship
ipcMain.on('addShip', function(e) {
  createAddWindow()
})

// Edit Ship
ipcMain.on('editShip', function(e,id) {
  createUpdateWindow()
})

//Create
ipcMain.on('item:add', function(e, itemInfo) {
  knex("ships").insert({
	  name: itemInfo[0],
	  role: itemInfo[1],
	  size: itemInfo[2],
    hp: itemInfo[3],
    dimensions: itemInfo[4],
    mass: itemInfo[5],
    speed: itemInfo[6],
    ab_speed: itemInfo[7],
    pitch: itemInfo[8],
    yaw: itemInfo[9],
    roll: itemInfo[10],
    hydrogen_cap: itemInfo[11],
    qt_fuel_cap: itemInfo[12],
    cargo_grid: itemInfo[13],
    weapon_id: itemInfo[14],
    quant_id: itemInfo[15],
    shield_id: itemInfo[16],
    ship_url: itemInfo[17],
	  })
  .catch(err =>{
    console.log(err)
  })
  .then(() =>{
    readDB();
  })
  addWindow.close();
});

//Read
function readDB()
{
  clearWindow()
  let result = knex.select("id","name","role","size","hp","dimensions","mass","speed", "ab_speed", "pitch", "yaw", "roll", "hydrogen_cap", "qt_fuel_cap", "cargo_grid", "weapon_id", "quant_id", "shield_id", "ship_url").from("ships")
  .catch(err =>{
    console.log(err)
  })
  result.then(function(rows){
      mainWindow.webContents.send('item:add',rows);
  })
}


//Search
ipcMain.on('item:search', function(e,id)
{
  let result = knex.select("id","name","role","size","hp","dimensions","mass","speed", "ab_speed", "pitch", "yaw", "roll", "hydrogen_cap", "qt_fuel_cap", "cargo_grid", "weapon_id", "quant_id", "shield_id", "ship_url").from("ships").where('id',id)
  .catch(err =>{
    console.log(err)
  })
  result.then(function(rows){
	  updateWindow.webContents.send('item:found',rows);
  })
})


//Update
ipcMain.on('item:update', function(e,itemInfo)
{  
  let id = itemInfo[0] //undefined
  knex("ships").where({id: id}).update({
    name: itemInfo[1],
	  role: itemInfo[2],
	  size: itemInfo[3],
    hp: itemInfo[4],
    dimensions: itemInfo[5],
    mass: itemInfo[6],
    speed: itemInfo[7],
    ab_speed: itemInfo[8],
    pitch: itemInfo[9],
    yaw: itemInfo[10],
    roll: itemInfo[11],
    hydrogen_cap: itemInfo[12],
    qt_fuel_cap: itemInfo[13],
    cargo_grid: itemInfo[14],
    weapon_id: itemInfo[15],
    quant_id: itemInfo[16],
    shield_id: itemInfo[17],
    ship_url: itemInfo[18],
	  })

  .catch(err =>{
    console.log(err)
  })
  .then(() =>{
	readDB();
  })
	  updateWindow.close();
	  console.log(id +": Updated"); 
	  });

 
//Delete
ipcMain.on('item:delete', function(e, id){
  knex('ships').where({"id" : id}).del()
  .catch(err =>{
    console.log(err)
  })
  .then(() =>{ 
    console.log(id +": deleted");
	readDB();
  })
});

//Clear
function clearWindow()
{
    mainWindow.webContents.send('item:clear');
}//end function clearWindow


//Menu Template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Create',
        click() {createAddWindow()}
      },
	  {
        label: 'Update',
        click(){createUpdateWindow()}
      },
	  {
        label: 'Quit',
        click(){app.quit()}
      }
    ]
  }
];

app.on('ready', createCoverWindow)
