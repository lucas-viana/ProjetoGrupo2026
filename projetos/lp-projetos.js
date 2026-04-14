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

const projectHighlights = [
  {
    tag: "Projeto 01",
    title: "Robótica e Automação (GAPE)",
    text: "Frente voltada para atividades práticas com automação, prototipagem e desenvolvimento técnico."
  },
  {
    tag: "Projeto 02",
    title: "Espaço Maker e Impressão 3D",
    text: "Ambiente para criação de protótipos, experimentação e aprendizagem baseada em projetos."
  },
  {
    tag: "Projeto 03",
    title: "Polo EMBRAPII",
    text: "Conexão entre instituição e setor produtivo para inovação aplicada e desenvolvimento de soluções."
  },
  {
    tag: "Projeto 04",
    title: "Meninas Digitais",
    text: "Iniciativa de incentivo à participação feminina em tecnologia, computação e inovação."
  }
];

const highlightTag = document.getElementById("highlightTag");
const highlightTitle = document.getElementById("highlightTitle");
const highlightText = document.getElementById("highlightText");
const highlightCounter = document.getElementById("highlightCounter");

let currentHighlight = 0;
let highlightInterval;

function updateHighlight(index) {
  if (!highlightTag || !highlightTitle || !highlightText || !highlightCounter) return;

  const item = projectHighlights[index];
  highlightTag.textContent = item.tag;
  highlightTitle.textContent = item.title;
  highlightText.textContent = item.text;
  highlightCounter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(projectHighlights.length).padStart(2, "0")}`;
}

function nextHighlight() {
  currentHighlight = (currentHighlight + 1) % projectHighlights.length;
  updateHighlight(currentHighlight);
}

function startHighlightRotation() {
  updateHighlight(currentHighlight);
  highlightInterval = setInterval(nextHighlight, 5000);
}

if (highlightTag && highlightTitle && highlightText && highlightCounter) {
  startHighlightRotation();
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

window.addEventListener("beforeunload", () => {
  clearInterval(highlightInterval);
});
