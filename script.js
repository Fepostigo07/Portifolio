document.addEventListener("DOMContentLoaded", function() {
    
    // --- Lógica do Menu Responsivo (Existente) ---
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
    
    navLinks.forEach(function(l) {
        l.addEventListener('click', function() {
            if (menuToggle.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });

    // --- Lógica de Alternar Tema (NOVO) ---
    const htmlElement = document.getElementById('php-theme');
    const themeToggler = document.getElementById('themeToggler');
    const themeIcon = document.getElementById('themeIcon');

    // Função para definir o tema e atualizar o ícone/localstorage
    const setTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme); // Salva a preferência do usuário

        // Atualiza o ícone
        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon-stars-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-stars-fill');
        }
    };

    // 1. Verificar se o usuário já tem uma preferência salva
    const storedTheme = localStorage.getItem('theme');

    // 2. Verificar a preferência do sistema operacional (caso não tenha salvo)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determinar o tema inicial
    let initialTheme = 'light'; // Padrão

    if (storedTheme) {
        initialTheme = storedTheme;
    } else if (prefersDark) {
        initialTheme = 'dark';
    }

    // Aplicar o tema inicial ao carregar a página
    setTheme(initialTheme);

    // 3. Ouvinte de clique para alternar o tema
    themeToggler.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
});