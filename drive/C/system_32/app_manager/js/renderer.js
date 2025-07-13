const { ipcRenderer } = require("electron");

async function renderingData () {
    try {
        // Fungsi Untuk Kirim Perintah Ke Core
        const result = await ipcRenderer.invoke("FileExplorer", {
            method: "readFile",
            folderPath: "drive/C/users",
            fileName: "shortcut_setup_data.json"
        });
        
        // Jika Data Ada
        if (result.status === "success"){
            jsonData = result.content;
            loader();
        };
    } catch (error) {
        alert("Error Karena :" + error);
        renderingData();
    };
}


renderingData();