const dice = document.querySelectorAll("ul");

function roll() {
  dice.forEach((die) => {
    const sideIndex = Math.floor(Math.random() * die.children.length);
    Array.from(die.children).forEach((side, i) => {
      side.toggleAttribute("hidden", i !== sideIndex);
    });
  });
}

roll();

document.querySelector("button").addEventListener("click", (e) => {
  roll();
});
