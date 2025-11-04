// RECORDING (INPUT)
const micBtn = document.querySelector("#mic");
const playback = document.querySelector('.playback');

micBtn.addEventListener('click', ToggleMic);

let canRecord = false;
let isRecording = false;

let recorder = null;

let chunks = [];

function setupAudio(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices
            .getUserMedia({
                audio: true
            })
            .then(SetupStream)
            .catch(err => console.error(err))
    }
}
setupAudio()

function SetupStream(stream){
    recorder = new MediaRecorder(stream)

    recorder.ondataavailable = e => {
        chunks.push(e.data)
    }

    recorder.onstop = e => {
        const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus"})
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob)
        playback.src = audioURL
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
function getSpeechResponse(){
    
}