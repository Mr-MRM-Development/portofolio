appBox.addEventListener("click", (e)=>{
    let appData = e.target.closest(".app-button");

    if(appData){
        appPath = appData.dataset.app;
        appName = appData.dataset.name;
        iconPath = appData.dataset.icon;

        appNameInput.value = appName;
        appPathInput.value = appPath;
        iconPathInput.value = iconPath;
    }
})