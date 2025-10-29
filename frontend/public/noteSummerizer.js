const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const inputBox = document.getElementById("file");

const contentDiv = document.getElementById("content");

startBtn.onclick = async () => {
    if(inputBox.files.length > 0){
        contentDiv.innerHTML = `<progress>`

        const file = inputBox.files[0];
        console.log(`File selected: ${file.name}`);

        const formData = new FormData();
        formData.append('file', file);

        try{
            const response = await fetch(`http://127.0.0.1:8000/summeriser/`, {
            method: "POST",
            body: formData
            });

            if(response.ok){
                const data = await response.json();
                console.log(data.response);
                let summarisedRes = data.response;

                contentDiv.innerHTML = `<p id="summary-output">${summarisedRes}</p>`
            }
            else{
                console.error("Error:", response.status);
            }
        }
        catch (error) {
            console.error("Upload failed:", error);
        }
    }
    else{
        alert("Please upload a file to start");
    }
}
resetBtn.onclick = () => {
    inputBox.value = "";
    contentDiv.innerHTML = `<button id="start-btn" class="start-btn">Start</button><br>
                    <input type="file" id="file" accept="image/png, image/jpeg, image/jpg">
                    <label for="file">Upload Content</label>`;
}