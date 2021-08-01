import { app, BrowserWindow, BrowserView } from "electron";

let mainWindow = Electron.BrowserWindow;
let website = "http://gabe.work";

function createWindow() {
    let win = new BrowserWindow({
        frame: false
    })
    win.on('closed', () => {
        win = null
    })

    let view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 0 })

    view.webContents.on('did-fail-load', (errorDescription) => {
        console.log("Failed to load:" + errorDescription);
        view.webContents.loadURL(website);
    })
    view.webContents.loadURL(website)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    app.quit();
});

app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});