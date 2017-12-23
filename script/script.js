//MAIN INPUT//////////////////////////////////////////////////////////////////////////////////////

function getMainFocus() {
    var mainFocus = document.getElementById('mainFocusQuestion').value;
    document.getElementById('mainFocusParagraph').innerHTML = mainFocus
}

//TO DO LIST//////////////////////////////////////////////////////////////////////////////////////
var todoList = {
    todos: [],
    addTodo: function(todoText) {
      this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(index, todoText) {
        this.todos[index].todoText = todoText;
    },
    deleteTodo: function(index) {
        this.todos.splice(index, 1);
    },
    //Toggle one specific todo
    toggleCompleted: function(index) {
      var todo = this.todos[index];
      todo.completed = !todo.completed;
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
    }
};

var handlers = {
  addTodo: function() {
    var textInput = document.getElementById('textInput');
    todoList.addTodo(textInput.value);
    textInput.value = '';
    display.displayTodos();
  },

  deleteTodo: function() {
    var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput').innerHTML;
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = '';
    display.displayTodos();
  },

  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    display.displayTodos();
  },

  toggleAll: function() {
    todoList.toggleAll();
    display.displayTodos();
  }
}

var display = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';
      if (todo.completed === true) {
        todoTextWithCompletion = '(X)' + todo.todoText;
      }
      else {
        todoTextWithCompletion = '( )' + todo.todoText;
      }
      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function() {
      var elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    })
  }
};

display.setEventListeners();
