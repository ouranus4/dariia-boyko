/*
  DEMO-режим сайту: водяні знаки + захист від копіювання.
  Щоб отримати чисту версію після оплати — видаліть рядок
  <script src="demo.js" ...> з index.html і сам цей файл.
*/
(() => {
  // ---- налаштування ----
  const MARK   = 'DEMO';                                   // текст водяного знака
  const AUTHOR = 'Розробник сайту';                        // ← впишіть своє ім'я / студію
  const NOTE   = `Демо-версія · не для публікації · © ${AUTHOR}, 2026`;

  const css = `
    .dm-tile{position:fixed;inset:-50%;z-index:97;pointer-events:none;transform:rotate(-24deg);
      background-image:url("data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='520' height='300'><text x='0' y='110' font-family='Arial,sans-serif' font-size='44' font-weight='700' letter-spacing='10' fill='rgba(128,128,128,.16)'>${MARK}</text><text x='190' y='190' font-family='Georgia,serif' font-style='italic' font-size='18' fill='rgba(128,128,128,.16)'>preview</text></svg>`)}");}
    .oval.dm-photo,.strip-track figure.dm-photo{position:relative}
    .dm-photo::before{content:"${MARK} · ${AUTHOR}";position:absolute;right:14px;bottom:14px;z-index:5;pointer-events:none;
      font:600 10px/1 Manrope,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#fff;
      background:rgba(0,0,0,.45);padding:7px 10px;border-radius:20px;backdrop-filter:blur(4px)}
    .oval.dm-photo::before{right:50%;bottom:9%;transform:translateX(50%);white-space:nowrap}
    .dm-bar{position:fixed;right:0;top:50%;transform:translateY(-50%) rotate(180deg);writing-mode:vertical-rl;z-index:98;display:flex;align-items:center;gap:10px;
      max-height:calc(100% - 32px);padding:14px 7px;border-radius:0 10px 10px 0;background:#e8e2d6;color:#0d0d0d;
      font:500 11px/1.3 Manrope,Arial,sans-serif;letter-spacing:.06em;box-shadow:0 10px 30px rgba(0,0,0,.25);pointer-events:none}
    .dm-bar b{background:#0d0d0d;color:#e8e2d6;padding:9px 4px;border-radius:20px;font-weight:700;letter-spacing:.2em}
    .dm-bar span{white-space:nowrap}.dm-short{display:none}
    @media (max-width:640px){.dm-long{display:none}.dm-short{display:inline}.dm-bar{font-size:9.5px;padding:10px 5px}}
    img,video{-webkit-user-drag:none;user-select:none}
    body{-webkit-user-select:none;user-select:none}
    @media print{body{display:none!important}}
  `;

  const style = document.createElement('style');
  style.textContent = css;

  const tile = document.createElement('div');
  tile.className = 'dm-tile';
  const bar = document.createElement('div');
  bar.className = 'dm-bar';
  bar.innerHTML = `<b>${MARK}</b><span class=dm-long>${NOTE}</span><span class=dm-short>Демо-версія · © ${AUTHOR}</span>`;

  const mount = () => {
    if (!style.isConnected) document.head.appendChild(style);
    if (!tile.isConnected) document.body.appendChild(tile);
    if (!bar.isConnected) document.body.appendChild(bar);
  };
  mount();

  // підпис на кожному фото
  document.querySelectorAll('.card:not(.quote-card),.oval,.strip-track figure,.bride-media,.phone')
    .forEach(el => el.classList.add('dm-photo'));
  // стрічка фото генерується скриптом — підписуємо і її
  setTimeout(() => document.querySelectorAll('.strip-track figure').forEach(el => el.classList.add('dm-photo')), 500);

  // якщо водяний знак видалять через інструменти розробника — повертаємо
  new MutationObserver(mount).observe(document.documentElement, { childList: true, subtree: true });

  // стримування копіювання
  const block = e => e.preventDefault();
  document.addEventListener('contextmenu', block);
  document.addEventListener('dragstart', e => { if (e.target.closest('img,video')) e.preventDefault(); });
  document.addEventListener('copy', block);
  document.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && ['s', 'u', 'p'].includes(k)) e.preventDefault();
  });
})();
