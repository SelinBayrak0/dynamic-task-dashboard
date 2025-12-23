const loadBtn = document.getElementById("loadTasksBtn");
const taskList = document.getElementById("taskList");
const statusMessage = document.getElementById("statusMessage");

const taskManager = new TaskManager();

loadBtn.addEventListener("click", async () => {
    statusMessage.textContent = "Loading tasks...";
    taskList.innerHTML = "";

    try {
        const rawData = await fetchTasks();

        const jsonData = JSON.stringify(rawData);
        const parsedData = JSON.parse(jsonData);

        const tasks = parsedData.map(
            t => new Task(t.id, t.title, t.completed)
        );

        taskManager.setTasks(tasks);
        renderTasks();
        statusMessage.textContent = "";

    } catch (error) {
        statusMessage.textContent = "Failed to load tasks!";
    }
});

function renderTasks() {
    taskList.innerHTML = "";

    taskManager.tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";

        if (task.completed) {
            taskDiv.classList.add("completed");
        }

        const titleSpan = document.createElement("span");
        titleSpan.textContent = task.title;

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle";
        toggleBtn.addEventListener("click", () => {
            taskManager.toggleTask(task.id);
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            taskManager.removeTask(task.id);
            renderTasks();
        });

        taskDiv.appendChild(titleSpan);
        taskDiv.appendChild(toggleBtn);
        taskDiv.appendChild(deleteBtn);

        taskList.appendChild(taskDiv);
    });
}
