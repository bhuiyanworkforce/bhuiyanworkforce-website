// Per-language rules for scripts/check-translation.mjs and scripts/make-prompt.mjs.
//
// IMPORTANT: the `banned` / `warn` lists name activities that are licensed or regulated in the target
// country (private employment agencies, temporary agency work, posting of workers, labour
// intermediation ...). They are a STARTING LIST written to keep the company from describing itself
// with a regulated term. They are NOT legal advice and are NOT verified against current law: have a
// local lawyer confirm them before the language goes live.
//
// Regexes run on text that was lower-cased and had accents removed (NFD, combining marks dropped,
// final sigma folded), so write them WITHOUT diacritics (š→s, ö→o, й→и, ё→е, ş→s, ı stays ı).
// `re` must not use the g flag. \b does not work next to non-Latin letters: use (?!\p{L}) with the u flag instead.
// NOTE for Cyrillic: й is stripped to и and ё to е, so write трудоустроиств, not трудоустройств.

const LATIN_ONLY = /[\p{Script=Cyrillic}\p{Script=Greek}\p{Script=Arabic}]/u;

export const PROFILES = {
  // ------------------------------------------------------------------ Italian
  it: {
    name: 'Italian', native: 'Italiano', script: 'latin', variant: 'Standard Italian (Italy)', bangladesh: 'Bangladesh',
    register: 'the "voi" form (employers are companies): "Contattateci", "i vostri requisiti". Never "tu", never "Lei".',
    quotes: '« » (or “ ”)', numbers: 'decimal comma, thousands period (2.500 · 0,5)', dates: 'lower-case month names ("settembre 2026")',
    banned: [
      { re: /agenzi[ae] (per il lavoro|di somministrazione|interinal\w*)/, term: '«agenzia per il lavoro / di somministrazione / interinale»', why: 'authorised, regulated activities in Italy (ANPAL register)' },
      { re: /somministrazione/, term: '«somministrazione»', why: 'regulated legal term' },
      { re: /intermediazione/, term: '«intermediazione»', why: 'regulated legal term' },
      { re: /distacc/, term: '«distacco / distaccare»', why: 'legal posting of workers' },
      { re: /avviament/, term: '«avviamento»', why: 'specific labour-law meaning' },
    ],
    warn: [],
    glossary: [['recruitment / ethical recruitment', 'reclutamento / reclutamento etico'], ['workers / skilled / semi-skilled', 'lavoratori / qualificati / semi-qualificati'], ['employer(s)', 'datore di lavoro / datori di lavoro'], ['workforce', 'forza lavoro'], ['deployment (workers abroad)', 'invio di lavoratori'], ['shortlist', 'shortlist di candidati verificati'], ['trade test', 'prova pratica di mestiere'], ['visa / work permit', 'visto / permesso di lavoro'], ['medical clearance', 'idoneità medica'], ['police clearance', 'certificato penale'], ['success fee', 'success fee (compenso a risultato)'], ['replacement guarantee', 'garanzia di sostituzione'], ['employment contract', 'contratto di lavoro'], ['compliance', 'conformità normativa'], ['the Gulf (GCC)', 'il Golfo / Paesi del Golfo (GCC)'], ['Southeast Asia', 'Sud-est asiatico'], ['Founding Employer Partners', 'Datori di lavoro partner fondatori'], ['capabilities deck', 'presentazione delle competenze aziendali']],
    keywords: 'lavoratori dal Bangladesh, reclutamento di lavoratori stranieri, assunzione di personale straniero qualificato, reclutamento etico, manodopera qualificata dall’estero, BMET',
    notes: [],
  },
  // ------------------------------------------------------------------ Greek
  el: {
    name: 'Greek', native: 'Ελληνικά', script: 'greek', variant: 'Modern Greek (monotonic orthography)', bangladesh: 'Μπανγκλαντές',
    register: 'the polite plural ("εσείς"): «Επικοινωνήστε μαζί μας», «Στείλτε μας τις απαιτήσεις σας». Never the informal singular.',
    quotes: '« » (or “ ”)', numbers: 'decimal comma, thousands period (2.500 · 0,5)', dates: 'translated month names ("Σεπτέμβριος 2026")',
    checks: ['greek-polytonic', 'greek-question'],
    banned: [
      { re: /γραφει\S*\s+ευρεσ/, term: '«γραφείο ευρέσεως/εύρεσης εργασίας»', why: 'licensed private employment agency' },
      { re: /προσωριν\S*\s+απασχολ/, term: '«προσωρινή απασχόληση» (agency)', why: 'regulated temporary work agencies' },
      { re: /διαμεσολαβ/, term: '«διαμεσολάβηση»', why: 'regulated employment-intermediation service' },
      { re: /αποσπασ(η|εις|εων|εως)(?!\p{L})|αποσπασμεν/u, term: '«απόσπαση»', why: 'legal posting of workers' },
      { re: /μετακλησ/, term: '«μετάκληση»', why: 'legal immigration procedure for third-country workers' },
      { re: /ενοικιασ\S*\s+(εργαζομεν|προσωπικ|εργατ)/, term: '«ενοικίαση εργαζομένων»', why: 'leasing of employees is regulated' },
    ],
    warn: [
      { re: /τοποθετησ(η|εις|εων)/, term: '«τοποθέτηση»', why: 'can read as a regulated placement service; prefer «πρόσληψη», «ένταξη», «αποστολή»' },
      { re: /ευρεσ\S*\s+εργασι/, term: '«εύρεση εργασίας»', why: 'can read as a job-finding agency service' },
    ],
    glossary: [['recruitment / ethical recruitment', 'στρατολόγηση προσωπικού (πρόσληψη) / δεοντολογική στρατολόγηση'], ['workers / skilled / semi-skilled', 'εργαζόμενοι (εργάτες) / ειδικευμένοι / ημι-ειδικευμένοι'], ['employer(s)', 'εργοδότης / εργοδότες'], ['workforce', 'εργατικό δυναμικό'], ['deployment (workers abroad)', 'αποστολή εργαζομένων'], ['shortlist', 'σύντομος κατάλογος ελεγμένων υποψηφίων'], ['trade test', 'πρακτική επαγγελματική δοκιμασία'], ['visa / work permit', 'βίζα / άδεια εργασίας'], ['medical clearance', 'ιατρική βεβαίωση καταλληλότητας'], ['police clearance', 'πιστοποιητικό ποινικού μητρώου'], ['success fee', 'αμοιβή επιτυχίας (success fee)'], ['replacement guarantee', 'εγγύηση αντικατάστασης'], ['employment contract', 'σύμβαση εργασίας'], ['compliance', 'συμμόρφωση'], ['the Gulf (GCC)', 'χώρες του Κόλπου (GCC)'], ['Southeast Asia', 'Νοτιοανατολική Ασία'], ['Founding Employer Partners', 'Ιδρυτικοί συνεργάτες εργοδότες'], ['capabilities deck', 'παρουσίαση δυνατοτήτων της εταιρείας']],
    keywords: 'εργαζόμενοι από το Μπανγκλαντές, πρόσληψη εργαζομένων από το εξωτερικό, στρατολόγηση εργατικού δυναμικού, δεοντολογική στρατολόγηση, ειδικευμένοι εργάτες από την Ασία, BMET',
    notes: [],
  },
  // ------------------------------------------------------------------ Spanish (Spain)
  es: {
    name: 'Spanish', native: 'Español', script: 'latin', variant: 'Peninsular Spanish (Spain)', bangladesh: 'Bangladés',
    register: 'the formal "usted/ustedes" ("Contacte con nosotros", "Envíenos sus requisitos", "sus necesidades"). No "tú", no "vosotros", no voseo.',
    quotes: '« » (or “ ”)', numbers: 'decimal comma; thousands with a period or a non-breaking space, used consistently (2.500 or 2 500)', dates: 'lower-case month names ("septiembre de 2026")',
    checks: ['spanish-inverted'],
    banned: [
      { re: /agencias? de colocacion/, term: '«agencia de colocación»', why: 'authorised placement agency (needs public employment service authorisation)' },
      { re: /empresas? de trabajo temporal|\bett\b/, term: '«empresa de trabajo temporal / ETT»', why: 'regulated temporary work agency' },
      { re: /cesion de trabajadores/, term: '«cesión de trabajadores»', why: 'legally restricted outside licensed ETTs' },
      { re: /desplazamientos? (temporal(es)? )?de trabajadores/, term: '«desplazamiento de trabajadores»', why: 'legal posting of workers' },
      { re: /intermediacion laboral/, term: '«intermediación laboral»', why: 'regulated placement activity' },
      { re: /contratacion (colectiva )?en origen/, term: '«contratación en origen»', why: 'regulated legal procedure for foreign workers' },
    ],
    warn: [{ re: /colocacion/, term: '«colocación»', why: 'reads as a regulated placement service' }],
    glossary: [['recruitment / ethical recruitment', 'reclutamiento / reclutamiento ético'], ['workers / skilled / semi-skilled', 'trabajadores / cualificados / semicualificados'], ['employer(s)', 'empleador / empleadores (empresas empleadoras)'], ['workforce', 'mano de obra'], ['deployment (workers abroad)', 'envío de trabajadores'], ['shortlist', 'preselección de candidatos verificados (lista corta)'], ['trade test', 'prueba práctica de oficio'], ['visa / work permit', 'visado / permiso de trabajo'], ['medical clearance', 'certificado médico de aptitud'], ['police clearance', 'certificado de antecedentes penales'], ['success fee', 'pago por resultados (success fee)'], ['replacement guarantee', 'garantía de sustitución'], ['employment contract', 'contrato de trabajo'], ['compliance', 'cumplimiento normativo'], ['the Gulf (GCC)', 'el Golfo / países del Golfo (GCC)'], ['Southeast Asia', 'Sudeste Asiático'], ['Founding Employer Partners', 'empresas socias fundadoras'], ['capabilities deck', 'presentación de capacidades']],
    keywords: 'trabajadores de Bangladés, reclutamiento de trabajadores extranjeros, contratación de personal cualificado del extranjero, reclutamiento ético, mano de obra cualificada, BMET',
    notes: ['Use the opening marks ¿ and ¡ wherever Spanish requires them.'],
  },
  // ------------------------------------------------------------------ French (France)
  fr: {
    name: 'French', native: 'Français', script: 'latin', variant: 'French (France)', bangladesh: 'Bangladesh',
    register: 'the formal "vous" ("Contactez-nous", "vos besoins"). Never "tu".',
    quotes: '« » with a non-breaking space inside each guillemet', numbers: 'decimal comma; thousands separator a non-breaking space (2 500 · 0,5)', dates: 'lower-case month names ("septembre 2026")',
    checks: ['french-spacing'],
    banned: [
      { re: /entreprises? de travail temporaire|agences? d.interim|\binterim\b/, term: '«entreprise de travail temporaire», «agence d’intérim»', why: 'regulated temporary work activity' },
      { re: /portage salarial/, term: '«portage salarial»', why: 'regulated legal framework' },
      { re: /detachement de (travailleurs|salaries|personnel)/, term: '«détachement de travailleurs»', why: 'legal posting of workers' },
      { re: /pret de main.d.?(oeuvre|œuvre)/, term: '«prêt de main-d’œuvre»', why: 'legally restricted activity' },
      { re: /agences? de placement|entreprises? de placement|\bplacement (prive|de (travailleurs|salaries|personnel))/, term: '«agence de placement», «placement privé»', why: 'regulated placement activity' },
    ],
    warn: [{ re: /\bplacement/, term: '«placement»', why: 'reads as a regulated placement service; prefer «recrutement», «mise en relation»' }],
    glossary: [['recruitment / ethical recruitment', 'recrutement / recrutement éthique'], ['workers / skilled / semi-skilled', 'travailleurs / qualifiés / semi-qualifiés'], ['employer(s)', 'employeur / employeurs'], ['workforce', 'main-d’œuvre'], ['deployment (workers abroad)', 'envoi de travailleurs'], ['shortlist', 'liste restreinte de candidats vérifiés'], ['trade test', 'test pratique de métier'], ['visa / work permit', 'visa / permis de travail'], ['medical clearance', 'certificat médical d’aptitude'], ['police clearance', 'extrait de casier judiciaire'], ['success fee', 'honoraires au résultat (success fee)'], ['replacement guarantee', 'garantie de remplacement'], ['employment contract', 'contrat de travail'], ['compliance', 'conformité réglementaire'], ['the Gulf (GCC)', 'le Golfe / pays du Golfe (CCG, GCC)'], ['Southeast Asia', 'Asie du Sud-Est'], ['Founding Employer Partners', 'employeurs partenaires fondateurs'], ['capabilities deck', 'présentation des compétences de l’entreprise']],
    keywords: 'travailleurs du Bangladesh, recrutement de travailleurs étrangers, recrutement de main-d’œuvre qualifiée à l’étranger, recrutement éthique, main-d’œuvre qualifiée, BMET',
    notes: ['Do not use inclusive point médian writing (e.g. "travailleur·se·s"); use standard grammar.'],
  },
  // ------------------------------------------------------------------ German (Germany)
  de: {
    name: 'German', native: 'Deutsch', script: 'latin', variant: 'German (Germany; use ß, not Swiss spelling)', bangladesh: 'Bangladesch',
    register: 'the formal "Sie" ("Kontaktieren Sie uns", "Ihre Anforderungen"). Never "du".',
    quotes: '„ “ (or » «)', numbers: 'decimal comma, thousands period (2.500 · 0,5)', dates: 'capitalised month names ("September 2026")',
    banned: [
      { re: /arbeitnehmerueberlassung|arbeitnehmeruberlassung|(?<!teil|voll)zeitarbeit|leiharbeit|personalleasing/, term: '«Arbeitnehmerüberlassung», «Zeitarbeit», «Leiharbeit», «Personalleasing»', why: 'licensed temporary agency work (AÜG)' },
      { re: /entsendung|entsandt|entsende/, term: '«Entsendung / entsenden»', why: 'legal posting of workers' },
    ],
    warn: [{ re: /arbeitsvermittl|personalvermittl/, term: '«Arbeitsvermittlung», «Personalvermittlung»', why: 'regulated placement service; prefer «Rekrutierung», «Personalgewinnung»' }],
    glossary: [['recruitment / ethical recruitment', 'Rekrutierung / ethische Rekrutierung'], ['workers / skilled / semi-skilled', 'Arbeitskräfte / qualifizierte / angelernte Arbeitskräfte'], ['employer(s)', 'Arbeitgeber'], ['workforce', 'Arbeitskräfte / Personal'], ['deployment (workers abroad)', 'Einsatz der Arbeitskräfte im Zielland (not "Entsendung")'], ['shortlist', 'Shortlist geprüfter Kandidaten'], ['trade test', 'praktischer Fachtest'], ['visa / work permit', 'Visum / Arbeitserlaubnis'], ['medical clearance', 'ärztliche Eignungsbescheinigung'], ['police clearance', 'polizeiliches Führungszeugnis'], ['success fee', 'Erfolgshonorar (Success Fee)'], ['replacement guarantee', 'Ersatzgarantie'], ['employment contract', 'Arbeitsvertrag'], ['compliance', 'Compliance / Einhaltung der Vorschriften'], ['the Gulf (GCC)', 'die Golfstaaten (GCC)'], ['Southeast Asia', 'Südostasien'], ['Founding Employer Partners', 'Gründungspartner (Arbeitgeber)'], ['capabilities deck', 'Unternehmenspräsentation']],
    keywords: 'Arbeitskräfte aus Bangladesch, Rekrutierung ausländischer Arbeitskräfte, Gewinnung qualifizierter Fachkräfte aus dem Ausland, ethische Rekrutierung, qualifiziertes Personal, BMET',
    notes: ['Avoid gender stars, colons and underscores. Prefer neutral nouns ("Fachkräfte", "Beschäftigte", "Arbeitskräfte") and stay consistent.'],
  },
  // ------------------------------------------------------------------ Romanian
  ro: {
    name: 'Romanian', native: 'Română', script: 'latin', variant: 'Standard Romanian (Romania)', bangladesh: 'Bangladesh',
    register: 'the polite "dumneavoastră" form ("Contactați-ne", "nevoile dumneavoastră"). Never "tu".',
    quotes: '„ ” (nested: « »)', numbers: 'decimal comma, thousands period (2.500 · 0,5)', dates: 'lower-case month names ("septembrie 2026")',
    wrongDiacritics: [[/[\u015F\u0163\u015E\u0162]/, 'Romanian requires comma-below ș ț Ș Ț (not the cedilla letters ş ţ Ş Ţ)']],
    banned: [
      { re: /agenti[ae] de plasare/, term: '«agenție de plasare (a forței de muncă)»', why: 'licensed placement agency' },
      { re: /agenti[ae] de (munca temporara|mediere|ocupare)|munca temporara/, term: '«agenție de muncă temporară / mediere / ocupare»', why: 'regulated agency activities' },
      { re: /detasar/, term: '«detașare»', why: 'legal posting of workers' },
      { re: /mediere a muncii|servicii de mediere|plasarea? fortei de munca/, term: '«mediere a muncii», «plasarea forței de muncă»', why: 'regulated employment-mediation / placement services' },
    ],
    warn: [{ re: /mediere/, term: '«mediere»', why: 'can read as the regulated labour-mediation service' }],
    glossary: [['recruitment / ethical recruitment', 'recrutare / recrutare etică'], ['workers / skilled / semi-skilled', 'lucrători / calificați / semicalificați'], ['employer(s)', 'angajator / angajatori'], ['workforce', 'forță de muncă'], ['deployment (workers abroad)', 'trimiterea lucrătorilor'], ['shortlist', 'listă scurtă de candidați verificați'], ['trade test', 'test practic de meserie'], ['visa / work permit', 'viză / permis de muncă'], ['medical clearance', 'aviz medical de aptitudine'], ['police clearance', 'cazier judiciar'], ['success fee', 'comision de succes (success fee)'], ['replacement guarantee', 'garanție de înlocuire'], ['employment contract', 'contract de muncă'], ['compliance', 'conformitate'], ['the Gulf (GCC)', 'Golful / țările din Golf (GCC)'], ['Southeast Asia', 'Asia de Sud-Est'], ['Founding Employer Partners', 'angajatori parteneri fondatori'], ['capabilities deck', 'prezentarea capabilităților companiei']],
    keywords: 'lucrători din Bangladesh, recrutare de lucrători străini, angajare personal calificat din străinătate, recrutare etică, forță de muncă calificată, BMET',
    notes: ['Romania is also one of the 31 country pages and Romanian employers are a likely audience. Translate the Romania page like every other.'],
  },
  // ------------------------------------------------------------------ Hungarian
  hu: {
    name: 'Hungarian', native: 'Magyar', script: 'latin', variant: 'Standard Hungarian (Hungary)', bangladesh: 'Banglades',
    register: 'the formal plural "Önök" ("Vegye fel velünk a kapcsolatot", "az Önök igényei"). Never the informal "te/ti".',
    quotes: '„ ” (nested: » «)', numbers: 'decimal comma; thousands separator a non-breaking space (2 500 · 0,5)', dates: 'Hungarian order and lower-case month ("2026. szeptember")',
    wrongDiacritics: [[/[\u00F5\u00D5\u00FB\u00DB]/, 'Hungarian uses the double acute ő ű Ő Ű (not the look-alikes õ û Õ Û)']],
    banned: [
      { re: /munkaero.?kolcsonz/, term: '«munkaerő-kölcsönzés»', why: 'registered temporary agency work' },
      { re: /munkakozvetit/, term: '«munkaközvetítés / munkaközvetítő»', why: 'regulated employment-mediation service' },
      { re: /kikuldetes|munkavallalok kikuldese/, term: '«kiküldetés / munkavállalók kiküldése»', why: 'legal posting of workers' },
    ],
    warn: [{ re: /kozvetit/, term: '«közvetít…»', why: 'can read as the regulated mediation service; prefer «toborzás», «kiválasztás»' }],
    glossary: [['recruitment / ethical recruitment', 'toborzás / etikus toborzás'], ['workers / skilled / semi-skilled', 'munkavállalók / képzett / félig képzett'], ['employer(s)', 'munkáltató(k)'], ['workforce', 'munkaerő'], ['deployment (workers abroad)', 'külföldi munkába állítás'], ['shortlist', 'ellenőrzött jelöltek szűkített listája (shortlist)'], ['trade test', 'szakmai gyakorlati teszt'], ['visa / work permit', 'vízum / munkavállalási engedély'], ['medical clearance', 'orvosi alkalmassági igazolás'], ['police clearance', 'hatósági erkölcsi bizonyítvány'], ['success fee', 'sikerdíj'], ['replacement guarantee', 'pótlási garancia'], ['employment contract', 'munkaszerződés'], ['compliance', 'megfelelőség'], ['the Gulf (GCC)', 'Öböl-menti országok (GCC)'], ['Southeast Asia', 'Délkelet-Ázsia'], ['Founding Employer Partners', 'alapító munkáltató partnerek'], ['capabilities deck', 'cégbemutató prezentáció']],
    keywords: 'banglades munkavállalók, külföldi munkavállalók toborzása, képzett munkaerő külföldről, etikus toborzás, szakképzett munkaerő, BMET',
    notes: ['Keep person names exactly as written (do not reorder into Hungarian family-name-first order).'],
  },
  // ------------------------------------------------------------------ Croatian
  hr: {
    name: 'Croatian', native: 'Hrvatski', script: 'latin', variant: 'Standard Croatian (Croatia), Latin script, ijekavian', bangladesh: 'Bangladeš',
    register: 'the formal plural "Vi" ("Kontaktirajte nas", "Vaši zahtjevi"). Keep the capitalisation of Vi/Vaš consistent.',
    quotes: '„ “ (or » «)', numbers: 'decimal comma, thousands period (2.500 · 0,5)', dates: 'lower-case month names ("rujan 2026")',
    banned: [
      { re: /agencij\S* za (privremeno zaposljavanje|posredovanje)/, term: '«agencija za privremeno zapošljavanje / posredovanje»', why: 'regulated agency activities' },
      { re: /posredovanj\S* (pri|u) zaposljavanj/, term: '«posredovanje pri zapošljavanju»', why: 'regulated employment-mediation service' },
      { re: /ustupanj\S* radnika/, term: '«ustupanje radnika»', why: 'regulated agency work' },
      { re: /upucivanj\S* radnika/, term: '«upućivanje radnika»', why: 'legal posting of workers' },
    ],
    warn: [{ re: /posredovanj/, term: '«posredovanje»', why: 'can read as the regulated mediation service' }],
    glossary: [['recruitment / ethical recruitment', 'regrutacija radnika / etična regrutacija'], ['workers / skilled / semi-skilled', 'radnici / kvalificirani / polukvalificirani'], ['employer(s)', 'poslodavac / poslodavci'], ['workforce', 'radna snaga'], ['deployment (workers abroad)', 'slanje radnika'], ['shortlist', 'uža lista provjerenih kandidata'], ['trade test', 'praktični stručni test'], ['visa / work permit', 'viza / dozvola za rad'], ['medical clearance', 'liječnička potvrda o sposobnosti'], ['police clearance', 'potvrda o nekažnjavanju'], ['success fee', 'naknada za uspjeh (success fee)'], ['replacement guarantee', 'jamstvo zamjene'], ['employment contract', 'ugovor o radu'], ['compliance', 'usklađenost'], ['the Gulf (GCC)', 'zemlje Zaljeva (GCC)'], ['Southeast Asia', 'jugoistočna Azija'], ['Founding Employer Partners', 'poslodavci partneri osnivači'], ['capabilities deck', 'prezentacija mogućnosti tvrtke']],
    keywords: 'radnici iz Bangladeša, regrutacija stranih radnika, zapošljavanje kvalificiranih radnika iz inozemstva, etična regrutacija, kvalificirana radna snaga, BMET',
    notes: ['Use Croatian standard vocabulary (tvrtka, tisuća, tjedan, poslodavac). Do not use Serbian or Bosnian forms (kompanija, hiljada, sedmica).', 'Latin script only: no Cyrillic characters anywhere.'],
  },
  // ------------------------------------------------------------------ Serbian (Latin)
  sr: {
    name: 'Serbian', native: 'Srpski (latinica)', script: 'latin', variant: 'Standard Serbian (Serbia), Latin script (latinica), ekavian', bangladesh: 'Bangladeš',
    register: 'the formal plural "Vi" ("Kontaktirajte nas", "Vaši zahtevi"). Keep the capitalisation of Vi/Vaš consistent.',
    quotes: '„ “ (or » «)', numbers: 'decimal comma, thousands period (2.500 · 0,5)', dates: 'lower-case month names ("septembar 2026")',
    banned: [
      { re: /agencij\S* za (zaposljavanje|privremeno|posredovanje)/, term: '«agencija za zapošljavanje / privremeno zapošljavanje / posredovanje»', why: 'licensed employment agency' },
      { re: /posredovanj\S* u zaposljavanj/, term: '«posredovanje u zapošljavanju»', why: 'regulated employment-mediation service' },
      { re: /ustupanj\S* (zaposlenih|radnika)/, term: '«ustupanje zaposlenih/radnika»', why: 'regulated agency work' },
      { re: /upucivanj\S* (zaposlenih|radnika)/, term: '«upućivanje zaposlenih/radnika»', why: 'legal posting of workers' },
    ],
    warn: [{ re: /posredovanj/, term: '«posredovanje»', why: 'can read as the regulated mediation service' }],
    glossary: [['recruitment / ethical recruitment', 'regrutacija radnika / etička regrutacija'], ['workers / skilled / semi-skilled', 'radnici / kvalifikovani / polukvalifikovani'], ['employer(s)', 'poslodavac / poslodavci'], ['workforce', 'radna snaga'], ['deployment (workers abroad)', 'slanje radnika'], ['shortlist', 'uža lista proverenih kandidata'], ['trade test', 'praktični stručni test'], ['visa / work permit', 'viza / dozvola za rad'], ['medical clearance', 'lekarsko uverenje o sposobnosti'], ['police clearance', 'uverenje o nekažnjavanju'], ['success fee', 'naknada za uspeh (success fee)'], ['replacement guarantee', 'garancija zamene'], ['employment contract', 'ugovor o radu'], ['compliance', 'usklađenost'], ['the Gulf (GCC)', 'zemlje Zaliva (GCC)'], ['Southeast Asia', 'jugoistočna Azija'], ['Founding Employer Partners', 'poslodavci partneri osnivači'], ['capabilities deck', 'prezentacija mogućnosti kompanije']],
    keywords: 'radnici iz Bangladeša, regrutacija stranih radnika, zapošljavanje kvalifikovanih radnika iz inostranstva, etička regrutacija, kvalifikovana radna snaga, BMET',
    notes: ['Use the Latin script (latinica) everywhere, which is the most common script for Serbian on the web. No Cyrillic characters at all.', 'Ekavian standard (reč, lepo, mleko), not ijekavian; use Serbian vocabulary (kompanija, hiljada, sedmica).'],
  },
  // ------------------------------------------------------------------ Bosnian
  bs: {
    name: 'Bosnian', native: 'Bosanski', script: 'latin', variant: 'Standard Bosnian (Bosnia and Herzegovina), Latin script, ijekavian', bangladesh: 'Bangladeš',
    register: 'the formal plural "Vi" ("Kontaktirajte nas", "Vaši zahtjevi"). Keep the capitalisation of Vi/Vaš consistent.',
    quotes: '„ “ (or » «)', numbers: 'decimal comma, thousands period (2.500 · 0,5)', dates: 'lower-case month names ("septembar 2026")',
    banned: [
      { re: /agencij\S* za (posredovanje|zaposljavanje|privremeno)/, term: '«agencija za posredovanje / zapošljavanje / privremeno zapošljavanje»', why: 'regulated private employment agency' },
      { re: /posredovanj\S* (pri|u) zaposljavanj/, term: '«posredovanje pri zapošljavanju»', why: 'regulated employment-mediation service' },
      { re: /ustupanj\S* radnika/, term: '«ustupanje radnika»', why: 'regulated agency work' },
      { re: /upucivanj\S* radnika/, term: '«upućivanje radnika»', why: 'legal posting of workers' },
    ],
    warn: [{ re: /posredovanj/, term: '«posredovanje»', why: 'can read as the regulated mediation service' }],
    glossary: [['recruitment / ethical recruitment', 'regrutacija radnika / etička regrutacija'], ['workers / skilled / semi-skilled', 'radnici / kvalificirani / polukvalificirani'], ['employer(s)', 'poslodavac / poslodavci'], ['workforce', 'radna snaga'], ['deployment (workers abroad)', 'slanje radnika'], ['shortlist', 'uža lista provjerenih kandidata'], ['trade test', 'praktični stručni test'], ['visa / work permit', 'viza / radna dozvola'], ['medical clearance', 'ljekarsko uvjerenje o sposobnosti'], ['police clearance', 'uvjerenje o nekažnjavanju'], ['success fee', 'naknada za uspjeh (success fee)'], ['replacement guarantee', 'garancija zamjene'], ['employment contract', 'ugovor o radu'], ['compliance', 'usklađenost'], ['the Gulf (GCC)', 'zemlje Zaljeva (GCC)'], ['Southeast Asia', 'jugoistočna Azija'], ['Founding Employer Partners', 'poslodavci partneri osnivači'], ['capabilities deck', 'prezentacija mogućnosti kompanije']],
    keywords: 'radnici iz Bangladeša, regrutacija stranih radnika, zapošljavanje kvalificiranih radnika iz inostranstva, etička regrutacija, kvalificirana radna snaga, BMET',
    notes: ['Write in standard Bosnian, not a copy of Serbian or Croatian: ijekavian, "historija", "hiljada", "sedmica", "uvjerenje", "inostranstvo" are typical.', 'Latin script only: no Cyrillic characters.'],
  },
  // ------------------------------------------------------------------ Macedonian (Cyrillic)
  mk: {
    name: 'Macedonian', native: 'Македонски', script: 'cyrillic', variant: 'Standard Macedonian (North Macedonia), Cyrillic', bangladesh: 'Бангладеш',
    register: 'the formal plural "Вие" ("Контактирајте нè", "Вашите барања"). Keep the capitalisation of Вие/Ваш consistent.',
    quotes: '„ “', numbers: 'decimal comma, thousands period (2.500 · 0,5)', dates: 'lower-case month names ("септември 2026")',
    forbiddenChars: /[ыэёъщђћ]/iu, forbiddenNote: 'Letters that do not exist in Macedonian (ы э ё ъ щ ђ ћ) are not allowed: Russian, Bulgarian or Serbian spelling must not leak in',
    banned: [
      { re: /агенциј\S* за (вработув|привремено|посредув)/, term: '«агенција за вработување / привремено вработување / посредување»', why: 'licensed employment agency' },
      { re: /посредув\S* (при|во) вработув/, term: '«посредување при вработување»', why: 'regulated employment-mediation service' },
      { re: /упатув\S* на работници/, term: '«упатување на работници»', why: 'legal posting of workers' },
    ],
    warn: [{ re: /посредув/, term: '«посредување»', why: 'can read as the regulated mediation service' }],
    glossary: [['recruitment / ethical recruitment', 'регрутирање / етичко регрутирање'], ['workers / skilled / semi-skilled', 'работници / квалификувани / полуквалификувани'], ['employer(s)', 'работодавач / работодавачи'], ['workforce', 'работна сила'], ['deployment (workers abroad)', 'испраќање на работници'], ['shortlist', 'потесна листа на проверени кандидати'], ['trade test', 'практичен стручен тест'], ['visa / work permit', 'виза / работна дозвола'], ['medical clearance', 'лекарско уверение за способност'], ['police clearance', 'уверение за неосудуваност'], ['success fee', 'награда за успех (success fee)'], ['replacement guarantee', 'гаранција за замена'], ['employment contract', 'договор за вработување'], ['compliance', 'усогласеност'], ['the Gulf (GCC)', 'земји од Заливот (GCC)'], ['Southeast Asia', 'Југоисточна Азија'], ['Founding Employer Partners', 'работодавачи партнери основачи'], ['capabilities deck', 'презентација на можностите на компанијата']],
    keywords: 'работници од Бангладеш, регрутирање на странски работници, вработување квалификувани работници од странство, етичко регрутирање, квалификувана работна сила, BMET',
    notes: ['Standard Macedonian Cyrillic only. Do not leak Serbian or Bulgarian spellings. Acronyms keep Latin script.'],
  },
  // ------------------------------------------------------------------ Bulgarian (Cyrillic)
  bg: {
    name: 'Bulgarian', native: 'Български', script: 'cyrillic', variant: 'Standard Bulgarian (Bulgaria)', bangladesh: 'Бангладеш',
    register: 'the polite plural "Вие" ("Свържете се с нас", "Вашите изисквания"). Keep the capitalisation of Вие/Ваш consistent.',
    quotes: '„ “', numbers: 'decimal comma; thousands separator a non-breaking space (2 500 · 0,5)', dates: 'lower-case month names ("септември 2026")',
    forbiddenChars: /[ыэёђћѓќљњџѕ]/iu, forbiddenNote: 'Letters that do not exist in Bulgarian (ы э ё ђ ћ ѓ ќ љ њ џ ѕ) are not allowed: Russian, Serbian or Macedonian spelling must not leak in',
    banned: [
      { re: /посреднич/, term: '«посредничество / посредническа дейност»', why: 'licensed employment-mediation activity' },
      { re: /командирова/, term: '«командироване»', why: 'legal posting of workers' },
      { re: /предприяти\S* осигуряващ\S* временна работа/, term: '«предприятие, осигуряващо временна работа»', why: 'regulated temporary work agencies' },
    ],
    warn: [],
    glossary: [['recruitment / ethical recruitment', 'набиране на персонал / етично набиране'], ['workers / skilled / semi-skilled', 'работници / квалифицирани / полуквалифицирани'], ['employer(s)', 'работодател / работодатели'], ['workforce', 'работна сила'], ['deployment (workers abroad)', 'изпращане на работници'], ['shortlist', 'кратък списък от проверени кандидати'], ['trade test', 'практически изпит по професията'], ['visa / work permit', 'виза / разрешение за работа'], ['medical clearance', 'медицинско удостоверение за годност'], ['police clearance', 'свидетелство за съдимост'], ['success fee', 'такса при успех (success fee)'], ['replacement guarantee', 'гаранция за замяна'], ['employment contract', 'трудов договор'], ['compliance', 'съответствие с изискванията'], ['the Gulf (GCC)', 'страните от Персийския залив (GCC)'], ['Southeast Asia', 'Югоизточна Азия'], ['Founding Employer Partners', 'работодатели партньори-основатели'], ['capabilities deck', 'презентация на възможностите на компанията']],
    keywords: 'работници от Бангладеш, набиране на чуждестранни работници, наемане на квалифицирани работници от чужбина, етично набиране, квалифицирана работна сила, BMET',
    notes: ['Bulgaria is also one of the 31 country pages and Bulgarian employers are a likely audience. Translate the Bulgaria page like every other.', 'Acronyms keep Latin script.'],
  },
  // ------------------------------------------------------------------ Russian (Cyrillic)
  ru: {
    name: 'Russian', native: 'Русский', script: 'cyrillic', variant: 'Standard Russian', bangladesh: 'Бангладеш',
    register: 'the polite plural "вы" ("Свяжитесь с нами", "ваши требования"), lower case throughout.',
    quotes: '« » (nested „ “)', numbers: 'decimal comma; thousands separator a non-breaking space (2 500 · 0,5)', dates: 'lower-case month names ("сентябрь 2026")',
    forbiddenChars: /[іїєґђћѓќљњџѕ]/iu, forbiddenNote: 'Letters that do not exist in Russian (і ї є ґ ђ ћ ѓ ќ љ њ џ ѕ) are not allowed: Ukrainian, Serbian or Macedonian spelling must not leak in',
    banned: [
      { re: /агентств\S* занятост/, term: '«агентство занятости»', why: 'regulated private employment agency' },
      { re: /заемн\S* труд/, term: '«заёмный труд»', why: 'restricted agency-work regime' },
      { re: /лизинг персонал|аутстаффинг/, term: '«лизинг персонала», «аутстаффинг»', why: 'restricted staff-leasing practices' },
      { re: /командировани\S* (работник|сотрудник|персонал)/, term: '«командирование работников»', why: 'legal posting of workers' },
      { re: /посредничеств\S* (в|при) трудоустроиств/, term: '«посредничество в трудоустройстве»', why: 'regulated placement activity' },
    ],
    warn: [{ re: /трудоустроиств/, term: '«трудоустройство»', why: 'can read as a regulated placement service; prefer «подбор персонала», «набор»' }],
    glossary: [['recruitment / ethical recruitment', 'подбор персонала / этичный подбор персонала'], ['workers / skilled / semi-skilled', 'работники / квалифицированные / полуквалифицированные'], ['employer(s)', 'работодатель / работодатели'], ['workforce', 'рабочая сила'], ['deployment (workers abroad)', 'направление работников'], ['shortlist', 'шорт-лист проверенных кандидатов'], ['trade test', 'практическая проверка профессиональных навыков'], ['visa / work permit', 'виза / разрешение на работу'], ['medical clearance', 'медицинское заключение о годности'], ['police clearance', 'справка об отсутствии судимости'], ['success fee', 'вознаграждение за результат (success fee)'], ['replacement guarantee', 'гарантия замены'], ['employment contract', 'трудовой договор'], ['compliance', 'соответствие требованиям (комплаенс)'], ['the Gulf (GCC)', 'страны Персидского залива (GCC)'], ['Southeast Asia', 'Юго-Восточная Азия'], ['Founding Employer Partners', 'работодатели — партнёры-основатели'], ['capabilities deck', 'презентация возможностей компании']],
    keywords: 'работники из Бангладеш, подбор иностранных работников, найм квалифицированных рабочих из-за рубежа, этичный подбор персонала, квалифицированная рабочая сила, BMET',
    notes: ['Acronyms keep Latin script. Write «Бангладеш» for Bangladesh.'],
  },
  // ------------------------------------------------------------------ Turkish
  tr: {
    name: 'Turkish', native: 'Türkçe', script: 'latin', variant: 'Standard Turkish (Türkiye)', bangladesh: 'Bangladeş',
    register: 'the formal "siz" form with polite imperatives ("Bizimle iletişime geçin", "ihtiyaçlarınız"). Never the informal "sen".',
    quotes: '“ ” (or « »)', numbers: 'decimal comma, thousands period (2.500 · 0,5)', dates: 'capitalised month names ("Eylül 2026")',
    banned: [
      { re: /ozel istihdam buro/, term: '«özel istihdam bürosu»', why: 'licensed private employment agency' },
      { re: /(gecici|odunc) [ıi]s [ıi]l[ıi]skis/, term: '«geçici iş ilişkisi», «ödünç iş ilişkisi»', why: 'regulated temporary/agency work relationship' },
      { re: /yurt ?d[ıi]s[ıi]na (isci|personel|calisan) (gonder|yerlestir)/, term: '«yurt dışına işçi gönderme/yerleştirme»', why: 'regulated activity of licensed bureaus' },
    ],
    warn: [{ re: /(personel|isci) temin/, term: '«personel/işçi temini»', why: 'can read as the regulated labour-supply service' }, { re: /aracil[ıi]k/, term: '«aracılık»', why: 'can read as the regulated intermediation service' }],
    glossary: [['recruitment / ethical recruitment', 'işe alım / etik işe alım'], ['workers / skilled / semi-skilled', 'işçiler / nitelikli / yarı nitelikli'], ['employer(s)', 'işveren / işverenler'], ['workforce', 'iş gücü'], ['deployment (workers abroad)', 'çalışanların hedef ülkeye görevlendirilmesi'], ['shortlist', 'doğrulanmış adayların kısa listesi'], ['trade test', 'mesleki uygulama sınavı'], ['visa / work permit', 'vize / çalışma izni'], ['medical clearance', 'işe uygunluk sağlık raporu'], ['police clearance', 'adli sicil belgesi'], ['success fee', 'başarı komisyonu (success fee)'], ['replacement guarantee', 'yerine koyma garantisi'], ['employment contract', 'iş sözleşmesi'], ['compliance', 'mevzuata uyum'], ['the Gulf (GCC)', 'Körfez ülkeleri (GCC)'], ['Southeast Asia', 'Güneydoğu Asya'], ['Founding Employer Partners', 'kurucu işveren ortaklar'], ['capabilities deck', 'şirket tanıtım sunumu']],
    keywords: 'Bangladeşli işçiler, yabancı işçi alımı, yurt dışından nitelikli işçi, etik işe alım, nitelikli iş gücü, BMET',
    notes: ['Mind dotted and dotless i (İ i / I ı): never substitute one for the other.'],
  },
  // ------------------------------------------------------------------ Malay (Malaysia)
  ms: {
    name: 'Malay', native: 'Bahasa Melayu', script: 'latin', variant: 'Standard Malaysian Malay (Bahasa Malaysia), not Indonesian', bangladesh: 'Bangladesh',
    register: 'the polite "anda" / "pihak anda" ("Hubungi kami", "keperluan anda"). Formal business register.',
    quotes: '“ ”', numbers: 'Malaysian usage matches English: decimal point, thousands comma (2,500 · 0.5). Keep the formatting exactly as in the English source.', dates: 'capitalised month names ("September 2026")',
    banned: [
      { re: /agensi pekerjaan/, term: '«agensi pekerjaan (swasta)»', why: 'licensed private employment agency' },
      { re: /agensi penempatan/, term: '«agensi penempatan»', why: 'regulated placement agency' },
      { re: /pembekal (tenaga|pekerja)|kontraktor (tenaga|pekerja)/, term: '«pembekal tenaga kerja», «kontraktor tenaga kerja»', why: 'regulated labour supply / contractor-for-labour activity' },
    ],
    warn: [
      { re: /penempatan (pekerja|tenaga)|pengambilan pekerja/, term: '«penempatan pekerja», «pengambilan pekerja»', why: 'can read as the regulated placement / recruitment-agency service' },
      { re: /perusahaan|karyawan|pemberi kerja|izin kerja/, term: 'Indonesian words (perusahaan, karyawan, pemberi kerja, izin kerja)', why: 'use Malaysian Malay: syarikat, pekerja, majikan, permit kerja' },
    ],
    glossary: [['recruitment / ethical recruitment', 'perekrutan / perekrutan beretika'], ['workers / skilled / semi-skilled', 'pekerja / mahir / separa mahir'], ['employer(s)', 'majikan'], ['workforce', 'tenaga kerja'], ['deployment (workers abroad)', 'penghantaran pekerja ke negara destinasi'], ['shortlist', 'senarai pendek calon yang disahkan'], ['trade test', 'ujian kemahiran praktikal'], ['visa / work permit', 'visa / permit kerja'], ['medical clearance', 'perakuan kesihatan / kelayakan perubatan'], ['police clearance', 'Perakuan Kelakuan Baik'], ['success fee', 'yuran kejayaan (success fee)'], ['replacement guarantee', 'jaminan penggantian'], ['employment contract', 'kontrak pekerjaan'], ['compliance', 'pematuhan'], ['the Gulf (GCC)', 'negara-negara Teluk (GCC)'], ['Southeast Asia', 'Asia Tenggara'], ['Founding Employer Partners', 'rakan kongsi majikan pengasas'], ['capabilities deck', 'pembentangan keupayaan syarikat']],
    keywords: 'pekerja Bangladesh, perekrutan pekerja asing, pekerja mahir dari luar negara, perekrutan beretika, tenaga kerja mahir, BMET',
    notes: ['Write Malaysian Malay (syarikat, majikan, pekerja, permit kerja), not Indonesian (perusahaan, pemberi kerja, karyawan, izin kerja).'],
  },
  // ------------------------------------------------------------------ reference languages (minimal)
  ar: { name: 'Arabic', native: 'العربية', script: 'arabic', banned: [], warn: [], glossary: [], notes: [] },
  pl: { name: 'Polish', native: 'Polski', script: 'latin', banned: [], warn: [], glossary: [], notes: [] },
};

export { LATIN_ONLY };
