// Capturamos los dos botones desde el inicio
const btnSi = document.getElementById('btn-si');
const btnNo = document.getElementById('btn-no'); 

// 1. EL BOTÓN ESCAPISTA (Sí)
btnSi.addEventListener('mouseover', function() {
    // Calculamos el tamaño de la ventana actual
    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;

    // Calculamos una nueva posición aleatoria 
    // (Restamos píxeles para que el botón no se salga del borde de la pantalla)
    const nuevaX = Math.random() * (anchoVentana - 150); 
    const nuevaY = Math.random() * (altoVentana - 50);

    // Lo sacamos del flujo normal y lo ponemos flotando
    this.style.position = 'fixed';
    this.style.left = `${nuevaX}px`;
    this.style.top = `${nuevaY}px`;
});

// 2. EL BOTÓN QUE SÍ SE DEJA CLIQUEAR (No)
btnNo.addEventListener('click', function() {
    localStorage.setItem('yaPasoLaSorpresa', 'true');
    alert("¡JAJAJA! Sabía que ibas a intentar darle al 'No' porque es obvio que no me amas.\n\nCon eso aseguro que tu identidad es 100% confirmada. Redirigiendo al Panel Principal del Sistema...");
    
    // EL CAMBIO: Ahora va a la página real de 
    window.location.href = "index.html";
});