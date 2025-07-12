const {ipcRenderer} = require("electron");

const form = document.querySelector("form");
let appName = document.getElementById("app-name");
let appPath = document.getElementById("app-path");
let appIcon = document.getElementById("icon-path");


form.addEventListener("submit" , async ()=>{
    alert(appName.value)
    const result = await ipcRenderer.invoke("FileExplorer",{
        method: "readFile",
        folderPath: "drive/C/users",
        fileName: "shortcut_setup_data.json"
    });
    let data = {};
    if (result.status === "success"){
        try{
            alert("readfile success");
            data = JSON.parse(result.content);
        }catch(error){
            console.error(error)
            alert("redfile error");
        }
    }
    data[appName.value] = {
        appPath: appPath.value,
        iconPath: appIcon.value
    }
    const readFiler = await ipcRenderer.invoke("FileExplorer",{
        method: "writeFile",
        folderPath: "drive/C/users",
        fileName: "shortcut_setup_data.json",
        fileContent: JSON.stringify(data, null, 2)
        // fileContent: "Berhasil Di Tambahkan"
    });
    if (readFiler.status === "success"){
        alert("savefile success")
    }else{
        alert("error Savefile")
    }
});