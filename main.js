const { app, BrowserWindow, Menu, MenuItem, ipcMain} = require('electron');

let win;

// Below code removes commented warning:
// Electron Security Warning (Insecure Content-Security-Policy) This renderer process has either no Content Security
// Policy set or a policy with "unsafe-eval" enabled. This exposes users of this app to unnecessary security risks.
// For more information and help, consult https://electronjs.org/docs/tutorial/security. This warning will not show up once the app is packaged.
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow()
{
  win = new BrowserWindow({
    width: 1100,
    height: 800,
    backgroundColor: '#ffffff',
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });

  win.loadURL(`file://${__dirname}/dist/configuration-app/index.html`);

  // Uncomment to debug.
  win.webContents.openDevTools();

  win.on('closed', () =>
  {
    win = null
  });

  // This event will be fired when all of the renderer's component and service constructors have ran - when the renderer (browser) is ready
  win.webContents.once('did-finish-load',() =>
  {
    win.webContents.send('browser-ready-signal', 'sending browser-ready-signal from the backend process to browser component/service');
  });

  setupContextMenu();
}

function addContextMenuItem(contextMenu, labelText)
{
  contextMenu.append(new MenuItem(
  {
    label: labelText,
    click: () =>
    {
      win.webContents.send('context-menu-command',labelText);
    }
  }));
  contextMenu.append(new MenuItem({ type: 'separator' }));
}

function setupContextMenu()
{
  const contextMenu = new Menu();

  addContextMenuItem(contextMenu, "Add Configuration");
  addContextMenuItem(contextMenu, "Edit Configuration");
  addContextMenuItem(contextMenu, "Clone Configuration");
  addContextMenuItem(contextMenu, "Delete Configuration");
  addContextMenuItem(contextMenu, "Refresh Configurations");

  win.webContents.on('context-menu', () =>
  {
    contextMenu.popup(win)
  })
}

app.on('ready', createWindow);

// This listener is invoked only the next time a message is sent to channel, after which it is removed.
app.once('window-all-closed', () =>
{
  if(process.platform !== 'darwin')
  {
    app.quit();
  }
});

app.on('activate', () =>
{
  if(win == null)
  {
    createWindow();
  }
});

// Below code show you how to receive messages from the browser/renderer.
ipcMain.on('command-signal', (event, command) =>
{
  if(command)
  {
    console.log(`Received ${command} from renderer/browser.`);
    switch (command)
    {
      case "close-app-command":
        app.quit();
        break;
      case "minimize-app-command":
        win.minimize();
        break;
    }
  }
});


