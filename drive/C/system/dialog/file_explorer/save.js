const { ipcRenderer } = require("electron");
let selectedFolder = "drive/C/";

// Load Root Treeview
window.onload = () => {
  loadFolderTree("drive");
  selectFolder(selectedFolder); // Default folder
};

// Function Untuk Load Folder Tree Recursive
async function loadFolderTree(folderPath, parentElement = null) {
  const result = await ipcRenderer.invoke("FileExplorer", {
    method: "readFolder",
    folderPath
  });

  if (result.status !== "success") return;

  const ul = document.createElement("ul");
  result.data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = "📁 " + item;

    const itemPath = `${folderPath}/${item}`;

    // Folder Klik → Expand/Collapse & Select
    li.onclick = async (e) => {
      e.stopPropagation();
      if (li.classList.contains("expanded")) {
        li.classList.remove("expanded");
        li.querySelector("ul")?.remove();
      } else {
        li.classList.add("expanded");
        await loadFolderTree(itemPath, li);
      }

      selectFolder(itemPath);
    };

    ul.appendChild(li);
  });

  if (parentElement) {
    parentElement.appendChild(ul);
  } else {
    const treeRoot = document.getElementById("folder-tree");
    treeRoot.innerHTML = "";
    treeRoot.appendChild(ul);
  }
}

// Select Folder & Load File List
async function selectFolder(folderPath) {
  selectedFolder = folderPath;
  document.getElementById("current-path").textContent = "📁 Simpan di: " + folderPath;
  await loadFileList(folderPath);
}

// Load Isi Folder ke List View
async function loadFileList(folderPath) {
  const result = await ipcRenderer.invoke("FileExplorer", {
    method: "readFolder",
    folderPath
  });

  const fileList = document.getElementById("file-list");
  fileList.innerHTML = "";

  if (result.status === "success") {
    result.data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      fileList.appendChild(li);
    });
  } else {
    fileList.innerHTML = "<li>Gagal memuat isi folder</li>";
  }
}

// Save File Function tetap sama
// cancelDialog() tetap sama
