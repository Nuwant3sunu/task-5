
//Add constant variable that holds url for the backend.
import { Todos } from './class/Todos.js'
const BACKEND_ROOT_URL = 'http://localhost:3001';


const todos = new Todos(BACKEND_ROOT_URL);

//connect to DOM input and ul elements.
const list = document.querySelector("ul");
const input = document.querySelector("input");



//separate function for rendering a task.
const renderTask = (task) => {
    const li = document.createElement("li")
    li.setAttribute('class','list-group-item')
    li.setAttribute('data-key',task.getId().toString());
    li.innerHTML = task.getText();
    renderSpan(li,task.getText());
    renderLink(li,task.getId());
    list.append(li);
}
const renderSpan = (li, text) => {
    const span = li.appendChild(document.createElement('span'));
    span.innerHTML = text;
    
}

const renderLink = (li, id) => {
    const a = li.appendChild(document.createElement('a'));
    a.innerHTML = '<i class="bi bi-trash"></i>';
    a.setAttribute('style','float:right');
    a.addEventListener('click', (event) => {
        todos.removeTask(id).then((removed_id) => {
            const li_to_remove = document.querySelector(`[data-key='${removed_id}']`);
            if (li_to_remove) {
                list.removeChild(li_to_remove);
            };
        }).catch((error) => {
            alert(error);
        });
    });
    
}

//function that fetches data from the backend by making HTTP call.

const getTasks = () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task);
        });
        
    }).catch((error) => {
        alert(error);
    });
}

// saving task to backend database 'task' table- 'description' column.


const saveTask = async (task) => {
    try {
        const json = JSON.stringify({description:task});
        const response = await fetch(BACKEND_ROOT_URL + '/new', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        return response.json();
    } catch (error) {
        alert('Error saving task '+error.message);
    }

}

// key press function with above renderTask function.
input.addEventListener('keypress',(event)=> {

//if press Enter key then add new task. ("if" for the task not empty)  
    if (event.key === 'Enter'){
        event.preventDefault()
        const task =input.value.trim();
        if (task !== '') {
            //addtask or (savetask in 3 pdf)
            todos.addTask(task).then((task) => {
                renderTask(task);
                input.value ='';
                input.focus();
                
            })
        }
    }
});


// call get fuction to get tasks from the backend.
getTasks();


