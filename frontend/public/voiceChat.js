// RECORDING (INPUT)
const micBtn = document.querySelector("#mic");
const playback = document.querySelector('.playback');
const micSpan = document.querySelector("#mic-span")
const focusDiv = document.querySelector(".focus-box")

micBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ Add this
    ToggleMic();
    return false; // ✅ Add this
});

let canRecord = false;
let isRecording = false;
let recorder = null;
let chunks = [];

(() => {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices
            .getUserMedia({
                audio: true
            })
            .then(SetupStream)
            .catch(err => console.error(err))
    }
})();

// global declaration
var promptDisplay = document.createElement('p');
var newPlayback = document.createElement('audio');
var progressBar = document.createElement('progress');

// handles during fetching process
function handleProcess(playbackSource){
    // replace Mic Toggle Button
    micBtn.style.display = "none"
    promptDisplay.textContent = "Your Prompt:";
    promptDisplay.style.fontSize = "20px"
    promptDisplay.style.marginBottom = "20px"
    focusDiv.appendChild(promptDisplay)

    // add prompt audio
    playback.style.display = "none";
    newPlayback.className = "playback";
    newPlayback.controls = true;
    newPlayback.src = playbackSource
    focusDiv.appendChild(newPlayback)

    // add progress bar
    progressBar.className = "progress-bar";
    progressBar.style.marginTop = "150px"
    progressBar.style.width = "300px"
    focusDiv.appendChild(progressBar);
}

// display response
function displayResponse(prompt, response){
    // mic button reappears 
    micBtn.style.display = "visible";
    // remove progress bar
    progressBar.style.display = "none";

    const promptDisplay = document.createElement('h4');
    promptDisplay.innerText = prompt;
    promptDisplay.style.fontWeight = "200";
    focusDiv.appendChild(promptDisplay);

    const responseDisplay = document.createElement('h3');
    responseDisplay.innerText = response;
    responseDisplay.style.fontWeight = "300";
    focusDiv.appendChild(responseDisplay);

    const responseAudio = document.createElement('audio');
    responseAudio.controls = true;
    responseAudio.src = audioUrl;
    responseAudio.autoplay = true;
    responseAudio.className = "response-audio";
    focusDiv.appendChild(responseAudio);
}

function SetupStream(stream){
    recorder = new MediaRecorder(stream)

    recorder.ondataavailable = e => {
        chunks.push(e.data)
    }

    recorder.onstop = e => {
        const blob = new Blob(chunks, {type: "audio/webm; codecs=opus"});
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        playback.src = audioURL;
        getSpeechResponse(blob, audioURL);
    }

    canRecord = true;
}

function ToggleMic(){
    if(!canRecord)return;

    isRecording = !isRecording;

    if(isRecording){
        recorder.start();
        micBtn.classList.add("is-recording")
    }
    else{
        recorder.stop();
        micBtn.classList.remove("is-recording")
    }
}

// SENDING (PROCESSING)...
async function getSpeechResponse(audioObject, playbackSource){
    console.log("1. Starting getSpeechResponse");
    
    handleProcess(playbackSource);
        
    const formData = new FormData();
    formData.append('file', audioObject, 'audio.webm');
        
    const response = await fetch("http://127.0.0.1:8000/generateAudioResponse/", {
        method: "POST",
        body: formData
    });
        
    console.log("3. Response received:", response.status);

    if(response.ok){
        const data = await response.json();
        console.log("4. Data received:", data);
        console.log("5. About to call displayResponse");
            
        displayResponse(data.prompt, data.response, data.audio_url);
            
        console.log("6. displayResponse completed");
    } else {
        console.error("Error:", response.status);
    }
    
    console.log("7. getSpeechResponse function ended");
}