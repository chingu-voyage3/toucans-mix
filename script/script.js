//MAIN INPUT//////////////////////////////////////////////////////////////////////////////////////

function getMainFocus() {
    var mainFocus = document.getElementById('mainFocusQuestion').value;
    document.getElementById('mainFocusParagraph').innerHTML = mainFocus
}

//TO DO LIST//////////////////////////////////////////////////////////////////////////////////////

var todoList = {
    todos: [{todoText: "task 1", completed: true}, {todoText: "task 2", completed: true}, {todoText: "task 3", completed:true}],
    displayTodos: function() {
        console.clear();
        for (i = 0; i < this.todos.length; i++) {
            if (this.todos[i].completed === true) {
                console.log("(x) " + this.todos[i].todoText);
            } else {
                console.log("( ) " + this.todos[i].todoText);
            }
        }
    },
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        this.displayTodos();
    },
    changeTodo: function(index, todoText) {
        this.todos[index].todoText = todoText;
        this.displayTodos();
    },
    deleteTodo: function(index) {
        this.todos.splice(this.todos(index, 1));
        this.displayTodos();
    },
    //Toggle one specific todo
    toggleCompleted: function(index) {
        this.todos[index].completed = !this.todos[index].completed;
        this.displayTodos();
    },
    //Toggle all todos to incomplete or to complete
    toggleAll: function() {
        var all = true;
        //If a todo is not completed, change to completed
        for (i=0; i<this.todos.length; i++) {
            if (this.todos[i].completed === false) {
                this.todos[i].completed = true;
                all = false;
            }
        }
        //If all todos were already completed, change them all to not completed
        if (all === true) {
            for (i=0; i<this.todos.length; i++) {
                this.todos[i].completed = false;
            }
        }
        this.displayTodos();
    }
};
