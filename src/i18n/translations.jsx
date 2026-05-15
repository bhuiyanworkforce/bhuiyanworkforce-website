// Translations for: English (en), Bengali (bn), Arabic (ar), Italian (it), Polish (pl)

export const LANGUAGES = [
  { code: 'en', label: 'English',   flag: '🇬🇧', dir: 'ltr' },
  { code: 'bn', label: 'বাংলা',     flag: '🇧🇩', dir: 'ltr' },
  { code: 'ar', label: 'العربية',   flag: '🇸🇦', dir: 'rtl' },
  { code: 'it', label: 'Italiano',  flag: '🇮🇹', dir: 'ltr' },
  { code: 'pl', label: 'Polski',    flag: '🇵🇱', dir: 'ltr' },
];

export const T = {
  // ── HEADER / NAV ──────────────────────────────────────────────
  nav_services:     { en: 'Services',       bn: 'সেবা',                ar: 'خدماتنا',          it: 'Servizi',        pl: 'Usługi' },
  nav_countries:    { en: 'Countries',      bn: 'গন্তব্য দেশ',          ar: 'الدول',            it: 'Paesi',          pl: 'Kraje' },
  nav_capabilities: { en: 'Capabilities',   bn: 'আমাদের সক্ষমতা',       ar: 'إمكاناتنا',        it: 'Competenze',     pl: 'Możliwości' },
  nav_about:        { en: 'About Us',       bn: 'আমাদের পরিচয়',         ar: 'من نحن',           it: 'Chi siamo',      pl: 'O nas' },
  nav_why_us:       { en: 'Why Us',         bn: 'কেন আমরা?',            ar: 'لماذا نختارنا',    it: 'Perché noi',     pl: 'Dlaczego my' },
  nav_faq:          { en: 'FAQ',            bn: 'সাধারণ জিজ্ঞাসা',       ar: 'الأسئلة الشائعة',  it: 'FAQ',            pl: 'FAQ' },
  nav_blog:         { en: 'Blog',           bn: 'ব্লগ',                 ar: 'المدونة',          it: 'Blog',           pl: 'Blog' },
  nav_get_started:  { en: 'Get Started',    bn: 'যোগাযোগ করুন',          ar: 'ابدأ معنا',        it: 'Inizia ora',     pl: 'Zacznij' },
  nav_apply:        { en: 'Apply for Work', bn: 'কাজের আবেদন করুন',      ar: 'قدِّم طلبك',       it: 'Candidati',      pl: 'Aplikuj' },

  // ── HOME ──────────────────────────────────────────────────────
  home_eyebrow: {
    en: "Bangladesh's Ethical Manpower Partner",
    bn: 'বাংলাদেশের বিশ্বস্ত জনশক্তি সরবরাহকারী প্রতিষ্ঠান',
    ar: 'شريككم الموثوق في توفير الكوادر البشرية من بنغلاديش',
    it: 'Il vostro partner affidabile per la manodopera dal Bangladesh',
    pl: 'Twój zaufany partner w rekrutacji pracowników z Bangladeszu',
  },
  home_title1: {
    en: 'Verified Workers.',
    bn: 'যাচাইকৃত কর্মী।',
    ar: 'كفاءات بشرية موثَّقة.',
    it: 'Lavoratori verificati.',
    pl: 'Zweryfikowani pracownicy.',
  },
  home_title2: {
    en: 'Ethical Recruitment.',
    bn: 'নৈতিক নিয়োগ।',
    ar: 'توظيف أخلاقي.',
    it: 'Reclutamento etico.',
    pl: 'Etyczna rekrutacja.',
  },
  home_desc: {
    en: 'Bhuiyan Workforce connects pre-screened Bangladeshi workers with international employers across 25+ countries — every placement fully documented, transparently contracted, and compliant with destination-country requirements.',
    bn: 'ভূঁইয়া ওয়ার্কফোর্স বাংলাদেশের যাচাইকৃত কর্মীদের ২৫টিরও বেশি দেশের নিয়োগকর্তাদের কাছে পৌঁছে দেয় — প্রতিটি নিয়োগ সম্পূর্ণ নথিভুক্ত, স্বচ্ছ চুক্তিবদ্ধ এবং গন্তব্য দেশের বিধিমালা অনুযায়ী।',
    ar: 'تربط بهويان ووركفورس العمالة البنغلاديشية المفحوصة مسبقًا بأصحاب عمل دوليين في أكثر من ٢٥ دولة — كل توظيف موثَّق بالكامل، بعقود شفافة، ومتوافق مع متطلبات الدول المستقبِلة.',
    it: 'Bhuiyan Workforce collega lavoratori bangladesi pre-selezionati con datori di lavoro internazionali in oltre 25 paesi — ogni collocamento completamente documentato, contrattualizzato in modo trasparente e conforme ai requisiti del paese di destinazione.',
    pl: 'Bhuiyan Workforce łączy wstępnie zweryfikowanych pracowników z Bangladeszu z pracodawcami w ponad 25 krajach — każde oddelegowanie w pełni udokumentowane, przejrzyście zakontraktowane i zgodne z wymogami kraju docelowego.',
  },
  home_find_workers: {
    en: 'Find Workers Now →',
    bn: 'এখনই কর্মী খুঁজুন →',
    ar: 'ابحث عن عمالة الآن →',
    it: 'Trova lavoratori ora →',
    pl: 'Znajdź pracowników →',
  },
  home_our_services: {
    en: 'Our Services',
    bn: 'আমাদের সেবাসমূহ',
    ar: 'خدماتنا',
    it: 'I nostri servizi',
    pl: 'Nasze usługi',
  },
  home_stats_countries: {
    en: 'Deployment Countries',
    bn: 'দেশে কর্মী প্রেরণ',
    ar: 'دولة نخدمها',
    it: 'Paesi di destinazione',
    pl: 'Krajów docelowych',
  },
  home_stats_sectors: {
    en: 'Trade Categories',
    bn: 'পেশাদার বিভাগ',
    ar: 'تخصصًا مهنيًا',
    it: 'Categorie lavorative',
    pl: 'Kategorii zawodowych',
  },
  home_stats_response: {
    en: 'Response Time',
    bn: 'সাড়া দেওয়ার সময়',
    ar: 'وقت الاستجابة',
    it: 'Tempo di risposta',
    pl: 'Czas odpowiedzi',
  },
  home_stats_bmet: {
    en: 'BMET Licence: Oct 2026',
    bn: 'বিএমইটি লাইসেন্স: অক্টো ২০২৬',
    ar: 'ترخيص BMET: أكتوبر 2026',
    it: 'Licenza BMET: Ott 2026',
    pl: 'Licencja BMET: Paź 2026',
  },

  home_services_tag: {
    en: 'What We Offer',
    bn: 'আমরা যা দিই',
    ar: 'ما نقدمه لكم',
    it: 'Cosa offriamo',
    pl: 'Co oferujemy',
  },
  home_services_title: {
    en: 'Our Service Categories',
    bn: 'আমাদের সেবার বিভাগ',
    ar: 'تخصصاتنا في التوظيف',
    it: 'Le nostre categorie di servizi',
    pl: 'Nasze kategorie usług',
  },
  home_services_sub: {
    en: 'We supply skilled and semi-skilled workers across 20 trade categories, each with sector-specific pre-departure training and full documentation.',
    bn: 'আমরা ২০টি পেশাদার বিভাগে দক্ষ ও আধা-দক্ষ কর্মী সরবরাহ করি। প্রতিটি কর্মীকে বিদেশ যাওয়ার আগে নির্দিষ্ট প্রশিক্ষণ ও কাগজপত্র প্রস্তুত করা হয়।',
    ar: 'نوفر عمالة ماهرة وشبه ماهرة في ٢٠ تخصصًا مهنيًا، مع تدريب مهني قبل السفر وتجهيز كامل للوثائق.',
    it: 'Forniamo lavoratori qualificati e semiqualificati in 20 categorie lavorative, con formazione pre-partenza e documentazione completa.',
    pl: 'Dostarczamy wykwalifikowanych i półwykwalifikowanych pracowników w 20 kategoriach zawodowych, z branżowym szkoleniem przed wyjazdem i kompletną dokumentacją.',
  },

  home_countries_tag: {
    en: 'Global Reach',
    bn: 'বিশ্বজুড়ে আমাদের উপস্থিতি',
    ar: 'انتشارنا العالمي',
    it: 'La nostra presenza globale',
    pl: 'Nasz globalny zasięg',
  },
  home_countries_title: {
    en: 'Countries We Deploy To',
    bn: 'যেসব দেশে আমরা কর্মী পাঠাই',
    ar: 'الدول التي نوفد إليها العمالة',
    it: 'Paesi in cui operiamo',
    pl: 'Kraje, do których wysyłamy pracowników',
  },
  home_countries_sub: {
    en: 'Active deployment corridors across 25 countries — Gulf, Southeast Asia, and Europe — with full immigration and documentation compliance at each destination.',
    bn: 'মধ্যপ্রাচ্য, দক্ষিণ-পূর্ব এশিয়া এবং ইউরোপ মিলিয়ে ২৫টি দেশে সক্রিয় নিয়োগ করিডোর — প্রতিটি গন্তব্যে অভিবাসন ও নথিপত্রের সম্পূর্ণ সম্মতি সহ।',
    ar: 'ممرات توظيف نشطة في ٢٥ دولة — الخليج وجنوب شرق آسيا وأوروبا — مع الالتزام الكامل بمتطلبات الهجرة والتوثيق في كل وجهة.',
    it: 'Corridoi di collocamento attivi in 25 paesi — Golfo Persico, Asia sud-orientale ed Europa — con piena conformità alle normative di immigrazione e documentazione di ogni destinazione.',
    pl: 'Aktywne korytarze rekrutacyjne w 25 krajach — Zatoka Perska, Azja Południowo-Wschodnia i Europa — z pełną zgodnością z przepisami imigracyjnymi i dokumentacyjnymi każdego kraju docelowego.',
  },
  home_view_countries: {
    en: 'View All Countries with Full Details →',
    bn: 'সব দেশের বিস্তারিত তথ্য দেখুন →',
    ar: 'اطّلع على تفاصيل جميع الدول →',
    it: 'Vedi tutti i paesi con i dettagli completi →',
    pl: 'Zobacz wszystkie kraje ze szczegółami →',
  },

  home_process_tag: {
    en: 'Our Approach',
    bn: 'আমাদের কাজের ধরন',
    ar: 'منهجيتنا في العمل',
    it: 'Il nostro metodo',
    pl: 'Nasze podejście',
  },
  home_process_title: {
    en: 'How We Work',
    bn: 'আমরা কীভাবে কাজ করি',
    ar: 'كيف نعمل؟',
    it: 'Come lavoriamo',
    pl: 'Jak działamy',
  },
  home_process_sub: {
    en: 'A clear, transparent process from your first enquiry to workers arriving on site.',
    bn: 'আপনার প্রথম যোগাযোগ থেকে শুরু করে কর্মী নিয়োগ সম্পন্ন হওয়া পর্যন্ত প্রতিটি ধাপ স্পষ্ট ও স্বচ্ছ।',
    ar: 'إجراءات واضحة وشفافة تمامًا — من أول تواصل معنا حتى وصول العمال إلى موقع العمل.',
    it: 'Un percorso chiaro e trasparente: dalla prima richiesta all\'arrivo dei lavoratori in cantiere.',
    pl: 'Przejrzysty proces krok po kroku — od pierwszego zapytania aż do przybycia pracowników na miejsce pracy.',
  },

  // ── FOUNDING CLIENT ────────────────────────────────────────────
  founding_tag: {
    en: 'Founding Employer Program',
    bn: 'প্রতিষ্ঠাতা নিয়োগকর্তা প্রোগ্রাম',
    ar: 'برنامج أصحاب العمل المؤسسين',
    it: 'Programma Datori di Lavoro Fondatori',
    pl: 'Program Pracodawców Założycielskich',
  },
  founding_title: {
    en: 'Join Our 10 Founding Employer Partners',
    bn: 'আমাদের ১০ প্রতিষ্ঠাতা নিয়োগকর্তা অংশীদারের একজন হন',
    ar: 'انضم إلى مجموعة العشرة من أصحاب العمل المؤسسين',
    it: 'Unisciti ai nostri 10 Datori di Lavoro Partner Fondatori',
    pl: 'Dołącz do grona 10 Pracodawców Partnerów Założycielskich',
  },
  founding_desc: {
    en: 'We are accepting a select group of 10 founding employer partners ahead of our BMET licence activation in October 2026. Founding partners receive priority mobilisation and a guaranteed first shortlist within 7 working days of licence activation — at no obligation.',
    bn: 'অক্টোবর ২০২৬-এ আমাদের বিএমইটি লাইসেন্স সক্রিয় হওয়ার আগেই আমরা ১০টি প্রতিষ্ঠাতা নিয়োগকর্তা অংশীদার গ্রহণ করছি। প্রতিষ্ঠাতা অংশীদাররা অগ্রাধিকারভিত্তিক নিয়োগ এবং লাইসেন্স সক্রিয়করণের ৭ কার্যদিবসের মধ্যে প্রথম শর্টলিস্ট পাবেন — কোনো বাধ্যবাধকতা ছাড়াই।',
    ar: 'نقبل مجموعة مختارة من ١٠ شركاء مؤسسين من أصحاب العمل قبيل تفعيل ترخيص BMET في أكتوبر ٢٠٢٦. يحظى الشركاء المؤسسون بأولوية في التعبئة وقائمة مرشحين مضمونة خلال ٧ أيام عمل من تفعيل الترخيص — دون أي التزام.',
    it: 'Accettiamo un gruppo selezionato di 10 datori di lavoro partner fondatori prima dell\'attivazione della nostra licenza BMET nell\'ottobre 2026. I partner fondatori ricevono mobilizzazione prioritaria e una prima lista di candidati garantita entro 7 giorni lavorativi dall\'attivazione — senza alcun obbligo.',
    pl: 'Przyjmujemy wybraną grupę 10 pracodawców partnerów założycielskich przed aktywacją naszej licencji BMET w październiku 2026. Partnerzy założycielski otrzymują priorytetową mobilizację i gwarantowaną pierwszą listę kandydatów w ciągu 7 dni roboczych od aktywacji — bez żadnych zobowiązań.',
  },
  founding_cta: {
    en: 'Reserve a Founding Slot →',
    bn: 'একটি প্রতিষ্ঠাতা স্লট সংরক্ষণ করুন →',
    ar: 'احجز مقعدك التأسيسي →',
    it: 'Riserva un posto fondatore →',
    pl: 'Zarezerwuj miejsce założycielskie →',
  },
  founding_slots: {
    en: 'of 10 founding slots remaining',
    bn: '১০টির মধ্যে বাকি আছে',
    ar: 'من أصل ١٠ مقاعد تأسيسية متبقية',
    it: 'dei 10 posti fondatori rimasti',
    pl: 'z 10 miejsc założycielskich pozostało',
  },

  // ── ABOUT ──────────────────────────────────────────────────────
  about_hero_h1: {
    en: 'About Bhuiyan Workforce Ltd.',
    bn: 'ভূঁইয়া ওয়ার্কফোর্স লিমিটেড পরিচিতি',
    ar: 'نبذة عن بهويان ووركفورس المحدودة',
    it: 'Chi siamo — Bhuiyan Workforce Ltd.',
    pl: 'O firmie Bhuiyan Workforce Ltd.',
  },
  about_hero_sub: {
    en: 'A Bangladeshi manpower export company built on ethical recruitment, full regulatory transparency, and long-term employer relationships.',
    bn: 'আমরা একটি বাংলাদেশি জনশক্তি রপ্তানিকারক প্রতিষ্ঠান, যা নৈতিক নিয়োগ প্রক্রিয়া, সম্পূর্ণ আইনি স্বচ্ছতা এবং নিয়োগকর্তাদের সাথে দীর্ঘমেয়াদি সম্পর্কের ভিত্তিতে গড়ে উঠেছে।',
    ar: 'شركة بنغلاديشية متخصصة في تصدير العمالة، تقوم على التوظيف الأخلاقي والشفافية التنظيمية الكاملة وبناء علاقات مستدامة مع أصحاب العمل.',
    it: 'Un\'agenzia bangladese di esportazione di manodopera fondata su reclutamento etico, piena trasparenza normativa e rapporti duraturi con i datori di lavoro.',
    pl: 'Bangladeska agencja pracy, której fundamentem są etyczna rekrutacja, pełna przejrzystość regulacyjna i długofalowe relacje z pracodawcami.',
  },
  about_story_tag:  { en: 'Our Story',    bn: 'আমাদের যাত্রা',       ar: 'قصة تأسيسنا',         it: 'La nostra storia',           pl: 'Nasza historia' },
  about_story_h2:   { en: 'Connecting Talent With Opportunity', bn: 'দক্ষতা ও সুযোগের সেতুবন্ধন', ar: 'نصل بين الكفاءات والفرص', it: 'Uniamo talento e opportunità', pl: 'Łączymy talenty z możliwościami' },
  about_values_tag: { en: 'What Drives Us', bn: 'আমাদের অনুপ্রেরণা',   ar: 'ما الذي يحفزنا؟',      it: 'I nostri valori guida',      pl: 'Co nami kieruje' },
  about_values_h2:  { en: 'Our Core Values', bn: 'আমাদের মূল নীতিমালা', ar: 'قيمنا الجوهرية',       it: 'I nostri valori fondamentali', pl: 'Nasze podstawowe wartości' },
  about_team_tag:   { en: 'Our People',   bn: 'আমাদের দল',            ar: 'فريق العمل',            it: 'Il nostro team',             pl: 'Nasz zespół' },
  about_team_h2:    { en: 'The Team Behind the Placements', bn: 'যাঁরা কর্মী নিয়োগের পেছনে আছেন', ar: 'الفريق الذي يُحرّك عجلة التوظيف', it: 'Il team che gestisce i collocamenti', pl: 'Zespół odpowiedzialny za rekrutacje' },

  // ── FAQ ────────────────────────────────────────────────────────
  faq_hero_h1:  { en: 'Frequently Asked Questions', bn: 'প্রায়ই জিজ্ঞেস করা প্রশ্নগুলো', ar: 'الأسئلة الأكثر شيوعًا', it: 'Domande frequenti', pl: 'Najczęściej zadawane pytania' },
  faq_hero_sub: { en: 'Answers to common questions from employers and workers about our manpower recruitment process, fees, and compliance.', bn: 'নিয়োগকর্তা ও কর্মীদের কাছ থেকে আসা সাধারণ প্রশ্নের উত্তর — নিয়োগ প্রক্রিয়া, খরচ এবং আইনি বিষয়াদি সম্পর্কে।', ar: 'إجابات شاملة على الأسئلة الأكثر شيوعًا من أصحاب العمل والعمال حول إجراءاتنا والرسوم والالتزامات القانونية.', it: 'Risposte alle domande più comuni di datori di lavoro e lavoratori sul nostro processo di reclutamento, tariffe e conformità.', pl: 'Odpowiedzi na najczęstsze pytania pracodawców i pracowników dotyczące procesu rekrutacji, opłat i zgodności z przepisami.' },

  // ── APPLY ──────────────────────────────────────────────────────
  apply_hero_h1:  { en: 'Apply for International Employment', bn: 'বিদেশে কাজের সুযোগের জন্য আবেদন করুন', ar: 'قدِّم طلبك للعمل في الخارج', it: 'Candidati per un impiego internazionale', pl: 'Aplikuj o pracę za granicą' },
  apply_hero_sub: { en: 'Complete the form below to register your interest in overseas employment.', bn: 'বিদেশে চাকরির আগ্রহ জানাতে নিচের ফর্মটি পূরণ করুন। আমরা যোগাযোগ করব।', ar: 'أكمل النموذج أدناه للتسجيل في قاعدة بياناتنا للعمالة الدولية.', it: 'Compila il modulo sottostante per manifestare il tuo interesse a lavorare all\'estero.', pl: 'Wypełnij poniższy formularz, aby zgłosić zainteresowanie pracą za granicą.' },
  apply_step1:    { en: 'Personal Details',    bn: 'ব্যক্তিগত তথ্য',      ar: 'البيانات الشخصية',    it: 'Dati personali',              pl: 'Dane osobowe' },
  apply_step2:    { en: 'Professional Info',   bn: 'পেশাগত তথ্য',          ar: 'المعلومات المهنية',   it: 'Informazioni professionali',  pl: 'Informacje zawodowe' },
  apply_step3:    { en: 'Documents & Submit',  bn: 'কাগজপত্র ও জমা দিন',   ar: 'المستندات والإرسال',  it: 'Documenti e invio',           pl: 'Dokumenty i wysyłka' },
  apply_submit:   { en: 'Submit Application →', bn: 'আবেদন জমা দিন →',    ar: 'إرسال الطلب →',       it: 'Invia la candidatura →',      pl: 'Wyślij zgłoszenie →' },
  apply_submitting: { en: 'Submitting…',       bn: 'পাঠানো হচ্ছে…',        ar: 'جارٍ الإرسال…',       it: 'Invio in corso…',             pl: 'Wysyłanie…' },
  apply_success_h1: { en: 'Application Submitted!', bn: 'আবেদন সফলভাবে জমা হয়েছে!', ar: 'تم إرسال طلبك بنجاح!', it: 'Candidatura inviata con successo!', pl: 'Zgłoszenie zostało wysłane!' },
  apply_back_home:  { en: 'Back to Home →',   bn: 'প্রথম পাতায় ফিরুন →',  ar: 'العودة إلى الصفحة الرئيسية →', it: 'Torna alla home →', pl: 'Wróć na stronę główną →' },

  // ── COUNTRIES ──────────────────────────────────────────────────
  countries_hero_h1:  { en: 'Countries We Deploy To', bn: 'যেসব দেশে আমরা কর্মী পাঠাই', ar: 'الدول التي نوفد إليها العمالة', it: 'Paesi in cui operiamo', pl: 'Kraje, do których wysyłamy pracowników' },
  countries_hero_sub: { en: 'Bhuiyan Workforce places skilled Bangladeshi workers across 25+ countries spanning the Gulf, Southeast Asia, and Europe. Click any country for full details.', bn: 'ভূঁইয়া ওয়ার্কফোর্স মধ্যপ্রাচ্য, দক্ষিণ-পূর্ব এশিয়া ও ইউরোপ মিলিয়ে ২৫টিরও বেশি দেশে দক্ষ বাংলাদেশি কর্মী পাঠায়। যেকোনো দেশে ক্লিক করলে বিস্তারিত জানতে পারবেন।', ar: 'توفد بهويان ووركفورس عمالة بنغلاديشية مؤهلة إلى أكثر من ٢٥ دولة في الخليج وجنوب شرق آسيا وأوروبا. اضغط على أي دولة لمعرفة التفاصيل الكاملة.', it: 'Bhuiyan Workforce colloca lavoratori bangladesi qualificati in oltre 25 paesi tra Golfo Persico, Asia sud-orientale ed Europa. Clicca su un paese per tutti i dettagli.', pl: 'Bhuiyan Workforce rozmieszcza wykwalifikowanych pracowników z Bangladeszu w ponad 25 krajach Zatoki Perskiej, Azji Południowo-Wschodniej i Europy. Kliknij kraj, aby zobaczyć szczegóły.' },

  // ── COMMON ─────────────────────────────────────────────────────
  common_home:     { en: 'Home',         bn: 'হোম',              ar: 'الرئيسية',   it: 'Home',       pl: 'Strona główna' },
  common_back:     { en: '← Back',       bn: '← পেছনে যান',      ar: '→ رجوع',     it: '← Indietro', pl: '← Wstecz' },
  common_next:     { en: 'Next →',       bn: 'পরবর্তী →',        ar: 'التالي →',   it: 'Avanti →',   pl: 'Dalej →' },
  common_view_det: { en: 'View details →', bn: 'বিস্তারিত দেখুন →', ar: 'اعرف التفاصيل →', it: 'Scopri di più →', pl: 'Zobacz szczegóły →' },
  common_contact:  { en: 'Contact Us',   bn: 'যোগাযোগ করুন',     ar: 'تواصل معنا', it: 'Contattaci', pl: 'Skontaktuj się' },
};

export function t(key, lang = 'en') {
  const entry = T[key];
  if (!entry) return key;
  return entry[lang] || entry['en'] || key;
}
