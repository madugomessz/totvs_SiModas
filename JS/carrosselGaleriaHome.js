document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 767) {
    const galeria = document.getElementById("galeriaHome");

    const btnLeft = document.createElement("button");
    const btnRight = document.createElement("button");

    btnLeft.innerHTML = "&#10094;";
    btnRight.innerHTML = "&#10095;";
    btnLeft.classList.add("btn-galeria", "left");
    btnRight.classList.add("btn-galeria", "right");

    document.body.appendChild(btnLeft);
    document.body.appendChild(btnRight);

    const items = galeria.children;
    let currentIndex = 0;

    function scrollToIndex(index) {
      galeria.scrollTo({
        left: galeria.offsetWidth * index,
        behavior: "smooth"
      });
    }

    btnLeft.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        scrollToIndex(currentIndex);
      }
    });

    btnRight.addEventListener("click", () => {
      if (currentIndex < items.length - 1) {
        currentIndex++;
        scrollToIndex(currentIndex);
      }
    });

    // 👉 Mostrar botões somente quando o carrossel estiver visível na tela
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            btnLeft.classList.add("show");
            btnRight.classList.add("show");
          } else {
            btnLeft.classList.remove("show");
            btnRight.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    observer.observe(galeria);
  }
});
