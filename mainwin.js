
      const electron = require('electron');
      const {ipcRenderer} = electron;
      const ul = document.querySelector('ul');

    

    
      //catch add item
      ipcRenderer.on('item:add', function(e,items){//items is an ARRAY of objects
        items.forEach(function(item){//item is one element/object of the Array
          const li = document.createElement('li');
          const img = document.createElement('img');
          const link = document.createElement('a');
          const edit = document.createElement('button');
          const deleteBtn = document.createElement('button');
          deleteBtn.id = "new";
          deleteBtn.innerHTML = "Delete";
          deleteBtn.addEventListener('click', () => {
            if(window.confirm("Are you sure you want to delete this ship?")){
              deleteShip(item.id)
            }})
          edit.id = "new";
          edit.innerHTML = "Edit"
          edit.addEventListener("click", () => {editShip(item.id)})
          const itemText = document.createTextNode("Name: "+item.name + " | Role: "+item.role +" | Size: "+item.size +" | Hull HP: "+item.hp +" | Mass: "+item.mass +" | Speed: "+item.speed+"   ");
          img.src = item.ship_url;
          img.style = "max-width:20%;";
          link.innerHTML = "Link to Wiki";
          link.href = "https://starcitizen.tools/" +item.name;
          link.target = "_blank";
          link.style = "margin-left:20px;background-color:rgb(89,109,109);color:white;padding:8px 18px;text-align:center;text-decoration:none;display:inline-block;border-radius:10px;";
          li.style = "display:flex;margin-bottom:10px;align-items:center;";
          li.appendChild(img);
          li.appendChild(itemText);
          ul.appendChild(li);
          li.appendChild(link);
          li.appendChild(edit);
          li.appendChild(deleteBtn);
      
        })
      });
     
      //clear
      ipcRenderer.on('item:clear', function(){
        ul.innerHTML = '';
      });

      // Submit button
      const enterButton = document.getElementById("addShip");

      // Button event listeners
      enterButton.addEventListener('click', () => {
          addShip()
      });

      function addShip() {
          ipcRenderer.send('addShip')
      }

      function editShip(id) {
        ipcRenderer.send('editShip',id);
      }

      function deleteShip(id){
        var sID = id;
        ipcRenderer.send('item:delete', sID) //call to index.js
        
      }


      

