const sections = document.querySelectorAll("main section");
  let currentIndex = 0;
  let isScrolling = false;

  const menuHeightVH = 12;

  function scrollToSection(index) {
    if (index < 0) {
      currentIndex = 0;
    } else if (index >= sections.length) {
      currentIndex = sections.length - 1;
    } else {
      currentIndex = index;
    }

    isScrolling = true;

    const target = sections[currentIndex];
    const offset = window.innerHeight * (menuHeightVH / 100);
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth"
    });

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }

  window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0) {
      scrollToSection(currentIndex + 1);
    } else {
      scrollToSection(currentIndex - 1);
    }
  });