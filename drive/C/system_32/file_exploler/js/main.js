const { ipcRenderer } = require("electron");
let currentFolder = "drive/C/";

window.onload = () => {
  loadFolderTree("drive");
  loadFileList(currentFolder);
};

// Recursive Folder Tree
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
    li.onclick = async (e) => {
      e.stopPropagation();
      if (li.classList.contains("expanded")) {
        li.classList.remove("expanded");
        li.querySelector("ul")?.remove();
      } else {
        li.classList.add("expanded");
        await loadFolderTree(itemPath, li);
      }

      currentFolder = itemPath;
      loadFileList(itemPath);
    };

    ul.appendChild(li);
  });

  if (parentElement) {
    parentElement.appendChild(ul);
  } else {
    document.getElementById("folder-tree").innerHTML = "";
    document.getElementById("folder-tree").appendChild(ul);
  }
}

// Load File List
async function loadFileList(folderPath) {
  const result = await ipcRenderer.invoke("FileExplorer", {
    method: "readFolder",
    folderPath
  });

  const fileList = document.getElementById("file-list");
  fileList.innerHTML = "";

  if (result.status === "success") {
    result.data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("file-item");
      div.innerHTML = `
        <span class="file-icon">${item.includes('.') ? '📄' : '📁'}</span>
        <span class="file-name">${item}</span>
      `;
      fileList.appendChild(div);
    });
  } else {
    fileList.innerHTML = "<p>Gagal memuat isi folder</p>";
  }
}

// Ubah View Mode
function changeViewMode() {
  const mode = document.getElementById("view-mode").value;
  document.getElementById("file-list").setAttribute("data-view", mode);
}

// Saat Load File List, Tambah Double Click
async function loadFileList(folderPath) {
  const result = await ipcRenderer.invoke("FileExplorer", {
    method: "readFolder",
    folderPath
  });

  const fileList = document.getElementById("file-list");
  fileList.innerHTML = "";

  if (result.status === "success") {
    result.data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("file-item");

      // Icon + Nama File/Folder
      const icon = item.includes('.') ? '📄' : '📁';
      const spanIcon = document.createElement("span");
      spanIcon.classList.add("file-icon");
      spanIcon.textContent = icon;

      const spanName = document.createElement("span");
      spanName.classList.add("file-name");
      spanName.textContent = item;

      // Auto Font Size & Ellipsis
      if (item.length <= 5) {
        spanName.classList.add("short");
      }

      div.appendChild(spanIcon);
      div.appendChild(spanName);

      // Double Click: Kalau Folder, Masuk
      div.ondblclick = () => {
        if (!item.includes('.')) {
          const newPath = `${folderPath}/${item}`;
          currentFolder = newPath;
          loadFileList(newPath);
        } else {
          alert("File dibuka: " + item);
        }
      };

      fileList.appendChild(div);
    });
  } else {
    fileList.innerHTML = "<p>Gagal memuat isi folder</p>";
  }
}
