const cart = document.querySelector("#cart-items"),
      modal = document.querySelector("#cart"),
      close = modal.querySelector(".close");

cart.addEventListener("click", (e) => {
  e.preventDefault();

  modal.classList.toggle("show");
}, false)

close.addEventListener("click", () => {
  modal.classList.toggle("show");
}, false);