// script.js

const professorCores = {};

// Função para obter um nome de professor de um elemento
function getProfessorName(element) {
  return element.innerText.split("\n")[1]; // Obtém o nome do professor do conteúdo do elemento
}

// Função para gerar uma cor aleatória
function getRandomColor() {
  const letters = "BCDEF"; // Usamos apenas letras mais claras para evitar cores escuras
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}
// Função para alterar a cor de todos os cards com o mesmo professor
function changeColor(element) {
  const professor = getProfessorName(element);
  let newColor;

  if (!professorCores[professor]) {
    // Se o professor não tem uma cor atribuída, gera uma nova cor aleatória
    newColor = getRandomColor();
    professorCores[professor] = newColor;
  } else {
    // Se o professor já tem uma cor atribuída, verifica se é igual à cor atual do elemento
    // Se for, define a cor como padrão (vazia), caso contrário, mantém a cor atribuída
    newColor =
      element.style.backgroundColor === professorCores[professor]
        ? ""
        : professorCores[professor];
  }

  // Atualiza a cor de todos os cards com o mesmo professor
  const allCards = document.querySelectorAll(".professor-cell");
  allCards.forEach((card) => {
    const cardProfessor = getProfessorName(card);
    if (cardProfessor === professor) {
      card.style.backgroundColor = newColor;
    }
  });
}

// Adicione um evento de clique a todos os cards de professor
document.querySelectorAll(".professor-cell").forEach((card) => {
  card.addEventListener("click", () => {
    changeColor(card);
  });
});
