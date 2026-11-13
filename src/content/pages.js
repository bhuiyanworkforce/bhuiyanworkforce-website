// Body content of the About and FAQ pages, per language (pure JS, no JSX, so the
// SEO code can import it in Node). English is the source; a language missing here
// falls back to English. Only the languages in PAGE_CONTENT have translated pages.
// Personal names, email addresses and phone numbers are never translated.
// NEEDS NATIVE-SPEAKER REVIEW before launch.

const LRI = '\u2066'; // isolates Latin phone numbers / emails inside RTL text
const PDI = '\u2069';

const en = {
  about: {
    imgAlt: 'Illustration of deployment corridors from Bangladesh to partner countries',
    story: [
      'Bhuiyan Workforce Ltd. was founded with a straightforward mission: to create transparent, ethical pathways for skilled Bangladeshi workers to access legitimate international employment — while giving overseas employers a reliable, fully compliant recruitment partner.',
      "Bangladesh has one of the world's most capable overseas workforces, with millions of citizens working abroad in construction, manufacturing, logistics, and hospitality. Too often, those workers have been exploited by unregulated brokers. We exist to be different.",
      'Bhuiyan Workforce Ltd. is building verified deployment corridors across 25+ countries across the Gulf, Southeast Asia, and Europe — with every placement designed to be BMET-registered and fully documented.',
    ],
    values: [
      { icon: '⚖️', title: 'Transparent Recruitment', body: 'Workers receive verified, honest job offers in their own language — with clear terms, full documentation, and no hidden fees — before they commit to anything.' },
      { icon: '🏛️', title: 'Regulatory Compliance', body: 'Every placement is registered with BMET. Every worker has passed a GAMCA medical. We maintain complete documentation for every deployment.' },
      { icon: '🔍', title: 'Skills Verification', body: 'Practical trade tests and independent reference checks ensure you receive workers with the skills they claim.' },
      { icon: '🤝', title: 'Long-Term Relationships', body: 'We measure success not by transaction volume but by how many employers return for their next requirement.' },
      { icon: '🌍', title: 'Destination Knowledge', body: 'Understanding local labour law, visa categories, and cultural context at each destination reduces friction and delays.' },
      { icon: '📣', title: 'Transparency', body: 'Employers receive clear timelines, honest candidate availability assessments, and a fully itemised cost breakdown before committing to anything.' },
    ],
    teamIntro: 'Our team combines recruitment expertise, immigration knowledge, and deep sector understanding across all six service categories.',
    team: [
      { photo: '/team-rezaul.webp', name: 'MD Rezaul Kabir Bhuiyan', role: 'Founder & CEO', body: 'Computer Science graduate (Jiangnan University, China) with expertise in international business development and technology. Leads all strategic partnerships and business development across Gulf, European, and Asian markets.' },
      { photo: '/team-asraful.webp', name: 'Asraful Kabir Bhuiyan', role: 'Business Development Manager', body: 'Drives employer relationships and new market expansion across Gulf, European, and Asian markets.' },
      { photo: '/team-kishor.webp', name: 'Kishor Kumar', role: 'Compliance & Documentation Manager', body: 'Ensures every deployment meets BMET, GAMCA, and destination-country legal requirements. Expert in overseas employment documentation.' },
      { photo: null, initials: 'AB', name: 'Akhi Begum', role: 'Head of Operations', body: 'Oversees day-to-day recruitment operations, candidate processing, and ensures every deployment meets compliance standards.' },
    ],
    partnersTag: 'Regional Partners',
    partnersTitle: 'Our Regional Partner Network',
    partnersSub: 'Bhuiyan Workforce Ltd. works with a network of licensed recruitment and employment agencies across the Gulf and Europe. Our partners hold valid government-issued licenses in their respective countries and operate verified employer relationships across multiple industries.',
    partners: [
      { flag: '🇵🇱', region: 'EU Licensed Partner', country: 'Poland', body: 'Government-registered employment agency. Authorized to place workers across Poland and the broader European Union.' },
      { flag: '🇦🇪', region: 'Gulf Licensed Partner', country: 'UAE', body: 'Licensed recruitment agency operating from Dubai with active employer networks across the GCC region.' },
      { flag: '🇷🇴', region: 'EU Licensed Partner', country: 'Romania', body: 'Authorized employment agency with verified employer relationships in Romania and wider Eastern Europe.' },
    ],
    ctaTitle: 'Work With Us',
    ctaDesc: "We're always happy to discuss your manpower requirements — no obligation.",
    ctaBtn: 'Get In Touch →',
  },
  faq: {
    ui: {
      searchPlaceholder: 'Search questions… e.g. Saudi visa, fees, documents',
      noResultsBefore: 'No results found for "',
      noResultsAfter: '" — try different keywords.',
      stillTitle: 'Still Have Questions?',
      stillDesc: 'Employers: contact us via email or WhatsApp. Workers: use the dedicated contacts below.',
      forEmployers: 'For Employers',
      forWorkers: 'For Workers',
    },
    categories: [
      {
        category: 'For Employers',
        items: [
          { q: 'How quickly can you supply workers?', a: 'For most trade categories, we can present a verified shortlist within 5–10 working days. After employer selection, the full documentation and visa process typically takes 4–8 weeks depending on the destination country. For countries with streamlined visa procedures (e.g. Malaysia, UAE), timelines are often faster.' },
          { q: 'What is your minimum order size?', a: "We handle both small deployments (5–10 workers) and large-scale mobilisations (200+ workers). There is no minimum order. However, for very small placements, we may combine your requirement with another employer's deployment to manage costs efficiently — we will always be transparent about this." },
          { q: 'Do you handle all the documentation?', a: 'Yes. We manage BMET registration, Bureau of Manpower clearance, GAMCA medical examinations for Gulf destinations, police clearance certificates, passport validity checks, and the visa application process. You provide a valid demand letter and employment contract; we handle the rest.' },
          { q: 'What if a worker underperforms or leaves early?', a: 'We offer a replacement guarantee for workers who leave within the first 90 days for reasons attributable to misrepresentation on their CV or skills test. We will work with you to replace the worker as quickly as possible at no additional placement fee.' },
          { q: 'What countries do you serve?', a: 'We currently deploy to 25+ countries: Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain, Jordan, Malaysia, Singapore, Maldives, Serbia, Portugal, Greece, Romania, Poland, Hungary, Croatia, Czech Republic, Lithuania, Latvia, Estonia, Bulgaria, Cyprus, Slovakia, Bosnia and Herzegovina, Armenia, Montenegro, and Georgia. If your destination is not on this list, please contact us — we may still be able to help.' },
          { q: 'What are your fees?', a: 'Our fees vary based on worker category, numbers, and destination country. We provide a fully itemised cost breakdown before you commit to anything. We operate on a success-fee model — you pay only after workers are confirmed for deployment.' },
        ],
      },
      {
        category: 'For Workers',
        items: [
          { q: 'Do workers pay a recruitment fee?', a: 'Fees vary depending on the service package and destination country. Please contact us directly to discuss your situation and get a clear breakdown of applicable costs.' },
          { q: 'How do I register my interest as a worker?', a: 'Contact us via WhatsApp (+880 1978 356710) or email (careers@bhuiyanworkforce.com) with your trade category, years of experience, and a copy of any relevant trade certificates. We will add you to our candidate database and contact you when a matching opportunity arises.' },
          { q: 'What documents will I need?', a: 'A valid Bangladesh passport (minimum 12 months remaining), National ID card, trade certificates (if applicable), previous employment reference letters, and a BMET Smart Card (we can help you obtain this). For Gulf destinations, you will also need to pass a GAMCA medical examination.' },
          { q: 'Will I receive a contract before I travel?', a: 'Yes. You will receive a verified employment contract in Bengali before you agree to travel. It will clearly state your job title, salary, working hours, accommodation arrangements, and contract duration. Never travel on the basis of a verbal promise alone.' },
        ],
      },
      {
        category: 'Compliance & Credentials',
        items: [
          { q: 'What is GAMCA and why is it required?', a: "GAMCA (Gulf Approved Medical Centre Association) medical testing is a mandatory health clearance required by all GCC countries before a worker's visa can be processed. It screens for communicable diseases and general fitness for work. We coordinate GAMCA appointments for all workers going to Gulf destinations." },
        ],
      },
    ],
  },
};

