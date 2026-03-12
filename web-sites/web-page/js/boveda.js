const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const btnClose = document.getElementById('btn-close');

// Cuando le da clic a una foto de la galería
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // Extraemos la ruta de la imagen y el texto descriptivo
        const imgPath = this.querySelector('.gallery-img').src;
        const texto = this.querySelector('.img-overlay p').textContent;

        // Se los inyectamos al visor gigante
        lightboxImg.src = imgPath;
        lightboxCaption.textContent = texto;

        // Mostramos el visor
        lightbox.classList.remove('hidden');
    });
});

// Cuando le da clic a la X para cerrar
btnClose.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

// Un detalle extra: Cerrar también si hace clic afuera de la foto
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});