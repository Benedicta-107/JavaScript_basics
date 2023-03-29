// Get references to DOM elements
const inputItem = document.querySelector('#input-item');
const addButton = document.querySelector('#add-button');
const todoList = document.querySelector('#todo-list');

// Get todo list items from localStorage, or initialize an empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to render the todo list
function renderTodos() {
  // Clear existing todo list items
  todoList.innerHTML = '';

  // Reverse the order of the todos array so that the most recently added item appears first
  const reversedTodos = todos.slice().reverse();

  // Iterate over the todos array and add each item to the list
  for (let i = 0; i < reversedTodos.length; i++) {
    const todo = reversedTodos[i];
    const li = document.createElement('li');
    const span = document.createElement('span');
    const editButton = document.createElement('button');
    const removeButton = document.createElement('button');

    span.textContent = todo;
    editButton.textContent = 'Edit';
    removeButton.textContent = 'Remove';

    // Add event listener for edit button
    editButton.addEventListener('click', () => {
      const newTodo = prompt('Enter new todo:', todo);

      // Update todo in array and localStorage
      if (newTodo !== null && newTodo !== '') {
        const index = todos.indexOf(todo);
        todos[index] = newTodo;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
      }
    });

    // Add event listener for remove button
    removeButton.addEventListener('click', () => {
      const index = todos.indexOf(todo);

      // Remove todo from array and localStorage
      if (index > -1) {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
      }
    });

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(removeButton);
    todoList.appendChild(li);
  }
}

// Render initial todo list on page load
renderTodos();

// Add event listener for add button
addButton.addEventListener('click', () => {
  const todo = inputItem.value;

  // Add new todo to array and localStorage
  if (todo !== '') {
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    inputItem.value = '';
    renderTodos();
  }
});
