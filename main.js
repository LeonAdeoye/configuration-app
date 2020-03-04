const { app, BrowserWindow, Menu} = require('electron')
const contextMenu = require('electron-context-menu');

let win;

// Below code removes commented warning:
// Electron Security Warning (Insecure Content-Security-Policy) This renderer process has either no Content Security
// Policy set or a policy with "unsafe-eval" enabled. This exposes users of this app to unnecessary security risks.
// For more information and help, consult https://electronjs.org/docs/tutorial/security. This warning will not show up once the app is packaged.
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow()
{
  win = new BrowserWindow({
    width: 800,
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

// TODO: Use this listener if you want send a message from the renderer to the back-end.
// ipcMain.on('my-custom-signal', (event, arg) =>
// {
//   console.log("event: " + event);
//   console.log("arg: " + JSON.stringify(arg));
// });

contextMenu({
  prepend: () =>
  [
    {
      label: 'Add new configuration',
      click: () =>
      {
        win.webContents.send('context-menu-signal','add-configuration');
      }
    },
    {
      label: 'Clone existing configuration',
      click: () =>
      {
        win.webContents.send('context-menu-signal','clone-configuration');
      }
    },
    {
      label: 'Delete existing configuration',
      click: () =>
      {
        win.webContents.send('context-menu-signal','delete-configuration');
      }
    },
  ]
});

