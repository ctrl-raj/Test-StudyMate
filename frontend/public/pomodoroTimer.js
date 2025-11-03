const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const sessionTitle = document.getElementById("session-title");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let totalDuration = 1500000;
let isRunning = false;

function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}
function stop(){
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;

        let remainingTime = totalDuration - elapsedTime;
        let minutes = Math.floor(remainingTime/(1000 * 60) % 60);
        let seconds = Math.floor(remainingTime/1000 % 60);

        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        timerDisplay.textContent = `${minutes}:${seconds}`;
    }
}
function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    startBtn.textContent = "Start"

    timerDisplay.textContent = `25:00`;
}

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let remainingTime = totalDuration - elapsedTime;

    if(remainingTime <= 0){
        remainingTime = 0;
        stop();
        sessionTitle.textContent = "You've Finished 25 Mins of Productivity 🚀";
        timerDisplay.textContent = "00:00";
        return;
    }

    let minutes = Math.floor(remainingTime/(1000 * 60) % 60);
    let seconds = Math.floor(remainingTime/1000 % 60);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    
    timerDisplay.textContent = `${minutes}:${seconds}`;
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