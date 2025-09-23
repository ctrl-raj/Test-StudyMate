let prompt = window.prompt(message="Enter Prompt")

const url = `http://127.0.0.1:8000/chat_response/${prompt}`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.detail);
            });
        }
        return response.json();
    })
    .then(data => console.log("Order response:", data))
    .catch(error => console.error("Error:", error.message));