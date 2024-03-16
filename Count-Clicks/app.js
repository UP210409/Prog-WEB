// Primera forma de recuperar un elemento html
const ContainerCliks = document.getElementById('container-clicks');
console.log(ContainerCliks);
// Segunda forma como si fueran selectores de css
const btnIncrement = document.querySelector('.btn-primary');
const btnDecrement = document.querySelector('.btn-secondary');
const btnReset = document.querySelector('.btn-reset');
console.log(btnIncrement, btnDecrement, btnReset);

let cont = 0;

btnIncrement.onclick = function() {
    cont++;
    ContainerCliks.innerText = cont;
}

btnDecrement.onclick = function() {
    cont--;
    ContainerCliks.innerText = cont;
}
btnReset.onclick = () => {
    cont=0;
    ContainerCliks.innerText = cont;
}
