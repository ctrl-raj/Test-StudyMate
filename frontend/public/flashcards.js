
// Functions
async function fetchFlashcards(subject){
    try{
        const response = await fetch(`http://127.0.0.1:8000/flashcards/${subject}`)
        if(!response.ok){
            console.log("Could not fetch response");
        }
        const data = await response.json();
        return data
    }
    catch(e){
        console.log(e)
    }
}

flashcards = fetchFlashcards("Chemistry")