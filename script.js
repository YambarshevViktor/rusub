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

  dungeons: {
    label: "Подземелья и болота",
    href: "https://t.me/dungeons_and_swamps"
  },

  naruhinka: {
    label: "naruhinka",
    href: "https://t.me/naruhinkaread"
  },

  notCloset: {
    label: "Субтитры не из шкафа",
    href: "https://t.me/notscandiscope"
  },

  homoSubiens: {
    label: "homo SUBiens",
    href: "https://t.me/homo_SUBiens"
  },

  serpentarium: {
    label: "serpentarium",
    href: "https://t.me/serpentarium_subs"
  },

  vital: {
    label: "Витальное кино",
    href: "https://t.me/vitalkino"
  },

  scandi: {
    label: "Сканди-шкаф",
    href: "https://t.me/scandiscope_true"
  },

  kleinzeit: {
    label: "Kleinzeit Rus Sub",
    href: "https://t.me/kleinzeitrussub"
  },

  subbedAf: {
    label: "Subbed AF",
    href: "https://t.me/SubbedAsFck"
  },

  no_74: {
    label: "@no_74",
    href: "https://t.me/no_74"
  },

  lazyCats: {
    label: "LazyCats"
  },

  deeffest: {
    label: "deeffest"
  },

  tuffetu: {
    label: "TuffeTu"
  },

  jwrlbex: {
    label: "jwrlbex",
    href: "https://t.me/jwrlbexxeblrwj"
  },

  blindSubs: {
    label: "BlindSubs",
    href: "https://t.me/blindsubtitles"
  },

  bazhenov: {
    label: "Роман Баженов"
  },

};

