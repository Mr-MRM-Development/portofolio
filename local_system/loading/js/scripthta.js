var box = document.getElementById("box");
var foot = document.getElementById("foot-box");
var footBar = document.getElementById("foot");
var title = document.getElementById("span");

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

setTimeout(animasiTablet, 500)
