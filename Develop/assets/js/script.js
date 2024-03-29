// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks2")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || {};
// let allTasks = [];

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Math.floor(Math.random() * 10000)

}




// Todo: create a function to create a task card
function createTaskCard(task) {
    // establishes past and future for task cards 
    // taskList.push(task)
    // localStorage.setItem("tasks2", JSON.stringify(taskList))
    // console.log({ ct_task: task })
    const now = dayjs();
    const dueDate = dayjs(task.dateInput);
    const dateDiff = dueDate.diff(now, "second");
    const isOverdue = dateDiff <= 0;
    const isAlmostDue = dateDiff > 0 && dateDiff <= 259200;

    // console.log({ date_diff: dateDiff });
    // console.log({ isOverdue })
    // console.log({ isAlmostDue })

    let cardContainer = $(`<div class='card ${isAlmostDue ? "almost-due" : ""} ${isOverdue ? "over-due" : ""}' style='width: 18rem;'></div>`);
    let cardBody = $(`<div class='card-body'></div>`);
    let cardContent = $(`<h5 class="card-title">${task?.title ?? "n/a"}</h5>
                         <p class="card-text">${task?.description}</p>
                         <p class="card-text">${task?.dateInput}</p>`)
    let button=$(`<button data-task-id="${task.id}" class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>`);

    cardContainer.append(cardBody);
    cardBody.append(cardContent);
    cardBody.append(button);
    $(button).on('click', handleDeleteTask);

    switch (task.swimLane) {
        case "done":
            $("#done-cards").append(cardContainer)
            break;
        case "in-progress":
            $("#in-progress-cards").append(cardContainer)
            break;
        case "to-do":
            $("#todo-cards").append(cardContainer)
            break;
        default:
            console.error("unknown swimlane", {task})
            $("#todo-cards").append(cardContainer)
    }

}

// Todo: create a function to render the task list and make cards draggable


$(document).ready(function () {
    const saveChangesBtn = $('#saveChangesBtn');

    saveChangesBtn.on('click', function () {
        // const dateInput = $('#datepicker').val();
        // const taskTitle = $('#task-title').val();
        // const taskDescription = $('#task-description').val();

        // const task = {
        //     title: taskTitle,
        //     dateInput: dateInput,
        //     description: taskDescription,
        //     swimLane: "to-do"


        // };
        handleAddTask();
        // call your handleAddTask function (this function will handle the localstorage)
        // add the new task to your array, set the tasks2 to the new array
        // call your handleTaskList
    });
    renderTaskList();
});

// Todo: create a function to handling the array of tasks and utilize createTaskCard()
function renderTaskList() {
    // clear swim lanes
    $(`#todo-cards`).empty();
    $(`#in-progress-cards`).empty();
    $(`#done-cards`).empty();

    // this function should loop through your taskList and call the createTaskCard function
    for (let index = 0; index < taskList.length; index++) {
        const task = taskList[index];
        createTaskCard(task);
    };
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    const dateInput = $('#datepicker').val();
    const taskTitle = $('#task-title').val();
    const taskDescription = $('#task-description').val();

    const task = {
        title: taskTitle,
        dateInput: dateInput,
        description: taskDescription,
        swimLane: "to-do",
        id: generateTaskId()

    };

    taskList.push(task)
    localStorage.setItem("tasks2", JSON.stringify(taskList))
    renderTaskList()
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    // console.log(taskList);
    event.preventDefault()
    console.log(event)
    const id = $(event.target).attr("data-task-id")
    console.log(id)
    const filteredArray = []
    for (let i = 0; i < taskList.length; i++){
        if(taskList[i].id != id){
            filteredArray.push(taskList[i])
        }
    }
    taskList = filteredArray 
    // filter your taskList by the id of the task
    localStorage.setItem("tasks2", JSON.stringify(taskList))
    renderTaskList()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {
//     var testTask = {
//         dateInput: "3/20/2024",
//         title: "bleeep",
//         description: "This is me",
//         swimLane: "to-do"
//     }
// createTaskCard(testTask)
// });