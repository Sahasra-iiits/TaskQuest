let tasks = [];
if (localStorage.getItem("tasks") == null)
  localStorage.setItem("tasks", JSON.stringify([]));
if (localStorage.getItem("score") == null) localStorage.setItem("score", 0);

const btn = document.querySelector("button");
const inputBox = document.querySelector(".inputBox");
const taskBox = document.querySelector(".pending_tasks");
const compBox = document.querySelector(".comp_tasks");
const prevTasks = JSON.parse(localStorage.getItem("tasks"));
tasks = tasks.concat(prevTasks);

if (tasks != null) {
  tasks.forEach((t) => {
    createTaskBox(t.text, t.priority, t.completed);
    calScore(compBox.querySelectorAll(".tag"));
  });
}

btn.addEventListener("click", () => {
  const new_task = inputBox.querySelector("input").value.trim();
  const priority = inputBox.querySelector("select").value;

  if (new_task == "") {
    alert("Please Enter a Task");
    return;
  }
  document.querySelector("input").value = "";

  createTaskBox(new_task, priority, false);
  tasks.push({
    text: new_task,
    completed: false,
    priority: priority,
  });
  saveTasks();
});

function createTaskBox(new_task, priority, completed) {
  const todo = document.createElement("div");
  todo.innerHTML = `<p>${new_task}</p>
            <div class="task_op">
              <p class="tag">+${assignPriority(priority)}XP</p>
              <input type="checkbox">
              <p class="del">Delete</p>
            </div>`;
  const del = todo.querySelector(".del");
  const checkbox = todo.querySelector(".task_op").querySelector("input");

  todo.classList.add("task_box");

  del.addEventListener("click", () => {
    const removed =
      del.parentElement.parentElement.querySelector("p").innerText;
    tasks = tasks.filter((t) => t.text != removed);
    saveTasks();
    del.parentElement.parentElement.remove();
    const scoreTags = compBox.querySelectorAll(".tag");
    calScore(scoreTags);
  });

  checkbox.addEventListener("click", () => {
    const task = checkbox.parentElement.parentElement;
    toggleChecks(task, checkbox);
    const scoreTags = compBox.querySelectorAll(".tag");
    calScore(scoreTags);
    saveTasks();
  });

  if (completed == false) taskBox.prepend(todo);
  else {
    compBox.prepend(todo);
    todo.classList.add("green");
    checkbox.checked = true;
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleChecks(task, checkbox) {
  const updated = task.querySelector("p").innerText;
  tasks = tasks.map((t) =>
    t.text == updated ? { ...t, completed: !t.completed } : t,
  );
  if (
    task.parentElement.className == "pending_tasks" &&
    checkbox.checked == true
  ) {
    task.remove();
    task.classList.add("green");
    compBox.prepend(task);
  } else if (
    task.parentElement.className == "comp_tasks" &&
    checkbox.checked == false
  ) {
    task.remove();
    task.classList.remove("green");

    taskBox.prepend(task);
  }
}

function assignPriority(priority) {
  if (priority == "High") return 30;
  else if (priority == "Medium") return 20;
  else return 10;
}

function calScore(scoreTags) {
  let score = 0;
  scoreTags.forEach((tag) => {
    if (tag.innerText == "+30XP") score = score + 30;
    else if (tag.innerText == "+20XP") score = score + 20;
    else if (tag.innerText == "+10XP") score = score + 10;
  });
  const scorecard = document.querySelector(".score_tag");
  scorecard.innerText = `Score: ${score}XP`;
  localStorage.setItem("score", `${score}`);
}
