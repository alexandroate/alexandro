document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('registro-form');

    if (!formRegistro) {
        console.error("Error: No se encontró el formulario con ID 'registro-form'");
        return;
    }

    formRegistro.addEventListener('submit', function(e) {
        e.preventDefault(); 
        console.log("Formulario enviado, procesando datos...");

        const usuario = document.getElementById('reg-user').value;
        const password = document.getElementById('reg-pass').value;

        if(usuario.trim() !== "" && password.trim() !== "") {
            // Guardamos los datos
            localStorage.setItem('sysUser', usuario);
            localStorage.setItem('sysPass', password);

            alert("¡Perfil Registrado! Iniciando protocolo de validación...");
            
            // REDIRECCIÓN CON EL PARÁMETRO DE SEGURIDAD
            window.location.href = "index.html?verificar=true"; 
        } else {
            alert("Por favor, completa los campos.");
        }
    });
});