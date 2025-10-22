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
    saveData()
}
addBtn.onclick = addTask

taskList.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else{
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("tasks-data", taskList.innerHTML);
}

function showTasks(){
    taskList.innerHTML = localStorage.getItem("tasks-data");
}
showTasks();