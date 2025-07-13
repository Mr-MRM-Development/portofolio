document.getElementById("path-form").addEventListener("submit", ()=>{
    const appPath = document.getElementById("path-url").value;
    ipcRenderer.invoke("open-app-window", appPath);
})