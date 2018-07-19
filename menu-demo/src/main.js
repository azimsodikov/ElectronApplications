const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu; // Menu module gives us access to the menu items and we can change it as our needs;

app.on('ready', _ => {
    new BrowserWindow();
    const name = electron.app.getName();
    const template = [
        {
            label: name, // We can access the application name from the package json, and that would be displayed in the menu on the top;
            submenu: [{ // This is the dropdown menu item, when you click the label;
                label: `About ${name}`,
                click: _ => {
                    console.log('clicked about');
                },
                role: 'about'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                click: _ => { app.quit() }, // It quits the app, when quit is clicked from the menu;
                accelerator: 'Cmd+Q'
            }]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

})
/**
 *  Menu module is great for customizing the app menu and it gives you access native, app-level api's to use;
 */