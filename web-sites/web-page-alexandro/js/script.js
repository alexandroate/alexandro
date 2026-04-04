// Referencias a los elementos del HTML
const loginForm = document.getElementById('login-form');
const loginBox = document.getElementById('login-box');
const captchaModal = document.getElementById('captcha-modal');
const btnVerify = document.getElementById('btn-verify');
const captchaAnswer = document.getElementById('captcha-answer');
const errorMsg = document.getElementById('captcha-error');

// EVENTO 1: Cuando ella intenta iniciar sesión
loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evitamos que la página se recargue

    // Hacemos que el cuadro de login se vuelva un poco transparente
    loginBox.style.opacity = '0.3';
    
    // Mostramos el Captcha de seguridad quitando la clase "hidden"
    captchaModal.classList.remove('hidden');
    
    // Ponemos el cursor automáticamente en la respuesta del captcha
    captchaAnswer.focus();
});

// EVENTO 2: Cuando ella hace clic en "Verificar Identidad"
btnVerify.addEventListener('click', function() {
    verificarRespuesta();
});

// EVENTO 3: Por si ella presiona "Enter" en lugar de hacer clic en el botón
captchaAnswer.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        verificarRespuesta();
    }
});

// FUNCIÓN PRINCIPAL: La validación
function verificarRespuesta() {
    const respuesta = captchaAnswer.value.toLowerCase().trim();

    if (respuesta === 'alexandro' || respuesta.includes('alexandro')) {
        // Respuesta correcta
        errorMsg.style.color = '#38A169'; 
        errorMsg.textContent = "Identidad autenticada. Accediendo al panel privado...";
        
        setTimeout(() => {
            // 1. Ocultamos la Fase 1 (Login y Captcha)
            captchaModal.classList.add('hidden');
            loginBox.style.display = 'none'; // Lo desaparecemos por completo
            
            // 2. Mostramos el contenedor de la Fase 2
            const phase2 = document.getElementById('phase2-container');
            phase2.classList.remove('hidden');
            
            // 3. Iniciamos la animación de la barra de carga
            iniciarCarga();
            
        }, 1500);

    } else {
        // Respuesta incorrecta
        errorMsg.style.color = '#FFB74D';
        errorMsg.textContent = "Error: Respuesta incorrecta. Intento bloqueado.";
        captchaAnswer.value = '';
        captchaAnswer.focus();
    }
}

// NUEVA FUNCIÓN: Simula la carga y lanza el error
function iniciarCarga() {
    let progreso = 0;
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    // Nos aseguramos de que el texto empiece en un gris normal
    progressText.style.color = '#6B7280'; 

    const intervalo = setInterval(() => {
        
        // 1. CONTROL DE VELOCIDAD
        if (progreso < 80) {
            // Fase 1: Avanza rápido (saltos de 10 a 20%)
            progreso += Math.floor(Math.random() * 11) + 10; 
        } else if (progreso < 95) {
            // Fase 2: Empieza a frenar (saltos de 2 a 4%)
            progreso += Math.floor(Math.random() * 3) + 2;
        } else if (progreso < 99) {
            // Fase 3: Agonía total (avanza de 1 en 1)
            progreso += 1;
        }

        // Evitamos que se pase de 99
        if (progreso > 99) progreso = 99;

        // Actualizamos el ancho visual de la barra
        progressBar.style.width = progreso + '%';

        // 2. CONTROL DE COLORES Y MENSAJES DRAMÁTICOS
        if (progreso >= 97) {
            // Estado Crítico: ROJO
            progressBar.style.backgroundColor = '#E07A7A'; 
            progressText.style.color = '#E07A7A';
            
            // Textos dinámicos para darle realismo al fallo
            if (progreso === 97) progressText.textContent = progreso + '% - SECTORES DAÑADOS DETECTADOS...';
            if (progreso === 98) progressText.textContent = progreso + '% - INTENTANDO RECUPERAR ARCHIVOS...';
            if (progreso === 99) progressText.textContent = progreso + '% - FALLO CRÍTICO DE LECTURA';
            
        } else if (progreso >= 85) {
            // Estado de Advertencia: NARANJA
            progressBar.style.backgroundColor = '#FFB74D'; 
            progressText.style.color = '#FFB74D';
            progressText.textContent = progreso + '% - ANALIZANDO METADATOS...';
        } else {
            // Estado Normal: Texto simple
            progressText.textContent = progreso + '%';
        }

        // 3. EL FINAL DE LA CARGA (ERROR 404)
        if (progreso === 99) {
            clearInterval(intervalo); // Detenemos el reloj
            
            // Pausa de 2 segundos de puro suspenso en el 99% rojo antes del pantallazo
            setTimeout(() => {
                document.getElementById('loading-screen').classList.add('hidden');
                document.getElementById('error-screen').classList.remove('hidden');
            }, 2000); 
        }

    }, 350); // El reloj hace un "tic" cada 350 milisegundos
}

