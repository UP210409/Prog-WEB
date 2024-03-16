function getUsers(callback) {
    setTimeout( () => {
        const users = [
            {name: "Rogelio", years: 22},
            {name: "Luis", years: 30}
        ];
        callback(users);
    },2000);
}

function getUserWithPromise(){
    const promise = new Promise((resolve, reject) => {
        setTimeout( () => {
            const users = [
                {name: "Rogelio", years: 22},
                {name: "Luis", years: 30}
            ];
            resolve(users);
        },2000);
    });
    return promise;
}

function getInfo(name, callback){
    setTimeout(() =>{
        const saludo = "Hola "+ name +", como estas??";
        let error= null;
        if (name==="Rogelio") {
            error = new Error("Está mal el nombre :(");

        }
        callback(saludo, error);
    },5000)
}

function getInfoWithPromise(name){
    return new promise((resolve,reject) =>{
        setTimeout(() =>{
            const saludo = "Hola "+ name +", como estas??";
            let error= null;
            if (name==="Rogelio") {
                reject(new Error("Está mal el nombre :("));
            }
            else{
                resolve(saludo, error);
            }
           
        },5000)
    });
}


getUsers((users) =>{
    for (let i = 0; i < users.length; i++) {
        getInfo(users[i].name, (saludo, error) =>{
            if (error !==null) {
                console.log("Existe un error: ", error);
            }else{
                console.log(saludo)
                }
        });
    }
})

getUsersWithPromise()
    .then((users) =>{
        let newResponses = [];
        for (let i = 0; i < users.length; i++) {
            newResponses.push(getInfoWithPromise(users[i].name))
        }
        return Promise.all(newResponses)
    })
    .then((info) =>{
        console.log(info);
    })
    .catch((error) =>{
        console.log("error en la promesa; ", error);
    });

async function main(){
    let users = await getUsersWithPromise();
    for (let i = 0; i < users.length; i++) {
        try {
            let saludo = await getInfoWithPromise(users[i].name);
            console.log(saludo);
        } catch (error) {
            console.log(error);
        }
    }
}
main();

const btn= document.getElementById(btn);

btn.addEventListener('dblclick', () =>{
    fetch('/info.json') //fetch es solicitud
        .then((response) => {
            console.log(response);
        })
})