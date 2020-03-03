const { app, BrowserWindow} = require('electron')
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
  //win.webContents.openDevTools();

  win.on('closed', () =>
  {
    win = null
  });

  console.log("createWindow");
}

app.on('ready', createWindow)

app.on('window-all-closed', () =>
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

contextMenu({
  prepend: (params, browserWindow) => [
    {
      label: 'Add new configuration',
      click: (menuItem, browserWindow, event) =>
      {
        console.log("Adding new configuration")
      }
    },
    {
      label: 'Clone existing configuration',
      click: (menuItem, browserWindow, event) =>
      {
        console.log("Cloning existing configuration")
      }
    },
    {
      label: 'Delete existing configuration',
      click: (menuItem, browserWindow, event) =>
      {
        console.log("Deleting existing configuration")
      }
    },
  ]
});

