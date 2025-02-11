let paginaActual = 'inicio';
let subseccionActual = 'apertura';
let nombreUsuario = '';
let apellidosUsuario = '';
let gradoUsuario = '';
let institucionUsuario = '';
let currentUser = null;
let respuestas = [];

let juegoCompletado = false;
let parejas = [1, 2, 3, 4, 5, 6, 7];
let parejasRestantes = [...parejas];
let parejasCorrectas = [2, 2, 2, 1, 1, 2, 2]; // Actualizado con los valores correctos
let parejaActual;
let imagenSeleccionada = null;
let respuestaEnviada = false;
let puntuacion = 0;

let comicIndex = 0;

function cargarContenido(pagina) {
    paginaActual = pagina;
    subseccionActual = 'apertura';
    actualizarMenus();
    actualizarContenido();
    mostrarOcultarMenuSecundario();
    if (paginaActual === 'morfologia' && subseccionActual === 'actividades') {
        iniciarJuegoIdentificacion();
        }
}

function cargarSubseccion(subseccion) {
    subseccionActual = subseccion;
    actualizarMenus();
    actualizarContenido();
}

function actualizarMenus() {
    // Actualizar menú principal
    document.querySelectorAll('.menu-item a').forEach(item => {
        item.classList.remove('activo');
    });
    document.querySelector(`.menu-item a[onclick="cargarContenido('${paginaActual}')"]`).classList.add('activo');

    // Actualizar menú secundario
    document.querySelectorAll('#menu-secundario a').forEach(item => {
        item.classList.remove('activo');
    });
    document.querySelector(`#menu-secundario a[onclick="cargarSubseccion('${subseccionActual}')"]`).classList.add('activo');
}

