const ContextMenu = document.getElementById("context-menu");

desktop.addEventListener("contextmenu", (e)=>{
    e.preventDefault();
    showContextMenu(e.pageX, e.pageY);
})

document.addEventListener("click",hideContextMenu)

function showContextMenu(x, y) {
    ContextMenu.classList.remove("hide")
    ContextMenu.style.left = x + "px";
    ContextMenu.style.top  = y + "px";
}
function hideContextMenu() {
    ContextMenu.classList.add("hide")
}

function menu(option){
    switch (option) {
        case "refresh":
            location.reload();
            break;
    
        default:
            alert(option + "Fungsi Tidak Ada Di System")
            break;
    }
}