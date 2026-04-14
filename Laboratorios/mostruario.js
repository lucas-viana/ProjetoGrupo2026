const labSearchInput = document.getElementById("labSearch");
const labClearButton = document.getElementById("labClear");
const labCards = document.querySelectorAll(".lab-card");
const labCount = document.getElementById("labCount");
const labEmpty = document.getElementById("labEmpty");

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function updateLabResults(query) {
  if (!labCards.length) return;

  const normalizedQuery = normalizeText(query.trim());
  let visibleCount = 0;

  labCards.forEach((card) => {
    const searchText = card.getAttribute("data-search") || "";
    const normalizedSearch = normalizeText(searchText);
    const shouldShow =
      normalizedQuery === "" || normalizedSearch.includes(normalizedQuery);

    card.style.display = shouldShow ? "grid" : "none";
    if (shouldShow) visibleCount += 1;
  });

  if (labCount) {
    labCount.textContent = `${visibleCount} ${visibleCount === 1 ? "resultado" : "resultados"}`;
  }

  if (labEmpty) {
    labEmpty.hidden = visibleCount !== 0;
  }
}

if (labSearchInput) {
  updateLabResults("");

  labSearchInput.addEventListener("input", (event) => {
    updateLabResults(event.target.value);
  });
}

if (labClearButton && labSearchInput) {
  labClearButton.addEventListener("click", () => {
    labSearchInput.value = "";
    labSearchInput.focus();
    updateLabResults("");
  });
}
