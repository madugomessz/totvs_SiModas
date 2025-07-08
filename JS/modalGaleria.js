    document.addEventListener("DOMContentLoaded", () => {
        const modal = document.getElementById("gallery-modal");
        const modalImg = document.getElementById("img-modal");
        const closeBtn = document.querySelector(".close");

        document.querySelectorAll(".gallery img").forEach(img => {
            img.addEventListener("click", () => {
                modal.style.display = "block";
                modalImg.src = img.src;
            });
        });

        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    });