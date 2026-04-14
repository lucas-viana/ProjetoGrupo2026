// Navbar scrolldown effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal elements on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Função para atualizar a barra de progresso de leitura
function updateScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + "%";
}

// Otimização do Header e Animações de Scroll
const header = document.querySelector('.navbar');
const reveals = document.querySelectorAll('.reveal');

function handleScroll() {
    // 1. Barra de progresso
    updateScrollProgress();

    // 2. Mudança de estado do Header
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // 3. Revelar elementos (Intersection Observer seria melhor, mas mantendo compatibilidade)
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Event Listener com Throttling para performance
window.addEventListener('scroll', handleScroll);

// Inicia no carregamento da página
document.addEventListener('DOMContentLoaded', handleScroll);
// Dynamic subtle particle movement for hero shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const factor = index === 0 ? 30 : -30;
        shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});
