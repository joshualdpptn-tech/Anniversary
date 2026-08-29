const heartField = document.querySelector(".heart-field");
const galleryGrid = document.querySelector("#gallery-grid");
const timeline = document.querySelector("#timeline");
const reasonList = document.querySelector("#reason-list");
const envelope = document.querySelector("#envelope");
const letterPaper = document.querySelector("#letter-paper");
const letterBody = document.querySelector("#letter-body");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const lightboxCaption = document.querySelector("#lightbox-caption");

document.querySelector("#hero-title").textContent = STORY.heading;
document.querySelector("#hero-names").textContent = `${STORY.him} & ${STORY.her}`;
document.querySelector("#hero-tagline").textContent = STORY.tagline;
document.querySelector("#letter-to").textContent = `Dear ${STORY.her},`;
document.querySelector("#letter-from").textContent = `Yours, ${STORY.him}`;
document.querySelector("#footer-line").textContent =
  "Made partially by hand with love and dedication — Joshua to Giggle";

const start = new Date(`${STORY.togetherSince}T00:00:00`);
const days = Math.max(1, Math.floor((Date.now() - start.getTime()) / 86400000));
document.querySelector("#days-line").textContent = `${days.toLocaleString()} days of us`;

STORY.moments.forEach((moment) => {
  const item = document.createElement("article");
  item.className = "moment";
  item.innerHTML = `<strong>${moment.year}</strong><div><h3>${moment.title}</h3><p>${moment.text}</p></div>`;
  timeline.append(item);
});

STORY.photos.forEach((photo, index) => {
  const figure = document.createElement("button");
  figure.className = "polaroid";
  figure.style.setProperty("--tilt", `${index % 2 === 0 ? -3 : 3.4}deg`);
  figure.type = "button";
  figure.innerHTML = `<img src="${photo.src}" alt="${photo.caption}" /><figcaption>${photo.caption}</figcaption>`;
  figure.addEventListener("click", () => openLightbox(photo));
  galleryGrid.append(figure);
});

STORY.reasons.forEach((reason) => {
  const item = document.createElement("li");
  item.textContent = reason;
  reasonList.append(item);
});

STORY.letter.forEach((paragraph) => {
  const p = document.createElement("p");
  p.textContent = paragraph;
  letterBody.append(p);
});

envelope.addEventListener("click", () => {
  const open = envelope.classList.toggle("open");
  envelope.setAttribute("aria-expanded", String(open));
  letterPaper.hidden = !open;
  envelope.querySelector(".envelope-label").textContent = open ? "For you" : "Open me";
});

function openLightbox(photo) {
  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.caption;
  lightboxCaption.textContent = photo.hint
    ? `${photo.caption} ${photo.hint}`
    : photo.caption;
  lightbox.hidden = false;
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
}

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

for (let i = 0; i < 18; i += 1) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "♥";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${10 + Math.random() * 12}s`;
  heart.style.animationDelay = `${Math.random() * 8}s`;
  heart.style.fontSize = `${12 + Math.random() * 18}px`;
  heartField.append(heart);
}
