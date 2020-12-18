const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {

    ui.llenarOpciones();

});




function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}


//Realizar la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {

    let cantidad;
    const base = 2000;

    switch (this.marca) {

        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05;
            break;

        case '3':
            cantidad = base * 1.35;
            break;

        default:
            break;
    }


    //El precio del seguro baja un 3% por año de antigüedad 
    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia * 3) * cantidad) / 100;


    //Seguro básico se multiplica por 30%
    //Seguro completo se multiplica por 50%

    if (this.tipo === 'básico') {
        cantidad == 1.30;

    } else {
        cantidad == 1.50;
    }

    return cantidad;


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
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Calculando...', 'exito');


    //oculttar las cotizciones previas

    const resultados = document.querySelector('#resultado div');

    if (resultados != null) {
        resultados.remove();
    }


    const seguro = new Seguro(marca, year, tipo);

    const total = seguro.cotizarSeguro();

    ui.mostrarResultado(total, seguro);
}


//Mostrar alertas en pantalla

UI.prototype.mostrarMensaje = function (mensaje, tipo) {

    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));


    setTimeout(() => {

        div.remove();

    }, 2000);

}


UI.prototype.mostrarResultado = function (total, seguro) {

    const {
        marca,
        year,
        tipo
    } = seguro;

    let textoMarca;

    switch (marca) {

        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiático';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;

        default:
            break;
    }

    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
             <p class="header">Tu resumen</p>
             <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca}</span></p>
             <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
             <p class="font-bold">Año: <span class="font-normal capitalize"> ${tipo}</span></p>
             <p class="font-bold">Total: <span class="font-normal"> ${total}€</span></p>
             `;

    const resultadoDiv = document.querySelector('#resultado');


    //mostras el spinner

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 2000);

}