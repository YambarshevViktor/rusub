// Обновляет ratings.json оценками с OMDb (imdb + rotten tomatoes + metacritic
// одним запросом на фильм). Letterboxd этот скрипт не трогает вообще —
// у OMDb его нет, он как был, так и остаётся только вручную в FILMS.
//
// Список фильмов (id/title/year) берётся напрямую из FILMS в script.js —
// отдельный файл для этого вести не нужно, редактируется только script.js.
//
// Запускается GitHub Action'ом (.github/workflows/update-ratings.yml) по
// расписанию, но можно и локально: OMDB_API_KEY=... node scripts/update-ratings.mjs

import fs from "node:fs";

const OMDB_KEY = process.env.OMDB_API_KEY;

if(!OMDB_KEY){
  console.error("Нет OMDB_API_KEY (переменная окружения / GitHub Secret).");
  process.exit(1);
}

function readFilmsFromScript(){
  const src = fs.readFileSync("script.js", "utf8");
  const match = src.match(/const FILMS = (\[[\s\S]*?\n\]);/);
  if(!match){
    throw new Error("Не нашёл в script.js блок \"const FILMS = [ ... ];\" — проверьте формат файла.");
  }
  // Свой собственный проверенный файл репозитория, не внешний ввод — безопасно выполнить как JS.
  const FILMS = Function(`"use strict"; return ${match[1]};`)();
  return FILMS
    .filter(f => f.id) // без id фильм автоматика пропускает (сопоставлять не с чем)
    .map(f => ({ id: f.id, title: f.title, year: f.year }));
}

const films = readFilmsFromScript();

let ratings = {};
try {
  ratings = JSON.parse(fs.readFileSync("ratings.json", "utf8"));
} catch {
  // файла ещё нет или он пустой — начинаем с чистого листа
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

for(const film of films){
  const url = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&t=${encodeURIComponent(film.title)}&y=${film.year}`;

  let data;
  try {
    const res = await fetch(url);
    data = await res.json();
  } catch (err) {
    console.warn(`Сеть/запрос не удались для «${film.title}» (${film.year}): ${err.message}`);
    continue;
  }

  if(data.Response === "False"){
    console.warn(`OMDb не нашёл «${film.title}» (${film.year}): ${data.Error}`);
    continue;
  }

  const entry = {};
  for(const r of data.Ratings || []){
    if(r.Source === "Internet Movie Database") entry.imdb = parseFloat(r.Value);
    if(r.Source === "Rotten Tomatoes") entry.rt = parseInt(r.Value, 10);
    if(r.Source === "Metacritic") entry.metacritic = parseInt(r.Value, 10);
  }

  if(Object.keys(entry).length === 0){
    console.warn(`OMDb нашёл «${film.title}», но без оценок ни на одной площадке — пропуск.`);
    continue;
  }

  ratings[film.id] = {
    ...ratings[film.id],
    ...entry,
    updated: new Date().toISOString().slice(0, 10)
  };

  console.log(`✓ ${film.title} (${film.year}) →`, entry);

  // небольшая пауза между запросами, чтобы не долбить API слишком часто
  await sleep(300);
}

fs.writeFileSync("ratings.json", JSON.stringify(ratings, null, 2) + "\n");
console.log("ratings.json обновлён.");
