/**
 *  There are two different process is running behind the scene 'Main' for the logical part and 'Render' for presentation;
 *  Inter-process Communication = These above two processes should work together to coordinate the process thats called IPC;
 *  Each IPC that connects Main and Render, is a instance of node's event emitter;
 *  When Render emits the click event it will send start start function then in the main it process the function and resends the results to 
 *  ..to the Render process that will update the UI;
 */

const electron = require('electron');
const ipc = electron.ipcMain; // In the renderer we use ipcRenderer to send the event, here we use ipcMain to listen for that event;

const app = electron.app;
const BrowserWindow = electron.BrowserWindow; // Helps us to run our app on the browser/chromium;
const countdown = require('./countdown');
let mainWindow;

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        height: 800,
        width: 800
    });

    mainWindow.loadURL(`file://${__dirname}/countdown.html`); // We are loading the html file into our Browser instance;

    mainWindow.on('closed', _ => {
        console.log('closed');
        mainWindow = null; // We assign null to the BrowserWindow just to make sure it is collected by garbage collector, when we close the app;
    })
});

ipc.on('countdown-start', _ => {
    countdown(count => {
        mainWindow.webContents.send('countdown', count); // We are using Event emitter to send the event;
    });
});