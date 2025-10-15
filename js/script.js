// js/script.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. Seleciona a tabela e os cabeçalhos
  const table = document.querySelector("table");
  const headers = table.querySelectorAll("th");
  const tableBody = table.querySelector("tbody");

  // 2. Adiciona um event listener (ouvinte de evento) a cada cabeçalho
  headers.forEach((header, columnIndex) => {
    // Define o estado inicial da ordenação para 'desc' (o primeiro clique será 'asc')
    header.dataset.direction = "desc";

    // Adiciona um listener para o evento de clique
    header.addEventListener("click", () => {
      // Verifica se a coluna é numérica (Pontos Total, Luis, Dalmoras, Théo G)
      // A coluna 0 é "Coleção" (texto), as demais (1, 2, 3, 4) são números.
      const isNumeric = columnIndex > 0;

      // Determina a direção atual e inverte para a próxima ordenação
      const direction = header.dataset.direction === "asc" ? "desc" : "asc";

      // 3. Limpa os indicadores visuais de ordenação (opcional, mas bom para CSS)
      headers.forEach((h) => {
        h.classList.remove("sorted-asc", "sorted-desc");
        // Mantemos o data-direction para que o loop de headers.forEach() saiba o próximo estado
      });

      // Adiciona a nova classe de ordenação e atualiza o estado
      header.classList.add(`sorted-${direction}`);
      header.dataset.direction = direction;

      // 4. Chama a função de ordenação
      sortTable(columnIndex, direction, isNumeric);
    });
  });

  // 5. Função principal de ordenação
  function sortTable(column, direction, isNumeric) {
    // Converte as linhas da tabela em um array para poder usar o método sort()
    let rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      // Extrai o texto da célula da coluna clicada
      let aText = a.children[column].textContent.trim();
      let bText = b.children[column].textContent.trim();

      // Remove ' pts' e troca '-' por 0 para permitir a comparação numérica
      if (isNumeric) {
        // Limpa unidades como 'pts' e trata '-' (sem pontos) como zero
        aText = aText.replace(" pts", "").replace("-", "0");
        bText = bText.replace(" pts", "").replace("-", "0");

        let aValue = parseFloat(aText);
        let bValue = parseFloat(bText);

        if (aValue < bValue) {
          return direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === "asc" ? 1 : -1;
        }
      } else {
        // Comparação de texto (string)
        if (aText < bText) {
          return direction === "asc" ? -1 : 1;
        }
        if (aText > bText) {
          return direction === "asc" ? 1 : -1;
        }
      }
      return 0; // Se forem iguais
    });

    // 6. Atualiza a tabela com as linhas na nova ordem
    rows.forEach((row) => tableBody.appendChild(row));
  }
});
