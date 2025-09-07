// Show current date
const dateEl = document.getElementById("date");
const today = new Date();
const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
dateEl.textContent = today.toLocaleDateString("en-US", options);

const taskList = document.getElementById("taskList");

// Load tasks from localStorage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.time, task.category, task.completed));
  highlightCurrentTask();
};

// Add new task
function addTask() {
  const taskInput = document.getElementById("task");
  const timeInput = document.getElementById("time");
  const categoryInput = document.getElementById("category");

  const taskText = taskInput.value.trim();
  const timeValue = timeInput.value;
  const categoryValue = categoryInput.value;

  if (taskText === "") return;

  renderTask(taskText, timeValue, categoryValue, false);
  saveTasks();

  taskInput.value = "";
}

// Render task
function renderTask(taskText, timeValue, categoryValue, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <div class="task-info">
      <div class="task-time">${timeValue}</div>
      <div class="task-text">${taskText}</div>
      <div class="task-category">(${categoryValue})</div>
    </div>
    <button class="complete-btn" onclick="completeTask(this)">✔</button>
    <button class="delete-btn" onclick="deleteTask(this)">✖</button>
  `;

  taskList.appendChild(li);
  highlightCurrentTask();
}

// Mark task as complete
function completeTask(btn) {
  btn.parentElement.classList.toggle("completed");
  saveTasks();
}

// Delete task
function deleteTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

// Clear all tasks
function clearAll() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

// Highlight current time slot
function highlightCurrentTask() {
  const now = new Date();
  let hours = now.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  let formattedHour = hours % 12 || 12;
  const currentTime = formattedHour + " " + ampm;

  document.querySelectorAll("#taskList li").forEach(li => {
    li.classList.remove("active");
    const taskTime = li.querySelector(".task-time").innerText;
    if (taskTime === currentTime) {
      li.classList.add("active");
    }
  });
}

setInterval(highlightCurrentTask, 60000);

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").innerText,
      time: li.querySelector(".task-time").innerText,
      category: li.querySelector(".task-category").innerText.replace(/[()]/g, ""),
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}




