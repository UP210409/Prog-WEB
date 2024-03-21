const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const btnBuscarTarea = document.getElementById('btnBuscarTarea');


function getAllUsers() {
  return fetch('/data/usuarios.json')
  .then(resp => resp.json())
}
//muestro los usuarios para comprobar qeu cargaron bien
getAllUsers().then(usuarios => {
  for(let i=0; i<usuarios.lenght; i++){
    console.log(usuarios[i].email);
  }
});

function getAllTasks() {
 return fetch('/data/tareas.json')
   .then(resp => resp.json());
}


// al iniciar el DOM cargará los nombres en el selector
function cuandoEsteElDOM(){
  getAllUsers()
  .then(allUsers =>{
    let template = "";
    let firstUser = allUsers[0];
    for (let i = 0; i < allUsers.length; i++) {
      template += `<option value= "${allUsers[i].id}"> ${allUsers[i].firstname}</option>`;
      //template = template + "<option>" + allUsers[i].firtsname + "</option>";
    }
    userSelect.innerHTML = template;
    userContainer.innerHTML = `` //debe estar vacío para que no muestre nombres viejos
  });
}

//cuando se cambia de nombre en el selector, refresca la info y deja de imprimir las tareas del anterior
userSelect.addEventListener('change', (event) =>{
  getAllUsers()
    .then(allUsers =>{
      const id= event.target.value;
      let SelectedUser;

      for (let i = 0; i < allUsers.length; i++) {
        if(id == allUsers[i].id){
            SelectedUser=allUsers[i];
          break
        }
      }
      let template = `
        <h3> Informacion del usuario seleccionado </h3>
        <ul>
            <li>Nombre completo: ${SelectedUser.firstname} ${SelectedUser.lastname}</li>
            <li>Email: ${SelectedUser.email}</li>
        </ul>
      `;
      userContainer.innerHTML = template;
      //pone en blanco las tareas del usuario cuando lo cambia
      taskContainer.innerHTML = ""; 

    })
})


//Cuando se presione el btn de "Buscar Tareas"
btnBuscarTarea.addEventListener('click', () =>{
  const id= parseInt(userSelect.value);

  getAllTasks()
  .then((allTasks)  =>{
    let template = "";
      for (let i =0; i < allTasks.length; i++) {
        if(id === allTasks[i].userId){
          template += 
          `
          <li>
            <span>${allTasks[i].title}</span>
            <input type="checkbox" ${allTasks[i].completed ? "checked":""}> 
          </li>
          `;//comprobé si el checkbox estaba con una palomita o no
        }   
      }
      taskContainer.innerHTML = `
        <h3>Lista de tareas del usuario</h3>
        <ul>
          ${template}
        </ul>
      `
  });

})


document.addEventListener('DOMContentLoaded', cuandoEsteElDOM);
