const { ipcRenderer } = require("electron");

const textArea = document.getElementById("text-area");
const fileNameInput = document.getElementById("file-name");

async function saveFile() {
  const fileName = fileNameInput.value.trim();
  const fileContent = textArea.value;

  if (!fileName) {
    alert("Nama file harus diisi!");
    return;
  }

  const result = await ipcRenderer.invoke("FileExplorer", {
    method: "writeFile",
    folderPath: "drive/C/users/notepad_files",
    fileName,
    fileContent
  });

  if (result.status === "success") {
    alert("Berhasil menyimpan file!");
  } else {
    alert("Gagal menyimpan file: " + result.message);
  }
}

async function loadFile() {
  const fileName = fileNameInput.value.trim();

  if (!fileName) {
    alert("Nama file harus diisi!");
    return;
  }

  const result = await ipcRenderer.invoke("FileExplorer", {
    method: "readFile",
    folderPath: "drive/C/users/notepad_files",
    fileName
  });

  if (result.status === "success") {
    textArea.value = result.content;
    alert("File berhasil dibuka!");
  } else {
    alert("Gagal membuka file: " + result.message);
  }
}

ipcRenderer.invoke(
  "open-dialog-window",
  "drive/C/system/dialog/file_explorer",  // Path Folder Dialog
  "save.html"                             // Nama File Dialog
);