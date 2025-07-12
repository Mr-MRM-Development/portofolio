const video = document.getElementById("video-player");
const url = document.getElementById("url");
const range = document.getElementById("range");

function open_file() {
    url.click();
};

url.addEventListener("change", ()=>{
    const file = url.files[0];
    if(file){
        let src = URL.createObjectURL(file);
        video.src = src;

        video.play();
        document.querySelector("head").title = `Nest Video :${src}`;
    }
});

function system(option) {
    if (option === "play") {
        video.play();
    }else if(option === "pause"){
        video.pause();
    }else if(option === "stop"){
        video.pause();
        video.currentTime = 0;
    }
};

video.addEventListener("loadedmetadata",() => {
    range.max = video.duration;
})

video.addEventListener("timeupdate", () => {
    range.value = video.currentTime;
})

range.addEventListener("input",() => {
    video.currentTime = range.value;
})

const volumeInput = document.getElementById("volume")

volumeInput.addEventListener("input",()=>{
    video.volume = volumeInput.value / 100;
});