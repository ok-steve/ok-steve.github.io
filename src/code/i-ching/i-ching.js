const hashes = Array.from(document.querySelectorAll("[id]")).map((el) =>
  el.getAttribute("id")
);

function render() {
  const hash = hashes[Math.floor(Math.random() * hashes.length)];
  window.location.hash = hash;
}

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js");

  if (!window.location.hash) {
    render();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "Enter" || e.code === "Space") {
    render();
  }
});
