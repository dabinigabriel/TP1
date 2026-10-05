// Lista con exactamente 7 pares (14 cartas en total) 
let listaImagenes = [ 
    'img/mario.png', 'img/mario.png', 
    'img/luigi.png', 'img/luigi.png', 
    'img/peach.png', 'img/peach.png', 
    'img/yoshi.png', 'img/yoshi.png', 
    'img/toad.png', 'img/toad.png', 
    'img/bowser.png','img/bowser.png', 
    'img/star.png', 'img/star.png' 
];



let tiempoRestante = 60; 
let reloj = null; 
let juegoIniciado = false; 
let puntaje = 0; 
let parejasEncontradas = 0; 
let cartasSeleccionadas = []; 
let bloqueado = false;

const tablero = document.getElementById('tablero-cartas'); 
const btnIniciar = document.getElementById('btn-jugar'); 
const spanTiempo = document.getElementById('temporizador'); 
const spanPuntaje = document.getElementById('puntaje-actual');


//Mezclar las cartas de forma aleatoria
function mezclarCartas(arreglo) {
for (let i = arreglo.length - 1; i > 0; i--) { 
    let j = Math.floor(Math.random() * (i + 1)); 
    let aux = arreglo[i]; 
    arreglo[i] = arreglo[j]; 
    arreglo[j] = aux; 
} 
}
//Armar el tablero con las cartas mezcladas
function armarTablero() { 
    tablero.innerHTML = ''; 
    mezclarCartas(listaImagenes);

    for (let i = 0; i < listaImagenes.length; i++) { 
        let carta = document.createElement('div'); 
        carta.classList.add('carta'); 
        carta.dataset.imagen = listaImagenes[i];
    carta.innerHTML = ` 
    <span class="reverso">?</span>
    <img src="${listaImagenes[i]}" alt="Personaje">
    `;

    carta.addEventListener('click', function() {
         voltearCarta(carta); 
        }); 
        tablero.appendChild(carta); 
    } 
}


//Botón para iniciar el juego y arrancar el temporizador
btnIniciar.addEventListener('click', function() { 
    if (juegoIniciado) return;
    juegoIniciado = true; 
    puntaje = 0; 
    parejasEncontradas = 0; 
    tiempoRestante = 60; 
    spanPuntaje.innerText = puntaje;


    //Desbloquea el tablero
    tablero.classList.remove('bloqueado'); 
    btnIniciar.innerText = 'JUGANDO...'; 
    btnIniciar.disabled = true;

    reloj = setInterval(function() { 
        tiempoRestante--;

    let textoSegundos = tiempoRestante < 10 ? '0' + tiempoRestante :
     tiempoRestante;
     spanTiempo.innerText = '00:' + textoSegundos;
     if (tiempoRestante <= 0) {
         terminarJuego('¡TIEMPO AGOTADO!');
         } 
        }, 1000); 
    });

    function voltearCarta(carta) {
         if (!juegoIniciado || bloqueado || carta.classList.contains('volteada') || 
         carta.classList.contains('descubierta')) { 
            return; 
        }

        carta.classList.add('volteada'); 
        cartasSeleccionadas.push(carta);

        // Cuando se seleccionan dos cartas

        if (cartasSeleccionadas.length === 2) { 
            bloqueado = true;
             let c1 = cartasSeleccionadas[0];
            let c2 = cartasSeleccionadas[1];

            if (c1.dataset.imagen === c2.dataset.imagen) { puntaje += 6; // +6 puntos por par correcto 
            parejasEncontradas++; 
            c1.classList.add('descubierta'); 
            c2.classList.add('descubierta'); 
            cartasSeleccionadas = []; 
            bloqueado = false;

            if (parejasEncontradas === 7) {
                 terminarJuego('¡FELICITACIONES! GANASTE EL JUEGO'); 
            }
           } else { 
            
           puntaje = puntaje - 3; 
           if (puntaje < 0) {
             puntaje = 0; 
              }
           setTimeout(function() { 
            c1.classList.remove('volteada'); 
            c2.classList.remove('volteada'); 
            cartasSeleccionadas = []; 
            bloqueado = false; 
        }, 1000); 
    }
    spanPuntaje.innerText = puntaje; 
}
}

//Finalizar partida y guardar en localStorage

function terminarJuego(mensaje) {
    clearInterval(reloj); 
    uegoIniciado = false; 
    tablero.classList.add('bloqueado');
    btnIniciar.innerText = 'VOLVER A JUGAR';
    btnIniciar.disabled = false;

    alert(mensaje + '\nPuntaje obtenido: ' + puntaje + ' PTS');

    guardarPuntaje('JUGADOR 1', 'MEMORIA', puntaje); 
}
function guardarPuntaje(jugador, juego, puntos) { 
    let lista = JSON.parse(localStorage.getItem('tablaPuntajes')) || [];

    lista.push({ jugador: jugador, minijuego: juego, puntaje: puntos + ' PTS' 

    });

localStorage.setItem('tablaPuntajes', JSON.stringify(lista));

}
armarTablero();