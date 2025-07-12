let display = document.getElementById("clock")

function updateClock(){
    let time = new Date();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    let second = time.getSeconds();

    hour = hour < 10 ?"0" + hour : hour;
    minutes = minutes < 10 ?"0" + minutes : minutes;
    second = second < 10 ?"0" + second : second;

    display.textContent = `${hour} : ${minutes} : ${second}`;

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[time.getDay()];
    const date = time.getDate().toString().padStart(2, '0');
    const month = (time.getMonth() + 1).toString().padStart(2, '0');
    const year = time.getFullYear();
    document.getElementById('date').textContent = `${dayName}, ${date}/${month}/${year}`;
}
updateClock();

setInterval(updateClock, 500);