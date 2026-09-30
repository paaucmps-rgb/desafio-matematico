// ==========================================
// PUNTUACIÓN
// ==========================================

let puntuacion = 0;


// ==========================================
// FUNCIÓN PARA MOSTRAR CADA JUEGO
// ==========================================

function mostrarJuego(tipo) {

    if (tipo === "calculo") {
        mostrarCalculo();
    }

    if (tipo === "anterior") {
        mostrarAnteriorPosterior();
    }

    if (tipo === "mayor") {
        mostrarMayorMenor();
    }
}


// ==========================================
// 1. CÁLCULO RÁPIDO
// ==========================================

function mostrarCalculo() {

    const juego = document.getElementById("juego");

    // Generamos dos números aleatorios
    const numero1 = Math.floor(Math.random() * 10) + 1;
    const numero2 = Math.floor(Math.random() * 10) + 1;

    // Elegimos suma o resta
    const operaciones = ["+", "-"];
    const operacion =
        operaciones[Math.floor(Math.random() * operaciones.length)];

    let resultado;

    if (operacion === "+") {
        resultado = numero1 + numero2;
    } else {
        resultado = numero1 - numero2;
    }

    // Creamos tres posibles respuestas
    let respuestas = [
        resultado,
        resultado + 2,
        resultado - 2
    ];

    // Mezclamos las respuestas
    respuestas.sort(() => Math.random() - 0.5);

    juego.innerHTML = `
        <h2>➕ Cálculo rápido</h2>

        <p>¿Cuánto es?</p>

        <h2>${numero1} ${operacion} ${numero2} = ?</h2>

        <div>

            <button class="respuesta"
                onclick="comprobarRespuesta(${respuestas[0]}, ${resultado})">
                ${respuestas[0]}
            </button>

            <button class="respuesta"
                onclick="comprobarRespuesta(${respuestas[1]}, ${resultado})">
                ${respuestas[1]}
            </button>

            <button class="respuesta"
                onclick="comprobarRespuesta(${respuestas[2]}, ${resultado})">
                ${respuestas[2]}
            </button>

        </div>

        <p class="puntuacion">
            Puntuación: ${puntuacion}
        </p>

        <button class="volver" onclick="volverMenu()">
            ↩️ Volver al menú
        </button>
    `;
}


// Comprobar respuesta del cálculo

function comprobarRespuesta(respuesta, correcta) {

    if (respuesta === correcta) {

        puntuacion++;

        alert("¡Correcto! 🎉");

    } else {

        alert("No es correcto. ¡Inténtalo de nuevo! 🙂");
    }

    mostrarCalculo();
}


// ==========================================
// 2. NÚMERO ANTERIOR Y POSTERIOR
// ==========================================

// Guardamos el número actual
let numeroAnteriorPosterior = 0;

// Guardamos si ya se ha respondido cada pregunta
let anteriorRespondido = false;
let posteriorRespondido = false;


// Mostrar el juego

function mostrarAnteriorPosterior() {

    const juego = document.getElementById("juego");

    // Generamos un número entre 2 y 49
    numeroAnteriorPosterior =
        Math.floor(Math.random() * 48) + 2;

    // Reiniciamos las respuestas
    anteriorRespondido = false;
    posteriorRespondido = false;

    const anterior = numeroAnteriorPosterior - 1;
    const posterior = numeroAnteriorPosterior + 1;


    juego.innerHTML = `

        <h2>🔢 Anterior y posterior</h2>

        <h2>
            El número es: ${numeroAnteriorPosterior}
        </h2>


        <p>
            <strong>1. ¿Cuál es el número ANTERIOR?</strong>
        </p>


        <button
            id="botonAnterior1"
            class="respuesta"
            onclick="responderAnterior(${anterior})">

            ${anterior}

        </button>


        <button
            id="botonAnterior2"
            class="respuesta"
            onclick="responderAnterior(${posterior})">

            ${posterior}

        </button>


        <hr>


        <p>
            <strong>2. ¿Cuál es el número POSTERIOR?</strong>
        </p>


        <button
            id="botonPosterior1"
            class="respuesta"
            onclick="responderPosterior(${anterior})">

            ${anterior}

        </button>


        <button
            id="botonPosterior2"
            class="respuesta"
            onclick="responderPosterior(${posterior})">

            ${posterior}

        </button>


        <p id="mensajeAnteriorPosterior"></p>


        <p class="puntuacion">
            Puntuación: ${puntuacion}
        </p>


        <button
            class="volver"
            onclick="volverMenu()">

            ↩️ Volver al menú

        </button>
    `;
}


