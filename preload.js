const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInIsolatedWorld("api", {
    kirimData: (choice) => ipcRenderer.send("type-choice-new", choice),
    TerimaData: (callback) => ipcRenderer.on("new-choice", (event, choice) => callback(choice))
})

window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type} -version, process`, versions[type])
    }
});
