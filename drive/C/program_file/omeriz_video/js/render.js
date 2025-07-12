const {ipcRenderer} = require("electron");

function dialog () {
    ipcRenderer.send("dialog", {
        method: "showMessage",
        icon: "error",
        title: "main",
        message: "Gagal Memuat Sistem"
    })
}

dialog();