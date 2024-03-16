function add(a,b, fun){
    let sum = a+b;
    fun(sum);
}

add(2,10, function(x){
    alert(x)
});

//callback un parámetro que tiene como parámetro otra función

setTimeout(function(){
    alert("hola")
}, 3000);

// sincrono: es secuencial
//asincrono: pueden pasar al mismo tiempo diferentes actividades 