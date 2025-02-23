let isRunning = false;
let elapsed = 0, startTime, endTime,interval;

function start(){
    if (!isRunning){
        startTime = Date.now() - elapsed;
        isRunning = true;
        interval = setInterval(update, 10);
    }
}

function stop(){
    clearInterval(interval);
    isRunning = false;
    elapsed = Date.now() - startTime;
    console.log(elapsed);
}

function reset(){
    clearInterval(interval);
    isRunning = false;
    elapsed = 0
    startTime= 0;
    document.getElementById('ms').textContent = '00';
    document.getElementById('second').textContent = '00';
    document.getElementById('minute').textContent = '00';
    document.getElementById('hour').textContent = '00';
}

function update(){
    let currentTime = Date.now() - startTime;
    ms = Math.floor((currentTime / 1000 * 60) % 60).toString().padStart(2,'0');
    second = Math.floor((currentTime / 1000 ) % 60).toString().padStart(2,'0');
    minute = Math.floor((currentTime / (1000 * 60)) % 60).toString().padStart(2,'0');
    hour = Math.floor((currentTime / (1000 * 60 * 60 )) % 60).toString().padStart(2,'0');

    document.getElementById('ms').textContent = ms;
    document.getElementById('second').textContent = second;
    document.getElementById('minute').textContent = minute;
    document.getElementById('hour').textContent = hour;
}