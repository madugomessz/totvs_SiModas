const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("aparecer");
    } else {
      header.classList.remove("aparecer");
    }
  });