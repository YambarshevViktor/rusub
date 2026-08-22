/* ============================================================================
   RUSSUB — как добавить новый фильм

   Ничего в HTML/CSS трогать не нужно. Всё делается здесь, в двух местах:

   1) Файлы фильма кладутся в две папки рядом с index.html:

        russub/
          index.html
          styles.css
          script.js
          posters/            ← сюда постер (.jpg/.png/.webp)
          subtitles/          ← сюда субтитры (.srt)

   2) В массив FILMS ниже добавляется ОДИН объект:

        {
          title:   "Название фильма",
          year:    2026,
          poster:  "posters/nazvanie-filma.jpg",
          srt:     "subtitles/nazvanie-filma.srt",
          authors: ["alice"]
        }

      - poster и srt — пути к файлам, которые вы положили в папки выше
        (можно называть файлы как угодно, главное чтобы путь совпадал).
      - authors — необязательное поле, список ключей из справочника
        PEOPLE ниже (кто перевёл/оформил, кинопоказ и т.д.). Можно
        указать несколько ключей, можно вообще не указывать.
      - year пока используется только для отображения на карточке,
        но уже готов для будущих фильтров по году.

      Цвет карточки и вариант рукописной стрелки подставляются
      автоматически — их не нужно прописывать вручную.

   3) Если появляется новый автор/кинопоказ, которого раньше не было —
      его нужно один раз завести в PEOPLE (см. ниже), а потом просто
      ссылаться на его ключ из authors у любого числа фильмов.
   ============================================================================ */

const PEOPLE = {
  alice:  { label: "Dark Alice",          href: "https://t.me/darkalicesubs" },
  chacun: { label: "Chacun son cinema",   href: "https://t.me/chacun_son_cinema" },
  dark: { label: "DARK Subs",   href: "https://t.me/NightCinemaClub" },
  genco: { label: "Genco",   href: "https://t.me/genco_tm" },
  lebowski: { label: "Где тексты, Лебовски?",   href: "https://t.me/lebowskiposts" },
  goodman: { label: "Goodman Subs",   href: "https://t.me/g00dmansubs" }
};

const FILMS = [
  { title:"The Mandalorian and Grogu",             year:2026, poster:"posters/the-mandalorian-and-grogu-2026.jpg",             srt:"subtitles/the-mandalorian-and-grogu-2026.srt",             authors:["lebowski"], description:"Мандалорец защищает Новую Республику и Грогу" },
  { title:"The Invite",             year:2026, poster:"posters/the-invite-2026.jpg",             srt:"subtitles/the-invite-2026.srt",             authors:["dark"], description:"Соседи предлагают необычный эксперимент" },
  { title:"How to Divorce During the War",         year:2026, poster:"posters/how-to-divorce-during-the-war-2025.jpg",          srt:"subtitles/how-to-divorce-during-the-war-2025.srt",         authors:["alice"], description:"Развод супругов на фоне кризиса и потока беженцев" },
  { title:"Sweet Sixteen", year:2002, poster:"posters/sweet-sixteen-2002.jpg",  srt:"subtitles/sweet-sixteen-2002.srt", authors:["genco"], description:"Юный Лиам выбирает опасный путь ради семьи" },
  { title:"Masters of the Universe", year:2026, poster:"posters/masters-of-the-universe 2026.jpg",  srt:"subtitles/masters-of-the-universe 2026.srt", authors:["goodman"], description:""  },
  { title:"Rose of Nevada", year:2026, poster:"posters/rose-of-nevada-2026.jpg",  srt:"subtitles/rose-of-nevada-2026.srt", authors:["genco"], description:"Рыбаки возвращаются из рейса в прошлое"  },
  
  { title:"Poor Cow", year:1967, poster:"posters/poor-cow-1967.jpg",  srt:"subtitles/poor-cow-1967.srt", authors:["genco"], description:"Пропажа сына заставляет сразиться за самое дорогое"  },
  { title:"Love Streams", year:1984, poster:"posters/love-streams-1984.jpg",  srt:"subtitles/love-streams-1984.srt", authors:["genco"], description:""  },
];

// Палитра "бумажных" фонов карточек — цвет подставляется автоматически по названию.
const PALETTE = [
  "#f4f2e9","#f1f2e7","#f3e7e4","#eeebf2","#e9f1ee","#f5f3ec",
  "#f2f0e8","#eff1e6","#f3e5e2","#eeeaf1","#e8f0ed","#f4f2ec",
  "#f0f1e5","#f3f1e9","#f2e4e2","#eeeaf2"
];