const FILMS = [
  {
    type: "fundraiser",
    active: true,
    done: true,
    title: "I Want Your Sex",
    titleRu: "Хочу твоего секса",
    image: "fundraisers/i-want-your-sex-2026.jpg",
    goal: "6 000 ₽",
	  ratings: { imdb: 6.4 },
    link: { label: "one inch tall", href: "https://t.me/oneinchtall2/85" },
    shade: true
  },

  {
    type: "fundraiser",
    active: true,
    title: "A Woman Under the Influence",
    titleRu: "Женщина под влиянием",
    image: "fundraisers/a-woman-under-the-influence-1974.jpg",
    goal: "6 666 ₽",
	  ratings: { imdb: 8.0 },
    link: { label: "serpentarium", href: "https://t.me/serpentarium_subs/297" },
    shade: true
  },

  {
    id: "lanterns-2026",
    title: "Lanterns",
    titleRu: "Фонари",
    year: 2026,
    type: "series",
    poster: "posters/lanterns-2026.jpg",
    zip: "subtitles/lanterns-2026.zip",
    season: 1,
    episodesAvailable: 3,
    episodesTotal: 8,
    authors: ["goodman"],
    ratings: { rt: 94, metacritic: 72 },
    description: ""
  },

  {
    id: "all-thats-left-of-you-2025",
    title: "All That's Left of You",
    titleRu: "Всё, что осталось",
    year: 2025,
    poster: "posters/all-thats-left-of-you-2025.jpg",
    srt: "subtitles/all-thats-left-of-you-2025.srt",
    authors: ["jwrlbex"],
    ratings: { letterboxd: 4.19 },
    description: ""
  },

  {
    id: "atropia-2025",
    title: "Atropia",
    titleRu: "Атропия",
    year: 2025,
    poster: "posters/atropia-2025.jpg",
    srt: "subtitles/atropia-2025.srt",
    authors: ["one", "chatAndalou"],
    award: true,
    ratings: { letterboxd: 3.21 },
    description: ""
  },

  {
    id: "eephus-2024",
    title: "Eephus",
    titleRu: "Замирающий",
    year: 2024,
    poster: "posters/eephus-2024.jpg",
    srt: "subtitles/eephus-2024.srt",
    authors: ["genco"],
    ratings: { letterboxd: 3.67 },
    description: ""
  },

  {
    id: "islands-2025",
    title: "Islands",
    titleRu: "Острова",
    year: 2025,
    poster: "posters/islands-2025.jpg",
    srt: "subtitles/islands-2025.srt",
    authors: ["bazhenov"],
    ratings: { letterboxd: 3.24 },
    description: ""
  },

  {
    id: "papicha-2019",
    title: "Papicha",
    titleRu: "Чикуля (Лапочка)",
    year: 2019,
    poster: "posters/papicha-2019.jpg",
    srt: "subtitles/papicha-2019.srt",
    authors: ["notCloset"],
    ratings: { letterboxd: 3.91 },
    description: ""
  },

  {
    id: "frownland-2007",
    title: "Frownland",
    titleRu: "Хмурляндия",
    year: 2007,
    poster: "posters/frownland-2007.jpg",
    srt: "subtitles/frownland-2007.srt",
    authors: ["chacun"],
    ratings: { letterboxd: 3.67 },
    description: ""
  },

  {
    id: "the-ninth-configuration-1979",
    title: "The Ninth Configuration",
    titleRu: "Девятая конфигурация",
    year: 1979,
    poster: "posters/the-ninth-configuration-1979.jpg",
    srt: "subtitles/the-ninth-configuration-1979.srt",
    authors: ["blindSubs"],
    ratings: { letterboxd: 3.58 },
    description: ""
  },

  {
    id: "her-story-2024",
    title: "Her Story",
    titleRu: "Её история",
    year: 2024,
    poster: "posters/her-story-2024.jpg",
    srt: "subtitles/her-story-2024.srt",
    authors: ["lazyCats"],
    ratings: { letterboxd: 3.92 },
    description: ""
  },

  {
    id: "tomorrows-joe-2011",
    title: "Tomorrow's Joe",
    titleRu: "Завтрашний Джо",
    year: 2011,
    poster: "posters/tomorrows-joe-2011.jpg",
    srt: "subtitles/tomorrows-joe-2011.srt",
    authors: ["deeffest"],
    description: ""
  },

  {
    id: "real-women-have-curves-2002",
    title: "Real Women Have Curves",
    titleRu: "Настоящие женщины всегда в теле",
    year: 2002,
    poster: "posters/real-women-have-curves-2002.jpg",
    srt: "subtitles/real-women-have-curves-2002.srt",
    authors: ["tuffetu"],
    award: true,
    ratings: { letterboxd: 4.01 },
    description: ""
  },

  {
    id: "suspended-time-2024",
    title: "Suspended Time",
    titleRu: "Вне времени",
    year: 2024,
    poster: "posters/suspended-time-2024.jpg",
    srt: "subtitles/suspended-time-2024.srt",
    authors: ["genco"],
    ratings: { letterboxd: 2.96 },
    description: ""
  },

  {
    id: "david-and-lisa-1962",
    title: "David and Lisa",
    titleRu: "Дэвид и Лиза",
    year: 1962,
    poster: "posters/david-and-lisa-1962.jpg",
    srt: "subtitles/david-and-lisa-1962.srt",
    authors: ["genco"],
    ratings: { letterboxd: 3.70 },
    description: ""
  },

  {
    id: "hippo-2023",
    title: "Hippo",
    titleRu: "Хиппо",
    year: 2023,
    poster: "posters/hippo-2023.jpg",
    srt: "subtitles/hippo-2023.srt",
    authors: ["no_74"],
    ratings: { letterboxd: 3.40 },
    description: ""
  },

  {
    id: "rosebush-pruning-2026",
    title: "Rosebush Pruning",
    titleRu: "Обрезка розового куста",
    year: 2026,
    poster: "posters/rosebush-pruning-2026.jpg",
    srt: "subtitles/rosebush-pruning-2026.srt",
    authors: ["focs"],
    ratings: { imdb: 5.8, letterboxd: 2.5, rt: 17, metacritic: 45 },
    description: ""
  },

  {
    id: "you-dont-belong-here-2026",
    title: "You Don't Belong Here",
    titleRu: "Тебе здесь не место",
    year: 2026,
    poster: "posters/you-dont-belong-here-2026.jpg",
    srt: "subtitles/you-dont-belong-here-2026.srt",
    authors: ["alice"],
    ratings: { letterboxd: 3.55 },
    description: ""
  },

  {
    id: "the-moment-2026",
    title: "The Moment",
    titleRu: "Момент",
    year: 2026,
    poster: "posters/the-moment-2026.jpg",
    srt: "subtitles/the-moment-2026.srt",
    authors: ["one", "chatAndalou"],
    ratings: { imdb: 6.1, letterboxd: 3.4, rt: 66, metacritic: 53 },
    description: ""
  },

  {
    id: "the-disappearance-of-josef-mengele-2025",
    title: "The Disappearance of Josef Mengele",
    titleRu: "Исчезновение Йозефа Менгеле",
    year: 2025,
    poster: "posters/the-disappearance-of-josef-mengele-2025.jpg",
    srt: "subtitles/the-disappearance-of-josef-mengele-2025.srt",
    authors: ["chatAndalou"],
    ratings: { imdb: 7.3, letterboxd: 3.5 },
    description: ""
  },

  {
    id: "proud-2026",
    title: "Proud",
    titleRu: "Гордый",
    year: 2026,
    type: "series",
    poster: "posters/proud-2026.jpg",
    zip: "subtitles/proud-2026.zip",
    season: 1,
    episodesAvailable: 8,
    episodesTotal: 8,
    authors: ["focs"],
    ratings: { imdb: 7.4 },
    description: ""
  },

  {
    id: "sundays-2025",
    title: "Sundays",
    titleRu: "Воскресенья",
    year: 2025,
    poster: "posters/sundays-2025.jpg",
    srt: "subtitles/sundays-2025.srt",
    authors: ["vital"],
    award: true,
    ratings: { imdb: 7.9, letterboxd: 3.8 },
    description: ""
  },

  {
    id: "the-assessment-2024",
    title: "The Assessment",
    titleRu: "Оценка",
    year: 2024,
    poster: "posters/the-assessment-2024.jpg",
    srt: "subtitles/the-assessment-2024.srt",
    authors: ["scandi"],
    ratings: { imdb: 6.6, letterboxd: 3.5, rt: 83, metacritic: 62 },
    description: ""
  },

  {
    id: "human-resource-2025",
    title: "Human Resource",
    titleRu: "Человеческий ресурс",
    year: 2025,
    poster: "posters/human-resource-2025.jpg",
    srt: "subtitles/human-resource-2025.srt",
    authors: ["kleinzeit", "chatAndalou", "dark"],
    ratings: { imdb: 6.6, letterboxd: 3.5 },
    description: ""
  },

  {
    id: "nightborn-2026",
    title: "Nightborn",
    titleRu: "Ночью рождённый",
    year: 2026,
    poster: "posters/nightborn-2026.jpg",
    srt: "subtitles/nightborn-2026.srt",
    authors: ["subbedAf"],
    ratings: { imdb: 5.9, letterboxd: 2.7, rt: 74 },
    description: ""
  },

  {
    id: "leviticus-2026",
    title: "Leviticus",
    titleRu: "Левит",
    year: 2026,
    poster: "posters/leviticus-2026.jpg",
    srt: "subtitles/leviticus-2026.srt",
    authors: ["focs"],
    ratings: { imdb: 6.8, letterboxd: 3.7, rt: 92 },
    description: ""
  },

  {
    id: "wildcat-2023",
    title: "Wildcat",
    titleRu: "Дикая кошка",
    year: 2023,
    poster: "posters/wildcat-2023.jpg",
    srt: "subtitles/wildcat-2023.srt",
    authors: ["serpentarium"],
    ratings: { imdb: 5.8, letterboxd: 3.1, rt: 59, metacritic: 55 },
    description: ""
  },

  {
    id: "batman-knightfall-part-1-knightfall-2026",
    title: "Batman: Knightfall – Part 1: Knightfall",
    titleRu: "Бэтмен: Падение рыцаря",
    year: 2026,
    poster: "posters/batman-knightfall-part-1-knightfall-2026.jpg",
    srt: "subtitles/batman-knightfall-part-1-knightfall-2026.srt",
    authors: ["goodman"],
    ratings: { imdb: 8.1 },
    description: ""
  },

  {
    id: "preparations-to-be-together-for-an-unknown-period-of-time-2020",
    title: "Preparations to Be Together for an Unknown Period of Time",
    titleRu: "Подготовка к совместной жизни на неопределённый срок",
    year: 2020,
    poster: "posters/preparations-to-be-together-for-an-unknown-period-of-time-2020.jpg",
    srt: "subtitles/preparations-to-be-together-for-an-unknown-period-of-time-2020.srt",
    authors: ["chatAndalou"],
    ratings: { imdb: 6.5, rt: 88, metacritic: 70 },
    description: ""
  },

  {
    id: "the-death-of-cinema-and-my-father-too-2020",
    title: "The Death of Cinema and My Father Too",
    titleRu: "Смерть кино и моего отца тоже",
    year: 2020,
    poster: "posters/the-death-of-cinema-and-my-father-too-2020.jpg",
    srt: "subtitles/the-death-of-cinema-and-my-father-too-2020.srt",
    authors: ["chatAndalou"],
    description: ""
  },

  {
    id: "mike-nick-nick-alice-2026",
    title: "Mike & Nick & Nick & Alice",
    titleRu: "Майк и Ник и Ник и Элис",
    year: 2026,
    poster: "posters/mike-nick-nick-alice-2026.jpg",
    srt: "subtitles/mike-nick-nick-alice-2026.srt",
    authors: ["dungeons"],
    ratings: { rt: 75, letterboxd: 3.0 },
    description: ""
  },

  {
    id: "the-mighty-nein-2025",
    title: "The Mighty Nein",
    titleRu: "Могучая девятка",
    year: 2025,
    type: "series",
    poster: "posters/the-mighty-nein-2025.jpg",
    zip: "subtitles/the-mighty-nein-2025.zip",
    season: 1,
    episodesAvailable: 8,
    episodesTotal: 8,
    authors: ["lebowski", "naruhinka"],
    ratings: { rt: 100, metacritic: 80 },
    description: ""
  },

  {
    id: "blue-heron-2025",
    title: "Blue Heron",
    titleRu: "Голубая цапля",
    year: 2025,
    poster: "posters/blue-heron-2025.jpg",
    srt: "subtitles/blue-heron-2025.srt",
    authors: ["dark"],
    ratings: { imdb: 7.2, rt: 100, metacritic: 94 },
    description: ""
  },

  {
    id: "seven-winters-in-tehran-2023",
    title: "Seven Winters in Tehran",
    titleRu: "Семь зим в Тегеране",
    year: 2023,
    poster: "posters/seven-winters-in-tehran-2023.jpg",
    srt: "subtitles/seven-winters-in-tehran-2023.srt",
    authors: ["notCloset"],
    ratings: { imdb: 7.6, rt: 100 },
    description: ""
  },

  {
    id: "the-chronology-of-water-2025",
    title: "The Chronology of Water",
    titleRu: "Хронология воды",
    year: 2025,
    poster: "posters/the-chronology-of-water-2025.jpg",
    srt: "subtitles/the-chronology-of-water-2025.srt",
    authors: ["homoSubiens"],
    ratings: { rt: 91, letterboxd: 3.6 },
    description: ""
  },

  {
    id: "scary-movie-2026-g",
    title: "Scary Movie",
    titleRu: "Очень страшное кино",
    year: 2026,
    poster: "posters/scary-movie-2026-g.jpg",
    srt: "subtitles/scary-movie-2026-g.srt",
    authors: ["goodman"],
    ratings: { rt: 27, letterboxd: 2.4 },
    description: ""
  },

  {
    id: "scary-movie-2026-r",
    title: "Scary Movie",
    titleRu: "Очень страшное кино",
    year: 2026,
    poster: "posters/scary-movie-2026-r.jpg",
    srt: "subtitles/scary-movie-2026-r.srt",
    authors: ["ripley", "chatAndalou"],
    ratings: { rt: 27, letterboxd: 2.4 },
    description: ""
  },

  {
    id: "the-bear-2026",
    title: "The Bear",
    titleRu: "Медведь",
    year: 2026,
    type: "series",
    poster: "posters/the-bear-2026.jpg",
    zip: "subtitles/the-bear-2026.zip",
    season: 5,
    episodesAvailable: 8,
    episodesTotal: 8,
    authors: ["focs"],
    ratings: { rt: 100, metacritic: 82 },
    award: true,
    description: ""
  },

  {
    id: "avatar-aang-the-last-airbender-2026",
    title: "Avatar Aang: The Last Airbender",
    titleRu: "Аватар Аанг: Последний маг воздуха",
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
    titleRu: "Последний викинг",
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
    titleRu: "Мосс и Фрейд",
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
    titleRu: "Закулисье",
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
    titleRu: "Я люблю бустеров",
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
    titleRu: "Миньоны и монстры",
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
    titleRu: "Энн Дроид",
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
    titleRu: "Совсем голый",
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
    titleRu: "Горькое Рождество",
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
    titleRu: "Мандалорец и Грогу",
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
    titleRu: "Приглашение",
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
    titleRu: "Как развестись во время войны",
    year: 2025,
    poster: "posters/how-to-divorce-during-the-war-2025.jpg",
    srt: "subtitles/how-to-divorce-during-the-war-2025.srt",
    authors: ["alice"],
    ratings: { rt: 100 },
    award: true,
    description: ""
  },

  {
    id: "sweet-sixteen-2002",
    title: "Sweet Sixteen",
    titleRu: "Сладкие шестнадцать",
    year: 2002,
    poster: "posters/sweet-sixteen-2002.jpg",
    srt: "subtitles/sweet-sixteen-2002.srt",
    authors: ["genco"],
    ratings: { imdb: 7, letterboxd: 3.8, rt: 97, metacritic: 86 },
    award: true,
    description: ""
  },

  {
    id: "masters-of-the-universe-2026",
    title: "Masters of the Universe",
    titleRu: "Властелины вселенной",
    year: 2026,
    poster: "posters/masters-of-the-universe 2026.jpg",
    srt: "subtitles/masters-of-the-universe 2026.srt",
    authors: ["goodman"],
    ratings: { rt: 74, letterboxd: 3.2 },
    description: ""
  },

  {
    id: "rose-of-nevada-2026",
    title: "Rose of Nevada",
    titleRu: "Роза Невады",
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
    titleRu: "Бедная корова",
    year: 1967,
    poster: "posters/poor-cow-1967.jpg",
    srt: "subtitles/poor-cow-1967.srt",
    authors: ["genco"],
    ratings: { imdb: 6.8, letterboxd: 3.6, rt: 50 },
    description: ""
  },

  {
    id: "love-streams-1984",
    title: "Love Streams",
    titleRu: "Потоки любви",
    year: 1984,
    poster: "posters/love-streams-1984.jpg",
    srt: "subtitles/love-streams-1984.srt",
    authors: ["genco"],
    ratings: { imdb: 7.6, letterboxd: 4.2, rt: 100 },
    award: true,
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

// Карточка сбора на субтитры — не фильм, поэтому отдельная функция рендера,
// но по сути та же самая карточка (постер + подпись снизу), просто вдвое
// шире и текст на постере свой. Формат объекта в FILMS:
//   {
//     type: "fundraiser",
//     active: true,             // false — просто не показывать, ничего не удаляя
//     title: "The Odyssey",
//     image: "fundraisers/the-odyssey.jpg",
//     goal: "7 777 ₽",
//     shade: false,             // true — тёмная плашка снизу, если текст плохо видно на фото
//     ratings: { imdb: 7.8 },   // необязательно, как у обычных карточек
//     link: { label: "FOCS", href: "https://t.me/forFOCSsake" } // ссылка на пост, не на автора,
//                                                                  поэтому не через PEOPLE
//   }
// Двойная ширина, позиция в сетке — просто её место в массиве FILMS.
function makeFundraiserCard(item){
  const href = escapeHtml(item.link?.href || "#");
  const searchText = normForSearch([item.title, item.titleRu, item.link?.label].filter(Boolean).join(" "));

  return `
  <article class="card fundraiser-card" data-search="${escapeHtml(searchText)}" style="--poster:url('${escapeHtml(item.image)}')">
    <a class="poster-button" href="${href}" target="_blank" rel="noopener noreferrer"
      aria-label="fundraiser: ${escapeHtml(item.title)}">
      <img class="fundraiser-image" loading="lazy" src="${escapeHtml(item.image)}" alt="" aria-hidden="true">
      ${item.shade ? `<span class="fundraiser-shade" aria-hidden="true"></span>` : ""}
      <span class="fundraiser-content">
        <span class="fundraiser-label">Fundraiser</span>
        <span class="fundraiser-title">${escapeHtml(item.title)}</span>
        <span class="fundraiser-goal">Goal — ${escapeHtml(item.goal)}</span>
      </span>
    </a>

    <div class="meta">
      ${renderRatings(item.ratings)}
      <a class="meta-link" href="${href}" target="_blank" rel="noopener noreferrer">
        <svg class="meta-icon" viewBox="0 0 14 14" aria-hidden="true">${AUTHOR_ICON}</svg>
        <span class="meta-link-text">${escapeHtml(item.link?.label || "")}</span>
      </a>
    </div>
  </article>`;
}

// Карточка завершённого сбора — та же карточка сбора, но «Goal — …»
// заменяется на «Collected ✓»: собирались, собрали, осталось как памятка.
function makeCompletedCard(item){
  const href = escapeHtml(item.link?.href || "#");
  const searchText = normForSearch([item.title, item.titleRu, item.link?.label].filter(Boolean).join(" "));

  return `
  <article class="card fundraiser-card fundraiser-card--done" data-search="${escapeHtml(searchText)}" style="--poster:url('${escapeHtml(item.image)}')">
    <a class="poster-button" href="${href}" target="_blank" rel="noopener noreferrer"
      aria-label="fundraiser: ${escapeHtml(item.title)}">
      <img class="fundraiser-image" loading="lazy" src="${escapeHtml(item.image)}" alt="" aria-hidden="true">
      <span class="fundraiser-shade" aria-hidden="true"></span>
      <span class="fundraiser-content">
        <span class="fundraiser-label">Fundraiser</span>
        <span class="fundraiser-title">${escapeHtml(item.title)}</span>
        <span class="fundraiser-collected"><svg class="collected-check" viewBox="0 0 17 20" aria-hidden="true">${CHECK}</svg>Collected</span>
      </span>
    </a>

    <div class="meta">
      ${renderRatings(item.ratings)}
      <a class="meta-link" href="${href}" target="_blank" rel="noopener noreferrer">
        <svg class="meta-icon" viewBox="0 0 14 14" aria-hidden="true">${AUTHOR_ICON}</svg>
        <span class="meta-link-text">${escapeHtml(item.link?.label || "")}</span>
      </a>
    </div>
  </article>`;
}

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

// ЙЦУКЕН-раскладка: "vtl" (англ-раскладка) ⇒ "мед", "еру" (рус-раскладка) ⇒ "the".
// Поиск ищет и по исходному токену, и по обеим раскладкам — не зависит от языка ввода.
const LAYOUT_LAT_TO_CYR = {
  "q":"й","w":"ц","e":"у","r":"к","t":"е","y":"н","u":"г","i":"ш","o":"щ","p":"з","[":"х","]":"ъ",
  "a":"ф","s":"ы","d":"в","f":"а","g":"п","h":"р","j":"о","k":"л","l":"д",";":"ж","'":"э",
  "z":"я","x":"ч","c":"с","v":"м","b":"и","n":"т","m":"ь",",":"б",".":"ю","/":".","`":"ё"
};
const LAYOUT_CYR_TO_LAT = Object.fromEntries(
  Object.entries(LAYOUT_LAT_TO_CYR).map(([lat, cyr]) => [cyr, lat])
);

function translitLayout(text, toCyr){
  const map = toCyr ? LAYOUT_LAT_TO_CYR : LAYOUT_CYR_TO_LAT;
  let out = "";
  for(const ch of text) out += map[ch] || ch;
  return out;
}

// Приводит текст к виду, пригодному для сравнения: нижний регистр, без диакритики
// (ё→е, é→e) и без всей "мусорной" пунктуации — регистр/пробелы/скобки больше не мешают.
function normForSearch(s){
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zа-я0-9]+/g, " ")
    .replace(/^\s+|\s+$/g, "");
}