const ar = {
  about: {
    imgAlt: 'رسم توضيحي لمسارات الإيفاد من بنغلاديش إلى الدول الشريكة',
    story: [
      'تأسست Bhuiyan Workforce Ltd. برسالة واضحة: إيجاد مسارات شفافة وأخلاقية تتيح للعمالة البنغلاديشية الماهرة الوصول إلى فرص عمل دولية مشروعة، وفي المقابل منح أصحاب العمل في الخارج شريك استقدام موثوقًا ومتوافقًا تمامًا مع الأنظمة.',
      'تمتلك بنغلاديش واحدة من أكفأ القوى العاملة المغتربة في العالم، إذ يعمل ملايين من مواطنيها في الخارج في قطاعات البناء والتصنيع والخدمات اللوجستية والضيافة. وفي كثير من الأحيان وقع هؤلاء العمال ضحية استغلال من وسطاء غير مرخّصين. ونحن هنا لنكون مختلفين.',
      'تعمل Bhuiyan Workforce Ltd. على بناء مسارات إيفاد موثّقة إلى أكثر من 25 دولة في الخليج وجنوب شرق آسيا وأوروبا، ويُصمَّم كل توظيف ليكون مسجّلًا لدى BMET وموثّقًا بالكامل.',
    ],
    values: [
      { icon: '⚖️', title: 'استقدام شفاف', body: 'يتلقى العمال عروض عمل موثّقة وصادقة بلغتهم، بشروط واضحة ومستندات كاملة ودون رسوم خفية، قبل أن يلتزموا بأي شيء.' },
      { icon: '🏛️', title: 'الامتثال التنظيمي', body: 'كل توظيف مسجّل لدى BMET، وكل عامل اجتاز الفحص الطبي GAMCA. نحتفظ بمستندات كاملة لكل إيفاد.' },
      { icon: '🔍', title: 'التحقق من المهارات', body: 'تضمن الاختبارات المهنية العملية وفحوصات المراجع المستقلة حصولكم على عمال يمتلكون المهارات التي يذكرونها.' },
      { icon: '🤝', title: 'علاقات طويلة الأمد', body: 'نقيس نجاحنا لا بعدد الصفقات، بل بعدد أصحاب العمل الذين يعودون إلينا لتلبية احتياجهم التالي.' },
      { icon: '🌍', title: 'معرفة بالوجهات', body: 'فهم قوانين العمل المحلية وفئات التأشيرات والسياق الثقافي في كل وجهة يقلّل التعقيد والتأخير.' },
      { icon: '📣', title: 'الشفافية', body: 'يحصل أصحاب العمل على جداول زمنية واضحة وتقييم صادق لتوفر المرشحين وتفصيل كامل للتكاليف قبل الالتزام بأي شيء.' },
    ],
    teamIntro: 'يجمع فريقنا بين خبرة الاستقدام والمعرفة بأنظمة الهجرة والفهم العميق للقطاعات في جميع فئات الخدمة الست.',
    team: [
      { photo: '/team-rezaul.webp', name: 'MD Rezaul Kabir Bhuiyan', role: 'المؤسس والرئيس التنفيذي', body: 'خريج علوم الحاسب من جامعة جيانغنان (الصين)، يتمتع بخبرة في تطوير الأعمال الدولية والتكنولوجيا. يقود جميع الشراكات الاستراتيجية وتطوير الأعمال في أسواق الخليج وأوروبا وآسيا.' },
      { photo: '/team-asraful.webp', name: 'Asraful Kabir Bhuiyan', role: 'مدير تطوير الأعمال', body: 'يقود علاقات أصحاب العمل والتوسع في أسواق جديدة في الخليج وأوروبا وآسيا.' },
      { photo: '/team-kishor.webp', name: 'Kishor Kumar', role: 'مدير الامتثال والمستندات', body: 'يضمن أن كل إيفاد يستوفي متطلبات BMET وGAMCA والمتطلبات القانونية في بلد الوجهة. خبير في مستندات التوظيف في الخارج.' },
      { photo: null, initials: 'AB', name: 'Akhi Begum', role: 'رئيسة العمليات', body: 'تشرف على عمليات الاستقدام اليومية ومعالجة ملفات المرشحين، وتضمن أن كل إيفاد يستوفي معايير الامتثال.' },
    ],
    partnersTag: 'الشركاء الإقليميون',
    partnersTitle: 'شبكة شركائنا الإقليميين',
    partnersSub: 'تتعاون Bhuiyan Workforce Ltd. مع شبكة من وكالات الاستقدام والتوظيف المرخّصة في الخليج وأوروبا. يحمل شركاؤنا تراخيص حكومية سارية في بلدانهم، ولديهم علاقات موثّقة مع أصحاب العمل في قطاعات متعددة.',
    partners: [
      { flag: '🇵🇱', region: 'شريك مرخّص في الاتحاد الأوروبي', country: 'بولندا', body: 'وكالة توظيف مسجّلة حكوميًا. مخوّلة بتوظيف العمال في بولندا وفي الاتحاد الأوروبي عمومًا.' },
      { flag: '🇦🇪', region: 'شريك مرخّص في الخليج', country: 'الإمارات العربية المتحدة', body: 'وكالة استقدام مرخّصة تعمل من دبي ولديها شبكات نشطة من أصحاب العمل في أنحاء دول مجلس التعاون الخليجي.' },
      { flag: '🇷🇴', region: 'شريك مرخّص في الاتحاد الأوروبي', country: 'رومانيا', body: 'وكالة توظيف معتمدة ولديها علاقات موثّقة مع أصحاب العمل في رومانيا وأوروبا الشرقية عمومًا.' },
    ],
    ctaTitle: 'اعملوا معنا',
    ctaDesc: 'يسعدنا دائمًا مناقشة احتياجاتكم من العمالة — دون أي التزام.',
    ctaBtn: 'تواصلوا معنا ←',
  },
  faq: {
    ui: {
      searchPlaceholder: 'ابحث في الأسئلة… مثل: تأشيرة السعودية، الرسوم، المستندات',
      noResultsBefore: 'لا توجد نتائج لـ "',
      noResultsAfter: '" — جرّب كلمات مختلفة.',
      stillTitle: 'هل لديكم المزيد من الأسئلة؟',
      stillDesc: 'أصحاب العمل: تواصلوا معنا عبر البريد الإلكتروني أو واتساب. العمال: استخدموا وسائل التواصل المخصصة أدناه.',
      forEmployers: 'لأصحاب العمل',
      forWorkers: 'للعمال',
    },
    categories: [
      {
        category: 'لأصحاب العمل',
        items: [
          { q: 'ما سرعة توريدكم للعمال؟', a: 'في معظم الفئات المهنية يمكننا تقديم قائمة مختصرة موثّقة خلال 5–10 أيام عمل. وبعد اختيار صاحب العمل، تستغرق إجراءات المستندات والتأشيرة بالكامل عادةً من 4 إلى 8 أسابيع بحسب بلد الوجهة. وفي الدول ذات إجراءات التأشيرة المبسّطة (مثل ماليزيا والإمارات) تكون المدة غالبًا أقصر.' },
          { q: 'ما الحد الأدنى لحجم الطلب؟', a: 'نتعامل مع الدفعات الصغيرة (5–10 عمال) وكذلك مع التعبئة الكبيرة (200 عامل فأكثر). لا يوجد حد أدنى للطلب. ومع ذلك، في الطلبات الصغيرة جدًا قد ندمج احتياجكم مع إيفاد صاحب عمل آخر لإدارة التكاليف بكفاءة، وسنكون دائمًا شفافين بشأن ذلك.' },
          { q: 'هل تتولّون جميع المستندات؟', a: 'نعم. ندير تسجيل BMET وتصريح مكتب القوى العاملة، والفحوصات الطبية GAMCA للوجهات الخليجية، وشهادات عدم المحكومية، والتحقق من صلاحية جوازات السفر، وإجراءات طلب التأشيرة. عليكم تقديم خطاب طلب العمالة وعقد العمل الساري، ونتولى نحن الباقي.' },
          { q: 'ماذا لو كان أداء العامل ضعيفًا أو غادر مبكرًا؟', a: 'نقدّم ضمان استبدال للعمال الذين يغادرون خلال أول 90 يومًا لأسباب تعود إلى معلومات غير صحيحة في سيرتهم الذاتية أو اختبار المهارات. وسنعمل معكم لاستبدال العامل بأسرع وقت ممكن دون أي رسوم توظيف إضافية.' },
          { q: 'ما الدول التي تخدمونها؟', a: 'نوفد حاليًا إلى أكثر من 25 دولة: المملكة العربية السعودية، والإمارات العربية المتحدة، وقطر، والكويت، وعُمان، والبحرين، والأردن، وماليزيا، وسنغافورة، وجزر المالديف، وصربيا، والبرتغال، واليونان، ورومانيا، وبولندا، والمجر، وكرواتيا، وجمهورية التشيك، وليتوانيا، ولاتفيا، وإستونيا، وبلغاريا، وقبرص، وسلوفاكيا، والبوسنة والهرسك، وأرمينيا، والجبل الأسود، وجورجيا. وإن لم تكن وجهتكم ضمن هذه القائمة، فتواصلوا معنا؛ فقد نتمكن من المساعدة.' },
          { q: 'ما رسومكم؟', a: 'تختلف رسومنا بحسب فئة العمال وأعدادهم وبلد الوجهة. نقدّم لكم تفصيلًا كاملًا للتكاليف قبل أي التزام. ونعمل بنظام رسوم النجاح، فلا تدفعون إلا بعد تأكيد العمال للإيفاد.' },
        ],
      },
      {
        category: 'للعمال',
        items: [
          { q: 'هل يدفع العمال رسوم استقدام؟', a: 'تختلف الرسوم بحسب باقة الخدمة وبلد الوجهة. يرجى التواصل معنا مباشرة لمناقشة وضعكم والحصول على تفصيل واضح للتكاليف المطبّقة.' },
          { q: 'كيف أسجّل اهتمامي بصفتي عاملًا؟', a: `تواصل معنا عبر واتساب (${LRI}+880 1978 356710${PDI}) أو البريد الإلكتروني (${LRI}careers@bhuiyanworkforce.com${PDI}) مع ذكر مهنتك وسنوات خبرتك وصورة من شهادات المهنة ذات الصلة. سنضيفك إلى قاعدة بيانات المرشحين ونتواصل معك عند توفر فرصة مناسبة.` },
          { q: 'ما المستندات التي سأحتاجها؟', a: 'جواز سفر بنغلاديشي ساري (لا تقل مدة صلاحيته المتبقية عن 12 شهرًا)، وبطاقة الهوية الوطنية، وشهادات المهنة (إن وُجدت)، وخطابات توصية من أصحاب العمل السابقين، وبطاقة BMET الذكية (يمكننا مساعدتك في الحصول عليها). وبالنسبة للوجهات الخليجية ستحتاج أيضًا إلى اجتياز الفحص الطبي GAMCA.' },
          { q: 'هل سأحصل على عقد قبل السفر؟', a: 'نعم. ستحصل على عقد عمل موثّق باللغة البنغالية قبل أن توافق على السفر، يوضح بجلاء مسماك الوظيفي والراتب وساعات العمل وترتيبات السكن ومدة العقد. لا تسافر أبدًا بناءً على وعد شفهي فقط.' },
        ],
      },
      {
        category: 'الامتثال والاعتمادات',
        items: [
          { q: 'ما هو GAMCA ولماذا هو مطلوب؟', a: 'الفحص الطبي GAMCA (جمعية المراكز الطبية المعتمدة لدول الخليج) إجراء صحي إلزامي تشترطه جميع دول مجلس التعاون قبل معالجة تأشيرة العامل. ويشمل الكشف عن الأمراض المعدية واللياقة العامة للعمل. وننسّق مواعيد GAMCA لجميع العمال المتجهين إلى الوجهات الخليجية.' },
        ],
      },
    ],
  },
};

export const PAGE_CONTENT = { en, ar };

/** Content of a page ('about' | 'faq') for the URL language; English when the language has none. */
export function pageContent(id, lang) {
  return (PAGE_CONTENT[lang] || en)[id] || en[id];
}

/** Plain text for JSON-LD: removes the bidi isolate marks used in RTL strings. */
export function plain(text) {
  return String(text).replace(/[\u2066-\u2069]/g, '');
}
