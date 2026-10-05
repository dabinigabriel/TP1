//variables

let dados = [0, 0, 0, 0, 0];

let dadosGuardados = [false, false, false, false, false];

let tiradas = 3;

let puntaje = 0;

//elementos HTML

const dadosHTML = document.querySelectorAll(".dado img");

const dadosDiv = document.querySelectorAll(".dado");

const botonTirar = document.querySelector("#tirar");

const textoTiradas = document.querySelector("#tiradas");

const botonesCategorias = document.querySelectorAll(".boton-generala");

const textoPuntaje = document.querySelector("#puntaje");

//dados

for (let i = 0; i < 5; i++) {

    dadosDiv[i].addEventListener("click", function() {

        if (dadosGuardados[i] == false) {

            dadosGuardados[i] = true;

        } else {

            dadosGuardados[i] = false;

        }

    });

}

//tirar dados

botonTirar.addEventListener("click", function() {

    if (tiradas > 0) {

        for (let i = 0; i < 5; i++) {

            if (dadosGuardados[i] == false) {

                dados[i] = Math.floor(Math.random() * 6) + 1;

                dadosHTML[i].src =
                    "img/dado" + dados[i] + ".png";

            }

        }

        tiradas--;

        textoTiradas.textContent = tiradas;

    }

});

//botones de categorias

for (let i = 0; i < botonesCategorias.length; i++) {

    botonesCategorias[i].addEventListener("click", function() {

        if (tiradas < 3) {

            calcularPuntaje(i);

        }

    });

}

//calcular puntaje

function calcularPuntaje(categoria) {

    let puntos = 0;

    //categorias del 1 al 6

     if (categoria >= 0 && categoria <= 5) {

        let numero = categoria + 1;

        for (let i = 0; i < 5; i++) {

            if (dados[i] == numero) {

                puntos = puntos + numero;

            }

        }

        mostrarPuntaje(categoria, puntos);

    }
//escalera

 if (categoria == 6) {

        if (esEscalera()) {

            puntos = 20;

        }

        mostrarPuntaje(categoria, puntos);

    }

    //full

     if (categoria == 7) {

        if (esFull()) {

            puntos = 30;

        }

        mostrarPuntaje(categoria, puntos);

    }

    //poker

      if (categoria == 8) {

        if (esPoker()) {

            puntos = 40;

        }

        mostrarPuntaje(categoria, puntos);

    }

    //generala

     if (categoria == 9) {

        if (esGenerala()) {

            puntos = 50;

        }

        mostrarPuntaje(categoria, puntos);

    }

   // sumar puntaje

puntaje = puntaje + puntos;

textoPuntaje.textContent = puntaje;

// desactivar

botonesCategorias[categoria].disabled = true;

// guardar cuando termina la partida

if (categoria == 9) {
    guardarPuntaje();
}

// nueva ronda

nuevaRonda();

}

//detectar escalera

function esEscalera() {

    let tiene1 = false;
    let tiene2 = false;
    let tiene3 = false;
    let tiene4 = false;
    let tiene5 = false;
    let tiene6 = false;


    for (let i = 0; i < 5; i++) {

        if (dados[i] == 1) {
            tiene1 = true;
        }

        if (dados[i] == 2) {
            tiene2 = true;
        }

        if (dados[i] == 3) {
            tiene3 = true;
        }

        if (dados[i] == 4) {
            tiene4 = true;
        }

        if (dados[i] == 5) {
            tiene5 = true;
        }

        if (dados[i] == 6) {
            tiene6 = true;
        }

    }


    if (
        tiene1 == true &&
        tiene2 == true &&
        tiene3 == true &&
        tiene4 == true &&
        tiene5 == true
    ) {

        return true;

    }


    if (
        tiene2 == true &&
        tiene3 == true &&
        tiene4 == true &&
        tiene5 == true &&
        tiene6 == true
    ) {

        return true;

    }


    return false;
}

//detectar full

function esFull() {

    let tres = false;
    let dos = false;


    for (let numero = 1; numero <= 6; numero++) {

        let cantidad = 0;


        for (let i = 0; i < 5; i++) {

            if (dados[i] == numero) {

                cantidad++;

            }

        }


        if (cantidad == 3) {

            tres = true;

        }


        if (cantidad == 2) {

            dos = true;

        }

    }


    if (tres == true && dos == true) {

        return true;

    }


    return false;
}

//detectar poker

function esPoker() {

    for (let numero = 1; numero <= 6; numero++) {

        let cantidad = 0;


        for (let i = 0; i < 5; i++) {

            if (dados[i] == numero) {

                cantidad++;

            }

        }


        if (cantidad == 4) {

            return true;

        }

    }


    return false;
}

//detectar generala

function esGenerala() {

    if (
        dados[0] == dados[1] &&
        dados[1] == dados[2] &&
        dados[2] == dados[3] &&
        dados[3] == dados[4]
    ) {

        return true;

    }


    return false;
}

//mostrar puntaje

function mostrarPuntaje(categoria, puntos) {

    if (categoria == 0) {

        document.querySelector("#puntaje1").textContent = puntos;

    }

    if (categoria == 1) {

        document.querySelector("#puntaje2").textContent = puntos;

    }

    if (categoria == 2) {

        document.querySelector("#puntaje3").textContent = puntos;

    }

    if (categoria == 3) {

        document.querySelector("#puntaje4").textContent = puntos;

    }

    if (categoria == 4) {

        document.querySelector("#puntaje5").textContent = puntos;

    }

    if (categoria == 5) {

        document.querySelector("#puntaje6").textContent = puntos;

    }

    if (categoria == 6) {

        document.querySelector("#puntajeEscalera").textContent = puntos;

    }

    if (categoria == 7) {

        document.querySelector("#puntajeFull").textContent = puntos;

    }

    if (categoria == 8) {

        document.querySelector("#puntajePoker").textContent = puntos;

    }

    if (categoria == 9) {

        document.querySelector("#puntajeGenerala").textContent = puntos;

    }

}

//nueva ronda

function nuevaRonda() {

    tiradas = 3;

    textoTiradas.textContent = tiradas;

    for (let i = 0; i < 5; i++) {

        dadosGuardados[i] = false;

        dados[i] = 0;

        dadosHTML[i].src = "img/dado1.png";

    }

}


function guardarPuntaje() {

    let lista = JSON.parse(localStorage.getItem("tablaPuntajes")) || [];

    lista.push({
        jugador: "JUGADOR 1",
        minijuego: "GENERALA",
        puntaje: puntaje + " PTS"
    });

    localStorage.setItem("tablaPuntajes", JSON.stringify(lista));

    alert("¡PARTIDA TERMINADA!\nPuntaje total: " + puntaje + " PTS");
}