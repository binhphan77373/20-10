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
const carouselButtons = [...document.querySelectorAll(".carousel-button")];
const mobileDockLinks = [...document.querySelectorAll(".mobile-dock a")];
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

carouselButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const carousel = document.querySelector(`#${button.dataset.carousel}Carousel`);
    const item = carousel.querySelector(".memory-card, .photo-panel, .gallery-quote");
    if (!item) return;

    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 16;
    const direction = button.dataset.direction === "next" ? 1 : -1;
    carousel.scrollBy({
      left: direction * (item.getBoundingClientRect().width + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  });
});

const dockTargets = mobileDockLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const dockObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    mobileDockLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  },
  { rootMargin: "-28% 0px -58%", threshold: [0, 0.1, 0.4] },
);

dockTargets.forEach((section) => dockObserver.observe(section));

mobileDockLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileDockLinks.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
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


// Use the original files so that the full-screen viewer never crops a memory.
const albumPhotos = [
  {
    "file": "564535032027a079f93613.jpg",
    "caption": "Một chút bình yên, một người anh thương.",
    "alt": "Hai đứa nắm tay bên biển dưới bầu trời xanh"
  },
  {
    "file": "98f5212f340bb455ed1a7.jpg",
    "caption": "Đi cùng nhau, ngắm cùng một bầu trời.",
    "alt": "Hai đứa selfie trước khung cảnh biển và núi"
  },
  {
    "file": "79aed76dc24942171b584.jpg",
    "caption": "Có em, chuyến đi nào cũng đáng nhớ.",
    "alt": "Hai đứa trên mặt nước xanh"
  },
  {
    "file": "50a3207b355fb501ec4e6.jpg",
    "caption": "Nụ cười anh muốn nhìn thấy mỗi ngày.",
    "alt": "Em mặc áo vàng nhạt ở quán cà phê"
  },
  {
    "file": "34b0966a834e03105a5f5.jpg",
    "caption": "Gần thêm một chút, thương thêm thật nhiều.",
    "alt": "Hai đứa tựa vào nhau chụp ảnh selfie"
  },
  {
    "file": "9603795d6c79ec27b56816.jpg",
    "caption": "Bốn khung hình, thật nhiều yêu thương.",
    "alt": "Dải photobooth bốn khung ảnh đôi"
  },
  {
    "file": "e2349b728e560e08574715.jpg",
    "caption": "Những cái ôm được giữ lại trong ảnh.",
    "alt": "Dải photobooth của hai đứa với những cái ôm"
  },
  {
    "file": "b9e40c3e191a9944c00b9.jpg",
    "caption": "Lại thêm một tấm hình có hai đứa.",
    "alt": "Hai đứa mỉm cười với biển phía sau"
  },
  {
    "file": "91ce9f168a320a6c53238.jpg",
    "caption": "Bên nhau, trước một khoảng trời rộng.",
    "alt": "Hai đứa chụp ảnh với biển và thành phố phía xa"
  },
  {
    "file": "d69ddd45c861483f117010.jpg",
    "caption": "Cô gái khiến mọi khung hình dịu dàng hơn.",
    "alt": "Em đội nón lá đứng cạnh chiếc xe đạp"
  },
  {
    "file": "e82979ea6cceec90b5df2.jpg",
    "caption": "Đáng yêu cả những lúc mình nghịch ngợm.",
    "alt": "Ảnh selfie hai đứa với hiệu ứng mũ vàng vui nhộn"
  },
  {
    "file": "520216c103e583bbdaf41.jpg",
    "caption": "Chụp thêm một tấm thật ngốc nghếch nhé.",
    "alt": "Ảnh selfie hai đứa với hiệu ứng vui nhộn"
  },
  {
    "file": "1f3b58f84ddccd8294cd3.jpg",
    "caption": "Cứ vô tư như khi ở cạnh nhau.",
    "alt": "Hai đứa chụp ảnh với hiệu ứng trái ổi"
  },
  {
    "file": "1f1e7158647ce422bd6d14.jpg",
    "caption": "Một bờ vai, một chỗ dựa.",
    "alt": "Hai đứa tựa vai nhau trong một tấm ảnh gần"
  },
  {
    "file": "b052e214f730776e2e2112.jpg",
    "caption": "Có những điều nhỏ xíu cũng đáng giữ lại.",
    "alt": "Khoảnh khắc hai đứa bên nhau trước gương"
  }
];
const photoViewer = document.querySelector("#photoViewer");
const viewerImage = document.querySelector("#viewerImage");
const viewerCount = document.querySelector("#viewerCount");
const viewerCaption = document.querySelector("#viewerCaption");
let currentPhoto = 0;

function showPhoto(index) {
  currentPhoto = (index + albumPhotos.length) % albumPhotos.length;
  const photo = albumPhotos[currentPhoto];
  viewerImage.src = `./images/${photo.file}`;
  viewerImage.alt = photo.alt;
  viewerCaption.textContent = photo.caption;
  viewerCount.textContent = `${String(currentPhoto + 1).padStart(2, "0")} / ${albumPhotos.length}`;
}

document.querySelectorAll("[data-photo]").forEach((button) => {
  button.addEventListener("click", () => {
    showPhoto(Number(button.dataset.photo));
    document.body.classList.add("viewer-open");
    photoViewer.showModal();
  });
});

document.querySelector("#closeViewer").addEventListener("click", () => photoViewer.close());
photoViewer.addEventListener("close", () => document.body.classList.remove("viewer-open"));
document.querySelector("#previousPhoto").addEventListener("click", () => showPhoto(currentPhoto - 1));
document.querySelector("#nextPhoto").addEventListener("click", () => showPhoto(currentPhoto + 1));
photoViewer.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    photoViewer.close();
    return;
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showPhoto(currentPhoto + (event.key === "ArrowRight" ? 1 : -1));
  }
});

let swipeStart = null;
const viewerStage = document.querySelector(".viewer-stage");
viewerStage.addEventListener("touchstart", (event) => {
  swipeStart = event.touches.length === 1
    ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
    : null;
}, { passive: true });
viewerStage.addEventListener("touchend", (event) => {
  if (!swipeStart || !event.changedTouches.length) return;
  const dx = event.changedTouches[0].clientX - swipeStart.x;
  const dy = event.changedTouches[0].clientY - swipeStart.y;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    showPhoto(currentPhoto + (dx < 0 ? 1 : -1));
  }
  swipeStart = null;
}, { passive: true });
viewerStage.addEventListener("touchcancel", () => { swipeStart = null; }, { passive: true });
