//display modal
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

//display list or grid
const displayType = document.querySelector(".display-style"),
      menuItems = document.querySelector("#menu-items");

displayType.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  const target = e.target.tagName.toLowerCase()
  let className;

  if (target === "i") {
    className = e.target.closest("a").getAttribute("href").replace(/#/, '');
    menuItems.classList = '';
    menuItems.classList.add(className);
  }

}, false);