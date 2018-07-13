const electron = require('electron');

const ipc = electron.ipcRenderer;

document.getElementById('start').addEventListener('click', _ => {
    ipc.send('countdown-start'); // We are sending an event to let the main app that timer has started;
})

ipc.on('countdown', (evt, count) => {
    document.getElementById('count').innerHTML = count; // This is coming from the tick function that we are calling in countdown.js;
})