const chatInput = document.querySelector(".chat-input")
const sendBtn = document.querySelector(".chat-send-button");
const chatbox = document.querySelector(".chatbot-messages");

let userMessage;
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    
    let chatContent = className === "outgoing" ? `<p class="chat-bubble">${message}</p>` : `<p class="chat-bubble">${message}</p>`
    chatLi.innerHTML = chatContent;
    
    return chatLi
}

async function generateResponse(prompt){
    try{
        const response = await fetch(`http://127.0.0.1:8000/chat_response/${prompt}`);

        if(!response.ok){
            throw new Error("Could not fetch");
        }
        
        const data = await response.json();
        console.log(data)
    }
    catch(error){
        console.log(error)
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        chatbox.appendChild(createChatLi("Thinking...", "incoming"));
        //generateResponse();
    }, 600)
    userMessage = userMessage.replace(" ","_");
    console.log(generateResponse(userMessage));
}

sendBtn.addEventListener("click", () => {
    handleChat();
    chatInput.value = "";
});