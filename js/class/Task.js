
/* creating a class for Task that include, 
simple id, description.  and getID , getText fucntion for other file use*/

class Task {
    #id
    #text

    constructor(id, text) {
        this.#id = id
        this.#text = text
    }

    getId() {
        return this.#id;
    }

    getText() {
        return this.#text;
    }
}
// let id = new Task (1, 'deeeee');
// console.log(id.getId());
// console.log(id.getText());

export { Task }