const inputBox = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addBtn = document.getElementById("add-btn");

function addTask(){
    if(inputBox.value === ""){
        window.alert("You must give a name to the Task!!!")
    }
    else{
        let item = document.createElement("li");
        item.textContent = inputBox.value;
        taskList.appendChild(item);
        let cross = document.createElement("span");
        cross.innerHTML = "\u00d7";
        item.appendChild(cross);
    }
    inputBox.value = "";
}
addBtn.onclick = addTask