document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const carrosselWrapper = document.querySelector(".carrossel_wrapper");
  let currentIndex = 0;

  const cardsVisiveis = 4; // quantos cards aparecem na tela ao mesmo tempo
  const cardWidthVW = 25;  // largura do card em vw (de acordo com seu CSS)

  function updateDestaque() {
    cards.forEach((card, index) => {
      card.classList.toggle("destaque", index === currentIndex);
    });

    // Calcula o deslocamento para que o card atual fique visível na tela
    // Limitando para não deslizar além do último card visível
    let maxIndex = cards.length - cardsVisiveis;
    let slideIndex = currentIndex > maxIndex ? maxIndex : currentIndex;
    const deslocamento = -(slideIndex * cardWidthVW);

    carrosselWrapper.style.transform = `translateX(${deslocamento}vw)`;
  }

  document.getElementById("avancar").addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // opcional: voltar pro início
    }
    updateDestaque();
  });

  document.getElementById("voltar").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = cards.length - 1; // opcional: ir pro fim
    }
    updateDestaque();
  });

  updateDestaque(); // destaque inicial
});