const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const sessionTitle = document.getElementById("session-title");

let timer = null;
let startTime = Date.now();
let totalDuration = 1500000;
let isRunning = false;

function start(){
    if(!isRunning){
        elapsedTime = Date.now() - startTime;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}
function stop(){
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        let remainingTime = totalDuration - elapsedTime;
        isRunning = false;

        let minutes = Math.floor(remainingTime/(1000 * 60) % 60);
        let seconds = Math.floor(remainingTime/1000 % 60);

        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        timerDisplay.textContent = `${minutes}:${seconds}`;
    }
}
function reset(){
    clearInterval(timer);
    startTime = Date.now();
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    startBtn.textContent = "Start"

    timerDisplay.textContent = `25:00`;
}

function update(){
    const currentTime = Date.now();
    let elapsedTime = currentTime - startTime;
    elapsedTime = currentTime - startTime;

    let remainingTime = totalDuration - elapsedTime;

    let minutes = Math.floor(remainingTime/(1000 * 60) % 60);
    let seconds = Math.floor(remainingTime/1000 % 60);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    if(minutes=="25"){
        stop();
        sessionTitle.textContent = "You've Finished 25 Mins of Productivity 🚀";
    }
    else{
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }
}

startBtn.onclick = function(){
    if(!isRunning){
        start();
        startBtn.textContent = "Stop";
    }
    else{
        stop();
        startBtn.textContent = "Start";
    }
}
resetBtn.onclick = reset