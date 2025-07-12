// fungsi App Sidebar
const sidebarBox = document.getElementById("app-sidebar-box")
// load Item dari data user
async function loadTaskbarShorcuts() {
    const result = await ipcRenderer.invoke("FileExplorer",{
        method: "readFile",
        folderPath: "drive/C/users",
        fileName: "shortcut_setup_data.json"
    });

    if (result.status === "success"){
        try{
            const data = JSON.parse(result.content);
            sidebarBox.innerHTML = "";

            Object.entries(data).forEach(([appName,appData])=>{
                const button = document.createElement("button");
                button.className = "shortcut";
                    button.title = appName;
                    button.dataset.app = appData.appPath
                
                const img = document.createElement("img")
                    img.src = appData.iconPath

                button.appendChild(img);
                sidebarBox.appendChild(button);
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

sidebarBox.addEventListener("click", (e)=>{
    let shortcut = e.target.closest(".shortcut");

    if(shortcut){
        const appPath = shortcut.dataset.app;
        ipcRenderer.invoke("open-app-window", appPath);
    }
})