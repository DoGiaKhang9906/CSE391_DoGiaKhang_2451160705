let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];

let editIndex = -1;

const modal =
document.getElementById("modal");

const btnAddTask =
document.getElementById("btnAddTask");

const btnClose =
document.getElementById("btnClose");

const taskForm =
document.getElementById("taskForm");

const taskList =
document.getElementById("taskList");

const formTitle =
document.getElementById("formTitle");

const message =
document.getElementById("message");

const totalTask =
document.getElementById("totalTask");

const doneTask =
document.getElementById("doneTask");

const todoTask =
document.getElementById("todoTask");

const title =
document.getElementById("title");

const description =
document.getElementById("description");

const deadline =
document.getElementById("deadline");

const priority =
document.getElementById("priority");

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function showMessage(text){

    message.innerText = text;

    setTimeout(()=>{
        message.innerText="";
    },2000);
}

function updateTaskSummary(){

    totalTask.innerText =
    tasks.length;

    const completed =
    tasks.filter(
        task=>task.completed
    ).length;

    doneTask.innerText =
    completed;

    todoTask.innerText =
    tasks.length - completed;
}

function renderTasks(){

    taskList.innerHTML = "";

    if(tasks.length === 0){

        taskList.innerHTML =
        "<p>Chưa có công việc</p>";

        updateTaskSummary();

        return;
    }

    tasks.forEach((task,index)=>{

        taskList.innerHTML +=
        `
        <div class="card ${task.completed ? 'completed':''}">

            <h3>${task.title}</h3>

            <p>${task.description}</p>

            <p>Hạn:
            ${task.deadline}</p>

            <p>Ưu tiên:
            ${task.priority}</p>

            <p>
            ${task.completed
                ? 'Đã hoàn thành'
                : 'Chưa hoàn thành'}
            </p>

            <input
                type="checkbox"
                class="statusCheck"
                data-index="${index}"
                ${task.completed ? 'checked':''}
            >

            <button
                class="editBtn"
                data-index="${index}">
                Sửa
            </button>

            <button
                class="deleteBtn"
                data-index="${index}">
                Xóa
            </button>

        </div>
        `;
    });

    updateTaskSummary();
}

function resetForm(){

    taskForm.reset();

    editIndex = -1;

    formTitle.innerText =
    "Thêm Công Việc";
}

btnAddTask.addEventListener(
"click",
()=>{

    resetForm();

    modal.style.display =
    "flex";
});

btnClose.addEventListener(
"click",
()=>{

    modal.style.display =
    "none";
});

taskForm.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const task = {

        title:title.value,

        description:
        description.value,

        deadline:
        deadline.value,

        priority:
        priority.value,

        completed:false
    };

    if(editIndex === -1){

        tasks.push(task);

        showMessage(
        "Thêm công việc thành công"
        );

    }else{

        task.completed =
        tasks[editIndex]
        .completed;

        tasks[editIndex] =
        task;

        showMessage(
        "Cập nhật thành công"
        );
    }

    saveTasks();

    renderTasks();

    modal.style.display =
    "none";

    resetForm();
});

taskList.addEventListener(
"click",
function(e){

    const index =
    e.target.dataset.index;

    if(
        e.target.classList
        .contains("editBtn")
    ){

        const task =
        tasks[index];

        title.value =
        task.title;

        description.value =
        task.description;

        deadline.value =
        task.deadline;

        priority.value =
        task.priority;

        editIndex = index;

        formTitle.innerText =
        "Cập Nhật Công Việc";

        modal.style.display =
        "flex";
    }

    if(
        e.target.classList
        .contains("deleteBtn")
    ){

        if(
            confirm(
            "Bạn có chắc muốn xóa?"
            )
        ){

            tasks.splice(index,1);

            saveTasks();

            renderTasks();

            showMessage(
            "Xóa thành công"
            );
        }
    }
});

taskList.addEventListener(
"change",
function(e){

    if(
        e.target.classList
        .contains("statusCheck")
    ){

        const index =
        e.target.dataset.index;

        tasks[index].completed =
        e.target.checked;

        saveTasks();

        renderTasks();
    }
});

renderTasks();