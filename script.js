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
          id:      "nazvanie-filma-2026",
          title:   "Название фильма",
          year:    2026,
          poster:  "posters/nazvanie-filma.jpg",
          srt:     "subtitles/nazvanie-filma.srt",
          authors: ["alice"]
        }

      - id — короткий уникальный идентификатор (лапслок, дефисы, обычно
        как имя файла без расширения). Нужен для автообновления рейтингов
        (см. README-ratings.md) — по нему сопоставляется фильм и его
        оценки. На вид карточки не влияет. Если фильм только один —
        можно сделать id как в poster; если несколько версий одного
        фильма (как два перевода "Scary Movie") — добавьте суффикс (-g/-r).
      - poster и srt — пути к файлам, которые вы положили в папки выше
        (можно называть файлы как угодно, главное чтобы путь совпадал).
      - authors — необязательное поле, список ключей из справочника
        PEOPLE ниже (кто перевёл/оформил, кинопоказ и т.д.). Можно
        указать несколько ключей, можно вообще не указывать.
      - year пока используется только для отображения на карточке,
        но уже готов для будущих фильтров по году.

      Цвет карточки и вариант рукописной стрелки подставляются
      автоматически — их не нужно прописывать вручную.

   НОВОЕ — необязательные поля:

     - type: "series" — если это сериал (по умолчанию считается фильмом).
       У сериала вместо srt указывается zip — но только на ОДИН сезон целиком
       (скачать сразу несколько сезонов одним архивом нельзя):
         { ...,
           type: "series",
           zip: "subtitles/nazvanie-serial-2s.zip",
           season: 2,
           episodesAvailable: 4,
           episodesTotal: 12 }
       season/episodesAvailable/episodesTotal — необязательные, показываются
       под годом как "2s · 4/12e" (сезон 2, добавлено 4 из 12 серий). Когда
       выложите все серии сезона — просто уравняйте episodesAvailable и
       episodesTotal (или уберите episodesAvailable), и подпись сама станет
       короче: "2s · 12e".
       У сериала карточка автоматически получает "стопку" из 2 слоёв сзади.

     - ratings: { imdb, letterboxd, rt, metacritic } — любые из четырёх,
       можно не указывать вообще или указать только часть:
         ratings: { imdb: 7.3, rt: 88 }
       Показываются в виде маленьких цветных меток под постером.

       АВТООБНОВЛЕНИЕ: imdb/rt/metacritic раз в сутки подтягиваются сами
       (см. README-ratings.md) прямо отсюда, из FILMS — отдельный список
       вести не нужно, id достаточно. То, что вы впишете здесь вручную,
       работает как запасной вариант, пока автообновление ещё не нашло
       оценку. letterboxd автоматика не трогает вообще — его вы всегда
       проставляете сюда сами.

   3) Если появляется новый автор/кинопоказ, которого раньше не было —
      его нужно один раз завести в PEOPLE (см. ниже), а потом просто
      ссылаться на его ключ из authors у любого числа фильмов.
   ============================================================================ */

const PEOPLE = {
  alice: {
    label: "Dark Alice",
    href: "https://t.me/darkalicesubs"
  },

  chacun: {
    label: "Chacun son cinema",
    href: "https://t.me/chacun_son_cinema"
  },

  dark: {
    label: "DARK Subs",
    href: "https://t.me/NightCinemaClub"
  },

  genco: {
    label: "Genco",
    href: "https://t.me/genco_tm"
  },

  lebowski: {
    label: "Где тексты, Лебовски?",
    href: "https://t.me/lebowskiposts"
  },

  goodman: {
    label: "Goodman Subs",
    href: "https://t.me/g00dmansubs"
  },

  one: {
    label: "one inch tall",
    href: "https://t.me/oneinchtall2"
  },

  wastedTime: {
    label: "All the Wasted Time",
    href: "https://t.me/allthewastedtime"
  },

  ripley: {
    label: "Ripley_2092",
    href: "https://t.me/ripley2092subs"
  },

  chatAndalou: {
    label: "Un Chat Andalou",
    href: "https://t.me/chat_andalou"
  },

  focs: {
    label: "FOCS",
    href: "https://t.me/forFOCSsake"
  },

  coolStory: {
    label: "Cool Story Blog",
    href: "https://t.me/coolstorysub"
  },

  noBetter: {
    label: "no better",
    href: "https://t.me/anobetter"
  },

  summer: {
    label: "нелюбимое лето",
    href: "https://t.me/fsumm3r"
  },
};

