class TodoList {

    /**
     * Initialize the TodoList.
     * @constructor
     */
    constructor() {
        /**
         * The list of todos.
         * @type {Array}
         */
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.init();
    }

    /**
     * Initialize the event listeners and render the todo list.
     */
    init() {
        // Add a submit event listener to the todo form
        document.getElementById('todoForm').addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission
            this.addTodo(); // Add a new todo item
        });
        
        // Render the current todo list
        this.render();
    }

    /**
     * Add a new todo item to the list.
     */
    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (text) {
            // Create a new todo item with a unique id and the text
            const todo = {
                id: Date.now(),
                text,
                completed: false
            };
            
            // Add the new todo item to the list
            this.todos.push(todo);
            // Save the todos in local storage
            this.saveTodos();
            // Render the new todo list
            this.render();
            // Clear the input field
            input.value = '';
        }
    }

    /**
     * Toggle the completed status of a todo item.
     * @param {number} id The id of the todo item to toggle
     */
    toggleTodo(id) {
        // Map over the todos array and change the completed status of the todo
        // with the matching id
        this.todos = this.todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        );
        // Save the new state of the todos array in local storage
        this.saveTodos();
        // Render the new state of the todo list
        this.render();
    }

    /**
     * Delete a todo item from the list.
     * @param {number} id The id of the todo item to delete
     */
    deleteTodo(id) {
        // Filter out the todo with the matching id from the todos array
        this.todos = this.todos.filter(todo => todo.id !== id);
        // Save the new state of the todos array in local storage
        this.saveTodos();
        // Render the new state of the todo list
        this.render();
    }

    /**
     * Save the current state of the todos array in local storage.
     */
    saveTodos() {
        // Use the JSON.stringify method to convert the todos array to a JSON
        // string and save it in local storage
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    /**
     * Render the current state of the todo list.
     * This function is called when the user adds a new todo item,
     * toggles the completed status of a todo item, or deletes a todo item.
     * It renders the current state of the todo list by creating a new
     * <li> element for each todo item and appending it to the <ul>
     * element with the id "todoList".
     */
    render() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';
        
        this.todos.forEach(todo => {
            const li = document.createElement('li');
            // Create the content of the <li> element
            // The content is a <span> element with the text of the todo item
            // with a class of "completed" if the todo item is completed
            // and two <button> elements to toggle the completed status of the
            // todo item and to delete it
            li.innerHTML = `
                <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <button onclick="todoList.toggleTodo(${todo.id})">
                    ${todo.completed ? 'Défaire' : 'Terminer'}
                </button>
                <button onclick="todoList.deleteTodo(${todo.id})">Supprimer</button>
            `;
            // Append the <li> element to the <ul> element
            todoList.appendChild(li);
        });
    }
}

// Initialize todo list when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.todoList = new TodoList();
});

