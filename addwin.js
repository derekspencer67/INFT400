    const electron = require('electron')
    const {ipcRenderer} = electron
    const form = document.querySelector('form');
    form.addEventListener('submit', submitForm);

    function submitForm(e) {
            e.preventDefault();
            let itemInfo = [];
            itemInfo.push(document.querySelector('#name').value);
            itemInfo.push(document.querySelector('#role').value);
            itemInfo.push(document.querySelector('#size').value);
            itemInfo.push(document.querySelector('#hp').value);
            itemInfo.push(document.querySelector('#dimensions').value);
            itemInfo.push(document.querySelector('#mass').value);
            itemInfo.push(document.querySelector('#speed').value);
            itemInfo.push(document.querySelector('#ab_speed').value);
            itemInfo.push(document.querySelector('#pitch').value);
            itemInfo.push(document.querySelector('#yaw').value);
            itemInfo.push(document.querySelector('#roll').value);
            itemInfo.push(document.querySelector('#hydrogen_cap').value);
            itemInfo.push(document.querySelector('#qt_fuel_cap').value);
            itemInfo.push(document.querySelector('#cargo_grid').value);
            itemInfo.push(document.querySelector('#weapon_id').value);
            itemInfo.push(document.querySelector('#quant_id').value);
            itemInfo.push(document.querySelector('#shield_id').value);
            itemInfo.push(document.querySelector('#ship_url').value);
            ipcRenderer.send('item:add', itemInfo);
    }


   
 