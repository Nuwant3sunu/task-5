import { Task } from "./Task.js"

class Todos {
    #tasks = []
    #backend_url = ''

    constructor (url) {
        this.#tasks = [];
        this.#backend_url = url;


    }
    // getTasks function to get the tasks from the json file

 
    getTasks =() => {   
        return new Promise( async(resolve, reject) => {
            fetch(this.#backend_url)
//this.#backend_url file sample "{"result":[{"id":1,"description":"My Test Task 01"},{"id":2,"description":"My Test Task 02"},{"id":3,"description":"Test from REST Client"},{"id":4,"description":"Test from REST Client"},{"id":5,"description":"Test from REST Client"},{"id":6,"description":"Test from REST Client"},{"id":7,"description":"added new task"},{"id":8,"description":"Test from REST Client"},{"id":9,"description":"Test from REST Client"},{"id":10,"description":"nuwan added"}]}"

            .then((response) => response.json())    
            .then((json) => {
                this.#readJson(json.result);
                resolve(this.#tasks);
            }, (error) => {
                reject(error);
            });
        });
    }
    // deleteTask function to delete the task from the json file
    removeTask = (id) => {
        return new Promise( async(resolve, reject) => {
            fetch(this.#backend_url + '/delete/' + id, {
                method: 'delete'
            })
            .then((response) => response.json())
            .then((json) => {
                this.#removeFromArray(id);
                resolve(json.id);
            }, (error) => {
                reject(error);
            });
        });
    }



    // readJson function to read the json file and push the data to the task array 
    #readJson = (taskAsJson) => {    
        taskAsJson.forEach(node => {
            const task =new Task(node.id, node.description)
            this.#tasks.push(task);
        });
    
    }
    

    addTask =(text) => {
        return new Promise( async(resolve, reject) => {
            const json = JSON.stringify({description: text});
            fetch(this.#backend_url + '/new', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: json
             })
            .then((response) => response.json())
            .then((json) => {
                resolve(this.#addToArray(json.id, text));
            },(error) => {
                reject(error);
            });
        });
    }

   
    #addToArray = (id, text) => {
        const task = new Task(id, text);
        this.#tasks.push(task);
        return task;
    }

    #removeFromArray = (id) => {
        const arrayWithoutRemoved = this.#tasks.filter(task => task.id !== id);
        this.#tasks = arrayWithoutRemoved;
    }

}
// export the Todos class
export { Todos }
