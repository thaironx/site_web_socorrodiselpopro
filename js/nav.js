// nav.js - Controle do menu de navegação em todas as páginas

(function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (!menuToggle || !mainNav) return;

    // Garante estado inicial correto em mobile
    if (window.innerWidth <= 768) {
        mainNav.style.display = 'none';
    }

    // Toggle ao clicar no hambúrguer
    menuToggle.addEventListener('click', function() {
        if (mainNav.style.display === 'none' || mainNav.style.display === '') {
            mainNav.style.display = 'flex';
            this.classList.add('active');
        } else {
            mainNav.style.display = 'none';
            this.classList.remove('active');
        }
    });

    // Fechar menu ao clicar em um item (mobile)
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                setTimeout(function() {
                    mainNav.style.display = 'none';
                    menuToggle.classList.remove('active');
                }, 300);
            }
        });
    });

    // Ajustar ao redimensionar janela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainNav.style.display = 'flex';
            menuToggle.classList.remove('active');
        } else {
            if (!menuToggle.classList.contains('active')) {
                mainNav.style.display = 'none';
            }
        }
    });
})();
