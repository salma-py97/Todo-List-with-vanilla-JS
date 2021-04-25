// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');



// Event Listeners
// add Todo
todoButton.addEventListener('click', addTodo);
// Delete Todo
todoList.addEventListener('click', deleteCheckTodo);
// Filter Todo
filterOption.addEventListener('input', filterTodo);
// Get Todos from Local Storage
document.addEventListener('DOMContentLoaded', getTodosFromLocalStorage);


// Event Handlers
function addTodo(e){
    e.preventDefault();
    
    // Create todo div
    const todoDiv = document.createElement('div');
    
    // add class of todo
    todoDiv.className = 'todo';
    
    // create li element
    const li = document.createElement('li');
    
    // Add class to li
    li.classList.add('todo-item'); 
    
    // Add text node of li = todoInput.value
    li.appendChild(document.createTextNode(todoInput.value));
    
    // Create delete button element
    const deleteButton = document.createElement('button');
    
    // Add inner HTML
    deleteButton.innerHTML='<i class="fas fa-trash"></i>';
    
    // add class to delete button
    deleteButton.classList.add('delete-btn');
    
    // Create checked button element
    const checkedButton = document.createElement('button');
    
    // add class to checked button
    checkedButton.classList.add('checked-btn');
    
    // Add inner HTML
    checkedButton.innerHTML='<i class="fas fa-check"></i>';
    
    
    // append li, deleteButton and checkedButton to todoDiv
    todoDiv.appendChild(li);
    todoDiv.appendChild(checkedButton);
    todoDiv.appendChild(deleteButton);
    
    // append todoDiv to todoList
    todoList.appendChild(todoDiv);

    // Save to Local Storage before clearing the input
    saveToLocalStorage(todoInput.value);

    // Clear todoInput
    todoInput.value = '';
}

function deleteCheckTodo(e){
    // Event Delegation
    const todo = e.target.parentElement;

    if(e.target.classList.contains('delete-btn')){
        todo.classList.add('fall');
        setTimeout(() => {
            todo.remove();
        }, 1000);
        removeTodosFromLocalStorage(todo);
    } else if (e.target.classList.contains('fa-trash')){
        todo.parentElement.classList.add('fall');
        setTimeout(() => {
            todo.parentElement.remove();
        }, 300);
        removeTodosFromLocalStorage(todo.parentElement);
    }


    if(e.target.classList.contains('checked-btn')){
        todo.classList.toggle('completed');
        e.target.children[0].classList.toggle('fa-check-double');
    } else if (e.target.classList.contains('fa-check')){
        todo.parentElement.classList.toggle('completed');
        e.target.classList.toggle('fa-check-double');        
    }

    e.preventDefault();
}


function filterTodo(e){
    const todos = todoList.children;
    // childNodes give us a node list ==> we can use forEach
    // We can loop through Node lists with forEach, but not an HTML collection, so we need to use Array.from().
    console.log(todos);
    const todosArr = Array.from(todos);
    todosArr.forEach(todo => {
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display= 'none';
                };
                break;   
            case 'uncompleted':
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display= 'none';
                };
                break;   
        } 
    })
            
}

function saveToLocalStorage(todo){
    // check if I have something in LS already

    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromLocalStorage(){
    // check if I have something in LS already

    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        // Create todo div
        const todoDiv = document.createElement('div');
        
        // add class of todo
        todoDiv.className = 'todo';
        
        // create li element
        const li = document.createElement('li');
        
        // Add class to li
        li.classList.add('todo-item'); 
        
        // Add text node of li = todoInput.value
        li.appendChild(document.createTextNode(todo));
        
        // Create delete button element
        const deleteButton = document.createElement('button');
        
        // Add inner HTML
        deleteButton.innerHTML='<i class="fas fa-trash"></i>';
        
        // add class to delete button
        deleteButton.classList.add('delete-btn');
        
        // Create checked button element
        const checkedButton = document.createElement('button');
        
        // add class to checked button
        checkedButton.classList.add('checked-btn');
        
        // Add inner HTML
        checkedButton.innerHTML='<i class="fas fa-check"></i>';
        
        
        // append li, deleteButton and checkedButton to todoDiv
        todoDiv.appendChild(li);
        todoDiv.appendChild(checkedButton);
        todoDiv.appendChild(deleteButton);
        
        // append todoDiv to todoList
        todoList.appendChild(todoDiv);
        })
}

function removeTodosFromLocalStorage(todo){
    // check if I have something in LS already
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // navigate to the index of a todo in the todos array in LS
    const idx = todos.indexOf(todo.children[0].innerText);

    // Remove the todo with that specidfic index
    todos.splice(idx, 1);

    // Rest todos in LS
    localStorage.setItem('todos', JSON.stringify(todos));

}