function actualizarContenido() {
    const contenido = document.getElementById('contenido');
    let titulo = '';
    let texto = '';

    switch (paginaActual) {
        case 'inicio':
            titulo = `Bienvenido al Curso de Insectos para Niños`;
            texto = `
                <div class="contenido-inicio">
                    <div class="texto-inicio">
                        <p>¡Hola, ${currentUser.nombre}! ¿Estás listo para una aventura increíble?</p>
                        
                        <p>En este curso, vas a:</p>
                        <ul>
                            <li>Descubrir los superpoderes secretos de los insectos</li>
                            <li>Aprender cómo las abejas hacen la miel más dulce</li>
                            <li>Ver cómo las mariposas se transforman como por magia</li>
                            <li>Entender por qué los insectos son los superhéroes de la naturaleza</li>
                        </ul>
                        
                        <p>¿Listo para convertirte en un experto en insectos? ¡Vamos a explorar!</p>
                    </div>
                    <div class="imagen-inicio">
                        <img src="imagenes/abeja_anime.jpg" alt="Abeja anime polinizando una flor" class="abeja-anime">
                    </div>
                </div>
            `;
            break;
        case 'morfologia':
            titulo = 'Morfología de los Insectos';
            if (subseccionActual === 'actividades') {
                texto = `
                    <div class="contenido-fundamento">
                        <h2>Actividad: Explorando la Caja Entomológica</h2>
                        <div class="actividad-container">
                            <div class="texto-actividad">
                                <p>¡Hola! En esta emocionante actividad, vas a explorar la caja entomológica que se encuentra en tu aula de clase. Primero, reúnete en un grupo pequeño y observa con atención los diferentes insectos en la caja. Luego, observa con atención los detalles de cada uno de ellos.</p>
                                <p>Conocerás a una inteligencia artificial especial llamada Google Lens que te ayudará a identificar cada uno de los insectos: enciende la tableta o computadora, abre la aplicación, toma una foto del insecto y la inteligencia artificial te dará información sobre él.</p>
                                <p>Finalmente, comparte con la clase lo que aprendiste y discute las diferencias y similitudes entre los insectos investigados. Recuerda ser cuidadoso y respetuoso con los insectos y los materiales, y disfruta explorando el fascinante mundo de los insectos.</p>
                            </div>
                            <div class="imagen-container">
                                <img src="imagenes/insectos_lens.jpg" alt="Insectos y Google Lens" class="imagen-lens">
                            </div>
                        </div>
                    </div>
                `;
            } else if (subseccionActual === 'apertura') {
                if (!juegoCompletado) {
                    texto = `
                        <p>Antes de comenzar esta aventura, vamos a ver que tanto conoces a los insectos.</p>
                        <button onclick="iniciarJuegoIdentificacion()" id="botonJugar" class="btn btn-primary">¡Vamos a jugar!</button>
                        <div id="juego-identificacion" style="display: none;"></div>
                    `;
                } else {
                    console.log("El juego ya está completado, no se actualiza el contenido");
                    return; // No actualizamos el contenido si el juego ya está completado
                }
            } else if (subseccionActual === 'fundamento') {
                texto = `
                    <div class="contenido-fundamento">
                        <h2>Cartilla de Insectos</h2>
                        <p>Haz clic en el botón de abajo para descargar la cartilla de insectos y aprender más:</p>
                        <div class="pdf-container">
                            <a href="docs/cartilla_insectos_morforelaciones.pdf" target="_blank" class="btn btn-primary">Descargar Cartilla</a>
                        </div>
                    </div>
                `;
            } else if (subseccionActual === 'evaluacion') {
                texto = `
                    <h2>Juego de Memoria de Insectos</h2>
                    <p>Encuentra las parejas de insectos iguales. ¡Buena suerte!</p>
                    <div id="juego-memoria"></div>
                    <button onclick="iniciarJuegoMemoria()" class="btn btn-primary">Reiniciar Juego</button>
                `;
            }
            break;
        case 'relaciones':
            titulo = 'Relaciones de los Insectos';
            if (subseccionActual === 'apertura') {
                texto = `
                    <div class="contenido-relaciones">
                        <h2>¿Erradicar o proteger a las cucarachas?</h2>
                        
                        <h3>Presentación del tema:</h3>
                        <p>En este debate, discutiremos sobre las cucarachas. Algunas personas creen que son malas y quieren deshacerse de ellas, mientras que otras opinan que pueden ser útiles porque ayudan a limpiar desechos en la naturaleza y servir de alimento para otros depredadores.</p>
                        
                        <h3>Pregunta central:</h3>
                        <p class="pregunta-debate">¿Deberíamos erradicar todas las cucarachas o debemos protegerlas porque algunas son útiles para el medio ambiente?</p>
                        
                        <h3>Contextualización:</h3>
                        <p>Las cucarachas juegan un papel complejo en nuestro mundo. En las ciudades, pueden ser vistas como plagas y transmitir enfermedades. Sin embargo, en la naturaleza, ayudan a descomponer desechos y son parte importante del ecosistema. Este debate nos enseña que muchos problemas tienen más de una cara.</p>
                        
                        <h3>Preparación del debate:</h3>
                        <div class="grupos-debate">
                            <div class="grupo">
                                <h4>Grupo A: Defensores de la erradicación de las cucarachas.</h4>
                            </div>
                            <div class="grupo">
                                <h4>Grupo B: Defensores de la protección de las cucarachas debido a su rol en el ecosistema.</h4>
                            </div>
                        </div>
                        
                        <h3>Roles dentro de cada grupo:</h3>
                        <ul>
                            <li><strong>El científico:</strong> explica los beneficios de las cucarachas en la naturaleza.</li>
                            <li><strong>El defensor de la salud:</strong> habla sobre cómo las cucarachas pueden ser perjudiciales para los humanos.</li>
                            <li><strong>El moderador:</strong> guía la discusión haciendo preguntas clave, asegurando que los estudiantes respeten los turnos.</li>
                        </ul>
                        
                        <h3>Dinámica del debate:</h3>
                        <ol>
                            <li><strong>Turno 1 (Grupo A):</strong> los defensores de la erradicación de las cucarachas presentan sus argumentos sobre los problemas de salud que pueden causar.</li>
                            <li><strong>Turno 2 (Grupo B):</strong> los defensores de la protección de las cucarachas responden, argumentando que son esenciales para el equilibrio ecológico.</li>
                        </ol>
                        
                        <h3>Preguntas del moderador:</h3>
                        <ul>
                            <li>¿Qué pasaría si elimináramos todas las cucarachas?</li>
                            <li>¿Creen que todas las cucarachas son dañinas?</li>
                            <li>¿Es posible controlar las cucarachas sin eliminarlas todas?</li>
                        </ul>
                        
                        <h3>Cierre y reflexión:</h3>
                        <p>Al final del debate, reflexionaremos sobre las siguientes preguntas:</p>
                        <ul>
                            <li>¿Qué aprendieron sobre el papel de las cucarachas en la naturaleza?</li>
                            <li>¿Cambió su opinión después de escuchar ambos lados?</li>
                            <li>¿Creen que existe una solución intermedia para este problema?</li>
                        </ul>
                    </div>
                `;
            } else if (subseccionActual === 'fundamento') {
                texto = `
                    <div class="contenido-fundamento">
                        <h2>Fundamentos de las Relaciones de los Insectos</h2>
                        <p>En esta sección, exploraremos los conceptos básicos de cómo los insectos se relacionan entre sí y con su entorno. Para comenzar, disfruta de este divertido video sobre los insectos:</p>
                        <div class="video-container">
                            <video controls width="100%">
                                <source src="videos/cancion_insectos.mp4" type="video/mp4">
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                        <p>Este video nos muestra de manera entretenida algunos aspectos importantes de los insectos y sus relaciones. A continuación, profundizaremos en estos conceptos.</p>
                        <!-- Aquí puedes agregar más contenido sobre los fundamentos de las relaciones de los insectos -->
                    </div>
                `;
            } else if (subseccionActual === 'actividades') {
                texto = `
                    <div class="contenido-actividades">
                        <h2>Actividades sobre las Relaciones de los Insectos</h2>
                        <p>En esta sección, encontrarás actividades divertidas para aprender más sobre cómo se relacionan los insectos. Para empezar, te invitamos a leer un cuento fascinante sobre las relaciones de los insectos.</p>
                        <div class="pdf-container">
                            <h3>Cuento: El maravilloso mundo de los insectos</h3>
                            <p>Haz clic en el botón de abajo para leer el cuento:</p>
                            <a href="docs/cuento_relaciones.pdf" target="_blank" class="btn btn-primary">Leer el Cuento</a>
                        </div>
                        <div class="actividad-container">
                            <h3>Actividad: Dibuja tu Insecto Favorito</h3>
                            <p>Después de leer el cuento, dibuja tu insecto favorito y describe cómo se relaciona con otros insectos o con su entorno.</p>
                            <!-- Aquí puedes agregar más instrucciones o un espacio para que los estudiantes suban sus dibujos -->
                        </div>
                        <!-- Puedes agregar más actividades aquí -->
                    </div>
                `;
            } else if (subseccionActual === 'evaluacion') {
                texto = `
                    <div class="contenido-evaluacion">
                        <h2>Juego de estaciones</h2>
                        <p>En esta sección, evaluaremos tu comprensión sobre las relaciones de los insectos a través de un divertido juego de estaciones.</p>
                        <div class="pdf-container">
                            <h3>Instrucciones del Juego de Estaciones</h3>
                            <p>Haz clic en el botón de abajo para ver las instrucciones y materiales del juego:</p>
                            <a href="docs/cierre_relaciones.pdf" target="_blank" class="btn btn-primary">Ver Instrucciones del Juego</a>
                        </div>
                        <div class="evaluacion-info">
                            <p>Este juego te ayudará a reforzar lo que has aprendido sobre cómo los insectos se relacionan entre sí y con su entorno. ¡Prepárate para poner a prueba tus conocimientos de una manera divertida y dinámica!</p>
                            <p>Recuerda: cada estación del juego representa un aspecto diferente de las relaciones de los insectos. ¡Buena suerte!</p>
                        </div>
                    </div>
                `;
            }
            break;
        case 'importancia':
            titulo = 'Importancia de los Insectos';
            if (subseccionActual === 'apertura') {
                titulo = 'La Importancia de los Insectos';
                texto = `
                    <div class="contenido-apertura">
                        <div class="video-container">
                            <video controls width="100%">
                                <source src="videos/importancia_insectos.mp4" type="video/mp4">
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                        <p>Observa el video para entender mejor el papel crucial que desempeñan los insectos en nuestro ecosistema.</p>
                    </div>
                `;
            } else if (subseccionActual === 'fundamento') {
                texto = `
                    <div class="contenido-fundamento">
                        <h2>Cómic sobre Insectos</h2>
                        <div class="comic-container">
                            <img src="imagenes/comic/Comic1.JPG" alt="Comic 1" class="comic-slide active">
                            <img src="imagenes/comic/Comic2.JPG" alt="Comic 2" class="comic-slide">
                            <img src="imagenes/comic/Comic3.JPG" alt="Comic 3" class="comic-slide">
                            <img src="imagenes/comic/Comic4.JPG" alt="Comic 4" class="comic-slide">
                            <div class="button-container">
                                <button class="btn btn-primary" id="prevBtn" disabled>Anterior</button>
                                <button class="btn btn-success" id="nextBtn">Siguiente</button>
                            </div>
                        </div>
                    </div>
                `;
            } else if (subseccionActual === 'actividades') {
                texto = `
                    <div class="contenido-actividades">
                        <h2>JUEGO DE ROLES</h2>
                        <h3>Materiales:</h3>
                        <ul>
                            <li>Tarjetas con roles (insectos, plantas, animales, humanos)</li>
                            <li>Situación que representar cada personaje</li>
                        </ul>
                        <h3>Actividad:</h3>
                        <p>Dividir a los estudiantes en grupos según los roles:</p>
                        <ul>
                            <li><strong>Insectos:</strong> Abejas, hormigas, mariposas, moscas.</li>
                            <li><strong>Plantas:</strong> Flores, árboles, arbustos, cultivos.</li>
                            <li><strong>Animales:</strong> Pájaros, ranas, murciélagos, serpientes.</li>
                            <li><strong>Humanos:</strong> Agricultores, jardineros, biólogos.</li>
                        </ul>
                        <h3>Descripción de Roles:</h3>
                        <ul>
                            <li><strong>Abejas:</strong> Polinizan las flores y ayudan a que las plantas crezcan y se reproduzcan.</li>
                            <li><strong>Hormigas:</strong> Descomponen materia orgánica y ayudan a mantener el suelo saludable.</li>
                            <li><strong>Mariposas:</strong> Son indicadores de la salud del ecosistema.</li>
                            <li><strong>Moscas:</strong> Polinizan las plantas, desintegran materia orgánica y sirven como alimento para otros insectos y animales.</li>
                            <li><strong>Plantas:</strong> Producen oxígeno y alimento, además de ser hábitat para muchos seres vivos.</li>
                            <li><strong>Animales:</strong> Dependientes de las plantas y los insectos para sobrevivir.</li>
                            <li><strong>Humanos:</strong> Producción de alimentos y crear conciencia de que los insectos son de gran importancia para el ecosistema.</li>
                        </ul>
                        <h3>Desarrollo del Juego:</h3>
                        <h4>Introducción (5 minutos):</h4>
                        <p>Explicar brevemente la importancia de los insectos en el ecosistema. Preguntar a los estudiantes qué saben sobre ellos.</p>
                        <h4>Lectura de la situación (5 minutos):</h4>
                        <p>En el pueblo de Verde luz, había un jardín lleno de vida: abejas, mariposas, hormigas y moscas trabajaban junto a las flores, árboles y cultivos. Los pájaros cantaban, las ranas saltaban cerca del estanque, los murciélagos volaban en la noche controlando las plagas de forma natural, y las serpientes mantenían el equilibrio cazando pequeños animales.</p>
                        <p>Hasta que un día las personas que habitan allí se dieron cuenta que los niños y niñas necesitaban una escuela para estudiar y el único lugar que se podría construir es en el jardín.</p>
                        <h4>Presentación de Roles (10 minutos):</h4>
                        <p>Cada grupo presenta su rol al resto de la clase, explicando cómo contribuyen al ecosistema.</p>
                        <h4>Escena de Interacción (20 minutos):</h4>
                        <p>Los grupos interactúan entre ellos, generando un debate frente a la situación presentada:</p>
                        <ul>
                            <li><strong>Insectos:</strong> Realizan su trabajo (polinización, descomposición).</li>
                            <li><strong>Plantas:</strong> Crecen y producen oxígeno.</li>
                            <li><strong>Animales:</strong> Buscan alimento y refugio.</li>
                            <li><strong>Humanos:</strong> Discuten cómo proteger los cultivos, los ecosistemas y los insectos.</li>
                        </ul>
                        <h4>Reflexión:</h4>
                        <p>Reunir a los estudiantes para discutir lo que aprendieron. Preguntas sugeridas:</p>
                        <ul>
                            <li>¿Qué papel juegan los insectos en nuestras vidas?</li>
                            <li>¿Cómo podemos ayudar a proteger a los insectos?</li>
                        </ul>
                    </div>
                `;
            } else if (subseccionActual === 'evaluacion') {
                titulo = 'Evaluación de la Unidad Didáctica';
                texto = `
                    <div class="contenido-evaluacion">
                        <h2>Evaluación del Progreso</h2>
                        <p>Estimado profesor, se evaluará el progreso en la Unidad Didáctica resolviendo nuevamente el instrumento de evaluación inicial. Esto permitirá medir el avance de los estudiantes y su comprensión de los conceptos aprendidos sobre la importancia de los insectos en el ecosistema.</p>
                        <h3>Instrucciones:</h3>
                        <ul>
                            <li>Revise el instrumento de evaluación inicial que se utilizó al comienzo de la unidad.</li>
                            <li>Proporcione a los estudiantes el mismo instrumento para que lo resuelvan nuevamente.</li>
                            <li>Compare los resultados con los obtenidos al inicio para evaluar el progreso.</li>
                        </ul>
                    </div>
                `;
            }
            break;
    }

    contenido.innerHTML = `
        <h1>${titulo}</h1>
        ${texto}
    `;

    // Asignar eventos para los botones después de que el contenido se haya actualizado
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', mostrarComicAnterior);
        nextBtn.addEventListener('click', mostrarComicSiguiente);
    }
}

