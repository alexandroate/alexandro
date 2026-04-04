let score = 0;
let gameInterval;
const scoreText = document.getElementById('score');
const gameUI = document.getElementById('game-ui');
const finalMessage = document.getElementById('final-message');
const gameContainer = document.getElementById('game-container');

// Arranca automáticamente al entrar a esta página
document.addEventListener('DOMContentLoaded', iniciarJuego);

function iniciarJuego() {
    score = 0;
    scoreText.textContent = score;
    // Genera un corazón cada 400ms
    gameInterval = setInterval(crearCorazon, 400); 
}

function crearCorazon() {
    const corazon = document.createElement('div');
    corazon.classList.add('heart');
    corazon.innerHTML = '❤️'; 
    
    // Posición inicial aleatoria en toda la pantalla
    const startX = Math.random() * 80 + 10; 
    const startY = Math.random() * 80 + 10; 
    corazon.style.left = startX + 'vw';
    corazon.style.top = startY + 'vh';
    
    // Animación entre 4 y 7 segundos
    const duracionAnimacion = Math.random() * 3 + 4;
    corazon.style.animationDuration = duracionAnimacion + 's';
    
    // Rotación inicial aleatoria
    const rotacionInicial = Math.random() * 360;
    corazon.style.transform = `rotate(${rotacionInicial}deg)`;

    corazon.addEventListener('mousedown', function(e) {
        e.preventDefault(); 
        if (this.classList.contains('explode')) return; 
        
        this.classList.add('explode'); 
        score++; 
        scoreText.textContent = score; 
        
        setTimeout(() => {
            if(this.parentElement) this.remove();
            if (score === 14) ganarJuego();
        }, 300);
    });
    
    gameContainer.appendChild(corazon);
    
    // Recolector de basura para evitar lag en la memoria RAM
    setTimeout(() => {
        if(corazon.parentElement && !corazon.classList.contains('explode')) {
            corazon.remove();
        }
    }, duracionAnimacion * 1000 + 500);
}

function ganarJuego() {
    clearInterval(gameInterval); 
    document.querySelectorAll('.heart').forEach(h => h.remove());
    
    gameUI.style.opacity = '0'; 
    
    setTimeout(() => {
        gameUI.style.display = 'none';
        
        // Desbloqueamos el scroll
        document.body.style.display = 'block'; 
        document.body.style.overflow = 'visible';
        
        finalMessage.classList.remove('hidden');
        finalMessage.classList.add('show-final');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
}