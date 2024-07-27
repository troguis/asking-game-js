const temporizador = document.querySelector('#temporizador');
const enviar = document.querySelector('#enviar');
const resetear = document.querySelector('#resetear');
const formulario =  document.querySelector('#formulario');


// Esperar a que se cargue el contenido de la página
document.addEventListener('DOMContentLoaded', cuentaRegresiva);
// enviar.addEventListener('click', mostrarAlerta);
enviar.addEventListener('click', validaResultado);
resetear.addEventListener('click', reiniciarPagina);


function cuentaRegresiva() {
    let tiempoRestante = 30;

    // Mostrar el tiempo inicial
    temporizador.textContent = tiempoRestante;

    const intervalo = setInterval(() => {
        tiempoRestante -= 1;
        temporizador.textContent = tiempoRestante;

        if (tiempoRestante <= 0) {
            clearInterval(intervalo);

            setTimeout(() => {
                const resultado = validarCampos();
                const fecha = obtenerFecha();
                if (!resultado.valido) {
                    mostrarAlerta('Game Over \n\nDebiste completar todos los campos');
                } else {
                    const { questionOne, questionTwo, questionThree, questionFour, questionFive } = resultado.respuestas;
                    mostrarAlerta(`Se terminó el tiempo \n\nDatos completos:\n${fecha}\n1.-${questionOne}\n2.-${questionTwo}\n3.-${questionThree}\n4.-${questionFour}\n5.-${questionFive}`);
                }
                reiniciarPagina();
            }, 1000); // Esperar 1 segundo antes de ejecutar la validación y mostrar la alerta
        }
    }, 1000);
}

function validarCampos() {
    // Obtención dinámica de los valores de los inputs cada vez que se llama a la función
    const questionOne = document.querySelector('#question1').value;
    const questionTwo = document.querySelector('#question2').value;
    const questionThree = document.querySelector('#question3').value;
    const questionFour = document.querySelector('#question4').value;
    const questionFive = document.querySelector('#question5').value;

    if (questionOne === '' || questionTwo === '' || questionThree === '' || questionFour === '' || questionFive === '') {
        return {
            valido: false
        };
    } else {
        return {
            valido: true,
            respuestas: {
                questionOne,
                questionTwo,
                questionThree,
                questionFour,
                questionFive
            }
        };
    }
}

function validaResultado() {
    const resultado = validarCampos();
    const fecha = obtenerFecha();

    if (!resultado.valido) {
        console.log(resultado.valido);
        mostrarAlerta('Debes de llenar todos los campos')
    } else{
        console.log(resultado.valido);
        const { questionOne, questionTwo, questionThree, questionFour, questionFive } = resultado.respuestas;
        mostrarAlerta(`Datos llenos:\n${fecha}\n1.-${questionOne}\n2.-${questionTwo}\n3.-${questionThree}\n4.-${questionFour}\n5.-${questionFive}`);    
    }
}

function obtenerFecha() {
    const fecha =  new Date();
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const year = String(fecha.getFullYear()).padStart(4, '0');

    return `${day}/${month}/${year}`
}

function mostrarAlerta(mensaje) {
    alert(mensaje);
}

function reiniciarPagina() {
    formulario.reset();
}