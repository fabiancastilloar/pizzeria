

const ingredientesDisponibles = [
    'Carne', 'Pollo', 'Tocino', 'Mozzarella', 'Champiñón', 'Cebolla', 'Piña', 'Pimentón'
];

let ingredientesBaseArray = [];
const ingredientesSeleccionadosArray = [];
const ingredienteSeleccionado = document.getElementById('ingredientesSeleccionados');
const ingredientesExtra = document.getElementById('ingredientesExtra');

let total = 15000


const propinaInput = document.getElementById('propinaInput');
const propinaHTML = document.getElementById('propina');


        // Agrega un controlador de eventos para el clic en el campo de entrada
        propinaInput.addEventListener('click', function() {
            // Verifica si el div con id 'propina' está vacío
            if (propinaHTML.textContent == "" || propinaHTML.textContent == "0" || Number(propinaInput.value) == 0) {

                console.log("propinaHTML = " + propinaHTML.value);
                // Asigna el valor 1000 al campo de entrada
                propinaInput.value = 1000;
                // Actualiza el contenido del div con el nuevo valor
                propinaHTML.textContent = `$1000`;
            } else {
            // Extrae el valor del div y conviértelo a número
            let valorPropina = Number(propinaInput.value);
            propinaHTML.textContent = valorPropina;
            console.log('Valor asignado a propinaInput:', valorPropina);
            }

        });
 
// Selecciona todos los checkboxes con la clase 'ingredientes-checkbox'
const checkboxes = document.querySelectorAll('.ingredientes-checkbox');

//condicion de inicio
// Desmarcar todos los checkboxes al cargar la página
window.addEventListener('load', () => {
    const checkboxes = document.querySelectorAll('.ingredientes-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = false);
});


// Función para manejar el cambio en el estado de los checkboxes
function handleCheckboxChange(event) {
    const checkbox = event.target;
    if (checkbox.checked) {
        // Si el checkbox está marcado, añade el valor al arreglo
        if (!ingredientesSeleccionadosArray.includes(checkbox.value)) {
            ingredientesSeleccionadosArray.push(checkbox.value);
        }
    } else {
        // Si el checkbox no está marcado, elimina el valor del arreglo
        const index = ingredientesSeleccionadosArray.indexOf(checkbox.value);
        if (index > -1) {
            ingredientesSeleccionadosArray.splice(index, 1);
        }
    }
    console.log(ingredientesSeleccionadosArray); // Muestra el estado actual del arreglo

    muestraIngredientes();

}





// Añade un listener para el evento 'change' a cada checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
});

function muestraIngredientes() {

    //si no existen ingredientes seleccionados, entonces
    //se limpia el HTML que contiene la informacion de ellos en pantalla
    if (ingredientesSeleccionadosArray.length == 0) {
        ingredienteSeleccionado.textContent = '';
        ingredientesExtra.textContent = '';
    }


    //si hay mas de un ingrediente seleccionado...
    if (ingredientesSeleccionadosArray.length > 0) {


        //si el numero de ingredientes seleccionado es menor o igual 3...
        if (ingredientesSeleccionadosArray.length <= 3) {

            ingredientesExtra.textContent = '';

            console.log("ingredientesSeleccionadosArray = \n" + ingredientesSeleccionadosArray);

            // ingredientesBaseArray = ingredientesSeleccionadosArray 

            ingredienteSeleccionado.textContent = '';

            ingredienteSeleccionado.textContent = 'Los ingredientes seleccionados son: \n' + ingredientesSeleccionadosArray.join(', ');

        }

        //si el numero de ingredientes seleccionado es mayor a 3...
        if (ingredientesSeleccionadosArray.length > 3) {

            console.log("ingredientesSeleccionadosArray.length = " + ingredientesSeleccionadosArray.length);

            // con slice se obtiene una nuevo array a partir del índice 3 hasta el final del array o cadena original.

            //se crea un arreglo de ingredientes extra en base al tercer indice del array de ingredientes base
            let arrayIngredientesExtra = ingredientesSeleccionadosArray.slice(3);

            //le muestran en HTML los ingredientes extras
            ingredientesExtra.textContent = 'Los ingredientes extras seleccionados son: \n' + arrayIngredientesExtra.join(', ');

            ingredientesBaseArray = ingredientesSeleccionadosArray.slice(0, 3);
            //ademas se actualiza la lista de ingredientes base seleccionados
            ingredienteSeleccionado.textContent = 'Los ingredientes seleccionados son: \n' + ingredientesBaseArray.join(', ');

        }

    }
    actualizaValorPedido();
}

function actualizaValorPedido() {

    let valorAdicional = 0;

    if (ingredientesSeleccionadosArray.length > 3) {
        let cantidadIngredientesExtra = ingredientesSeleccionadosArray.length - 3
        valorAdicional = cantidadIngredientesExtra * 800;
        console.log("valor adicional = " + valorAdicional);
    } else { valorAdicional = 0 }

    const costoIngredientesExtras = document.getElementById('costoIngredientesExtras');
    costoIngredientesExtras.textContent = `$${valorAdicional}`;

    //let total = 15000

    let propinaInput = Number(document.getElementById('propinaInput').value);


    // if( propinaInput <1000){propinaInput=1000}

    total = 15000 + valorAdicional + propinaInput;

    //es el texto que indica la propina dada
    document.getElementById('propina').textContent = `$${propinaInput }`;

    //es el texto que indica el total de la compra
    document.getElementById('totalFinal').textContent = `TOTAL : $${total}`;

}



function hacerPedido() {

    let propinaInput = Number(document.getElementById('propinaInput').value);
 
    if (propinaInput <= 0) {
         alert(`Aun no ha ingresado una propina `) 
        }
    else {
 
        const miPropina = new Carrito(propinaInput);
        console.log("miPropina =" + miPropina.propina )

        total = total + miPropina.propina 

        //es la alerta que indica el total de la compra
        alert(`Pedido realizado. 
    Total a pagar: $ ${total}`);

        //se desmarcan todos los checkboxes que estuviesen marcados
        desmarcarCheckboxes();

        //se asigna un valor vacio al campo de entrada de porpina para que tome su lugar el mensaje
        //del placeholder
        document.getElementById('propinaInput').value = '';

        //la pagina se inicializa de nuevo
        window.location.reload();

    }//fin else
 
}//fin  hacerPedido()


// Función para desmarcar todos los checkboxes
function desmarcarCheckboxes() {
    const checkboxes = document.querySelectorAll('.ingredientes-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}



//clase carrito

class Carrito{

    //valor por defecto en propina es 1000
    constructor( propina = 1000){
 
        this.propina = propina; 
    }
 
    propina(){
        return this.propina;
    } 

}

  
