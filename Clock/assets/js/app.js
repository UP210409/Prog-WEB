const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const formAlarm = document.getElementById('form-alarm');
let isPermitShowNotification = false;
let isCreatedNotification = false;

document.addEventListener ('DOMContentLoaded', (e) =>{
    if ('Notification in window') {
        Notification.requestPermission((request) =>{
            isPermitShowNotification = request === 'granted';
            //console.log(isPermitShowNotification)
            if (isPermitShowNotification) {
                const [input, button] = formAlarm.children;
                input.value = t
                input.disabled = true;
                button.disabled = true;
            }
            
        });    
    }
    /*
    if(localStorage.getItem('alarma')!==null){
        const input = formAlarm.children[0];
        const alarm = new Date(localStorage.getItem('alarma'))
        input.value = formatNumber(alarm.get)
    }
    */
})

function formatNumber(value) {
    if(value<10)
        return "0"+value;
    return value;
}

function getCurrentTime(){
    const currentDate = new Date();

    const currentHours = currentDate.getHours();        
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();

    hours.innerText = formatNumber(currentHours);
    minutes.innerText = formatNumber(currentMinutes);
    seconds.innerText = formatNumber(currentSeconds);
}

document.addEventListener('DOMContentLoaded', function(){
    
    getCurrentTime();

    setInterval(function(){
        getCurrentTime();
    }, 1000);
    
});

formAlarm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const value = formdata.get('time');

    if (value === null || value === ""){
        alert("Seleccione una hora :(");
    }else{
        //Obtengo la hora y minutos de la alarma
        let alarmHours = parseInt(value.substring(0,2));
        let alarmMinutes = parseInt(value.substring(3));
        
        const currentDate = new Date();

        const HorasIguales = currentDate.getHours() === alarmHours;
        const HorasMenores = currentDate.getHours() > alarmHours;
        const MinutosMenoresIguales = currentDate.getMinutes() >= alarmMinutes;
        const setAlarm = new Date();

        if(HorasMenores || HorasIguales && MinutosMenoresIguales){ 
            setAlarm.setDate(setAlarm.getDate() + 1);
        }
        setAlarm.setHours(alarmHours);
        setAlarm.setMinutes(alarmMinutes);
        setAlarm.setSeconds(0);

        console.log(setAlarm);

        console.log(value);

        localStorage.setItem("Alarm",setAlarm.toString());
    }

});