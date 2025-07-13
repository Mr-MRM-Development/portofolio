async function deleteData () {
    if (window.confirm("sungguh Akan Menghapus Data :" + appNameInput.value)) {
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

                let dataJson = JSON.parse(jsonData);
                delete dataJson[appNameInput.value];

                const fileContent = JSON.stringify(dataJson, null, 2)

                const response = await ipcRenderer.invoke("FileExplorer",{
                    method: "writeFile",
                    folderPath: "drive/C/users",
                    fileName: "shortcut_setup_data.json",
                    fileContent: fileContent
                })
                if (response.status === "success"){
                    alert("Data Berhasil Di Hapus")
                }else{
                    alert("Gagal Menghapus Data Karena :" + response.message)
                    window.location.reload()
                }
            }else{
                alert("Error Karena :" + result.message);
            };
        } catch (error) {
            alert("Error Karena :" + error);
        };
    }else{
        
    }
}

function runApp() {
    ipcRenderer.invoke("open-app-window", appPathInput.value)
}