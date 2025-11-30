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
        let message = data.response;
        let other = data.other;
        
        return [message, other]
    }
    catch(error){
        console.log(error)
    }
}

async function handleChat(){

    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    // 'Thinking' message
    const listItem = document.createElement('li');
    listItem.classList.add('temp-li');
    listItem.innerHTML = `<progress></progress>`
    chatbox.appendChild(listItem)

    responseArr = await generateResponse(userMessage);
    console.log(responseArr)
    eventObject = await responseArr[1];
    console.log(eventObject)

    listItem.remove() // removes 'Thinking message'

    chatbox.appendChild(createChatLi(responseArr[0], "incoming"));

    if(eventObject){
        let masterString = '';
        for (const event of eventObject.events) {
                masterString += `${event.summary} - ${event.start}<br>`;
            }
            setTimeout(() => {
                chatbox.appendChild(createChatLi(masterString, "incoming"));
            }, 600);
    }
}

sendBtn.addEventListener("click", () => {
    handleChat();
    chatInput.value = "";
});