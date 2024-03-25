// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() { 
    return Math.floor(Math.random() * 10 ) 

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let dateInputEl = $('#datepicker');
    let taskTitleInputEl = $('#task-title');
    let taskDescriptionEl = $('#task-description');

    let cardContainer = $("<div class='card' style='width: 18rem;'></div>")
    let cardBody = $("<div class='card-body'></div>")
    let cardContent = $(`<h5 class="card-title">Card title</h5>
    <p class="card-text"></p>
    <a href="#" class="btn btn-primary">Go somewhere</a>`)

    cardContainer.append(cardBody)
    cardBody.append(cardContent)
    
    cardContent.append(dateInputEl.value)
    cardContent.append(taskTitleInputEl.value)
    cardContent.append(taskDescriptionEl.value)

    return cardContainer
    // $( "<p id='test'>My <em>new</em> text</p>" ).appendTo( "body" );

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() { 

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
let done = $('#done')
done.append(createTaskCard())
});
