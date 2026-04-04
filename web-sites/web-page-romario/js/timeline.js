document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos todos los items de la línea de tiempo
    const items = document.querySelectorAll('.timeline-item');

    // Configuramos nuestro "observador"
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            // Si el elemento entra en la pantalla de la usuaria
            if (entrada.isIntersecting) {
                // Le agregamos la clase que dispara la animación CSS
                entrada.target.classList.add('show');
                // Dejamos de observarlo para que la animación solo pase una vez
                observador.unobserve(entrada.target);
            }
        });
    }, {
        // Se activa cuando el elemento asoma un 15% en la pantalla
        threshold: 0.15 
    });

    // Le decimos al observador que vigile cada uno de los items
    items.forEach(item => {
        observador.observe(item);
    });
});