const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const addButton = document.getElementById("add-btn");
const emptyMessage = document.getElementById("empty-message");
const clearCompletedButton = document.getElementById("clear-btn");
const form = document.getElementById("todo-form");

function createTodoItem(text, completed = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = completed;
  checkbox.setAttribute("aria-label", "Mark task as completed");

  const div = document.createElement("div");
  div.className = "todo-inner";
  div.textContent = text;

  const button = document.createElement("button");
  button.className = "delete-btn";
  button.textContent = "X";
  button.setAttribute("aria-label", "Delete task");

  li.append(checkbox, div, button);
  if (completed) li.classList.add("completed");

  return li;
}

// Load todos from localStorage
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = createTodoItem(todo.text, todo.completed);
    todoList.appendChild(li);
  });

  updateEmptyMessage();
}

// Save todos to localStorage
function saveTodos() {
  const todos = [];
  document.querySelectorAll("#todo-list li").forEach((li) => {
    const text = li.querySelector(".todo-inner").textContent.trim();
    const completed = li.querySelector(".todo-checkbox").checked;
    todos.push({ text, completed });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add task
function addTodo(event) {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (!todoText) return;
  if (todoText.length > 50) {
    alert("Task cannot exceed 50 characters.");
    return;
  }

  const li = createTodoItem(todoText);

  todoList.appendChild(li);

  todoInput.value = "";
  saveTodos();
  updateEmptyMessage();
}

form.addEventListener("submit", addTodo);

// Delete task
todoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.closest("li").remove();
    saveTodos();
    updateEmptyMessage();
  }
});
// check/uncheck task
todoList.addEventListener("change", function (e) {
  if (e.target.classList.contains("todo-checkbox")) {
    const li = e.target.closest("li");
    li.classList.toggle("completed");
    saveTodos();
  }
});

// Clear completed tasks
clearCompletedButton.addEventListener("click", function () {
  const completedItems = document.querySelectorAll("#todo-list li.completed");
  completedItems.forEach((item) => item.remove());
  saveTodos();
  updateEmptyMessage();
});

function updateEmptyMessage() {
  emptyMessage.style.display =
    todoList.children.length === 0 ? "block" : "none";
}

loadTodos();
