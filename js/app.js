const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {

    ui.llenarOpciones();

});




function seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI() {};


UI.prototype.llenarOpciones = () => {

    let max = new Date().getFullYear();
    let min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {

        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);


    }
}

eventListeners();

function eventListeners() {

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);

}

function cotizarSeguro(e) {
    e.preventDefault();

    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;


    if (marca == '' || year == '' || tipo == '') {
        console.log('no pasa la validacion');
    } else {
        console.log('Pasada');
    }
}