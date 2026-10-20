const gate = document.querySelector("#letterGate");
const openLetter = document.querySelector("#openLetter");
const wishButton = document.querySelector("#wishButton");
const finalWish = document.querySelector("#finalWish");
const petalField = document.querySelector("#petalField");
const readingProgress = document.querySelector("#readingProgress");
const notePaper = document.querySelector("#notePaper");
const noteIndex = document.querySelector("#noteIndex");
const noteTitle = document.querySelector("#noteTitle");
const noteCopy = document.querySelector("#noteCopy");
const noteTabs = [...document.querySelectorAll(".note-tab")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.classList.add("gate-open");

function enterSite() {
  gate.classList.add("is-open");
  document.body.classList.remove("gate-open");
  if (!reduceMotion) {
    Array.from({ length: 12 }, (_, index) => index).forEach((index) => createPetal(index));
  }
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

function updateReadingProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  readingProgress.style.width = `${progress * 100}%`;
}

window.addEventListener("scroll", updateReadingProgress, { passive: true });
window.addEventListener("resize", updateReadingProgress);
updateReadingProgress();

const notes = [
  {
    title: "Khi em thấy mệt...",
    copy: "Hãy cho phép mình nghỉ một chút. Em không cần lúc nào cũng mạnh mẽ; phần còn lại cứ để anh ôm lấy và cùng em đi qua.",
  },
  {
    title: "Khi em nghi ngờ mình...",
    copy: "Hãy nhớ rằng trong mắt anh, em luôn là một người thật tuyệt vời — không phải vì em hoàn hảo, mà vì em luôn chân thành và cố gắng.",
  },
  {
    title: "Khi em vui...",
    copy: "Hãy kể anh nghe từ điều lớn lao đến chuyện nhỏ xíu. Niềm vui của em luôn có cách làm ngày của anh sáng lên theo.",
  },
  {
    title: "Khi em nhớ anh...",
    copy: "Thì mình cứ nói là nhớ thôi. Vì ở một nơi nào đó rất gần, cũng có một người đang nhớ em nhiều hơn em nghĩ.",
  },
];

function selectNote(selectedIndex) {
  const note = notes[selectedIndex];
  noteTabs.forEach((tab, index) => {
    const isSelected = index === selectedIndex;
    tab.classList.toggle("is-active", isSelected);
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });

  notePaper.classList.add("is-changing");
  window.setTimeout(() => {
    noteIndex.textContent = `LỜI NHẮN ${String(selectedIndex + 1).padStart(2, "0")}`;
    noteTitle.textContent = note.title;
    noteCopy.textContent = note.copy;
    notePaper.classList.remove("is-changing");
  }, reduceMotion ? 0 : 220);
}

noteTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectNote(index));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + step + noteTabs.length) % noteTabs.length;
    selectNote(nextIndex);
    noteTabs[nextIndex].focus();
  });
});

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
    Array.from({ length: 52 }, (_, index) => index).forEach((index) => createPetal(index));
  }
});
