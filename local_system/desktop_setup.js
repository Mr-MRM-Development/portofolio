const { ipcRenderer } = require("electron");

//  Setup Desktop

const desktop = document.getElementById("desktop");
const taskbar = document.getElementById("taskbar");

// Setup Wallpaper
// Path Wallpaper
const wallpaperPath = "drive/C/system/desktop/wallpaper.png";

// Pasang Wallpaper
document.addEventListener("DOMContentLoaded", () => {
    loadWallpaper();
})

function loadWallpaper() {
     desktop.style.backgroundImage = `url(${wallpaperPath})`;
}

setInterval(loadWallpaper, 3000)
loadWallpaper();

// Setup Wallpaper Selesai


// fungsi taskbar
// load Item dari data user
async function loadTaskbarShorcuts() {
    const result = await ipcRenderer.invoke("FileExplorer",{
        method: "readFile",
        folderPath: "drive/C/users",
        fileName: "shortcut_data.json"
    });

    if (result.status === "success"){
        try{
            const data = JSON.parse(result.content);
            taskbar.innerHTML = "";

            Object.entries(data).forEach(([appName,appData])=>{
                const button = document.createElement("button");
                button.className = "shortcut";
                    button.title = appName;
                    button.dataset.app = appData.appPath
                
                const img = document.createElement("img")
                    img.src = appData.iconPath

                button.appendChild(img);
                taskbar.appendChild(button);
            }
        )
        }catch(error){
            alert("error memuat")
        }
    }else{
        alert("error mengidentifikasi")
    }
}

loadTaskbarShorcuts()

// Fungsi Untuk Membuka Aplikasi
// Fungsi untuk membuat appcontainer

taskbar.addEventListener("click", (e)=>{
    let shortcut = e.target.closest(".shortcut");

    if(shortcut){
        const appPath = shortcut.dataset.app;
        ipcRenderer.invoke("open-app-window", appPath);
    }
})