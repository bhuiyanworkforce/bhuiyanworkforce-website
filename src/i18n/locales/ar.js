// Arabic head/SEO strings (Phase 1a: homepage + Saudi Arabia country page).
//
// Naming rule: the company name stays "Bhuiyan Workforce Ltd." in Latin script.
// Terminology: "استقدام" and "توريد عمالة" are the terms Gulf employers search
// with; "بنغلاديش" is the standard spelling ("بنجلاديش" is common in Gulf/Egyptian
// usage, so it appears in keywords).
// Claims mirror the English page (25+ countries, BMET-compliant, transparent).
// Keyword choices are editorial assumptions, not measured search volumes.

const NAME = 'Bhuiyan Workforce Ltd.';

export default {
  code: 'ar',
  translated: ['page:home', 'country:saudi-arabia'],
  head: {
    siteName: NAME,
    ogImageAlt: 'Bhuiyan Workforce Ltd. — استقدام عمالة بنغلاديشية بطريقة أخلاقية',
    orgDescription:
      'شركة دولية لتوريد واستقدام العمالة تربط العمالة البنغلاديشية الماهرة بأصحاب العمل في أكثر من 25 دولة في الخليج وأوروبا وجنوب شرق آسيا، وفق معايير توظيف أخلاقية.',
    siteDescription:
      'استقدام أخلاقي للعمالة من بنغلاديش، يربط العمالة الماهرة بأصحاب العمل في أكثر من 25 دولة.',
    breadcrumb: {
      home: 'الرئيسية',
      countries: 'الدول',
      services: 'الخدمات',
      blog: 'المدونة',
      faq: 'الأسئلة الشائعة',
      employerGuide: 'دليل صاحب العمل',
    },
    pages: {
      home: {
        title: 'استقدام عمالة بنغلاديشية ماهرة | Bhuiyan Workforce Ltd.',
        description:
          'تربط Bhuiyan Workforce Ltd. أصحاب العمل في أكثر من 25 دولة بعمالة بنغلاديشية ماهرة. استقدام أخلاقي متوافق مع متطلبات BMET، بعقود شفافة ومستندات مكتملة.',
        ogDescription:
          'توريد عمالة بنغلاديشية ماهرة إلى الخليج وأوروبا وجنوب شرق آسيا. استقدام متوافق مع متطلبات BMET وبشفافية كاملة.',
        keywords:
          'استقدام عمالة من بنغلاديش, توريد عمالة بنغلاديشية, عمالة ماهرة من بنجلاديش, مكتب استقدام عمالة, شركة توريد عمالة, استقدام عمالة للسعودية, توريد عمالة للخليج, استقدام عمال بناء, BMET',
      },
    },
    notFound: { title: `الصفحة غير موجودة — ${NAME}`, description: 'الصفحة التي تبحث عنها غير موجودة.' },
    countries: {
      'saudi-arabia': {
        name: 'المملكة العربية السعودية',
        title: 'توريد عمالة بنغلاديشية للمملكة العربية السعودية | Bhuiyan Workforce Ltd.',
        description:
          'استقدام عمالة بنغلاديشية ماهرة للمملكة العربية السعودية. توظيف متوافق مع متطلبات BMET في قطاعات البناء والبنية التحتية والنظافة والنقل، مع تعبئة سريعة ودعم كامل للمستندات.',
      },
    },
    services: {},
    posts: {},
    guides: {},
    // Country names (all 24 areaServed entries plus the 28 country pages).
    areaServed: [
      'المملكة العربية السعودية', 'الإمارات العربية المتحدة', 'قطر', 'الكويت', 'عُمان', 'البحرين', 'الأردن',
      'ماليزيا', 'سنغافورة', 'المالديف', 'إيطاليا', 'البرتغال', 'اليونان', 'رومانيا', 'بولندا',
      'المجر', 'كرواتيا', 'التشيك', 'ليتوانيا', 'لاتفيا', 'إستونيا', 'بلغاريا',
      'البوسنة والهرسك', 'قبرص',
    ],
  },
};
