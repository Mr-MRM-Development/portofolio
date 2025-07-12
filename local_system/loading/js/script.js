let box = document.querySelector(".box");
let foot = document.querySelector(".foot-box");
let footBar = document.querySelector(".foot");
let title = document.querySelector("h1 span");
let bar = document.querySelector(".bar");

let proces = 0;

function animasiTablet(){
    // Memberikan Class Tablet
    box.classList.add("tablet");
    foot.classList.add("tablet");
    footBar.classList.add("tablet");

    // Menghapus Class Selain Tablet
    box.classList.remove("desktop");
    foot.classList.remove("desktop");
    footBar.classList.remove("desktop");
    
    box.classList.remove("mobile");
    foot.classList.remove("mobile");
    footBar.classList.remove("mobile");

    // Menambahkan Titik
    title.textContent = ". .";
    
    setTimeout(animasiMobile, 500);
}

function animasiMobile(){
    // Memberikan Class Mobile
    box.classList.add("mobile");
    foot.classList.add("mobile");
    footBar.classList.add("mobile");
    
    // Menghapus Class Selain Mobile
    box.classList.remove("desktop");
    foot.classList.remove("desktop");
    footBar.classList.remove("desktop");
    
    box.classList.remove("tablet");
    foot.classList.remove("tablet");
    footBar.classList.remove("tablet");
    
    // Menambahkan Titik
    title.textContent = ". . .";
    
    setTimeout(animasiDesktop, 500);
}

function animasiDesktop(){
    // Memberikan Class Desktop
    box.classList.add("desktop"),
    foot.classList.add("desktop"),
    footBar.classList.add("desktop"),

    // Menghapus Class Selain Desktop
    box.classList.remove("tablet"),
    foot.classList.remove("tablet"),
    footBar.classList.remove("tablet"),
    
    box.classList.remove("mobile"),
    foot.classList.remove("mobile"),
    footBar.classList.remove("mobile"),
    
    // Menambahkan Titik
    title.textContent = ".";
    
    setTimeout(animasiTablet, 500)
}

function updateBar(){
    bar.style.width = proces + "%";
    if(proces >= 101){
        window.location = "on.html"
    }
}

function addProcess(){
    proces += 4;
}

setInterval(updateBar, 30)

setInterval(addProcess, 600)

setTimeout(animasiTablet, 500)
