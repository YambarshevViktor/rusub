// Генерирует статические файлы для поисковиков прямо из FILMS в script.js:
//   index.html — вставляет скрытый <noscript> список тайтлов (то, что видит
//                Googlebot в проиндексированном HTML; людям с включённым JS
//                невидим, потому что отрисовку и так делает script.js)
//   sitemap.xml — корень + по якорю /#<id> на каждый тайтл
//   robots.txt — Allow: / + ссылка на sitemap
//
// Запуск: node scripts/build.mjs  (из корня репозитория)
// Готовые файлы коммитятся — деплой остаётся статическим.
// При добавлении новых тайтлов в FILMS просто перезапустить скрипт.

import fs from "node:fs";

function readBlock(name){
  const src = fs.readFileSync("script.js", "utf8");
  const match = src.match(new RegExp(`const ${name} = ([\\[\\{][\\s\\S]*?\\n\\]);`));
  if(!match){
    throw new Error(`Не нашёл в script.js блок "const ${name} = ..." — проверьте формат файла.`);
  }
  return Function(`"use strict"; return ${match[1]};`)();
}

const PEOPLE = readBlock("PEOPLE");
const films = readBlock("FILMS").filter(f => f.id && f.type !== "fundraiser");

const SITE = "https://rusub.pages.dev";

function escapeHtml(s){
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function authorsLabel(f){
  if(!f.authors || !f.authors.length) return "";
  return f.authors
    .map(k => (PEOPLE[k] && PEOPLE[k].label) || k)
    .join(", ");
}

// --- sitemap.xml ---
const urlXml = ["/", ...films.map(f => `/#${encodeURIComponent(f.id)}`)]
  .map(u => `  <url><loc>${SITE}${u}</loc></url>`)
  .join("\n");
fs.writeFileSync("sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlXml}\n</urlset>\n`);

// --- robots.txt ---
fs.writeFileSync("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

// --- index.html: вставляем скрытый список перед </body> ---
const items = films.map(f => {
  const year = f.year ? ` (${f.year})` : "";
  const ru = f.titleRu ? `\n    <span lang="ru">${escapeHtml(f.titleRu)}</span>` : "";
  const a = authorsLabel(f);
  const ta = a ? `\n    <span>Перевод: ${escapeHtml(a)}</span>` : "";
  return `  <li><a href="/#${escapeHtml(f.id)}"><h2>${escapeHtml(f.title)}${year}</h2>${ru}${ta}</a></li>`;
}).join("\n");

const noscriptBlock =
`<noscript>
  <h1>Список фильмов и сериалов rusub</h1>
  <ul>
${items}
  </ul>
</noscript>`;

let html = fs.readFileSync("index.html", "utf8");
if(/<noscript>[\s\S]*?<\/noscript>/.test(html)){
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, noscriptBlock);
} else {
  html = html.replace(/<\/body>/, `${noscriptBlock}\n</body>`);
}
fs.writeFileSync("index.html", html);

console.log(`OK: ${films.length} тайтлов → index.html, sitemap.xml, robots.txt`);