const FILMS = [
  {
    id: "scary-movie-2026-g",
    title: "Scary Movie",
    year: 2026,
    poster: "posters/scary-movie-2026-g.jpg",
    srt: "subtitles/scary-movie-2026-g.srt",
    authors: ["goodman"],
    ratings: { rt: 27 },
    description: ""
  },

  {
    id: "scary-movie-2026-r",
    title: "Scary Movie",
    year: 2026,
    poster: "posters/scary-movie-2026-r.jpg",
    srt: "subtitles/scary-movie-2026-r.srt",
    authors: ["ripley", "chatAndalou"],
    ratings: { rt: 27 },
    description: ""
  },

  {
    id: "the-bear-2026",
    title: "The Bear",
    year: 2026,
    type: "series",
    poster: "posters/the-bear-2026.jpg",
    zip: "subtitles/the-bear-2026.zip",
    season: 5,
    episodesAvailable: 8,
    episodesTotal: 8,
    authors: ["focs"],
    ratings: { rt: 100, metacritic: 82 },
    description: ""
  },

  {
    id: "avatar-aang-the-last-airbender-2026",
    title: "Avatar Aang: The Last Airbender",
    year: 2026,
    poster: "posters/avatar-aang-the-last-airbender-2026.jpg",
    srt: "subtitles/avatar-aang-the-last-airbender-2026.srt",
    authors: ["coolStory"],
    ratings: { imdb: 7.8, rt: 91 },
    description: ""
  },

  {
    id: "the-last-viking-2025",
    title: "The Last Viking",
    year: 2025,
    poster: "posters/the-last-viking-2025.jpg",
    srt: "subtitles/the-last-viking-2025.srt",
    authors: ["one"],
    ratings: { imdb: 7.2, rt: 94 },
    description: ""
  },

  {
    id: "moss-freud-2025",
    title: "Moss & Freud",
    year: 2025,
    poster: "posters/moss-freud-2025.jpg",
    srt: "subtitles/moss-freud-2025.srt",
    authors: ["noBetter"],
    ratings: { imdb: 5.4 },
    description: ""
  },

  {
    id: "backrooms-2026",
    title: "Backrooms",
    year: 2026,
    poster: "posters/backrooms-2026.jpg",
    srt: "subtitles/backrooms-2026.srt",
    authors: ["ripley", "summer"],
    ratings: { rt: 87 },
    description: ""
  },

  {
    id: "i-love-boosters-2026",
    title: "I Love Boosters",
    year: 2026,
    poster: "posters/i-love-boosters-2026.jpg",
    srt: "subtitles/i-love-boosters-2026.srt",
    authors: ["summer"],
    ratings: { imdb: 6.6, letterboxd: 3.8, rt: 92},
    description: ""
  },

  {
    id: "minions-monsters-2026",
    title: "Minions & Monsters",
    year: 2026,
    poster: "posters/minions-monsters-2026.jpg",
    srt: "subtitles/minions-monsters-2026.srt",
    authors: ["goodman"],
    ratings: { imdb: 6.4 },
    description: ""
  },

  {
    id: "ann-droid-2026",
    title: "Ann Droid",
    year: 2026,
    type: "series",
    poster: "posters/ann-droid-2026.jpg",
    zip: "subtitles/ann-droid-2026.zip",
    season: 1,
    episodesAvailable: 6,
    episodesTotal: 6,
    authors: ["wastedTime"],
    ratings: { imdb: 7.7 },
    description: ""
  },

  {
    id: "truly-naked-2026",
    title: "Truly Naked",
    year: 2026,
    poster: "posters/truly-naked-2026.jpg",
    srt: "subtitles/truly-naked-2026.srt",
    authors: ["one"],
    ratings: { imdb: 6.4, letterboxd: 3.2 },
    description: ""
  },
  
  {
    id: "bitter-christmas-2026",
    title: "Bitter Christmas",
    year: 2026,
    poster: "posters/bitter-christmas-2026.jpg",
    srt: "subtitles/bitter-christmas-2026.srt",
    authors: ["genco"],
    ratings: { imdb: 6.3 },
    description: ""
  },

  {
    id: "the-mandalorian-and-grogu-2026",
    title: "The Mandalorian and Grogu",
    year: 2026,
    poster: "posters/the-mandalorian-and-grogu-2026.jpg",
    srt: "subtitles/the-mandalorian-and-grogu-2026.srt",
    authors: ["lebowski"],
    ratings: { imdb: 6.8, rt: 65 },
    description: ""
  },

  {
    id: "the-invite-2026",
    title: "The Invite",
    year: 2026,
    poster: "posters/the-invite-2026.jpg",
    srt: "subtitles/the-invite-2026.srt",
    authors: ["dark"],
    ratings: { imdb: 7.6, rt: 96 },
    description: ""
  },

  {
    id: "how-to-divorce-during-the-war-2025",
    title: "How to Divorce During the War",
    year: 2025,
    poster: "posters/how-to-divorce-during-the-war-2025.jpg",
    srt: "subtitles/how-to-divorce-during-the-war-2025.srt",
    authors: ["alice"],
    ratings: { rt: 100 },
    description: ""
  },

  {
    id: "sweet-sixteen-2002",
    title: "Sweet Sixteen",
    year: 2002,
    poster: "posters/sweet-sixteen-2002.jpg",
    srt: "subtitles/sweet-sixteen-2002.srt",
    authors: ["genco"],
    ratings: { imdb: 7, rt: 97, metacritic: 86 },
    description: ""
  },

  {
    id: "masters-of-the-universe-2026",
    title: "Masters of the Universe",
    year: 2026,
    poster: "posters/masters-of-the-universe 2026.jpg",
    srt: "subtitles/masters-of-the-universe 2026.srt",
    authors: ["goodman"],
    ratings: { rt: 74 },
    description: ""
  },

  {
    id: "rose-of-nevada-2026",
    title: "Rose of Nevada",
    year: 2026,
    poster: "posters/rose-of-nevada-2026.jpg",
    srt: "subtitles/rose-of-nevada-2026.srt",
    authors: ["genco"],
    ratings: { imdb: 6.3, rt: 100, metacritic: 82 },
    description: ""
  },

  {
    id: "poor-cow-1967",
    title: "Poor Cow",
    year: 1967,
    poster: "posters/poor-cow-1967.jpg",
    srt: "subtitles/poor-cow-1967.srt",
    authors: ["genco"],
    ratings: { imdb: 6.8, rt: 50 },
    description: ""
  },

  {
    id: "love-streams-1984",
    title: "Love Streams",
    year: 1984,
    poster: "posters/love-streams-1984.jpg",
    srt: "subtitles/love-streams-1984.srt",
    authors: ["genco"],
    ratings: { imdb: 7.6, rt: 100 },
    description: ""
  },
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

// Маленькая иконка-стрелочка перед каждым автором в подписи (не путать со стрелкой скачивания)
const AUTHOR_ICON = '<path d="M2.5 2 v4.2 a2 2 0 0 0 2 2 h7"/><path d="M8.5 5.6 L11.5 8.2 L8.5 10.8"/>';

// Скачивается всегда только ОДИН сезон целиком (один zip), поэтому подпись
// показывает именно его: "2s · 4/12e" пока выложены не все серии сезона,
// и просто "2s · 12e", когда весь сезон уже добавлен целиком.
function episodesLabel(film){
  if(film.type !== "series") return "";
  const parts = [];
  if(film.season) parts.push(`${film.season}s`);
  if(film.episodesAvailable != null && film.episodesTotal != null){
    parts.push(film.episodesAvailable === film.episodesTotal
      ? `${film.episodesTotal}e`
      : `${film.episodesAvailable}/${film.episodesTotal}e`);
  } else if(film.episodesTotal != null){
    parts.push(`${film.episodesTotal}e`);
  } else if(film.episodesAvailable != null){
    parts.push(`${film.episodesAvailable}e`);
  }
  return parts.join(" · ");
}

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
  const isSeries = film.type === "series";
  const downloadPath = isSeries ? (film.zip || "") : (film.srt || "");
  const downloadLabel = isSeries ? "download zip" : "download srt";
  const episodes = episodesLabel(film);

  const metaLinks = (film.authors || [])
    .map(key => PEOPLE[key])
    .filter(Boolean)
    .map(p => `<a class="meta-link" href="${escapeHtml(p.href || '#')}" target="_blank" rel="noopener noreferrer"><svg class="meta-icon" viewBox="0 0 14 14" aria-hidden="true">${AUTHOR_ICON}</svg><span class="meta-link-text">${escapeHtml(p.label)}</span></a>`)
    .join("");

  const ratingsHtml = film.ratings ? `<div class="ratings">
      ${film.ratings.imdb != null ? `<span class="rating rating-imdb"><span class="rating-dot"></span>${film.ratings.imdb}</span>` : ""}
      ${film.ratings.letterboxd != null ? `<span class="rating rating-letterboxd"><span class="rating-dot"></span>${film.ratings.letterboxd}</span>` : ""}
      ${film.ratings.rt != null ? `<span class="rating rating-rt"><span class="rating-dot"></span>${film.ratings.rt}%</span>` : ""}
      ${film.ratings.metacritic != null ? `<span class="rating rating-metacritic"><span class="rating-dot"></span>${film.ratings.metacritic}</span>` : ""}
    </div>` : "";

  const stackLayers = isSeries
    ? `<span class="stack-layer l2" aria-hidden="true"></span><span class="stack-layer l1" aria-hidden="true"></span>`
    : "";

  return `
  <article class="card" style="--paper:${color}; --poster:url('${escapeHtml(film.poster)}')">
    ${stackLayers}
    <button class="poster-button" type="button"
      aria-label="Скачать субтитры${isSeries ? ' (zip)' : ''}: ${escapeHtml(film.title)}"
      data-file="${escapeHtml(downloadPath)}"
      data-title="${escapeHtml(film.title)}">
      <span class="poster-image" aria-hidden="true"></span>
      <span class="poster-content">
        <span class="year">${film.year}</span>
        ${episodes ? `<span class="episodes">${escapeHtml(episodes)}</span>` : ""}
        <span class="title">${escapeHtml(film.title)}</span>
      </span>
      <span class="download" aria-hidden="true">
        <span class="download-label">${downloadLabel}</span>
        <svg class="download-arrow" viewBox="0 0 17 20" aria-hidden="true">${arrow}</svg>
      </span>
    </button>

    <div class="meta">
      ${ratingsHtml}
      ${metaLinks}
    </div>
    ${film.description ? `<p class="description">${escapeHtml(film.description)}</p>` : ""}
  </article>`;
}

