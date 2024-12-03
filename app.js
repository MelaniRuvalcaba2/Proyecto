document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Inicializar EmailJS
    emailjs.init("TU_USER_ID_DE_EMAILJS");

    // Manejar el envío del formulario
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Mostrar mensaje de carga
        formMessage.textContent = 'Enviando mensaje...';
        formMessage.style.color = 'blue';

        // Enviar el correo usando EmailJS
        emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', this)
            .then(function() {
                // Mostrar mensaje de éxito
                formMessage.textContent = '¡Mensaje enviado con éxito! Gracias por contactarme.';
                formMessage.style.color = 'green';

                // Limpiar los campos del formulario
                contactForm.reset();

                // Ocultar el mensaje de éxito después de 5 segundos
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
            }, function(error) {
                // Mostrar mensaje de error
                console.error('Error al enviar el mensaje:', error);
                formMessage.textContent = 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
                formMessage.style.color = 'red';
            });
    });
});

