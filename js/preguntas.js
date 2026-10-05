let preguntas = []; 
let indicePreguntaActual = 0; 
let puntaje = 0;

const URL_API = "https://opentdb.com/api.php?amount=12&category=15&difficulty=medium&type=multiple";

const btnIniciar = document.getElementById('btn-iniciar-quiz');
const mensajeCargando = document.getElementById('mensaje-cargando'); 
const contenedorPregunta = document.getElementById('contenedor-pregunta');
const textoPregunta = document.getElementById('texto-pregunta');
const opcionesRespuestas = document.getElementById('opciones-respuestas');
const spanNumPregunta = document.getElementById('num-pregunta');
const spanPuntaje = document.getElementById('puntaje-quiz');

function decodificarTexto(texto) {
     let area = document.createElement('textarea'); 
     area.innerHTML = texto; 
     return area.value; 
    }

    btnIniciar.addEventListener('click', function() { 
        btnIniciar.style.display = 'none'; 
        mensajeCargando.innerText = 'CARGANDO PREGUNTAS DESDE LA API...'; 
        mensajeCargando.style.display = 'block'; 
        contenedorPregunta.style.display = 'none';

        fetch(URL_API) 
         .then(function(respuesta) { 
            return respuesta.json(); // Convertir la respuesta a JSON 
            })
            .then(function(datos) { 
                mensajeCargando.style.display = 'none'; 
                preguntas = datos.results; 

                indicePreguntaActual = 0; 
                puntaje = 0; 
                spanPuntaje.innerText = puntaje;
                contenedorPregunta.style.display = 'block'; 
                mostrarPregunta(); 
            })

            .catch(function(error) { 
                mensajeCargando.innerText = 'ERROR AL CARGAR LA API. INTENTA NUEVAMENTE.';
                btnIniciar.innerText = 'REINTENTAR CARGA'; 
                btnIniciar.style.display = 'inline-block'; 
                console.log('Error al conectar con la API:', error);
            }); 
        });

        function mostrarPregunta() { 
            let preguntaActual = preguntas[indicePreguntaActual];

            spanNumPregunta.innerText = (indicePreguntaActual + 1) + '/12';
            textoPregunta.innerText = decodificarTexto(preguntaActual.question);

            let listaOpciones = []; 
            listaOpciones.push(preguntaActual.correct_answer);

            for (let i = 0; i < preguntaActual.incorrect_answers.length; i++) { 
                listaOpciones.push(preguntaActual.incorrect_answers[i]); 
            }

            listaOpciones.sort(function() { 
                return Math.random() - 0.5;
            });
            opcionesRespuestas.innerHTML = '';

            for (let i = 0; i < listaOpciones.length; i++) { 
                let opcionTexto = decodificarTexto(listaOpciones[i]); 
                let btnOpcion = document.createElement('button'); 
                btnOpcion.classList.add('btn-opcion'); 
                btnOpcion.innerText = (i + 1) + '. ' + opcionTexto;

                btnOpcion.addEventListener('click', function() { 
                    evaluarRespuesta(opcionTexto, preguntaActual.correct_answer); 

                });

                opcionesRespuestas.appendChild(btnOpcion); 
            } 
            }

            function evaluarRespuesta(opcionElegida, respuestaCorrecta) { 
                if (opcionElegida === decodificarTexto(respuestaCorrecta)) { 
                puntaje += 100; // Otorga 100 PTS por acierto 
                alert('¡CORRECTO! +100 PTS');
                } else { 
                    alert('INCORRECTO. La respuesta era: ' + 
                    decodificarTexto(respuestaCorrecta)); 
                }
                spanPuntaje.innerText = puntaje; 
                indicePreguntaActual++;

                if (indicePreguntaActual < preguntas.length) { 
                    mostrarPregunta(); 
                } else {
                    finalizarTrivia(); } 
                }

                function finalizarTrivia() { 
                    contenedorPregunta.style.display = 'none'; 
                    btnIniciar.innerText = 'JUGAR DE NUEVO'; 
                    btnIniciar.style.display = 'inline-block';

                    alert('¡TRIVIA FINALIZADA!\nPuntaje total: ' + puntaje + ' PTS');

                    let lista = JSON.parse(localStorage.getItem('tablaPuntajes')) || [];
                    lista.push({ 
                        jugador: 'JUGADOR 1', 
                        minijuego: 'TRIVIA QUIZ', 
                        puntaje: puntaje + ' PTS' 
                    });

                    localStorage.setItem('tablaPuntajes', JSON.stringify(lista)); 
                }
