document.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG" && e.target.closest(".gallery")) {
    const src = e.target.getAttribute("src");
    document.querySelector(".modal-img").src = src
    const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
    myModal.show();
  }
})

