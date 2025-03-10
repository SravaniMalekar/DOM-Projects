//DEFINE UI VARS

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//LOAD ALL EVENT LISTENERS
loadEventListeners();

function loadEventListeners(){

    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
            //create li element
    const li =  document.createElement('li');
    //add class name
    li.className = 'collection-item';
    //create text node
    li.appendChild(document.createTextNode(task));
    //create link
    const link = document.createElement('a');
    //add classname to link
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

    })

}

//Add Task
function addTask(e){

    if (taskInput.value === ''){
        alert('Add a task');
    }

    //create li element
    const li =  document.createElement('li');
    //add class name
    li.className = 'collection-item';
    //create text node
    li.appendChild(document.createTextNode(taskInput.value));
    //create link
    const link = document.createElement('a');
    //add classname to link
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    console.log(li);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value ='';

    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure ?')){
            e.target.parentElement.parentElement.remove();

            //Remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    
}

//remove from ls
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
    // taskList.innerHTML = '';

    //faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear from ls
    clearTasksFromLocalStorage();
}

//clear tasks from ls
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none' ;
        }
    });
}