document.addEventListener('DOMContentLoaded', () => {
    // 1. Extraemos el nombre que ella guardó en el registro
    const nombreGuardado = localStorage.getItem('sysUser');
    const elementoNombre = document.getElementById('nombre-usuaria');

    // 2. Si el nombre existe en la memoria, lo mostramos
    if (nombreGuardado && elementoNombre) {
        // Ponemos el nombre en mayúsculas para que se vea más profesional
        elementoNombre.textContent = nombreGuardado.toUpperCase();
    }
});