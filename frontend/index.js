// Fetch Response from Rookie
async function genSchedule(){
    const prompt = window.prompt("Enter Prompt")
    const url = `http://127.0.0.1:8000/chat_response/${prompt}`;
    
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
        return none
    }
}
// Fetch Response from Flashua
async function genFlashcard() {
    const subject = window.prompt("Enter Subject");
    const url = `http://127.0.0.1:8000/flashcards/${subject}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data; // This returns the fetched data
    } catch (error) {
        console.log(error);
        return null; // or throw an error
    }
};
async function processFlashcards() {
    const data = await genSchedule(); // Pauses execution until the data is returned
    console.log(data); // This now logs the actual flashcard data
}

processFlashcards();