const startSidebar = document.querySelector(".start-sidebar");

function hide_start_sidebar() {
    startSidebar.classList.add("hide");
}

function open_start_sidebar() {
    startSidebar.classList.remove("hide");
}
