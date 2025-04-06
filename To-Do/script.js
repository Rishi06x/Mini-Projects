const task = document.getElementById('task');
const taskList = document.getElementById('taskList');
const submitBtn = document.getElementById('submitBtn');

window.onload = function () {
    loadTasks();
};

submitBtn.addEventListener('click', function addTask() {
    if (task.value === "") {
        alert('Please enter a task');
        return;
    }

    let li = document.createElement('li');
    li.innerHTML = `<div class="taskItem"> 
                        <span class="checklist"></span> 
                        <span class="task-text">${task.value}</span> 
                    </div> 
                    <div class="liBtn"> 
                        <button class="edit-btn" onclick="editTask(this)"><i class="fa-regular fa-pen-to-square"></i></button> 
                        <button class="delete-btn" onclick="remove(this)"><i class="fa-solid fa-trash fa-sm"></i></button> 
                    </div>`;

    let checklist = li.querySelector('.checklist');
    let taskText = li.querySelector('.task-text');

    checklist.addEventListener('click', function () {
        taskText.classList.toggle('completed');
        checklist.innerHTML = taskText.classList.contains('completed') ? "✔" : "";
        saveTasks();
        updateStats();
    });

    taskList.appendChild(li);
    task.value = "";

    saveTasks();
    updateStats();
});

function editTask(button) {
    let li = button.closest("li");
    let taskText = li.querySelector('.task-text').innerText;
    task.value = taskText;
    button.parentElement.parentElement.remove();
    submitBtn.onclick = function () {
        addTask();
    }
    saveTasks();
    updateStats();
}

function remove(button) {
    button.parentElement.parentElement.remove();
    saveTasks();
    updateStats();
}

function updateStats() {
    let TotalTasks = document.querySelectorAll('#taskList li').length;
    let completedTasks = document.querySelectorAll('#taskList .task-text.completed').length;

    let progressBar = document.getElementById('progressStats');
    let progress = TotalTasks === 0 ? 0 : (completedTasks / TotalTasks) * 100;
    progressBar.style.width = `${progress}%`;

    if(progress === 100){
        Confetti();
        document.getElementById('para').textContent = "You made it."
    } else {
        document.getElementById('para').textContent = "You're almost there!"
    }
    let progressText = document.getElementById('progressText');
    progressText.innerText = `${completedTasks} / ${TotalTasks}`;
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        let taskText = li.querySelector('.task-text').innerText;
        let completed = li.querySelector('.task-text').classList.contains('completed');
        tasks.push({ text: taskText, completed: completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(taskObj => {
        let li = document.createElement('li');
        li.innerHTML = `<div class="taskItem"> 
                            <span class="checklist">${taskObj.completed ? "✔" : ""}</span> 
                            <span class="task-text ${taskObj.completed ? "completed" : ""}">${taskObj.text}</span> 
                        </div> 
                        <div class="liBtn"> 
                            <button class="edit-btn" onclick="editTask(this)"><i class="fa-regular fa-pen-to-square"></i></button> 
                            <button class="delete-btn" onclick="remove(this)"><i class="fa-solid fa-trash fa-sm"></i></button> 
                        </div>`;

        let checklist = li.querySelector('.checklist');
        let taskText = li.querySelector('.task-text');

        checklist.addEventListener('click', function () {
            taskText.classList.toggle('completed');
            checklist.innerHTML = taskText.classList.contains('completed') ? "✔" : "";
            saveTasks();
            updateStats();
        });

        taskList.appendChild(li);
    });
    updateStats();
}

function Confetti(){
    const duration = 1.5 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}
