document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const navList = document.getElementById("nav_list");

    // Abrir menu
    menuToggle.addEventListener("click", () => {
        navList.classList.add("active");
        document.body.classList.add("menu-ativo");
        menuToggle.style.display = "none";
        menuClose.style.display = "block";
    });

    // Fechar menu
    menuClose.addEventListener("click", () => {
        navList.classList.remove("active");
        document.body.classList.remove("menu-ativo");
        menuToggle.style.display = "block";
        menuClose.style.display = "none";
    });
});