// Подтягивает автообновляемые оценки (imdb/rt/metacritic из ratings.json,
// см. README-ratings.md) и накладывает их поверх того, что руками вписано
// в FILMS — letterboxd этот файл никогда не трогает, он туда просто не
// попадает при автосборке.
async function loadAutoRatings(){
  try{
    const res = await fetch("ratings.json", { cache: "no-store" });
    if(!res.ok) return {};
    return await res.json();
  }catch{
    return {};
  }
}

function attachDownloadHandlers(){
  document.querySelectorAll(".poster-button").forEach((button) => {
    const card = button.closest(".card");
    const arrowSvg = button.querySelector(".download-arrow");
    const label = button.querySelector(".download-label");
    const originalArrow = arrowSvg.innerHTML;
    const originalLabel = label.textContent;
    const filePath = button.dataset.file;

    button.addEventListener("click", () => {
      if(card.classList.contains("downloaded")) return;

      if(!filePath){
        console.warn(`У «${button.dataset.title}» не указан файл для скачивания (поле "srt"/"zip" в FILMS).`);
        return;
      }

      // Реальный файл из папки subtitles/ — путь берётся из film.srt (или film.zip у сериала).
      const a = document.createElement("a");
      a.href = filePath;
      a.download = filePath.split("/").pop();
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
        label.textContent = originalLabel;
      }, 2000);
    });
  });
}

(async () => {
  const autoRatings = await loadAutoRatings();

  FILMS.forEach(film => {
    const auto = film.id ? autoRatings[film.id] : null;
    if(auto){
      const { updated, ...scores } = auto; // "updated" — служебное поле, в ratings не подмешиваем
      film.ratings = { ...film.ratings, ...scores };
    }
  });

  document.getElementById("grid").innerHTML = FILMS.map(makeCard).join("");
  attachDownloadHandlers();
})();
