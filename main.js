//Declare for all variable
let form = document.getElementById("form"),
    textInput = document.getElementById("textInput"),
    msgs = document.getElementById("msg"),
    dateInput = document.getElementById("dateInput"),
    textarea = document.getElementById("textarea"),
    tasks = document.getElementById("tasks"),
    addBtn = document.getElementById("addBtn");

form.addEventListener("submit", (e) => {
    e.preventDefault();  //stops the browser from submitting 
    formValidation();  //is called after preventing default behavior.
});

let formValidation = () => {
    if (textInput.value === "") {  //Check for Empty Input
        console.log("Fialure state");
        msgs.innerHTML = "input cannot be blank";
    }
    else {  //If the input is not empty:
        console.log("Success State");
        msgs.innerHTML = " ";
        acceptData();
        addBtn.setAttribute("data-bs-dismiss", "modal");  //closes the modal automatically after submitting
        addBtn.click();  //close the modal

        (() => {
            addBtn.setAttribute("data-bs-dismiss", "");
        }

        )

    }
};

let data = [];
let acceptData = () => {  //adding a new task to data and saving it
    data.push({   // Push New Task Data
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    localStorage.setItem("data", JSON.stringify(data)); //used to store data in the browser's localStorage

    console.log(data);
    createTask();

};

let createTask = () => {
    tasks.innerHTML="";  //Clear Existing Tasks
    data.map((x, y) => { //x represents each task object and y represents the index of the task
        return (tasks.innerHTML += `
            <div id=${y}>
                        <span class="fw-bold">${x.text}</span>
                        <span class="text-secondary small">${x.date}</span>
                        <p>${x.description}</p>
        
                        <span class="options">
                            <i data-bs-toggle="modal" data-bs-target="#form" onClick="editTask(this)" class="fas fa-edit"></i>
                            <i onClick ="deleteTask(this)" class="fas fa-trash-alt"></i>
                        </span>
        
             </div> 
        `);
    });


    resetForm(); //clear input fields after rendering.
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};
 
let deleteTask = (e) => {  //removes a task from both the DOM and localStorage
    e.parentElement.parentElement.remove();  //Remove the Task from the UI. the HTML, removing it from the visible UI.
    data.splice(e.parentElement.parentElement.id,1); //Remove the Task from the data Array
    localStorage.setItem("data", JSON.stringify(data)); //Saves the updated data array in localStorage after deletion.
    console.log(data);
};

let editTask = (e) => {
    let selectTask = e.parentElement.parentElement;
    textInput.value = selectTask.children[0].innerHTML;
    dateInput.value = selectTask.children[1].innerHTML;
    textarea.value = selectTask.children[2].innerHTML;
    deleteTask(e);
};


// Immediately Invoked Function Expression
(() => {
    data = JSON.parse(localStorage.getItem("data"));  //Retrieves the stored string version of data from the browser's localStorage
    console.log(data); //JSON.parse(...): Converts the stringified JSON back into a JavaScript object or array
    createTask();
})();