const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');


function getAllUsers() {
  return fetch('/data/usuarios.json')
  .then(resp => resp.json())
}

getAllUsers().then(usuarios => {
  for(let i=0; i<usuarios.lenght; i++){
    console.log(usuarios[i].email);
  }
});