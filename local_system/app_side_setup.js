const appSidebar = document.querySelector(".app-sidebar");

function hide_app_sidebar() {
    appSidebar.classList.add("hide");
}

function open_app_sidebar() {
    appSidebar.classList.remove("hide");
}