// ==========================================
// RESPONDER AL ANTERIOR
// ==========================================

function responderAnterior(respuesta) {

    // Si ya se ha respondido, no hacemos nada
    if (anteriorRespondido) {
        return;
    }

    const correcta = numeroAnteriorPosterior - 1;

    const mensaje =
        document.getElementById("mensajeAnteriorPosterior");


    if (respuesta === correcta) {

        puntuacion++;

        anteriorRespondido = true;

        mensaje.innerHTML +=
            "<br>✅ ¡Número anterior correcto!";

    } else {

        mensaje.innerHTML +=
            "<br>❌ El número anterior correcto era " + correcta;
    }


    comprobarFinAnteriorPosterior();
}


// ==========================================
// RESPONDER AL POSTERIOR
// ==========================================

function responderPosterior(respuesta) {

    // Si ya se ha respondido, no hacemos nada
    if (posteriorRespondido) {
        return;
    }

    const correcta = numeroAnteriorPosterior + 1;

    const mensaje =
        document.getElementById("mensajeAnteriorPosterior");


    if (respuesta === correcta) {

        puntuacion++;

        posteriorRespondido = true;

        mensaje.innerHTML +=
            "<br>✅ ¡Número posterior correcto!";

    } else {

        mensaje.innerHTML +=
            "<br>❌ El número posterior correcto era " + correcta;
    }


    comprobarFinAnteriorPosterior();
}


// ==========================================
// COMPROBAR SI LAS DOS PREGUNTAS ESTÁN
// COMPLETADAS
// ==========================================

function comprobarFinAnteriorPosterior() {

    const mensaje =
        document.getElementById("mensajeAnteriorPosterior");


    if (anteriorRespondido && posteriorRespondido) {

        mensaje.innerHTML += `

            <br><br>

            🎉 ¡Has completado las dos preguntas!

            <br><br>

            <button
                class="respuesta"
                onclick="mostrarAnteriorPosterior()">

                ➡️ Siguiente número

            </button>
        `;
    }
}


// ==========================================
// 3. MAYOR O MENOR
// ==========================================

function mostrarMayorMenor() {

    const juego = document.getElementById("juego");

    // Generamos dos números diferentes

    let numero1 =
        Math.floor(Math.random() * 50) + 1;

    let numero2 =
        Math.floor(Math.random() * 50) + 1;


    // Evitamos que sean iguales

    while (numero1 === numero2) {

        numero2 =
            Math.floor(Math.random() * 50) + 1;
    }


    let mayor;

    if (numero1 > numero2) {

        mayor = numero1;

    } else {

        mayor = numero2;
    }


    juego.innerHTML = `

        <h2>⚖️ Mayor o menor</h2>

        <p>
            ¿Cuál de estos números es MAYOR?
        </p>


        <button
            class="respuesta"
            onclick="comprobarMayor(${numero1}, ${mayor})">

            ${numero1}

        </button>


        <button
            class="respuesta"
            onclick="comprobarMayor(${numero2}, ${mayor})">

            ${numero2}

        </button>


        <p class="puntuacion">

            Puntuación: ${puntuacion}

        </p>


        <button
            class="volver"
            onclick="volverMenu()">

            ↩️ Volver al menú

        </button>
    `;
}


// Comprobar mayor

function comprobarMayor(respuesta, correcta) {

    if (respuesta === correcta) {

        puntuacion++;

        alert("¡Correcto! 🎉");

    } else {

        alert("No es correcto. ¡Inténtalo de nuevo! 🙂");
    }

    mostrarMayorMenor();
}


// ==========================================
// VOLVER AL MENÚ
// ==========================================

function volverMenu() {

    const juego = document.getElementById("juego");

    juego.innerHTML = `

        <h2>¡Elige una actividad!</h2>

        <p>
            Pulsa uno de los botones para comenzar.
        </p>

    `;
}