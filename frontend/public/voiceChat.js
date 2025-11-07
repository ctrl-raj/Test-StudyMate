// RECORDING (INPUT)
const micBtn = document.querySelector("#mic");
const playback = document.querySelector('.playback');

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

(() => { // Arrow function equivalent
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices
            .getUserMedia({
                audio: true
            })
            .then(SetupStream)
            .catch(err => console.error(err))
    }
})();

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
    console.log("1. Starting getSpeechResponse");
    console.log("2. Blob size:", audioObject.size, "Type:", audioObject.type);
    
    try{
        const formData = new FormData();
        formData.append('file', audioObject, 'audio.webm');
        
        // Log all FormData entries
        for (let pair of formData.entries()) {
            console.log("3. FormData:", pair[0], pair[1]);
        }
        
        const url = "http://127.0.0.1:8000/generateAudioResponse/";
        console.log("4. Fetching:", url);
        
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        
        console.log("5. Response status:", response.status);
        console.log("6. Response headers:", [...response.headers.entries()]);

        if(response.ok){
            const data = await response.json();
            console.log("7. Success! Data:", data);
        }
        else{
            const errorText = await response.text();
            console.error("8. Error response body:", errorText);
        }
    }
    catch(error){
        console.error("9. Fetch failed:", error);
        console.error("10. Error stack:", error.stack);
    }
    
    console.log("11. Function completed");
}