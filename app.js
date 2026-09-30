const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskMessage = document.querySelector("#task-message");
const taskList = document.querySelector("#task-list");
const filterButtons = document.querySelectorAll(".filter-button");
const totalCount = document.querySelector("#total-count");
const activeCount = document.querySelector("#active-count");
const completedCount = document.querySelector("#completed-count");

let tasks = [
  { id: 1, title: "完成 Web App 實作", completed: false },
  { id: 2, title: "完成 JavaScript 練習", completed: false },
  { id: 3, title: "完成課程作業", completed: true },
];
let currentFilter = "all";

function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.completed);
  }

  if (currentFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

function updateStats() {
  const completed = tasks.filter((task) => task.completed).length;
  totalCount.textContent = tasks.length;
  completedCount.textContent = completed;
  activeCount.textContent = tasks.length - completed;
}

function renderTasks() {
  taskList.innerHTML = "";
  const visibleTasks = getVisibleTasks();

  if (visibleTasks.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-state";
    emptyItem.textContent = "目前沒有符合條件的任務。";
    taskList.appendChild(emptyItem);
    updateStats();
    return;
  }

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";

    const label = document.createElement("label");
    label.className = "task-check";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const title = document.createElement("span");
    title.textContent = task.title;
    if (task.completed) {
      title.classList.add("done");
    }

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    label.append(checkbox, title);
    item.append(label, deleteButton);
    taskList.appendChild(item);
  });

  updateStats();
}

function addTask(title) {
  tasks.push({
    id: Date.now(),
    title,
    completed: false,
  });
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();

  if (!title) {
    taskMessage.textContent = "請先輸入任務名稱。";
    return;
  }

  addTask(title);
  taskInput.value = "";
  taskMessage.textContent = "";
  taskInput.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderTasks();
  });
});

renderTasks();

Vue.createApp({
  data() {
    return {
      newTask: "",
      message: "",
      tasks: [
        { id: 101, title: "用 Vue 新增任務", completed: false },
        { id: 102, title: "測試 Vue 完成功能", completed: true },
      ],
    };
  },
  methods: {
    addTask() {
      const title = this.newTask.trim();

      if (!title) {
        this.message = "請先輸入任務名稱。";
        return;
      }

      this.tasks.push({
        id: Date.now(),
        title,
        completed: false,
      });
      this.newTask = "";
      this.message = "";
    },
    removeVueTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
  },
}).mount("#vue-app");
