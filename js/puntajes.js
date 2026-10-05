let lista = JSON.parse(localStorage.getItem("tablaPuntajes")) || [];

let puntajeMemo = 0;
let puntajeQuiz = 0;
let puntajeGenerala = 0;

for (let i = 0; i < lista.length; i++) {

    let puntos = parseInt(lista[i].puntaje);

    if (lista[i].minijuego == "MEMORIA") {

        if (puntos > puntajeMemo) {
            puntajeMemo = puntos;
        }

    }

    if (lista[i].minijuego == "TRIVIA QUIZ") {

        if (puntos > puntajeQuiz) {
            puntajeQuiz = puntos;
        }

    }

    if (lista[i].minijuego == "GENERALA") {

        if (puntos > puntajeGenerala) {
            puntajeGenerala = puntos;
        }

    }
}

let puntajeTotal = puntajeMemo + puntajeQuiz + puntajeGenerala;

document.querySelector("#puntaje-total").innerText = puntajeTotal + " PTS";
document.querySelector("#puntaje-memo").innerText = puntajeMemo + " PTS";
document.querySelector("#puntaje-quiz").innerText = puntajeQuiz + " PTS";
document.querySelector("#puntaje-generala").innerText = puntajeGenerala + " PTS";
document.querySelector("#puntaje-total-abajo").innerText = puntajeTotal + " PTS";