// --- VARIABLES DE LA FASE 3 ---
const btnEmergency = document.getElementById('btn-emergency');
const phase2 = document.getElementById('phase2-container');
const phase3 = document.getElementById('phase3-container');
const scoreText = document.getElementById('score');
const gameUI = document.getElementById('game-ui');
const finalMessage = document.getElementById('final-message');

let score = 0;
let gameInterval; 

btnEmergency.addEventListener('click', function() {
    document.getElementById('error-screen').style.display = 'none';
    phase2.classList.add('hidden');
    phase3.classList.remove('hidden');
    iniciarJuego();
});

function iniciarJuego() {
    score = 0;
    scoreText.textContent = score;
    // Crea un corazón nuevo cada 400 milisegundos
    gameInterval = setInterval(crearCorazon, 400); 
}

function crearCorazon() {
    const corazon = document.createElement('div');
    corazon.classList.add('heart');
    corazon.innerHTML = '❤️'; 
    
    // --- NUEVO CÁLCULO DE POSICIÓN INICIAL ---
    // Nacen en cualquier parte del 100% de la ventana (100vw y 100vh),
    // pero con un pequeño margen para que no queden cortados.
    const startX = Math.random() * 80 + 10; // Entre 10% y 90% del ancho
    const startY = Math.random() * 80 + 10; // Entre 10% y 90% del alto
    
    corazon.style.left = startX + 'vw';
    corazon.style.top = startY + 'vh';
    
    // --- NUEVO CÁLCULO DE ANIMACIÓN ---
    // Tiempo de animación aleatorio entre 4 y 7 segundos (más lento y flotante)
    const duracionAnimacion = Math.random() * 3 + 4;
    corazon.style.animationDuration = duracionAnimacion + 's';
    
    // Agregamos una rotación aleatoria inicial para más variedad
    const rotacionInicial = Math.random() * 360;
    corazon.style.transform = `rotate(${rotacionInicial}deg)`;

    // EL TRUCO PARA QUE EXPLOTEN Y NO SE SELECCIONE TEXTO
    corazon.addEventListener('mousedown', function(e) {
        e.preventDefault(); // Evita el cursor de "escribir texto"
        
        // Si ya está explotando, no hacemos nada
        if (this.classList.contains('explode')) return; 
        
        // Dispara la animación de explosión
        this.classList.add('explode'); 
        
        score++; 
        scoreText.textContent = score; 
        
        // Espera 300ms a que termine la explosión antes de borrarlo de la pantalla
        setTimeout(() => {
            if(this.parentElement) this.remove();
            
            // Si llega a 22, gana
            if (score === 22) ganarJuego();
        }, 300);
    });
    
    // Lo inyectamos directamente al contenedor de pantalla completa
    phase3.appendChild(corazon);
    
    // Borramos los que completaron su ciclo sin ser clicados (recogida de basura)
    // El setTimeout debe ser un poco mayor que la duración máxima de la animación
    setTimeout(() => {
        if(corazon.parentElement && !corazon.classList.contains('explode')) {
            corazon.remove();
        }
    }, duracionAnimacion * 1000 + 500); // Un pequeño margen de seguridad
}

function ganarJuego() {
    clearInterval(gameInterval); 
    
    // Borra cualquier corazón que haya quedado flotando
    document.querySelectorAll('.heart').forEach(h => h.remove());
    
    // Desvanece la interfaz de arriba
    gameUI.style.opacity = '0'; 
    gameUI.style.transition = 'opacity 0.5s';
    
    // Revela la carta de manera espectacular
    setTimeout(() => {
        gameUI.style.display = 'none';
        finalMessage.classList.remove('hidden');
    }, 500);
}