// js/script.js

document.addEventListener("DOMContentLoaded", () => {
  // --- LÓGICA PARA ALTERNAR ABAS (MENU PRINCIPAL E SÉRIES) ---
  function setupTabSwitching(buttonSelector, sectionSelector) {
    const buttons = document.querySelectorAll(buttonSelector);
    const sections = document.querySelectorAll(sectionSelector);

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");

        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        sections.forEach((section) => {
          section.classList.toggle("active", section.id === targetId);
        });
      });
    });
  }

  setupTabSwitching(".menu-button", ".content-section");
  setupTabSwitching(".series-button", ".series-section");

  // --- LÓGICA PARA BOTÕES "SELECIONAR TUDO / LIMPAR" ---
  const collectionContainers = document.querySelectorAll(
    ".collection-container"
  );

  collectionContainers.forEach((container) => {
    const toggleButton = container.querySelector(".toggle-all-button");
    if (toggleButton) {
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');

      toggleButton.addEventListener("click", () => {
        // Verifica se a ação deve ser "selecionar tudo"
        const isSelectAllAction =
          toggleButton.textContent.includes("Selecionar");

        checkboxes.forEach((checkbox) => {
          checkbox.checked = isSelectAllAction;
        });

        // Alterna o texto do botão
        toggleButton.textContent = isSelectAllAction
          ? "Limpar Seleção"
          : "Selecionar Tudo";
      });
    }
  });

  // --- LÓGICA ORIGINAL DE ORDENAÇÃO DA TABELA DE PONTOS ---
  const table = document.querySelector("#pontos table");
  if (table) {
    const headers = table.querySelectorAll("th");
    const tableBody = table.querySelector("tbody");

    headers.forEach((header, columnIndex) => {
      header.dataset.direction = "desc";
      header.addEventListener("click", () => {
        const isNumeric = columnIndex > 0;
        const direction = header.dataset.direction === "asc" ? "desc" : "asc";

        headers.forEach((h) => {
          h.classList.remove("sorted-asc", "sorted-desc");
        });

        header.classList.add(`sorted-${direction}`);
        header.dataset.direction = direction;

        sortTable(columnIndex, direction, isNumeric, tableBody);
      });
    });
  }

  function sortTable(column, direction, isNumeric, tableBody) {
    let rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      let aCell = a.children[column];
      let bCell = b.children[column];

      // Tenta encontrar um input dentro da célula para obter o valor
      let aInput = aCell.querySelector("input");
      let bInput = bCell.querySelector("input");

      let aText = (aInput ? aInput.value : aCell.textContent).trim();
      let bText = (bInput ? bInput.value : bCell.textContent).trim();

      if (isNumeric) {
        let aValue = parseFloat(aText.replace(/[^0-9.-]+/g, "")) || 0;
        let bValue = parseFloat(bText.replace(/[^0-9.-]+/g, "")) || 0;

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
      } else {
        if (aText < bText) return direction === "asc" ? -1 : 1;
        if (aText > bText) return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    rows.forEach((row) => tableBody.appendChild(row));
  }
});
