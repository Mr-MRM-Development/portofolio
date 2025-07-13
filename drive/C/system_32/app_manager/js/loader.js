
function loader () {
    appBox.innerHTML = "";
    const data = JSON.parse(jsonData);

    Object.entries(data).forEach(([appName, appData])=>{
        appBox.innerHTML += `
        <button title="${appName}" 
            class="app-button" 
            data-name="${appName}"
            data-icon="${appData.iconPath}" 
            data-app="${appData.appPath}"
        >
            <img src="../../../../${appData.iconPath}">
        </button>`;
    });
}
