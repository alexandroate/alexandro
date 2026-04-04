const grid = document.getElementById('game-board');
const movimientosTexto = document.getElementById('movimientos');
const winModal = document.getElementById('win-modal');
const btnRestart = document.getElementById('btn-restart');

// Los emojis que representan cosas de ustedes (6 pares = 12 cartas)
const emojis = ['🎮', '🍕', '🎬', '✈️', '🧸', '💖'];
let cartas = [...emojis, ...emojis]; // Duplicamos para hacer las parejas

let cartasVolteadas = [];
let movimientos = 0;
let paresEncontrados = 0;
let bloqueado = false; // Evita que cliquee más de 2 cartas a la vez

function iniciarJuego() {
    grid.innerHTML = '';
    movimientos = 0;
    paresEncontrados = 0;
    movimientosTexto.textContent = movimientos;
    cartasVolteadas = [];
    bloqueado = false;
    winModal.classList.add('hidden');

    // Barajar las cartas aleatoriamente
    cartas.sort(() => Math.random() - 0.5);

    // Crear el HTML de las cartas dinámicamente
    cartas.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${emoji}</div>
                <div class="card-back"><span class="material-symbols-outlined">help</span></div>
            </div>
        `;

        card.addEventListener('click', () => voltearCarta(card, emoji));
        grid.appendChild(card);
    });
}

function voltearCarta(card, emoji) {
    // Si el tablero está bloqueado, o si le da clic a una carta ya volteada, no hace nada
    if (bloqueado || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    cartasVolteadas.push({ card, emoji });

    // Cuando voltea 2 cartas, comprobamos si son iguales
    if (cartasVolteadas.length === 2) {
        movimientos++;
        movimientosTexto.textContent = movimientos;
        verificarPareja();
    }
}

function verificarPareja() {
    bloqueado = true; // Bloqueamos clics mientras procesamos
    const [carta1, carta2] = cartasVolteadas;

    if (carta1.emoji === carta2.emoji) {
        // ¡Coinciden! Las dejamos volteadas
        paresEncontrados++;
        cartasVolteadas = [];
        bloqueado = false;
        
        if (paresEncontrados === emojis.length) {
            setTimeout(() => winModal.classList.remove('hidden'), 500);
        }
    } else {
        // No coinciden. Las regresamos después de 1 segundo
        setTimeout(() => {
            carta1.card.classList.remove('flipped');
            carta2.card.classList.remove('flipped');
            cartasVolteadas = [];
            bloqueado = false;
        }, 1000);
    }
}

btnRestart.addEventListener('click', iniciarJuego);

// Arrancamos el juego al cargar la página
iniciarJuego();