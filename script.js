// 1. Menu Mobile Toggle
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 2. Carrossel Principal Adaptado para Assistência Estudantil
const heroSlides = [
  {
    title: "Inscrições abertas para o Auxílio Alimentação 2026/1",
    text: "Garanta seu acesso ao refeitório institucional. Leia o edital completo e envie sua documentação pelo SUAP até o dia 15 deste mês."
  },
  {
    title: "Novas regras para o Auxílio Transporte intermunicipal",
    text: "Atenção: A partir de agora, é necessário anexar também o comprovante de matrícula atualizado junto ao recibo da viação."
  },
  {
    title: "Resultado Parcial: Auxílio Inclusão Digital (Tablets)",
    text: "Confira a lista dos alunos pré-selecionados. O prazo para recurso e entrega de documentação faltante termina na próxima sexta-feira."
  },
  {
    title: "Dúvidas sobre como preencher a Caracterização Social?",
    text: "Preparamos um guia rápido em PDF e em vídeo mostrando tela por tela de como preencher seus dados no sistema SUAP corretamente."
  }
];

const heroTitle = document.getElementById("heroTitle");
const heroText = document.getElementById("heroText");
const heroCounter = document.getElementById("heroCounter");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

let currentSlide = 0;
let slideInterval;

function updateHeroSlide(index) {
  if (!heroTitle || !heroText || !heroCounter) return;

  const slide = heroSlides[index];
  heroTitle.textContent = slide.title;
  heroText.textContent = slide.text;
  heroCounter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(heroSlides.length).padStart(2, "0")}`;
}

function nextHeroSlide() {
  currentSlide = (currentSlide + 1) % heroSlides.length;
  updateHeroSlide(currentSlide);
}

function prevHeroSlideFn() {
  currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
  updateHeroSlide(currentSlide);
}

function startSlideRotation() {
  slideInterval = setInterval(nextHeroSlide, 5000); // Troca a cada 5 segundos
}

function restartSlideRotation() {
  clearInterval(slideInterval);
  startSlideRotation();
}

if (prevSlide && nextSlide) {
  prevSlide.addEventListener("click", () => {
    prevHeroSlideFn();
    restartSlideRotation();
  });

  nextSlide.addEventListener("click", () => {
    nextHeroSlide();
    restartSlideRotation();
  });

  updateHeroSlide(currentSlide);
  startSlideRotation();
}

// 3. Efeito Reveal (Surgir ao rolar a tela)
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12 // Elemento surge quando 12% dele aparece na tela
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

// 4. Marcação de Link Ativo no Menu conforme o Scroll
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a[href^='#']");

function setActiveNavLink() {
  const scrollY = window.scrollY + 140;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("load", setActiveNavLink);