const {app, Menu, Tray} = require('electron');
const path = require('path');
  

app.on('ready', () => {
    tray = new Tray(path.join('src', 'trayIcon.png')) // Tray is a event emitter that helps Add icons and context menus to the system's notification area.
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Wow', click: _ => console.log('wow')},
        {label: 'Awesome', click: _ => console.log('awesome')},
    ])

    tray.setContextMenu(contextMenu)
    tray.setToolTip('Shows the text when hover over!')
})
/**
 *  When you need your app to be available instantly use Tray module, it will be always visible, and always on;
 */

 

