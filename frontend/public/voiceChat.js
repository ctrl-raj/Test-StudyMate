// RECORDING (INPUT)
const micBtn = document.querySelector("#mic");
const playback = document.querySelector('.playback');
const micSpan = document.querySelector("#mic-span")
const focusDiv = document.querySelector(".focus-box")

micBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    ToggleMic();
    return false;
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
const promptTitle = document.querySelector(".prompt-title");
const newPlayback = document.querySelector("#new-playback")
const progressBar = document.querySelector(".progress-bar");
// display response
const promptDisplay = document.querySelector(".prompt-display")
const responseDisplay = document.querySelector(".response-display")

// handles during fetching process
function handleProcess(playbackSource){
    // removes elements while processing
    micBtn.style.display = "none";
    promptDisplay.style.display = "none";
    responseDisplay.style.display = "none";

    promptTitle.style.display = "block";
    promptTitle.textContent = "Your Prompt: ";
    newPlayback.style.display = "block"
    newPlayback.src = playbackSource;
    newPlayback.autoplay = false;
    progressBar.style.display = "block";
}

function displayResponse(prompt, response, audioUrl){
    promptTitle.style.display = "block";
    newPlayback.style.display = "block"
    progressBar.style.display = "none";

    promptTitle.textContent = "Model Response: ";
    newPlayback.src = audioUrl;
    newPlayback.autoplay = true;

    // mic button reappears 
    micBtn.style.display = "block";

    promptDisplay.style.display = "block";
    promptDisplay.innerText = prompt;

    responseDisplay.style.display = "block";
    responseDisplay.innerText = response;

    responseAudio.src = audioUrl;
    responseAudio.autoplay = true;
}

function SetupStream(stream){
    recorder = new MediaRecorder(stream)

    recorder.ondataavailable = e => {
        chunks.push(e.data)
    }

    // Make onstop handler robust: guard against missing DOM nodes and surface errors
    recorder.onstop = async e => {
        try {
            const blob = new Blob(chunks, {type: "audio/webm; codecs=opus"});
            chunks = [];
            const audioURL = window.URL.createObjectURL(blob);

            // prefer the new playback element if present, otherwise fall back to the original playback
            try {
                if (newPlayback && typeof newPlayback !== 'undefined') {
                    newPlayback.src = audioURL;
                } else {
                    playback.src = audioURL;
                }
            } catch (domErr) {
                console.warn('Playback element missing or not writable, falling back to original playback:', domErr);
                playback.src = audioURL;
            }

            // call the processing function and catch its errors separately
            try {
                await getSpeechResponse(blob, audioURL);
            } catch (procErr) {
                console.error('Error in getSpeechResponse:', procErr);
            }
        } catch (err) {
            console.error('Error in recorder.onstop:', err);
        }
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