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

const heroSlides = [
  {
    title: "Veja como foi o debate entre candidatos do Campus Machado.",
    text: "Versão didática para representar o carrossel principal de chamadas do portal com foco em legibilidade e destaque visual."
  },
  {
    title: "Eleição para reitor(a) e diretores(as) do IFSULDEMINAS.",
    text: "Estrutura ideal para acomodar notícias institucionais de grande relevância com leitura rápida em desktop e mobile."
  },
  {
    title: "Auxílio Estudantil com fluxo contínuo: mais facilidade para você!",
    text: "Exemplo de chamada de serviço voltada ao estudante, com ênfase em acesso direto a benefícios e editais."
  },
  {
    title: "Você no #IF! É nosso aluno? Inscreva-se aqui!",
    text: "Bloco pensado para campanhas institucionais e comunicações voltadas à comunidade acadêmica."
  },
  {
    title: "Cadastre-se e acompanhe nossos processos seletivos!",
    text: "Uso do destaque principal para apoiar o ingresso de novos estudantes e divulgar oportunidades."
  },
  {
    title: "Cadastre-se e acompanhe nossas oportunidades!",
    text: "Componente flexível para chamadas rotativas de oportunidades, editais, bolsas e ações institucionais."
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
  slideInterval = setInterval(nextHeroSlide, 5000);
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
    threshold: 0.12
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

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
