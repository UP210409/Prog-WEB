export async function getAllUsers(){
    const resp = await fetch("/crud/api/getUsers.php");
    //solo se puede usar el async await en funciones
    
    const json = await resp.json();

   return json;
};

export async function createTask(formdata) {
     const res = await fetch(`/crud/api/createTask.php`,{
          method:"POST",
          body: formdata
     });
     const json = await res.json();
     return json;
};

export async function getTask(taskId){
    const res = await fetch(`/crud/api/getTask.php?id=${taskId}`);
    const json = await res.json();
    return json;
};

export async function getTaskByUserId(idUser) {
    const res = await fetch(`/crud/api/getTasks.php?id=${idUser}`);
    const json = await res.json();
    return json;
};

export async function deleteTask(taskId){
     console.log(taskId)
     const res = await fetch(`/crud/api/deleteTask.php?id=${taskId}`);
     const json = await res.json();
     console.log(json);
     return json;
};

export async function updateTask(formdata,taskId) {
    const res = await fetch(`/crud/api/updateTask.php?id=${taskId}`,{
         method:"POST",
         body: formdata
    });
    const json = await res.json();
    return json;
};

