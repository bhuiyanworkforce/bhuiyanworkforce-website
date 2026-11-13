// Polish head/SEO strings (home, About, FAQ and the Saudi Arabia country page so far).
//
// Terminology: deliberately uses "rekrutacja pracowników z zagranicy" and
// "zatrudnianie cudzoziemców". It avoids "agencja pracy tymczasowej" and
// "agencja zatrudnienia" (registered/regulated terms in Poland, claiming them
// would be a legal statement) and avoids "oddelegowanie", which in Polish law
// means posting of workers and is not what this business does.
// Keyword choices are editorial assumptions, not measured search volumes.

const NAME = 'Bhuiyan Workforce Ltd.';

export default {
  code: 'pl',
  // About and FAQ are NOT listed yet: their Polish body text does not exist in src/content/pages.js,
  // so listing them would serve English text under a Polish URL. Add them here once pl content exists.
  translated: ['page:home', 'country:saudi-arabia'],
  head: {
    siteName: NAME,
    ogImageAlt: 'Bhuiyan Workforce Ltd. — etyczna rekrutacja pracowników z Bangladeszu',
    orgDescription:
      'Międzynarodowa firma rekrutacyjna łącząca wykwalifikowanych pracowników z Bangladeszu z pracodawcami w ponad 25 krajach Zatoki Perskiej, Europy i Azji Południowo-Wschodniej, zgodnie z zasadami etycznej rekrutacji.',
    siteDescription:
      'Etyczna rekrutacja z Bangladeszu — łączymy wykwalifikowanych pracowników z pracodawcami w ponad 25 krajach.',
    breadcrumb: {
      home: 'Strona główna',
      countries: 'Kraje',
      services: 'Usługi',
      blog: 'Blog',
      faq: 'FAQ',
      employerGuide: 'Przewodnik dla pracodawców',
    },
    pages: {
      home: {
        title: 'Pracownicy z Bangladeszu — etyczna rekrutacja | Bhuiyan Workforce Ltd.',
        description:
          'Bhuiyan Workforce Ltd. łączy wykwalifikowanych pracowników z Bangladeszu z pracodawcami w ponad 25 krajach. Etyczna rekrutacja zgodna z wymogami BMET, przejrzyste umowy i pełna dokumentacja.',
        ogDescription:
          'Wykwalifikowani pracownicy z Bangladeszu dla pracodawców w Zatoce Perskiej, Europie i Azji Południowo-Wschodniej. Rekrutacja zgodna z BMET i przejrzysta.',
        keywords:
          'pracownicy z Bangladeszu, rekrutacja pracowników z zagranicy, zatrudnianie cudzoziemców, pozyskiwanie pracowników z Azji, pracownicy budowlani z zagranicy, rekrutacja pracowników produkcyjnych, pracownicy z Bangladeszu do Polski, BMET',
      },
      about: {
        title: 'O nas | Bhuiyan Workforce Ltd.',
        description: 'Poznaj Bhuiyan Workforce Ltd.: naszą historię, zespół i zaangażowanie w etyczną rekrutację oraz dobro pracowników.',
      },
      faq: {
        title: 'Najczęstsze pytania (FAQ) | Bhuiyan Workforce Ltd.',
        description: 'Odpowiedzi na najczęstsze pytania pracodawców i pracowników dotyczące naszego procesu rekrutacji, opłat i zgodności z przepisami.',
      },
    },
    notFound: { title: `Nie znaleziono strony — ${NAME}`, description: 'Strona, której szukasz, nie istnieje.' },
    countries: {
      'saudi-arabia': {
        name: 'Arabia Saudyjska',
        title: 'Pracownicy z Bangladeszu dla Arabii Saudyjskiej | Bhuiyan Workforce Ltd.',
        description:
          'Wykwalifikowani pracownicy z Bangladeszu dla Arabii Saudyjskiej. Rekrutacja zgodna z BMET w sektorach: budownictwo i infrastruktura, sprzątanie i utrzymanie obiektów, transport. Szybka mobilizacja i pełne wsparcie dokumentacyjne.',
      },
    },
    services: {},
    posts: {},
    guides: {},
    areaServed: [
      'Arabia Saudyjska', 'Zjednoczone Emiraty Arabskie', 'Katar', 'Kuwejt', 'Oman', 'Bahrajn', 'Jordania',
      'Malezja', 'Singapur', 'Malediwy', 'Włochy', 'Portugalia', 'Grecja', 'Rumunia', 'Polska',
      'Węgry', 'Chorwacja', 'Czechy', 'Litwa', 'Łotwa', 'Estonia', 'Bułgaria',
      'Bośnia i Hercegowina', 'Cypr',
    ],
  },
};
