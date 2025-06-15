let todos = JSON.parse(localStorage.getItem('todos')) || [];
const todoInput = document.getElementById("exampleFormControlTextarea1");
const addbtn = document.getElementById("submitButton");
const todoList = document.querySelector(".push");


function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';

    const counterDiv = document.createElement("div");
    counterDiv.className = "todo-counter";
    counterDiv.innerHTML = `<p style="margin: 8px; font-weight:bold;">Total tasks: ${todos.length}</p>`;
    todoList.appendChild(counterDiv);
      
    todos.forEach((todo, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "todo-item";
        taskDiv.innerHTML = `
        <div class="list d-flex justify-content-between align-items-center mb-2">
           <p class="task-text mb-0 ${todo.completed ? 'completed' : ''}">${todo.text}</p>
            <div class="btn-group flex-shrink-0">
                <button class="btn btn-primary complete-btn" data-index="${index}">
                    ${todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
            </div>
        </div>
        `;
        todoList.appendChild(taskDiv);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeTodo(index);
        });
    });

    document.querySelectorAll('.complete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            toggleComplete(index);
        });
    });
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

addbtn.addEventListener('click', () => {
    if (todoInput.value.trim() !== '') {
        todos.push({
            text: todoInput.value.trim(),
            completed: false
        });
        saveTodos();
        todoInput.value = '';
        renderTodos();
    }
});

function removeTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

todoInput.addEventListener('input', function() {
    if (this.value.length > 90) {
        this.value = this.value.substring(0, 90);
    }
});


renderTodos();