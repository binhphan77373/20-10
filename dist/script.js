const gate = document.querySelector("#letterGate");
const openLetter = document.querySelector("#openLetter");
const wishButton = document.querySelector("#wishButton");
const finalWish = document.querySelector("#finalWish");
const petalField = document.querySelector("#petalField");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.classList.add("gate-open");

function enterSite() {
  gate.classList.add("is-open");
  document.body.classList.remove("gate-open");
  window.setTimeout(() => {
    gate.setAttribute("aria-hidden", "true");
    document.querySelector(".hero .text-link").focus({ preventScroll: true });
  }, reduceMotion ? 10 : 850);
}

openLetter.addEventListener("click", enterSite);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.13, rootMargin: "0px 0px -8%" },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

function createPetal(index) {
  const petal = document.createElement("span");
  const colors = ["#c45d72", "#e2a18f", "#f1c7b9", "#9e354c", "#d88d98"];
  const start = Math.random() * 100;
  const drift = -110 + Math.random() * 220;
  const duration = 3.5 + Math.random() * 2.6;

  petal.className = "petal";
  petal.style.left = `${start}vw`;
  petal.style.setProperty("--drift", `${drift}px`);
  petal.style.setProperty("--spin", `${360 + Math.random() * 720}deg`);
  petal.style.setProperty("--duration", `${duration}s`);
  petal.style.setProperty("--petal-color", colors[index % colors.length]);
  petal.style.animationDelay = `${Math.random() * 0.7}s`;
  petal.style.transform = `scale(${0.7 + Math.random() * 0.7})`;
  petalField.appendChild(petal);
  window.setTimeout(() => petal.remove(), (duration + 1) * 1000);
}

wishButton.addEventListener("click", () => {
  finalWish.classList.add("is-visible");
  wishButton.disabled = true;
  wishButton.querySelector("span").textContent = "Đã gửi yêu thương";

  if (!reduceMotion) {
    Array.from({ length: 36 }, (_, index) => index).forEach((index) => createPetal(index));
  }
});
