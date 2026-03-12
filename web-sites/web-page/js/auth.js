// --- 0. DETECTAR REDIRECCIÓN DESDE REGISTRO ---
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('verificar') === 'true') {
        const captchaModal = document.getElementById('captcha-modal');
        const loginBox = document.getElementById('login-box');
        const captchaAnswer = document.getElementById('captcha-answer');

        if (captchaModal && loginBox) {
            loginBox.style.opacity = '0.3';
            captchaModal.classList.remove('hidden');
            if (captchaAnswer) captchaAnswer.focus();
        }
    }
});

const loginForm = document.getElementById('login-form');
const loginBox = document.getElementById('login-box');
const captchaModal = document.getElementById('captcha-modal');
const btnVerify = document.getElementById('btn-verify');
const captchaAnswer = document.getElementById('captcha-answer');
const errorMsg = document.getElementById('captcha-error');

// 1. PRIMERA VALIDACIÓN: Usuario y Contraseña
loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const inputUser = document.getElementById('username').value;
    const inputPass = document.getElementById('password').value;
    const usuarioGuardado = localStorage.getItem('sysUser');
    const passwordGuardada = localStorage.getItem('sysPass');
    
    // --- CAMBIO AQUÍ: Revisamos si ya completó la sorpresa ---
    const sorpresaCompletada = localStorage.getItem('yaPasoLaSorpresa');

    if (!usuarioGuardado) {
        alert("⚠️ Sistema: No se detecta ningún perfil de acceso.");
        return;
    }

    if (inputUser === usuarioGuardado && inputPass === passwordGuardada) {
        
        // --- CAMBIO AQUÍ: Lógica inteligente de redirección ---
        if (sorpresaCompletada === 'true') {
            // Si ya pasó todo el juego antes, va DIRECTO al panel
            window.location.href = "panel.html";
        } else {
            // Si es la primera vez, le pedimos el nombre (Captcha)
            loginBox.style.opacity = '0.3';
            captchaModal.classList.remove('hidden');
            captchaAnswer.focus();
        }
        
    } else {
        alert("❌ ACCESO DENEGADO: Credenciales incorrectas.");
    }
});

btnVerify.addEventListener('click', verificarRespuesta);
captchaAnswer.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') verificarRespuesta();
});

function verificarRespuesta() {
    const respuesta = captchaAnswer.value.toLowerCase().trim();

    if (respuesta === 'alexandro' || respuesta.includes('alexandro')) {
        errorMsg.style.color = '#38A169'; 
        errorMsg.textContent = "Identidad autenticada. Accediendo...";
        
        setTimeout(() => {
            // --- CAMBIO AQUÍ: Redirigimos a la sorpresa ---
            window.location.href = "error.html"; 
        }, 1500);

    } else {
        errorMsg.style.color = '#FFB74D';
        errorMsg.textContent = "Error: Respuesta incorrecta.";
        captchaAnswer.value = '';
        captchaAnswer.focus();
    }
}