// Все варианты, по которым токен может лечь на карточку
function searchCandidates(token){
  return [token, translitLayout(token, true), translitLayout(token, false)];
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

let cachedCards = null;

// Общий рендер блока рейтингов — используется и обычными карточками, и карточкой сбора
function renderRatings(ratings){
  if(!ratings) return "";
  return `<div class="ratings">
      ${ratings.imdb != null ? `<span class="rating rating-imdb"><span class="rating-dot"></span>${ratings.imdb}</span>` : ""}
      ${ratings.letterboxd != null ? `<span class="rating rating-letterboxd"><span class="rating-dot"></span>${ratings.letterboxd}</span>` : ""}
      ${ratings.rt != null ? `<span class="rating rating-rt"><span class="rating-dot"></span>${ratings.rt}%</span>` : ""}
      ${ratings.metacritic != null ? `<span class="rating rating-metacritic"><span class="rating-dot"></span>${ratings.metacritic}</span>` : ""}
    </div>`;
}

function makeCard(film, i){
  if(film.type === "fundraiser"){
    if(film.active === false || film.done) return "";
    return makeFundraiserCard(film);
  }
  
  const color = PALETTE[hashString(film.title + i) % PALETTE.length];
  const arrow = ARROWS[hashString(film.title + i) % ARROWS.length];
  const isSeries = film.type === "series";
  const downloadPath = isSeries ? (film.zip || "") : (film.srt || "");
  const downloadLabel = isSeries ? "download zip" : "download srt";
  const episodes = episodesLabel(film);

  const metaLinks = (film.authors || [])
    .map(key => PEOPLE[key])
    .filter(Boolean)
    .map(p => p.href
      ? `<a class="meta-link" href="${escapeHtml(p.href)}" target="_blank" rel="noopener noreferrer"><svg class="meta-icon" viewBox="0 0 14 14" aria-hidden="true">${AUTHOR_ICON}</svg><span class="meta-link-text">${escapeHtml(p.label)}</span></a>`
      : `<span class="meta-author"><svg class="meta-icon" viewBox="0 0 14 14" aria-hidden="true">${AUTHOR_ICON}</svg><span class="meta-author-label">${escapeHtml(p.label)}</span></span>`)
    .join("");

  const ratingsHtml = renderRatings(film.ratings);

  const searchText = normForSearch([film.title, film.titleRu, film.year]
    .concat((film.authors || []).map(key => PEOPLE[key]?.label))
    .filter(Boolean).join(" "));

  const stackLayers = isSeries
    ? `<span class="stack-layer l2" aria-hidden="true"></span><span class="stack-layer l1" aria-hidden="true"></span>`
    : "";

  return `
  <article class="card" data-search="${escapeHtml(searchText)}" data-year="${film.year}" data-type="${isSeries ? 'series' : 'movie'}" data-award="${film.award ? '1' : ''}" data-authors="${escapeHtml((film.authors || []).join(' '))}" style="--paper:${color}; --poster:url('${escapeHtml(film.poster)}')">
    ${stackLayers}
    <button class="poster-button" type="button"
      aria-label="Скачать субтитры${isSeries ? ' (zip)' : ''}: ${escapeHtml(film.title)}"
      data-file="${escapeHtml(downloadPath)}"
      data-title="${escapeHtml(film.title)}">
      <img class="poster-image" loading="lazy" src="${escapeHtml(film.poster)}" alt="" aria-hidden="true">
      <span class="poster-content">
        <span class="year">${film.year}</span>
        ${episodes ? `<span class="episodes">${escapeHtml(episodes)}</span>` : ""}

        <span class="title-wrap">
          ${film.award ? `<span class="award-icon" aria-label="Award-winning title"></span>` : ""}
          <span class="title">${escapeHtml(film.title)}</span>
        </span>
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
    if (!button.querySelector(".download-arrow")) return;
    
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

const CHEVRON = '<svg class="chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="M1.5 2 L6 6.2 L10.5 2"/></svg>';

// Списки для выпадающих списков собираются сами из реальных данных —
// год/автор берутся только те, что реально встречаются в FILMS, руками
// ничего вести не нужно.
function renderFilters(){
  const years = [...new Set(
    FILMS
      .filter(f => f.type !== "fundraiser")
      .map(f => f.year)
      .filter(year => year != null)
  )].sort((a, b) => b - a);

  const authorKeys = [...new Set(FILMS.flatMap(f => f.authors || []))];
  const authors = authorKeys
    .map(key => ({ key, label: PEOPLE[key]?.label }))
    .filter(a => a.label)
    .sort((a, b) => a.label.localeCompare(b.label, "en"));

  const authorOptions = authors
    .map(a => `<button type="button" class="filter-option" data-filter="author" data-value="${escapeHtml(a.key)}">${escapeHtml(a.label)}</button>`)
    .join("");

  const yearOptions = years
    .map(y => `<button type="button" class="filter-option" data-filter="year" data-value="${y}">${y}</button>`)
    .join("");

  document.getElementById("filters").innerHTML = `
    <input type="search" id="search" class="search" placeholder="Search" aria-label="Search" autocomplete="off">

    <div class="type-toggle" role="group" aria-label="Type">
      <button type="button" class="type-option" data-filter="type" data-value="movie">Films</button>
      <button type="button" class="type-option" data-filter="type" data-value="series">Series</button>
    </div>

    <div class="type-toggle" role="group" aria-label="Award">
      <button type="button" class="type-option" data-filter="award" data-value="true">Award</button>
    </div>

    <details class="filter filter-year" id="filter-year">
      <summary><span class="filter-label">Year</span>${CHEVRON}</summary>
      <div class="filter-menu">
        <button type="button" class="filter-option is-active" data-filter="year" data-value="">All years</button>
        ${yearOptions}
      </div>
    </details>

    <details class="filter filter-author" id="filter-author">
      <summary><span class="filter-label">Author</span>${CHEVRON}</summary>
      <div class="filter-menu">
        <button type="button" class="filter-option is-active" data-filter="author" data-value="">All authors</button>
        ${authorOptions}
      </div>
    </details>
  `;
}

function applyCardFilters(state){
  if(!cachedCards) cachedCards = document.querySelectorAll(".card");
  // Каждый токен запроса должен лечь на карточку хоть одним из вариантов
  // (сам токен или ЙЦУКЕН-варианты) — так работают и "медведь 2026",
  // и "медведь (2026)", и ввод с пробелом/скобками.
  const qTokens = normForSearch(state.q || "").split(" ").filter(Boolean);
  const tokenVariants = qTokens.map(token => searchCandidates(token).filter(v => v));

  cachedCards.forEach(card => {
    const corpus = card.dataset.search || "";
    const matchesAuthor = !state.author || (card.dataset.authors || "").split(" ").includes(state.author);
    const matchesYear = !state.year || card.dataset.year === state.year;
    const matchesType = !state.type || card.dataset.type === state.type;
    const matchesAward = !state.award || card.dataset.award === "1";
    const matchesQ = tokenVariants.every(variants => variants.some(v => corpus.includes(v)));
    card.classList.toggle("is-hidden", !(matchesAuthor && matchesYear && matchesType && matchesAward && matchesQ));
  });
}

function attachFilterHandlers(){
  const state = { author: "", year: "", type: "", award: "", q: "" };

  document.getElementById("search").addEventListener("input", (e) => {
    state.q = e.target.value;
    document.getElementById("search").classList.toggle("is-active", Boolean(state.q));
    applyCardFilters(state);
  });

  // Один делегированный listener на всём контейнере фильтров
  document.getElementById("filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-option[data-filter]");
    if(btn){
      const key = btn.dataset.filter;
      state[key] = btn.dataset.value;

      btn.closest(".filter-menu").querySelectorAll(".filter-option")
        .forEach(b => b.classList.toggle("is-active", b === btn));

      const details = btn.closest("details");

      if(details){
        const label = details.querySelector(".filter-label");

        if(label){
          label.textContent = btn.dataset.value
            ? btn.textContent.trim()
            : (key === "author" ? "Author" : "Year");
        }

        details.classList.toggle("is-active", Boolean(state[key]));
        details.removeAttribute("open");
      }

      applyCardFilters(state);
      return;
    }

    const toggleBtn = e.target.closest(".type-option[data-filter='type'], .type-option[data-filter='award']");
    if(toggleBtn){
      const key = toggleBtn.dataset.filter;
      const wasActive = toggleBtn.classList.contains("is-active");
      toggleBtn.closest(".type-toggle").querySelectorAll(".type-option")
        .forEach(b => b.classList.remove("is-active"));
      state[key] = wasActive ? "" : toggleBtn.dataset.value;
      if(!wasActive) toggleBtn.classList.add("is-active");
      applyCardFilters(state);
    }
  });

  // Клик вне открытого выпадающего списка — закрывает его
  document.addEventListener("click", (e) => {
    document.querySelectorAll("details.filter[open]").forEach(d => {
      if(!d.contains(e.target)) d.removeAttribute("open");
    });
  });

  // При открытии список сразу прокручивается так, чтобы выбранный пункт
  // был виден — без этого казалось, что подсветка "перескакивает" сверху
  // вниз (или наоборот), пока список сам не долистают до него вручную.
  document.querySelectorAll("details.filter").forEach(details => {
    details.addEventListener("toggle", () => {
      if(!details.open) return;
      const active = details.querySelector(".filter-option.is-active");
      if(active) active.scrollIntoView({ block: "nearest" });
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

  const doneCards = FILMS
    .filter(f => f.type === "fundraiser" && f.done)
    .map(makeCompletedCard);
  if(doneCards.length){
    document.getElementById("grid").insertAdjacentHTML("afterend",
      `<section class="completed" id="completed">
        <h2 class="completed-title">Completed fundraisers</h2>
        <div class="grid">${doneCards.join("")}</div>
      </section>`);
  }

  cachedCards = document.querySelectorAll(".card");
  attachDownloadHandlers();

  renderFilters();
  attachFilterHandlers();

  const titleCount = new Set(
    FILMS.filter(f => f.type !== "fundraiser").map(f => f.title + f.year)
  ).size;
  const doneCount = FILMS.filter(f => f.type === "fundraiser" && f.done).length;
  document.getElementById("title-count").innerHTML =
    `${titleCount} titles now on the site` +
    (doneCount ? ` · <a class="completed-link" href="#completed">Fundraiser ↓</a>` : "");

  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      item.classList.toggle('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(o => {
        if (o !== item) o.classList.remove('is-open');
      });
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.faq-item')) {
      document.querySelectorAll('.faq-item.is-open').forEach(o => o.classList.remove('is-open'));
    }
  });
})();
