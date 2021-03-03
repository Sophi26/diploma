const { app } = require('electron');
const { BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const { shell } = require('electron');

app.server = require(__dirname + '/server')();

let mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 960,
        // resizable: false,
        // fullscreenable: false
        // autoHideMenuBar: true
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    mainWindow.loadURL('http://127.0.0.1:8081/');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

ipcMain.on('open-editor', () => {
    shell.openExternal("https://designer.gravit.io/");
});