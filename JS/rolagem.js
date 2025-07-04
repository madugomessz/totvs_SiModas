 const sections = document.querySelectorAll("main section");
  let currentIndex = 0;
  let isScrolling = false;

  function scrollToSection(index) {
    if (index < 0) {
      currentIndex = 0;
    } else if (index >= sections.length) {
      currentIndex = sections.length - 1;
    } else {
      currentIndex = index;
    }

    isScrolling = true;
    sections[currentIndex].scrollIntoView({ behavior: "smooth" });

    // Evita múltiplas rolagens rápidas
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }

  window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0) {
      // Scroll para baixo
      scrollToSection(currentIndex + 1);
    } else {
      // Scroll para cima
      scrollToSection(currentIndex - 1);
    }
  });