// 15 вариантов рукописной стрелки, все указывают вниз (иконка скачивания)
const ARROWS = [
  '<path d="M8 2 C6 8,10 11,8 17 M4 13 C6 15,7 16,8 17 M12 13 C10 15,9 16,8 17"/>',
  '<path d="M9 2 C11 8,7 11,9 17 M5 12 C7 14,8 16,9 17 M13 13 C11 15,10 16,9 17"/>',
  '<path d="M8 3 C9 9,7 12,8 18 M4 14 C6 16,7 17,8 18 M12 14 C10 16,9 17,8 18"/>',
  '<path d="M9 2 C7 7,11 10,9 16 M6 12 C7 14,8 15,9 16 M12 12 C11 14,10 15,9 16"/>',
  '<path d="M8 2 C10 8,6 12,8 17 M5 13 C6 15,7 16,8 17 M11 12 C10 14,9 16,8 17"/>',
  '<path d="M9 3 C8 9,10 12,9 18 M5 14 C7 16,8 17,9 18 M13 13 C11 15,10 17,9 18"/>',
  '<path d="M8 2 C9 8,7 10,8 16 M4 12 C6 14,7 15,8 16 M12 11 C10 13,9 15,8 16"/>',
  '<path d="M9 3 C11 9,7 11,9 17 M6 13 C7 15,8 16,9 17 M13 12 C11 14,10 16,9 17"/>',
  '<path d="M8 2 C6 9,10 12,8 18 M4 13 C6 16,7 17,8 18 M12 14 C10 16,9 17,8 18"/>',
  '<path d="M9 2 C10 7,8 11,9 16 M5 12 C7 14,8 15,9 16 M13 11 C11 13,10 15,9 16"/>',
  '<path d="M8 3 C7 8,9 12,8 17 M4 13 C6 15,7 16,8 17 M12 12 C10 14,9 16,8 17"/>',
  '<path d="M9 2 C11 8,7 12,9 18 M5 14 C7 16,8 17,9 18 M13 13 C11 16,10 17,9 18"/>',
  '<path d="M8 2 C6 8,10 11,8 16 M4 12 C6 14,7 15,8 16 M12 11 C10 13,9 15,8 16"/>',
  '<path d="M9 3 C10 9,8 12,9 17 M5 13 C7 15,8 16,9 17 M13 12 C11 15,10 16,9 17"/>',
  '<path d="M8 2 C9 7,7 11,8 18 M4 14 C6 16,7 17,8 18 M12 13 C10 16,9 17,8 18"/>'
];

// Галочка, которая заменяет стрелку после завершения скачивания
const CHECK = '<path d="M3 10 L7 14 L14 4"/>';

function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}

// Стабильный хэш строки — один и тот же фильм всегда получает один и тот же цвет.
function hashString(str){
  let h = 0;
  for(let i = 0; i < str.length; i++){
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function makeCard(film, i){
  const color = PALETTE[hashString(film.title + i) % PALETTE.length];
  const arrow = ARROWS[Math.floor(Math.random() * ARROWS.length)];

  const metaLinks = (film.authors || [])
    .map(key => PEOPLE[key])
    .filter(Boolean)
    .map(p => `<a class="meta-link" href="${escapeHtml(p.href || '#')}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.label)}</a>`)
    .join("");

  return `
  <article class="card" style="--paper:${color}; --poster:url('${escapeHtml(film.poster)}')">
    <button class="poster-button" type="button"
      aria-label="Скачать субтитры: ${escapeHtml(film.title)}"
      data-srt="${escapeHtml(film.srt || '')}"
      data-title="${escapeHtml(film.title)}">
      <span class="poster-image" aria-hidden="true"></span>
      <span class="poster-content">
        <span class="year">${film.year}</span>
        <span class="title">${escapeHtml(film.title)}</span>
      </span>
      <span class="download" aria-hidden="true">
        <span class="download-label">download srt</span>
        <svg class="download-arrow" viewBox="0 0 17 20" aria-hidden="true">${arrow}</svg>
      </span>
    </button>

    <div class="meta">${metaLinks}</div>
    ${film.description ? `<p class="description">${escapeHtml(film.description)}</p>` : ""}
  </article>`;
}

document.getElementById("grid").innerHTML = FILMS.map(makeCard).join("");

document.querySelectorAll(".poster-button").forEach((button) => {
  const card = button.closest(".card");
  const arrowSvg = button.querySelector(".download-arrow");
  const label = button.querySelector(".download-label");
  const originalArrow = arrowSvg.innerHTML;
  const srtPath = button.dataset.srt;

  button.addEventListener("click", () => {
    if(card.classList.contains("downloaded")) return;

    if(!srtPath){
      console.warn(`У фильма «${button.dataset.title}» не указан srt-файл (поле "srt" в FILMS).`);
      return;
    }

    // Реальный файл из папки subtitles/ — путь берётся из film.srt.
    const a = document.createElement("a");
    a.href = srtPath;
    a.download = srtPath.split("/").pop();
    document.body.appendChild(a);
    a.click();
    a.remove();

    card.classList.add("downloaded");
    arrowSvg.innerHTML = CHECK;
    label.textContent = "downloaded";
    card.classList.add("bounce");

    card.addEventListener("animationend", function onBounce(e){
      if(e.animationName !== "cardBounce") return;
      card.classList.remove("bounce");
      card.removeEventListener("animationend", onBounce);
    });

    setTimeout(() => {
      card.classList.remove("downloaded");
      arrowSvg.innerHTML = originalArrow;
      label.textContent = "download srt";
    }, 2000);
  });
});
