// ========= PERSONALIZAÇÃO =========
const START_DATE = new Date("2025-07-12T00:00:00");

// Troque pelo link que o QR Code deve abrir.
const QR_LINK = "https://1anoe1mesd.netlify.app/";

// Se quiser colocar uma frase secreta especial, troque aqui.
const SECRET_MESSAGE = "Meu lugar favorito no mundo continua sendo qualquer lugar onde você esteja. ♥";

// ========= GATINHO =========
// Pequenos ajustes para manter a animação funcionando em telas menores.
const cat = document.getElementById("catWalker");
window.addEventListener("visibilitychange", () => {
  if (!cat) return;
  cat.style.animationPlayState = document.hidden ? "paused" : "running";
});

// ========= ENTRADA =========
const enterBtn = document.getElementById("enterBtn");
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

enterBtn.addEventListener("click", async () => {
  intro.style.transition = "opacity .8s ease, transform .8s ease";
  intro.style.opacity = "0";
  intro.style.transform = "scale(1.03)";
  setTimeout(() => {
    intro.remove();
    main.classList.remove("hidden");
    window.scrollTo(0, 0);
  }, 700);

  try {
    await music.play();
    musicToggle.textContent = "❚❚";
  } catch {
    musicToggle.textContent = "♫";
  }
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try { await music.play(); musicToggle.textContent = "❚❚"; }
    catch { musicToggle.textContent = "♫"; }
  } else {
    music.pause();
    musicToggle.textContent = "♫";
  }
});

// ========= CONTADOR =========
function diffParts(start, end) {
  let years = end.getFullYear() - start.getFullYear();
  let anniversary = new Date(start);
  anniversary.setFullYear(start.getFullYear() + years);
  if (anniversary > end) years--;

  let cursor = new Date(start);
  cursor.setFullYear(start.getFullYear() + years);

  let months = end.getMonth() - cursor.getMonth();
  if (months < 0) months += 12;
  const test = new Date(cursor);
  test.setMonth(cursor.getMonth() + months);
  if (test > end) months--;

  cursor = new Date(cursor);
  cursor.setMonth(cursor.getMonth() + months);

  const remainingMs = end - cursor;
  let totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {years, months, days, hours, minutes, seconds};
}

function updateCounter() {
  const p = diffParts(START_DATE, new Date());
  for (const key of ["years","months","days","hours","minutes","seconds"]) {
    document.getElementById(key).textContent = p[key];
  }
}
updateCounter();
setInterval(updateCounter, 1000);

// ========= REVEAL =========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: .12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ========= CORAÇÕES =========
const heartLayer = document.getElementById("heart-layer");
setInterval(() => {
  const h = document.createElement("div");
  h.className = "float-heart";
  h.textContent = Math.random() > .5 ? "♥" : "♡";
  h.style.left = `${Math.random()*100}%`;
  h.style.bottom = "-30px";
  h.style.fontSize = `${10 + Math.random()*16}px`;
  h.style.animationDuration = `${3.5 + Math.random()*2.5}s`;
  heartLayer.appendChild(h);
  setTimeout(() => h.remove(), 6500);
}, 900);

// ========= CANTINHO SECRETO =========
document.getElementById("secretBtn").addEventListener("click", () => {
  const card = document.getElementById("secretCard");
  const text = document.getElementById("secretText");
  card.classList.add("opened");
  text.textContent = SECRET_MESSAGE;
  document.getElementById("secretBtn").textContent = "♥ aberto para sempre";
});

// ========= QR CODE =========
if (window.QRCode) {
  new QRCode(document.getElementById("qrcode"), {
    text: QR_LINK,
    width: 215,
    height: 215,
    colorDark: "#0d1020",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}
