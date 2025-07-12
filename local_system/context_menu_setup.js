
let contextMenu = document.getElementById("context-menu");


async function loadMenuContent() {
    const result = await ipcRenderer.invoke("FileExplorer", {
        method: "readFile",
        folderPath: "drive/C/users",
        fileName: "context_menu.json"
    });
    
    if (result.status === "success") {
        try {
            const data = JSON.parse(result.content);
            
            contextMenu.innerHTML = ""
            
            Object.entries(data).forEach(([menuName ,menuData])=>{
                // let buttonContent = menuData.menuContent;
                // let buttonFunction = menuData.menuFunction;
                
                let button = `<button title="${menuName}" onclick="${menuData.function}">${menuData.title}</button>`;
                
                contextMenu.innerHTML += button;
            });
        } catch (error) {
            alert("Error Loading Data Menu :" + error)
        }
    } else {
        alert("Error Loading System :" + result.messages)
    }
}

loadMenuContent();