// Este evento asegura que la animación arranque apenas la página termine de cargar
document.addEventListener("DOMContentLoaded", () => {
    iniciarCarga();
});

function iniciarCarga() {
    let progreso = 0;
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    const intervalo = setInterval(() => {
        // Lógica de velocidad
        if (progreso < 80) progreso += Math.floor(Math.random() * 11) + 10;
        else if (progreso < 95) progreso += Math.floor(Math.random() * 3) + 2;
        else if (progreso < 99) progreso += 1;

        if (progreso > 99) progreso = 99;
        progressBar.style.width = progreso + '%';

        // Lógica de colores y errores
        if (progreso >= 97) {
            progressBar.style.backgroundColor = '#E07A7A';
            progressText.style.color = '#E07A7A';
            if (progreso === 97) progressText.textContent = progreso + '% - SECTORES DAÑADOS...';
            if (progreso === 98) progressText.textContent = progreso + '% - INTENTANDO RECUPERAR...';
            if (progreso === 99) progressText.textContent = progreso + '% - FALLO CRÍTICO';
        } else if (progreso >= 85) {
            progressBar.style.backgroundColor = '#FFB74D';
            progressText.style.color = '#FFB74D';
            progressText.textContent = progreso + '% - ANALIZANDO METADATOS...';
        } else {
            progressText.textContent = progreso + '%';
        }

        // Cuando choca contra la pared del 99%
        if (progreso === 99) {
            clearInterval(intervalo);
            setTimeout(() => {
                // Ocultar carga y mostrar 404
                document.getElementById('loading-screen').classList.add('hidden');
                document.getElementById('error-screen').classList.remove('hidden');
            }, 2000); // 2 segundos de suspenso
        }
    }, 350);
}

// REDIRECCIÓN A LA FASE 3 (EL MINIJUEGO)
document.getElementById('btn-emergency').addEventListener('click', function() {
    // Al hacer clic, saltamos al archivo del juego
    window.location.href = "juego.html";
});