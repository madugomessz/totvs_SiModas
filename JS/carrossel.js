

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const carrosselWrapper = document.querySelector(".carrossel_wrapper");
  let currentIndex = 0;

  function getMobileStatus() {
  return window.innerWidth <= 768;
}

let cardsVisiveis = getMobileStatus() ? 1 : 4;
let cardWidthVW = getMobileStatus() ? 100 : 25;

window.addEventListener("resize", () => {
  cardsVisiveis = getMobileStatus() ? 1 : 4;
  cardWidthVW = getMobileStatus() ? 100 : 25;
  updateDestaque();
});


  function updateDestaque() {
    cards.forEach((card, index) => {
      card.classList.toggle("destaque", index === currentIndex);
    });

    const maxIndex = cards.length - cardsVisiveis;
    const halfVisible = Math.floor(cardsVisiveis / 2);

    let slideIndex;

    if (currentIndex <= halfVisible) {
      slideIndex = 0; // início do carrossel
    } else if (currentIndex >= maxIndex + halfVisible) {
      slideIndex = maxIndex; // fim do carrossel
    } else {
      slideIndex = currentIndex - halfVisible; // centralizar card
    }

    const deslocamento = -(slideIndex * cardWidthVW);
    carrosselWrapper.style.transform = `translateX(${deslocamento}vw)`;
  }

  // Botão avançar
  document.getElementById("avancar").addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // reinicia
    }
    updateDestaque();
  });

  // Botão voltar
  document.getElementById("voltar").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = cards.length - 1;
    }
    updateDestaque();
  });

  // Clique direto nos cards
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      currentIndex = index;
      updateDestaque();
    });
  });

  // Primeira renderização
  updateDestaque();
});

