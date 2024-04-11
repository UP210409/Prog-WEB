//alert("Hola mundo!!!");

import {getAllUsers} from './petitions.js'; //hay que agregar siempre la extension!!! sino no funciona
import {deleteTask} from "./petitions.js";
import {createTask} from "./petitions.js";
import {getTaskByUserId} from "./petitions.js";
import {getTask} from "./petitions.js";
import {updateTask} from "./petitions.js";

/*

document.addEventListener('DOMContentLoaded', async() =>{
    const users = await getAllUsers();
    let template = listUsers.innerHTML;

    for (const user of users) {
        template += `
        <option value="${user.id}">${user.fullName}</option>
        `;
    }
    listUsers.innerHTML = template;
});
*/
//const formTask = document.getElementById('form-task');
//const title = document.getElementById('title');
//const description = document.getElementById('description');

//CREAR TAREAS
/*
document.getElementById('form-task')
  .addEventListener('submit',async(e) =>{
    e.preventDefault();
    const formdata = new FormData(e.target);
    await createTask(formdata);
  });
*/
//el get a traves de la URL /?id=1
//como enviar variables por post

const listUsers = document.getElementById('users'); //el selector users está en la línea 35
const taskTable = document.getElementById('tasks');
const taskForm = document.getElementById('form-task');
const formTitle = document.getElementById('form-title')
const completedCheckbox = document.getElementById('completed');
const submitButton = document.getElementById('submitBtn');
let pressedButtonId;
let isInsert = true;

document.addEventListener('DOMContentLoaded',async ()=>{
    const allUsers = await getAllUsers();

    let template=listUsers.innerHTML;
    for (const user of allUsers) {
        template = template + `
        <option value="${user.id}">${user.fullname}</option>
        `
    }

    listUsers.innerHTML = template;
});

listUsers.addEventListener('change',async ()=>{
    const userTasks = await getTaskByUserId(listUsers.value);

    let template = "";
    const tableBody = taskTable.children[1];
    for (const task of userTasks){
        let taskCompleted = "No completada"
        if (task.completed) {
            taskCompleted = "Completada"
        }
        template = template + `
        <tr id=tablerow${task.id}>
        <td>${task.id}</td>
        <td>${task.firstname}</td>
        <td>${task.title}</td>
        <td>${taskCompleted}</td>
        <td>
          <button class="btn btn-secondary btn-sm updateBtn">
            <span>Update</span> <i class="nf nf-md-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm deleteBtn">
            <span>Delete</span> <i class="nf nf-cod-trash"></i>
          </button>
        </td>
      </tr>        `;
    }
    tableBody.innerHTML = template;

  addDeleteButtonEvents();
  addUpdateButtonEvents();
  submitButton.innerText= "GUARDAR";
  formTitle.innerText = "Insertar Tarea";
  isInsert=true;
  taskForm.children[0].children[0].value =``

});


// CUANDO APRIETAN EL SUBMIT
taskForm.addEventListener('submit', async (e)=>{

  e.preventDefault();

  const formData = new FormData(taskForm);

  const completedValue = completedCheckbox.checked ? parseInt(1) : parseInt(0);

  formData.append('completed', completedValue);

  if (isInsert == true){

    try {

      const response = await createTask(formData);
      if (response.success) {

        const taskInfo = await getTask(response.taskId)

        const newRow = document.createElement('tr');

        newRow.setAttribute("id",`tablerow${taskInfo.id}`)

        let taskCompleted = "No completada"

          if (taskInfo.completed) {
              taskCompleted = "Completada"
          }

        newRow.innerHTML = `
          <td>${taskInfo.id}</td>
          <td>${taskInfo.firstname}</td>
          <td>${taskInfo.title}</td>
          <td>${taskCompleted}</td>
          <td>
            <button class="btn btn-secondary btn-sm updateBtn">
              <span>Actualizar</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm deleteBtn">
              <span>DEliminar</span> <i class="nf nf-cod-trash"></i>
            </button>
          </td>
        `;

        taskTable.children[1].appendChild(newRow);
  
      addUpdateButtonEvents();
      taskForm.children[0].children[0].value =`` 
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error in INSERTING:', error);
    };
  };
  
  if (isInsert == false){
    try {
      const response = await updateTask(formData,pressedButtonId)
      if (response.success) {
        const rowToUpdate = document.getElementById(`tablerow${pressedButtonId}`);
        const taskInfo = await getTask(pressedButtonId);
        let taskCompleted = "No completada"
        if (taskInfo.completed) {
            taskCompleted = "Completada"
        };
        rowToUpdate.innerHTML = `
          <td>${pressedButtonId}</td>
          <td>${taskInfo.firstname}</td>
          <td>${taskInfo.title}</td>
          <td>${taskCompleted}</td>
          <td>
            <button class="btn btn-secondary btn-sm updateBtn">
              <span>Actualizar</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm deleteBtn">
              <span>Eliminar</span> <i class="nf nf-cod-trash"></i>
            </button>
          </td>
        `;

        formTitle.innerText = "Ingrese Tarea";
        submitButton.innerText= "GUARDAR";

        isInsert=true;
        taskForm.children[0].children[0].value =``

      } else {
        console.error("Response unsuccessful, failed to update task")
      }
    } catch (error) {
      console.error('Error in UPDATING:', error);
    }
  };
  
  addDeleteButtonEvents();  
  addUpdateButtonEvents();
});

function addUpdateButtonEvents() {
  const updateButtons = document.querySelectorAll('.updateBtn');
  updateButtons.forEach(button =>{
  button.addEventListener('click', async (e)=>{
      e.preventDefault()
      const taskId = button.parentElement.parentElement.children[0].innerText;
      console.log("Elemento padre",taskId);
      const taskInfo = await getTask(taskId);
      let casillaMarcada;
      pressedButtonId = taskId;
      taskInfo.completed === true ? casillaMarcada='true' : casillaMarcada='';
      taskForm.children[0].children[0].value =`${taskInfo.title}` 
      formTitle.innerText = "Modify Task";
      taskForm.children[2].children[0].checked = casillaMarcada
      submitButton.innerText= "UPDATE";
      isInsert=false;
      window.scrollTo({ top: 0, behavior:'smooth'});
  })
}); 
};

function addDeleteButtonEvents(){
  const deleteButtons = document.querySelectorAll('.deleteBtn');
        deleteButtons.forEach(button =>{
        button.addEventListener('click', async ()=>{
            const taskId = button.parentElement.parentElement.children[0].innerText;
            button.parentElement.parentElement.remove();
            await deleteTask(taskId);
        });
      });
}