const { 
    app, 
    Tray, 
    Menu, 
    nativeImage, 
    clipboard,
    globalShortcut 
} = require('electron');


/**
 *  We can programatically control the clipboard control and customize it as much as we want but it does not emit change events, so we need to constantly
 *  ..pull the clipboard to make sure it is up to date with what we last copied;
 *  Also, one downside is Clipboard does not provide curser position outside the electron app;
 */


const STACK_SIZE = 5;
const ITEM_MAX_LENGTH = 20;

function formatItem(item) { // We are gonna format the string so when it has more than 20 char, we gonna substr it with ... dots;
    return item && item.length > ITEM_MAX_LENGTH
        ? item.substr(0, ITEM_MAX_LENGTH) + '...'
        : item;
}

function addToStack(item, stack) { // If stack has more than 5 items, we are gonna slice off the oldest part of the stack, otherwise we are gonna return the whole stack!
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1 ) : stack);
}

function formatMenuTemplateForStack(stack, clipboard) { // When copy is selected, it is gonna add to the menu item;
    return stack.map((item, i) => {
        return {
            label: `Copy: ${formatItem(item)}`,
            click: _ => clipboard.writeText(item), // When one of those copied items are clicked, we writes back that to the clipboard;
            accelerator: `Cmd+Alt+${i + 1}`
        }
    })
}

function checkClipboardForChange(clipboard, onChange) {
    let cache = clipboard.readText();
    let latest;
    setInterval(_ => {
        latest = clipboard.readText();
        if (latest !== cache) {
            cache = latest;
            onChange(cache);
        }
    }, 1000)
}

function registerShortcuts(globalShortcut, clipboard, stack) {
    globalShortcut.unregisterAll();
    for (let i = 0; i < STACK_SIZE.length; i++) {
        globalShortcut.register(`Cmd+Alt+${i + 1}`, _ => {
            clipboard.writeText(stak[i]);
        })
        
    }
}

let tray = null;
let image = nativeImage.createFromPath('./app.png');

app.on('ready', _ => {
    let stack = [];
    tray = new Tray(image);
    tray.setToolTip('This is my application');
    tray.setContextMenu(Menu.buildFromTemplate([{ label: '<Empty>', enabled: false }]));

    checkClipboardForChange(clipboard, text => { // We are faking the buffer by setInterval and check whether the clipboard has the new item every second;
        stack = addToStack(text, stack);
        tray.setContextMenu(Menu.buildFromTemplate(formatMenuTemplateForStack(stack, clipboard)));
        registerShortcuts(globalShortcut, clipboard, stack);
    })
    
});

app.on('will-quit', _ => {
    globalShortcut.unregisterAll();
})