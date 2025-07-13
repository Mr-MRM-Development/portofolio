const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path')
const fs = require('fs');
const sound = require("play-sound")({});
// const axios = require('axios');
// const cheerio = require('cheerio');
const { request } = require('http');
const { error } = require('console');
const { isUtf8 } = require('buffer');
const { type } = require('os');
const { title } = require('process');
let win;

function createWindow() {
  win = new BrowserWindow({
    height: 1200,
    width: 800,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
    title: 'My App',
  });

  win.setTitle('OMERIZ');
  // win.loadFile(path.join(__dirname, 'index.html'));
  win.loadFile(path.join(__dirname, 'sign_in.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Fungsi Untuk Menambahkan App-Container
ipcMain.handle("open-app-window", (event, appPath) => {
  const dirPath = appPath.substring(0, appPath.lastIndexOf('/'));
  let jsonData;
  try {
    const settingData = fs.readFileSync(dirPath + "/settings.json", 'Utf-8') || false;
    jsonData = JSON.parse(settingData) || null;
  } catch (no) {
    jsonData = {};
  }
  
  const childWin = new BrowserWindow({
    width: jsonData.width ?? 600,
    height: jsonData.height ?? 400,
    parent: win,
    modal: jsonData.modal ?? false,
    fullscreen: jsonData.fullscreen ?? false,
    hiddenInMissionControl: jsonData.hiddenInMissionControl ?? true,
    frame: jsonData.frame ?? true,
    icon: dirPath + "/icon.png",
    autoHideMenuBar: jsonData.autoHideMenuBar ?? true,
    resizable: jsonData.resizable ?? true,
    maximizable: jsonData.maximizable ?? true,
    minimizable: jsonData.minimizable ?? true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (appPath.startsWith('https://') || appPath.startsWith('http://') || appPath.startsWith("file://") || appPath.startsWith("localhost")) {
    childWin.loadURL(appPath);
  }else{
    childWin.loadFile(appPath);
  }
})

// Dialog Aplikasi
// Handler Buka Dialog Universal
ipcMain.handle("open-dialog-window", (event, folderPath, dialogHtml) => {
  const appPath = `${folderPath}/${dialogHtml}`;
  const dirPath = folderPath;

  const dialogWin = new BrowserWindow({
    width: 500,
    height: 350,
    parent: win,
    modal: true,
    frame: true,
    icon: dirPath + "/icon.png",  // Icon dari folder dialog
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  dialogWin.loadFile(appPath);
});

// Fungsi Untuk Child Windows Custom
ipcMain.handle("create-child-window", (event, system) => {
  const { folderPath, appPath, property = {}, webPreferences = {}, code} = system;

  const fullPath = `${folderPath}/${appPath}`;

  // Destructuring + Default Value (lebih clean)
  const {
    width = 200,
    height = 150,
    parent = win,
    modal = false,
    frame = true,
    icon = false,
    autoHideMenuBar = true,
    other = {}
  } = property;

  const {
    nodeIntegration = true,
    contextIsolation = false,
    PreferencesOther = {}
  } = webPreferences;

  const childWin = new BrowserWindow({
    width,
    height,
    parent,
    modal,
    frame,
    icon,
    autoHideMenuBar,
    ...other,  // Properti tambahan lain (opsional)
    webPreferences: {
      nodeIntegration,
      contextIsolation,
      ...PreferencesOther  // Properti tambahan di webPreferences
    }
  });
  if (code) {
    childWin.loadURL("data:text/html;charset=utf-8,"+ encodeURIComponent(code));
  }else{
    childWin.loadFile(fullPath);
  }
});


// Global System

// Dialog System
ipcMain.handle('dialog', (event, request) => {
  try {
    const {method, icon, title, message} = request;
    if (method === "showMessage") {
      dialog.showMessageBox({
        icon: icon,
        title: title,
        message: message
      })
    }
    
  } catch (error) {
    
  }
});

// File Exploler System
ipcMain.handle('FileExplorer', async (event, request) => {
  try {

    // Standart Variable OS
    const {
      method, 
      folderPath, 
      fileContent, 
      fileName, 
      folderTargetPath
    } = request;

    // Fungsi Jika Yang Di Pilih Fitur Read Folder
    if (method === 'readFolder') {
      const fullPath = path.join(__dirname, folderPath);
      const items = fs.readdirSync(fullPath);
      return{status: "success", data: items}
    }

    // Fungsi Jika Yang Di Pilih Make Folder
    else if (method === "makeFolder" || method === "mkDir") {
      const fullPath = path.join(__dirname, folderPath);
      fs.mkdirSync(fullPath, {recursive: true})
    }

    // Fungsi Jika Yang Di Pilih Fitur Read File
    else if(method === "readFile"){
      const fullPath = `${folderPath}/${fileName}`;

      try{
        if (fs.existsSync(fullPath)){
          const fileContent = fs.readFileSync(fullPath, 'Utf-8');
          return{status: "success", content: fileContent};
        }else{
          return{status: "error", message: "File Tidak Di Temukan"};
        }
      }catch (error) {
        return{status: "error", message: error.message}
      }
    }

    // Fungsi Jika Yang Di Pilih Fitur Write File
    else if (method === "writeFile") {
      const fullPath = `${folderPath}/${fileName}`

      if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath, {recursive: true});
      };

      fs.writeFileSync(fullPath, fileContent);
      return{status: "success"}
    }

    // Fungsi Delete File
    else if (method === "deleteFile" || method === "delFile") {
      const fullPath = folderPath + "/" + fileName;
      const trashPath = "drive/C/users/trash/" + fileName;
      const source = path.join(__dirname, fullPath);
      const destination = path.join(__dirname, trashPath);

      try {
        if (!fs.existsSync(path.dirname(destination))){
          fs.mkdirSync(path.dirname(destination),{recursive: true});
        }

        fs.renameSync(source, destination);

        return{status: "success", message: "Berhasil Di Hapus Ke Folder Trash"};
      } catch (error) {
        return{status: "error", message: error};
      }
    }

    // Fungsi Copy File
    else if (method === "copyFile") {
      const fullPath = folderPath + "/" + fileName;
      const fullTargetPath = folderTargetPath + "/" + fileName;
      const source = path.join(__dirname, fullPath);
      const targetPath = path.join(__dirname, fullTargetPath);

      try {
        if (!fs.existsSync(path.dirname(targetPath))){
          fs.mkdirSync(path.dirname(targetPath),{recursive: true});
        }

        fs.copyFileSync(source, targetPath);

        return{status: "success", message: "Berhasil Di Salin Ke Folder " + folderTargetPath};
      } catch (error) {
        return{status: "error", message: error};
      }
    }


    // Fungsi Jilka Permintaan Tidak Falid
    else{
      return{status: "error", message: "Metode Tidak Dikenali"};
    }
  }
  catch(error){
    console.error("File Exploler System Error", error);
    return{status: "error", message: error.message}
  }
});
// File Exploler System Selesai

// Terminal System
const currentPath = { path: "drive/" }; // Variabel global untuk path terminal

ipcMain.handle("TerminalExec", async (event, command) => {
  const args = command.trim().split(" ");
  const cmd = args[0];
  const fsPath = currentPath.path;

  if (cmd === "dir") {
    try {
      const items = fs.readdirSync(fsPath);
      return `Isi ${fsPath}:\n` + items.join("\n");
    } catch (err) {
      return `❌ Error: ${err.message}`;
    }
  }

  else if (cmd === "cd") {
    const target = args[1];
    if (!target) return "❌ Path harus diisi.";
    const newPath = path.join(fsPath, target);
    if (fs.existsSync(newPath) && fs.statSync(newPath).isDirectory()) {
      currentPath.path = newPath;
      return `Berhasil pindah ke ${currentPath.path}`;
    } else {
      return "❌ Folder tidak ditemukan.";
    }
  }

  else if (cmd === "mkdir") {
    const folderName = args[1];
    if (!folderName) return "❌ Nama folder harus diisi.";
    const newFolder = path.join(fsPath, folderName);
    try {
      fs.mkdirSync(newFolder, { recursive: true });
      return `📁 Folder '${folderName}' dibuat.`;
    } catch (err) {
      return `❌ Error: ${err.message}`;
    }
  }

  else if (cmd === "cls") {
    return "__CLEAR__";
  }

  else {
    return "Perintah tidak dikenali.";
  }
});

// Terminal System Selesai

// Process
// Start Process
ipcMain.handle("start",(event, request) => {
  const { method } = request;

  if (method === "shutdown"){
    app.quit();
  }
})

// Start Process Selesai


// Module
// module.exports = {readFile};