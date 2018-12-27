// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  // mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow = new BrowserWindow({ width: 720, height: 1279 });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  // mainWindow.loadURL('http://localhost:8080/#/test');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

ipcMain.on('resume', () => {
  mainWindow.loadFile('index.html');
});

// ipcMain.on('call-print', (event) => {
//   const printerInfo = mainWindow.webContents.getPrinters();
//   if (printerInfo.length === 0) {
//     console.log('尚未连接打印机!');
//   } else {
//     mainWindow.webContents.print({
//       silent: true,
//       printBackground: true,
//       deviceName: printerInfo[0].name,
//     }, (ret) => {
//       event.sender.send('print-result', ret);
//     });
//   }
// });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
