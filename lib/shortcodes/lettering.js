export default function (text) {
  return `
    <span aria-hidden="false" hidden>${text}</span>

    <span class="[ lettering ] [ cluster cluster--center ]" aria-hidden="true">
      ${text
        .split(" ")
        .map(
          (word) =>
            `<span class="[ lettering-word ] [ cluster cluster--center ]">
          ${word
            .split("")
            .map((char) => `<span class="lettering-char">${char}</span>`)
            .join("")}
        </span>`,
        )
        .join(" ")}
    </span>
  `;
}
