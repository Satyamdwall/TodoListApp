// sleectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')


//Event Listners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener('click', deleteCheck)




//Functions

function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();

    //Todo Div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    //Create Li
    if (todoInput.value === '') {
        alert("you must write something!")
    }
    else{
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value; //  type the todo task
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //Add todo to LocalStorage
    saveLocalTodos(todoInput.value)

    //Check-Mark Button
    const completedButton = document.createElement("button")
    // completedButton.innerText =  '<i class="fas fa-check"</i>'
    completedButton.innerHTML = '<i class="fas fa-check"</i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)

    //Check Trash Button
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="fas fa-trash"</i>'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    }
    //Append to List
    todoList.appendChild(todoDiv);

    //Todo Input Value
    todoInput.value = ""; // clears the value inside the box
}


function deleteCheck(e) {
    const item = e.target;
    //Delete Todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }

    //Check Mark 
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}


function saveLocalTodos(todo) {
    // Check ---Hey Do I already have a thing to  do
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}


function getTodos() {
    // Check ---Hey Do I already have a thing to  do
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function (todo) {
        //Todo Div
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

        //Create Li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)


        //Check-Mark Button
        const completedButton = document.createElement("button")
        // completedButton.innerText =  '<i class="fas fa-check"</i>'
        completedButton.innerHTML = '<i class="fas fa-check"</i>'
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton)

        //Check Trash Button
        const trashButton = document.createElement("button")
        trashButton.innerHTML = '<i class="fas fa-trash"</i>'
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Append to List
        todoList.appendChild(todoDiv);

    });
}


function removeLocalTodos(todo) {
    // Check ---Hey Do I already have a thing to do
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}