function mostrarOcultarMenuSecundario() {
    const contenedorMenuSecundario = document.getElementById('contenedor-menu-secundario');
    if (paginaActual === 'inicio') {
        contenedorMenuSecundario.style.display = 'none';
    } else {
        contenedorMenuSecundario.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const userSelection = document.getElementById('user-selection');
    const loginPage = document.getElementById('login-page');
    const mainPage = document.getElementById('main-page');
    const loginForm = document.getElementById('login-form');
    const userDropdown = document.getElementById('user-dropdown');
    const selectUserBtn = document.getElementById('select-user');
    const newUserBtn = document.getElementById('new-user');

    function showUserSelection() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userDropdown.innerHTML = '<option value="">Selecciona tu nombre</option>';
        users.forEach((user, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${user.nombre} ${user.apellidos}`;
            userDropdown.appendChild(option);
        });

        // Asegúrate de que el label esté presente
        const label = document.querySelector('label[for="user-dropdown"]');
        if (!label) {
            const newLabel = document.createElement('label');
            newLabel.setAttribute('for', 'user-dropdown');
            newLabel.textContent = 'Selecciona tu usuario:';
            userDropdown.parentNode.insertBefore(newLabel, userDropdown);
        }

        userSelection.style.display = 'flex';
        loginPage.style.display = 'none';
        mainPage.style.display = 'none';
    }

    function showLoginForm() {
        userSelection.style.display = 'none';
        loginPage.style.display = 'flex';
        mainPage.style.display = 'none';
    }

    function showMainPage() {
        userSelection.style.display = 'none';
        loginPage.style.display = 'none';
        mainPage.style.display = 'flex';
        cargarContenido('inicio');
    }

    selectUserBtn.addEventListener('click', function() {
        const selectedIndex = userDropdown.value;
        if (selectedIndex !== '') {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            currentUser = users[selectedIndex];
            showMainPage();
        } else {
            alert('Por favor, selecciona un usuario');
        }
    });

    newUserBtn.addEventListener('click', showLoginForm);

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newUser = {
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            grado: document.getElementById('grado').value,
            institucion: document.getElementById('institucion').value
        };

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        currentUser = newUser;
        showMainPage();
    });

    // Modificar el botón de cerrar sesión
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Salir';
    logoutButton.id = 'logout-button';
    logoutButton.onclick = function() {
        currentUser = null;
        showUserSelection();
    };
    document.body.appendChild(logoutButton);

    // Iniciar el flujo
    showUserSelection();
});

// Modificar la función window.onload para que no cargue automáticamente la página de inicio
window.onload = function() {
    // No hacemos nada aquí, ya que ahora queremos mostrar primero la página de login
};

function iniciarJuegoIdentificacion() {
    if (juegoCompletado) {
        alert('Ya has completado el juego. ¡Continúa con el resto del curso!');
        return;
    }
    const juegoIdentificacion = document.getElementById('juego-identificacion');
    juegoIdentificacion.style.display = 'block';
    juegoIdentificacion.innerHTML = `
        <div class="juego-container">
            <div id="imagenes-container">
                <img id="imagen-identificacion-1" src="" alt="Imagen 1" onclick="seleccionarImagen(1)">
                <img id="imagen-identificacion-2" src="" alt="Imagen 2" onclick="seleccionarImagen(2)">
            </div>
            <div class="respuesta-container">
                <textarea id="explicacion-identificacion" rows="6" placeholder="¿Por qué crees que esta imagen es un insecto?"></textarea>
            </div>
        </div>
        <button onclick="enviarRespuesta()" class="btn btn-primary">Enviar respuesta</button>
        <div id="feedback-container-identificacion" style="display: none;">
            <p id="feedback-texto-identificacion"></p>
            <button onclick="siguientePregunta()" class="btn btn-primary">Siguiente pregunta</button>
        </div>
    `;
    puntuacion = 0;
    parejasRestantes = [...parejas];
    respuestas = [];
    siguientePregunta();
}

/* function siguientePregunta() {
    console.log("Función siguientePregunta() llamada. Parejas restantes:", parejasRestantes.length);
    if (parejasRestantes.length === 0) {
        console.log("No quedan más parejas. Llamando a mostrarResultadoFinal()");
        setTimeout(mostrarResultadoFinal, 100); // Pequeño retraso para asegurar que el DOM esté listo
        return;
    }

    imagenSeleccionada = null;
    respuestaEnviada = false;
    document.getElementById('explicacion-container-identificacion').style.display = 'block';
    document.getElementById('feedback-container-identificacion').style.display = 'none';
    document.getElementById('imagen-identificacion-1').classList.remove('seleccionado', 'correcto', 'incorrecto');
    document.getElementById('imagen-identificacion-2').classList.remove('seleccionado', 'correcto', 'incorrecto');
    document.getElementById('explicacion-identificacion').value = '';

    const indice = Math.floor(Math.random() * parejasRestantes.length);
    parejaActual = parejasRestantes[indice];
    parejasRestantes.splice(indice, 1);

    document.getElementById('imagen-identificacion-1').src = `imagenes/identificacion_de_imagenes/pareja_${parejaActual}/1.jpg`;
    document.getElementById('imagen-identificacion-2').src = `imagenes/identificacion_de_imagenes/pareja_${parejaActual}/2.jpg`;
} */

function siguientePregunta() {
    console.log("Función siguientePregunta() llamada. Parejas restantes:", parejasRestantes.length);
    if (parejasRestantes.length === 0) {
        console.log("No quedan más parejas. Llamando a mostrarResultadoFinal()");
        setTimeout(mostrarResultadoFinal, 100); // Pequeño retraso para asegurar que el DOM esté listo
        return;
    }

    imagenSeleccionada = null;
    respuestaEnviada = false;
    document.getElementById('explicacion-identificacion').value = '';

    const indice = Math.floor(Math.random() * parejasRestantes.length);
    parejaActual = parejasRestantes[indice];
    parejasRestantes.splice(indice, 1);

    const imagen1 = document.getElementById('imagen-identificacion-1');
    const imagen2 = document.getElementById('imagen-identificacion-2');

    imagen1.src = `imagenes/identificacion_de_imagenes/pareja_${parejaActual}/1.jpg`;
    imagen2.src = `imagenes/identificacion_de_imagenes/pareja_${parejaActual}/2.jpg`;

    imagen1.classList.remove('seleccionado', 'correcto', 'incorrecto');
    imagen2.classList.remove('seleccionado', 'correcto', 'incorrecto');

    document.getElementById('feedback-container-identificacion').style.display = 'none';

    console.log("Imágenes cargadas:", imagen1.src, imagen2.src);
}

function enviarRespuesta() {
    if (imagenSeleccionada === null) {
        alert('Por favor, selecciona una imagen antes de enviar tu respuesta.');
        return;
    }

    const explicacion = document.getElementById('explicacion-identificacion').value.trim();
    if (explicacion === '') {
        alert('Por favor, explica por qué crees que esta imagen es un insecto.');
        return;
    }

    respuestaEnviada = true;
    const esCorrecta = imagenSeleccionada === parejasCorrectas[parejaActual - 1];
    const feedbackTexto = document.getElementById('feedback-texto-identificacion');
    
    // Guardar la respuesta
    respuestas.push({
        nombre: currentUser.nombre,
        apellidos: currentUser.apellidos,
        pareja: parejaActual,
        seleccion: imagenSeleccionada,
        explicacion: explicacion,
        esCorrecta: esCorrecta
    });

    if (esCorrecta) {
        puntuacion++;
        console.log("Respuesta correcta. Puntuación actual:", puntuacion);
        feedbackTexto.textContent = '¡Correcto! Has identificado correctamente el insecto.';
        document.getElementById(`imagen-identificacion-${imagenSeleccionada}`).classList.add('correcto');
    } else {
        console.log("Respuesta incorrecta. Puntuación actual:", puntuacion);
        feedbackTexto.textContent = 'Incorrecto. La otra imagen era el insecto. ¡Sigue intentando!';
        document.getElementById(`imagen-identificacion-${imagenSeleccionada}`).classList.add('incorrecto');
        const imagenCorrecta = parejasCorrectas[parejaActual - 1];
        document.getElementById(`imagen-identificacion-${imagenCorrecta}`).classList.add('correcto');
    }

    if (parejasRestantes.length === 0) {
        console.log("Última pareja respondida. Preparando para mostrar resultado final.");
        setTimeout(mostrarResultadoFinal, 1000); // Dar tiempo para que se muestre el feedback y se actualice el DOM
    } else {
        document.getElementById('feedback-container-identificacion').style.display = 'block';
    }

    document.getElementById('explicacion-container-identificacion').style.display = 'none';
    document.getElementById('feedback-container-identificacion').style.display = 'block';
}

function seleccionarImagen(numero) {
    console.log("Imagen seleccionada:", numero);
    if (respuestaEnviada) return; // No permite seleccionar después de enviar la respuesta

    imagenSeleccionada = numero;
    document.getElementById('imagen-identificacion-1').classList.remove('seleccionado');
    document.getElementById('imagen-identificacion-2').classList.remove('seleccionado');
    document.getElementById(`imagen-identificacion-${numero}`).classList.add('seleccionado');
}

function mostrarResultadoFinal() {
    juegoCompletado = true;
    const contenidoJuego = document.getElementById('juego-identificacion');
    let mensaje = `
        <h2>¡Juego terminado!</h2>
        <p>Has identificado correctamente ${puntuacion} insectos de 7.</p>
    `;

    if (puntuacion > 3) {
        mensaje += `
            <p>¡Felicitaciones! Tienes un buen ojo para identificar insectos.</p>
            <p>En este curso aprenderás mucho más sobre estos fascinantes seres vivos.</p>
        `;
    } else {
        mensaje += `
            <p>Parece que necesitas aprender mucho más sobre los insectos. ¡Es hora de comenzar!</p>
            <p>Este curso te ayudará a convertirte en un experto en insectos.</p>
        `;
    }

    mensaje += `
        <button onclick="irAFundamento()" class="btn btn-primary">Vamos a aprender</button>
        <button onclick="descargarRespuestas()" class="btn btn-secondary">Descargar respuestas</button>
    `;

    contenidoJuego.innerHTML = mensaje;
}

/* function mostrarResultadoFinal() {
    console.log("Función mostrarResultadoFinal() llamada.");
    juegoCompletado = true;
    const contenidoJuego = document.getElementById('juego-identificacion');
    if (!contenidoJuego) {
        console.error("Elemento 'juego-identificacion' no encontrado.");
        return;
    }
    console.log("Elemento 'juego-identificacion' encontrado.");

    let mensaje = `
        <h2>¡Juego terminado!</h2>
        <p>Has identificado correctamente ${puntuacion} insectos de 7.</p>
    `;

    if (puntuacion > 3) {
        mensaje += `
            <p>¡Felicitaciones! Tienes un buen ojo para identificar insectos.</p>
            <p>En este curso aprenderás mucho más sobre estos fascinantes seres vivos.</p>
        `;
    } else {
        mensaje += `
            <p>Parece que necesitas aprender mucho más sobre los insectos. ¡Es hora de comenzar!</p>
            <p>Este curso te ayudará a convertirte en un experto en insectos.</p>
        `;
    }

    mensaje += `
        <button onclick="irAActividades()" class="btn btn-primary">Vamos a aprender</button>
        <button onclick="descargarRespuestas()" class="btn btn-secondary">Descargar respuestas</button>
    `;

    console.log("Mensaje final generado:", mensaje);
    contenidoJuego.innerHTML = mensaje;
    console.log("innerHTML actualizado.");

    // Asegurarse de que el contenido sea visible
    contenidoJuego.style.display = 'block';
    console.log("Visibilidad del contenido del juego establecida a 'block'.");

    // Forzar un reflow
    void contenidoJuego.offsetWidth;

    // Asegurarse de que todos los elementos internos sean visibles
    Array.from(contenidoJuego.children).forEach(child => {
        child.style.display = 'block';
    });

    // No llamar a actualizarContenido() aquí, ya que podría sobrescribir nuestros cambios
} */

function irAActividades() {
    console.log("Navegando a la sección de actividades.");
    cargarSubseccion('actividades');
    document.getElementById('juego-identificacion').style.display = 'none';
}

function irAFundamento() {
    paginaActual = 'morfologia'; // Cambia a la sección de morfología
    subseccionActual = 'fundamento'; // Cambia a la subsección de fundamento
    actualizarContenido(); // Actualiza el contenido para mostrar la nueva sección
}

function descargarRespuestas() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nombre,Apellidos,Pareja,Selección,Explicación,Es Correcta\n";

    respuestas.forEach(function(respuesta) {
        let row = [
            respuesta.nombre,
            respuesta.apellidos,
            respuesta.pareja,
            respuesta.seleccion,
            respuesta.explicacion.replace(/,/g, ";"),  // Reemplazar comas por punto y coma en la explicación
            respuesta.esCorrecta
        ].join(",");
        csvContent += row + "\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "respuestas_insectos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function iniciarJuegoMemoria() {
    const juegoMemoria = document.getElementById('juego-memoria');
    if (!juegoMemoria) return; // Salir si el elemento no existe

    juegoMemoria.innerHTML = '';
    
    const imagenes = Array.from({length: 8}, (_, i) => `image_${i + 1}.png`);
    const parejas = [...imagenes, ...imagenes];
    parejas.sort(() => Math.random() - 0.5);

    parejas.forEach((imagen, index) => {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.dataset.id = index;
        carta.dataset.imagen = imagen;
        carta.innerHTML = `
            <div class="carta-interior">
                <div class="carta-frente"></div>
                <div class="carta-dorso" style="background-image: url('imagenes/juego_memoria/${imagen}')"></div>
            </div>
        `;
        carta.addEventListener('click', voltearCarta);
        juegoMemoria.appendChild(carta);
    });
}

let cartasVolteadas = [];
let parejasEncontradas = 0;

function voltearCarta() {
    if (cartasVolteadas.length < 2 && !this.classList.contains('volteada')) {
        this.classList.add('volteada');
        cartasVolteadas.push(this);

        if (cartasVolteadas.length === 2) {
            setTimeout(verificarPareja, 1000);
        }
    }
}

function verificarPareja() {
    const [carta1, carta2] = cartasVolteadas;
    if (carta1.dataset.imagen === carta2.dataset.imagen) {
        parejasEncontradas++;
        if (parejasEncontradas === 18) {
            alert('¡Felicidades! Has encontrado todas las parejas.');
        }
    } else {
        carta1.classList.remove('volteada');
        carta2.classList.remove('volteada');
    }
    cartasVolteadas = [];
}

function mostrarComicAnterior() {
    const slides = document.querySelectorAll('.comic-slide');
    slides[comicIndex].classList.remove('active'); // Remover la clase activa
    comicIndex = (comicIndex - 1 + slides.length) % slides.length; // Ciclo hacia atrás
    slides[comicIndex].classList.add('active'); // Agregar la clase activa

    // Habilitar o deshabilitar botones
    actualizarBotones();
}

function mostrarComicSiguiente() {
    const slides = document.querySelectorAll('.comic-slide');
    slides[comicIndex].classList.remove('active'); // Remover la clase activa
    comicIndex = (comicIndex + 1) % slides.length; // Ciclo hacia adelante
    slides[comicIndex].classList.add('active'); // Agregar la clase activa

    // Habilitar o deshabilitar botones
    actualizarBotones();
}

function actualizarBotones() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Desactivar el botón "Anterior" si estamos en la primera imagen
    prevBtn.disabled = (comicIndex === 0);
    
    // Desactivar el botón "Siguiente" si estamos en la última imagen
    nextBtn.disabled = (comicIndex === document.querySelectorAll('.comic-slide').length - 1);
}