// Polish country content. Keys mirror src/data/countries.jsx; anything missing
// falls back to English per key and is reported by the page generator.
// Numbers, fees and legal claims are carried over unchanged from the English record.
// NEEDS NATIVE-SPEAKER REVIEW before launch.
export default {
  'saudi-arabia': {
    name: 'Arabia Saudyjska',
    h1: 'Praca w Arabii Saudyjskiej',
    ctaTitle: 'Gotowi wysłać pracowników do Arabii Saudyjskiej?',
    region: 'Zatoka Perska',
    capital: 'Rijad',
    currency: 'Rial saudyjski (SAR)',
    overview:
      'Arabia Saudyjska jest największym pracodawcą bangladeskich pracowników za granicą i filarem rynku pracy w regionie Zatoki Perskiej. Królestwo przechodzi ogromną transformację gospodarczą w ramach Wizji 2030, co generuje duży popyt na pracowników wykwalifikowanych i średnio wykwalifikowanych w budownictwie, infrastrukturze, hotelarstwie i produkcji. Dzięki ponad 2 milionom bangladeskich pracowników już obecnych w kraju sieci wsparcia i infrastruktura społeczna są dobrze rozwinięte.',
    topSectors: [
      'Budownictwo i infrastruktura',
      'Sprzątanie i utrzymanie obiektów',
      'Kierowcy i transport',
      'Hotelarstwo i gastronomia',
      'Produkcja',
      'Wsparcie w opiece zdrowotnej',
    ],
    visaType: 'Wiza pracownicza (Iqama)',
    visaFee: '500–800 SAR (ok. 135–215 USD) — płaci pracodawca',
    processingTime: '4–8 tygodni',
    process: [
      { title: 'List zapotrzebowania od pracodawcy', desc: 'Saudyjski pracodawca uzyskuje zgodę Ministerstwa Pracy i wystawia list zapotrzebowania na pracowników zagranicznych.' },
      { title: 'Odprawa BMET (Bangladesz)', desc: 'Pracownicy rejestrują się w BMET w Dhace i otrzymują kartę Smart Card wraz ze zgodą na emigrację.' },
      { title: 'Badania lekarskie GAMCA', desc: 'Obowiązkowe badanie lekarskie w ośrodku zatwierdzonym przez GAMCA w Bangladeszu.' },
      { title: 'Pieczęć wizowa', desc: 'Ambasada Arabii Saudyjskiej w Dhace umieszcza wizę pracowniczą w paszporcie pracownika.' },
      { title: 'Przyjazd i Iqama', desc: 'W ciągu 90 dni od przyjazdu pracodawca składa w imieniu pracownika wniosek o Iqamę (zezwolenie na pobyt i pracę).' },
    ],
    documents: [
      'Ważny paszport (co najmniej 6 miesięcy ważności)',
      'Karta BMET Smart Card',
      'Zaświadczenie lekarskie GAMCA',
      'Zaświadczenie o niekaralności',
      'Umowa o pracę (poświadczona)',
      'Zdjęcia paszportowe',
      'Certyfikaty zawodowe/umiejętności (dla stanowisk wykwalifikowanych)',
    ],
    salaryRange: '800–2 500 SAR miesięcznie (215–665 USD) dla pracowników ogólnych; więcej dla zawodów wykwalifikowanych',
    notes:
      'Arabia Saudyjska wprowadziła Program Weryfikacji Zawodowej, który wymaga od pracowników z Bangladeszu w 23 dziedzinach technicznych zdania egzaminu z umiejętności przed wydaniem wizy. Po zakończeniu pierwszej umowy pracownicy mogą zmienić pracodawcę.',
    flag_detail: 'Wizja 2030 w Arabii Saudyjskiej tworzy ogromny popyt — zwłaszcza w megaprojektach NEOM, Red Sea Project i Diriyah.',
  },
};
