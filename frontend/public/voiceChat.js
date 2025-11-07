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
var audioPlayback = document.createElement('audio');
var progressBar = document.createElement('progress');

// handles during fetching process
function handleProcess(playbackSource){
    // replace Mic Toggle Button
    micBtn.remove();
    promptDisplay.textContent = "Your Prompt:";
    promptDisplay.style.fontSize = "20px"
    promptDisplay.style.marginBottom = "20px"
    focusDiv.appendChild(promptDisplay)

    // add prompt audio
    playback.remove()
    audioPlayback.className = "playback";
    audioPlayback.controls = true;
    audioPlayback.src = playbackSource
    focusDiv.appendChild(audioPlayback)

    // add progress bar
    progressBar.className = "progress-bar";
    progressBar.style.marginTop = "150px"
    progressBar.style.width = "300px"
    focusDiv.appendChild(progressBar);
}

// display response
function displayResponse(prompt, response){
    // remove progress bar
    progressBar.remove()

    const promptDisplay = document.createElement('h4');
    promptDisplay.innerText = prompt;
    promptDisplay.style.fontWeight = "200";
    focusDiv.appendChild(promptDisplay);

    const responseDisplay = document.createElement('h3');
    responseDisplay.innerText = prompt;
    responseDisplay.style.fontWeight = "300";
    focusDiv.appendChild(responseDisplay);
}

function SetupStream(stream){
    recorder = new MediaRecorder(stream)

    recorder.ondataavailable = e => {
        chunks.push(e.data)
    }

    recorder.onstop = e => {
        const blob = new Blob(chunks, {type: "audio/webm; codecs=opus"})
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob)
        playback.src = audioURL
        handleProcess(audioURL)
        getSpeechResponse(blob)
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
async function getSpeechResponse(audioObject){
    console.log("Starting getSpeechResponse");
    console.log("Blob size:", audioObject.size, "Type:", audioObject.type);
    
    try{
        const formData = new FormData();
        formData.append('file', audioObject, 'audio.webm');
        
        const url = "http://127.0.0.1:8000/generateAudioResponse/";
        console.log("Fetching:", url);
        
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if(response.ok){
            const data = await response.json();
            console.log(data);

            
        }
    }
    catch(error){
        console.error(error);
    }
}