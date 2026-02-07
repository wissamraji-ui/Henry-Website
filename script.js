const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));

const themeButtons = document.querySelectorAll("[data-theme-value]");
const storedTheme = localStorage.getItem("theme") || "auto";

const applyTheme = (value) => {
  if (value === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", value);
  }

  localStorage.setItem("theme", value);

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeValue === value;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
};

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.themeValue);
  });
});

applyTheme(storedTheme);

const languageButtons = document.querySelectorAll("[data-language-value]");
const storedLanguage = localStorage.getItem("language") || "en";
let currentLanguage = storedLanguage;

const translations = {
  en: {
    "meta.title": "Henry Raji | Chess & Story",
    "ui.top": "Top",
    "ui.back_to_top": "Back to top",
    "ui.copied": "Copied",
    "nav.about": "About",
    "nav.chess": "Chess",
    "nav.gallery": "Gallery",
    "nav.drums": "Drums",
    "nav.coding": "Coding",
    "nav.contact": "Contact",
    "language.label": "Language",
    "language.english": "English",
    "language.arabic": "Arabic",
    "language.french": "French",
    "theme.label": "Theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.auto": "Auto",
    "hero.eyebrow": "Chess Player. Developer. Drummer",
    "hero.lead":
      "A story shaped by patience, bold ideas, and the quiet focus it takes to calculate the next move. From city lights to 64 squares, Henry brings fresh energy to every game.",
    "hero.cta_chess": "View Chess Snapshot",
    "hero.cta_gallery": "See the Photo Story",
    "hero.meta_federation": "Federation: Lebanon",
    "hero.meta_rating": "Rapid Rating: 1498",
    "hero.meta_ranking": "World Ranking (Rapid): #1498",
    "hero.photo_alt": "Henry Raji smiling near the water with a city skyline at dusk",
    "hero.caption": "Seaside evenings. Clear focus. A snapshot of Henry's world.",
    "about.title": "About Henry",
    "about.subtitle": "Calm presence, sharp tactics, and a love for the game.",
    "about.p1":
      "Born in November 1, 2011. Henry Raji is a chess player known for a disciplined approach and a curious mind. His style blends patience with timely bursts of creativity, always looking for opportunities to shift momentum.",
    "about.p2":
      "Beyond the board, he is also a drummer, building rhythm, timing, and stage confidence through regular practice and performances.",
    "about.p3":
      "This site captures a chess snapshot alongside a visual story. It is a place to celebrate growth, resilience, and the journey ahead.",
    "chess.title": "Chess Snapshot",
    "chess.subtitle": "Public profile metrics and quick facts.",
    "chess.stat_federation": "Federation",
    "chess.stat_federation_value": "Lebanon",
    "chess.stat_rating": "Rapid Rating",
    "chess.stat_rating_value": "1498",
    "chess.stat_ranking": "World Ranking (Rapid)",
    "chess.stat_ranking_value": "#1498",
    "chess.goals_title": "Goals",
    "chess.goal_1": "Reach 1800 FIDE rating.",
    "chess.goal_2": "Play International tournaments.",
    "chess.goal_3": "Grow the chess community.",
    "chess.goal_4": "To win more rated tournaments.",
    "chess.photo_alt": "Henry focused during a chess game",
    "chess.caption": "A quiet moment over the board during match play.",
    "chess.note": "Last verified: Jan 31, 2026. Ratings update over time.",
    "chess.link_chesscom": "Chess.com profile",
    "chess.link_chesstv": "ChessTV profile",
    "chess.details":
      "Henry has been playing chess for 4 years, developing strong strategic thinking, patience, and problem-solving skills. Additionally, he is actively playing in rated tournaments, working hard to increase his official FIDE rating.",
    "gallery.title": "Photo Story",
    "gallery.subtitle": "A calm horizon and a focused competitor.",
    "gallery.focus_title": "Focus",
    "gallery.focus_body": "Every match is a puzzle. Every position is a conversation.",
    "gallery.curiosity_title": "Curiosity",
    "gallery.curiosity_body": "Exploring ideas on the board with a fearless mindset.",
    "gallery.momentum_title": "Momentum",
    "gallery.momentum_body": "Building pressure move by move until the time is right.",
    "drums.title": "Drum Skills",
    "drums.subtitle": "Rhythm, focus, and live performance energy.",
    "drums.photo1_alt":
      "Henry performing on an electric drum kit at the Sabis School Adma annual concert in Lebanon",
    "drums.photo1_caption":
      "Annual concert at Sabis School Adma, Lebanon — electric drum performance.",
    "drums.photo2_alt":
      "Henry performing on an electric drum kit at the Sabis School Adma annual concert in Lebanon",
    "drums.photo2_caption":
      "Same annual concert at Sabis School Adma, Lebanon — another electric drum set.",
    "drums.details":
      "Additionally, Henry is a dedicated drummer with 7 years of experience. He has extensive experience with rehearsals and live performances, and has collaborated with his school band, showing teamwork and musical adaptability.",
    "coding.title": "Coding",
    "coding.subtitle": "Logical thinking, clean design, and real-world projects.",
    "coding.exp_title": "Experience",
    "coding.exp_body":
      "Henry has several years of coding experience, building websites and applications with a strong focus on problem-solving, logical thinking, and clean design.",
    "coding.project_title": "Featured Project",
    "coding.project_body":
      "One of Henry's major projects is the ChatBot he made for his school, designed to answer any and all questions about SABIS Adma.",
    "contact.title": "Connect",
    "contact.subtitle": "Follow Henry's chess journey and future updates.",
    "contact.cta_chesscom": "Follow on Chess.com",
    "contact.cta_lichess": "Follow on lichess.org",
    "contact.cta_chesstv": "View ChessTV",
    "contact.email_label": "Email:",
    "contact.instagram_label": "Instagram:",
    "contact.tiktok_label": "TikTok:",
    "contact.copy": "Copy",
    "contact.copy_email_aria": "Copy email address",
    "contact.copy_instagram_aria": "Copy Instagram handle",
    "contact.copy_tiktok_aria": "Copy TikTok handle",
    "footer.text": "Designed to highlight Henry Raji's chess journey and visual story.",
  },
  ar: {
    "meta.title": "هنري راجي | الشطرنج والقصة",
    "ui.top": "أعلى",
    "ui.back_to_top": "العودة إلى الأعلى",
    "ui.copied": "تم النسخ",
    "nav.about": "نبذة",
    "nav.chess": "الشطرنج",
    "nav.gallery": "المعرض",
    "nav.drums": "الطبول",
    "nav.coding": "البرمجة",
    "nav.contact": "تواصل",
    "language.label": "اللغة",
    "language.english": "الإنجليزية",
    "language.arabic": "العربية",
    "language.french": "الفرنسية",
    "theme.label": "المظهر",
    "theme.light": "فاتح",
    "theme.dark": "داكن",
    "theme.auto": "تلقائي",
    "hero.eyebrow": "لاعب شطرنج. مطوّر. عازف طبول",
    "hero.lead":
      "قصة شكّلتها الصبر والأفكار الجريئة والتركيز الهادئ الذي يلزم لحساب النقلة التالية. من أضواء المدينة إلى 64 مربعًا، يجلب هنري طاقة جديدة إلى كل مباراة.",
    "hero.cta_chess": "عرض لمحة الشطرنج",
    "hero.cta_gallery": "شاهد القصة المصوّرة",
    "hero.meta_federation": "الاتحاد: لبنان",
    "hero.meta_rating": "تصنيف السريع: 1498",
    "hero.meta_ranking": "التصنيف العالمي (السريع): #1498",
    "hero.photo_alt": "هنري راجي يبتسم قرب الماء مع أفق المدينة عند الغروب",
    "hero.caption": "أمسيات على البحر. تركيز واضح. لقطة من عالم هنري.",
    "about.title": "عن هنري",
    "about.subtitle": "حضور هادئ، تكتيكات حادة، وحب للعبة.",
    "about.p1":
      "وُلد في 1 نوفمبر 2011. هنري راجي لاعب شطرنج معروف بأسلوب منضبط وعقل فضولي. يمزج أسلوبه بين الصبر ولمحات الإبداع في الوقت المناسب، ودائمًا ما يبحث عن فرص لتغيير الزخم.",
    "about.p2":
      "وخارج الرقعة، هو أيضًا عازف طبول، يبني الإيقاع والتوقيت والثقة على المسرح من خلال التدريب والعروض المنتظمة.",
    "about.p3":
      "يوثق هذا الموقع لمحة شطرنج إلى جانب قصة بصرية. إنه مكان للاحتفاء بالنمو والمرونة والرحلة القادمة.",
    "chess.title": "لمحة شطرنج",
    "chess.subtitle": "مقاييس الملف العام وحقائق سريعة.",
    "chess.stat_federation": "الاتحاد",
    "chess.stat_federation_value": "لبنان",
    "chess.stat_rating": "تصنيف السريع",
    "chess.stat_rating_value": "1498",
    "chess.stat_ranking": "التصنيف العالمي (السريع)",
    "chess.stat_ranking_value": "#1498",
    "chess.goals_title": "الأهداف",
    "chess.goal_1": "الوصول إلى تصنيف FIDE 1800.",
    "chess.goal_2": "المشاركة في بطولات دولية.",
    "chess.goal_3": "تنمية مجتمع الشطرنج.",
    "chess.goal_4": "الفوز بالمزيد من البطولات المصنّفة.",
    "chess.photo_alt": "هنري مركّز أثناء مباراة شطرنج",
    "chess.caption": "لحظة هادئة فوق الرقعة أثناء اللعب.",
    "chess.note": "آخر تحقق: 31 يناير 2026. تتغير التصنيفات مع الوقت.",
    "chess.link_chesscom": "ملف Chess.com",
    "chess.link_chesstv": "ملف ChessTV",
    "chess.details":
      "يلعب هنري الشطرنج منذ 4 سنوات، مطوّرًا التفكير الاستراتيجي والصبر ومهارات حل المشكلات. بالإضافة إلى ذلك، يشارك بنشاط في البطولات المصنفة، ويعمل بجد لزيادة تصنيفه الرسمي في FIDE.",
    "gallery.title": "قصة مصوّرة",
    "gallery.subtitle": "أفق هادئ ومنافس شديد التركيز.",
    "gallery.focus_title": "تركيز",
    "gallery.focus_body": "كل مباراة لغز. كل وضعية حوار.",
    "gallery.curiosity_title": "فضول",
    "gallery.curiosity_body": "استكشاف الأفكار على الرقعة بعقلية جريئة.",
    "gallery.momentum_title": "زخم",
    "gallery.momentum_body": "بناء الضغط نقلة بعد نقلة حتى يحين الوقت.",
    "drums.title": "مهارات الطبول",
    "drums.subtitle": "الإيقاع والتركيز وطاقة الأداء الحي.",
    "drums.photo1_alt":
      "هنري يعزف على طقم طبول إلكتروني في الحفل السنوي لمدرسة سابيس أدما في لبنان",
    "drums.photo1_caption":
      "الحفل السنوي في مدرسة سابيس أدما، لبنان — أداء طبول إلكترونية.",
    "drums.photo2_alt":
      "هنري يعزف على طقم طبول إلكتروني في الحفل السنوي لمدرسة سابيس أدما في لبنان",
    "drums.photo2_caption":
      "الحفل السنوي نفسه في مدرسة سابيس أدما، لبنان — طقم طبول إلكتروني آخر.",
    "drums.details":
      "بالإضافة إلى ذلك، هنري عازف طبول ملتزم ولديه خبرة 7 سنوات. لديه خبرة واسعة في البروفات والعروض الحية، وتعاون مع فرقة مدرسته، مما يُظهر العمل الجماعي والمرونة الموسيقية.",
    "coding.title": "البرمجة",
    "coding.subtitle": "تفكير منطقي وتصميم نظيف ومشاريع واقعية.",
    "coding.exp_title": "خبرة",
    "coding.exp_body":
      "لدى هنري عدة سنوات من خبرة البرمجة، يبني مواقع وتطبيقات مع تركيز قوي على حل المشكلات والتفكير المنطقي والتصميم النظيف.",
    "coding.project_title": "مشروع بارز",
    "coding.project_body":
      "من أبرز مشاريع هنري روبوت الدردشة الذي صنعه لمدرسته، والمصمم للإجابة عن أي وجميع الأسئلة حول SABIS Adma.",
    "contact.title": "تواصل",
    "contact.subtitle": "تابع رحلة هنري في الشطرنج والتحديثات القادمة.",
    "contact.cta_chesscom": "تابع على Chess.com",
    "contact.cta_lichess": "تابع على lichess.org",
    "contact.cta_chesstv": "عرض ChessTV",
    "contact.email_label": "البريد الإلكتروني:",
    "contact.instagram_label": "إنستغرام:",
    "contact.tiktok_label": "تيك توك:",
    "contact.copy": "نسخ",
    "contact.copy_email_aria": "نسخ عنوان البريد الإلكتروني",
    "contact.copy_instagram_aria": "نسخ اسم مستخدم إنستغرام",
    "contact.copy_tiktok_aria": "نسخ اسم مستخدم تيك توك",
    "footer.text": "مصمم لإبراز رحلة هنري راجي في الشطرنج وقصته البصرية.",
  },
  fr: {
    "meta.title": "Henry Raji | Échecs & Histoire",
    "ui.top": "Haut",
    "ui.back_to_top": "Retour en haut",
    "ui.copied": "Copié",
    "nav.about": "À propos",
    "nav.chess": "Échecs",
    "nav.gallery": "Galerie",
    "nav.drums": "Batterie",
    "nav.coding": "Programmation",
    "nav.contact": "Contact",
    "language.label": "Langue",
    "language.english": "Anglais",
    "language.arabic": "Arabe",
    "language.french": "Français",
    "theme.label": "Thème",
    "theme.light": "Clair",
    "theme.dark": "Sombre",
    "theme.auto": "Auto",
    "hero.eyebrow": "Joueur d'échecs. Développeur. Batteur",
    "hero.lead":
      "Une histoire façonnée par la patience, des idées audacieuses et la concentration tranquille nécessaire pour calculer le prochain coup. Des lumières de la ville aux 64 cases, Henry apporte une énergie nouvelle à chaque partie.",
    "hero.cta_chess": "Voir l’aperçu d’échecs",
    "hero.cta_gallery": "Voir l’histoire photo",
    "hero.meta_federation": "Fédération : Liban",
    "hero.meta_rating": "Classement rapide : 1498",
    "hero.meta_ranking": "Classement mondial (rapide) : #1498",
    "hero.photo_alt":
      "Henry Raji souriant près de l’eau avec la skyline de la ville au crépuscule",
    "hero.caption":
      "Soirées en bord de mer. Concentration claire. Un instantané du monde de Henry.",
    "about.title": "À propos de Henry",
    "about.subtitle": "Présence calme, tactiques affûtées et amour du jeu.",
    "about.p1":
      "Né le 1 novembre 2011. Henry Raji est un joueur d'échecs connu pour une approche disciplinée et un esprit curieux. Son style mêle patience et élans de créativité, toujours à la recherche d’occasions de faire basculer le rythme.",
    "about.p2":
      "Au-delà de l’échiquier, il est aussi batteur, développant le rythme, le timing et la confiance sur scène grâce à des répétitions et des performances régulières.",
    "about.p3":
      "Ce site présente un aperçu d’échecs aux côtés d’une histoire visuelle. C’est un lieu pour célébrer la progression, la résilience et le chemin à venir.",
    "chess.title": "Aperçu d’échecs",
    "chess.subtitle": "Indicateurs publics et faits rapides.",
    "chess.stat_federation": "Fédération",
    "chess.stat_federation_value": "Liban",
    "chess.stat_rating": "Classement rapide",
    "chess.stat_rating_value": "1498",
    "chess.stat_ranking": "Classement mondial (rapide)",
    "chess.stat_ranking_value": "#1498",
    "chess.goals_title": "Objectifs",
    "chess.goal_1": "Atteindre 1800 Elo FIDE.",
    "chess.goal_2": "Participer à des tournois internationaux.",
    "chess.goal_3": "Développer la communauté d'échecs.",
    "chess.goal_4": "Gagner davantage de tournois homologués.",
    "chess.photo_alt": "Henry concentré pendant une partie d'échecs",
    "chess.caption": "Un moment calme sur l’échiquier pendant une partie.",
    "chess.note":
      "Dernière vérification : 31 janv. 2026. Les classements évoluent avec le temps.",
    "chess.link_chesscom": "Profil Chess.com",
    "chess.link_chesstv": "Profil ChessTV",
    "chess.details":
      "Henry joue aux échecs depuis 4 ans, développant la réflexion stratégique, la patience et les compétences de résolution de problèmes. De plus, il participe activement à des tournois homologués, travaillant dur pour augmenter son classement officiel FIDE.",
    "gallery.title": "Histoire photo",
    "gallery.subtitle": "Un horizon calme et un compétiteur concentré.",
    "gallery.focus_title": "Concentration",
    "gallery.focus_body": "Chaque partie est un puzzle. Chaque position est une conversation.",
    "gallery.curiosity_title": "Curiosité",
    "gallery.curiosity_body": "Explorer les idées sur l’échiquier avec un état d’esprit audacieux.",
    "gallery.momentum_title": "Élan",
    "gallery.momentum_body": "Construire la pression coup après coup jusqu’au bon moment.",
    "drums.title": "Compétences de batterie",
    "drums.subtitle": "Rythme, concentration et énergie de performance en direct.",
    "drums.photo1_alt":
      "Henry jouant sur une batterie électronique lors du concert annuel de la Sabis School Adma au Liban",
    "drums.photo1_caption":
      "Concert annuel à la Sabis School Adma, Liban — performance de batterie électronique.",
    "drums.photo2_alt":
      "Henry jouant sur une batterie électronique lors du concert annuel de la Sabis School Adma au Liban",
    "drums.photo2_caption":
      "Même concert annuel à la Sabis School Adma, Liban — autre batterie électronique.",
    "drums.details":
      "De plus, Henry est un batteur assidu avec 7 ans d’expérience. Il possède une grande expérience des répétitions et des performances en direct et a collaboré avec le groupe de son école, montrant l’esprit d’équipe et l’adaptabilité musicale.",
    "coding.title": "Programmation",
    "coding.subtitle": "Pensée logique, design épuré et projets concrets.",
    "coding.exp_title": "Expérience",
    "coding.exp_body":
      "Henry a plusieurs années d’expérience en programmation, construisant des sites web et des applications avec un fort accent sur la résolution de problèmes, la pensée logique et le design épuré.",
    "coding.project_title": "Projet phare",
    "coding.project_body":
      "L’un des grands projets d’Henry est le chatbot qu’il a créé pour son école, conçu pour répondre à toutes les questions sur SABIS Adma.",
    "contact.title": "Contact",
    "contact.subtitle": "Suivez le parcours d’Henry aux échecs et les prochaines mises à jour.",
    "contact.cta_chesscom": "Suivre sur Chess.com",
    "contact.cta_lichess": "Suivre sur lichess.org",
    "contact.cta_chesstv": "Voir ChessTV",
    "contact.email_label": "E-mail :",
    "contact.instagram_label": "Instagram :",
    "contact.tiktok_label": "TikTok :",
    "contact.copy": "Copier",
    "contact.copy_email_aria": "Copier l’adresse e-mail",
    "contact.copy_instagram_aria": "Copier le nom d’utilisateur Instagram",
    "contact.copy_tiktok_aria": "Copier le nom d’utilisateur TikTok",
    "footer.text": "Conçu pour mettre en valeur le parcours d’Henry Raji aux échecs et son histoire visuelle.",
  },
};

const getTranslation = (language, key) => {
  if (!key) {
    return "";
  }

  return translations[language]?.[key] ?? translations.en?.[key] ?? "";
};

const applyLanguage = (value) => {
  const language = translations[value] ? value : "en";
  currentLanguage = language;
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  localStorage.setItem("language", language);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const text = getTranslation(language, key);
    if (!text) {
      return;
    }
    element.textContent = text;
    if (element.classList.contains("copy-btn")) {
      element.dataset.originalLabel = text;
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    const text = getTranslation(language, key);
    if (!text) {
      return;
    }
    element.setAttribute("aria-label", text);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    const text = getTranslation(language, key);
    if (!text) {
      return;
    }
    element.setAttribute("alt", text);
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.languageValue === language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
};

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.languageValue);
  });
});

applyLanguage(storedLanguage);

const progressBar = document.querySelector(".scroll-progress__bar");
let progressTicking = false;

const updateScrollProgress = () => {
  if (!progressBar) {
    return;
  }

  const scrollTop = window.scrollY;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? scrollTop / scrollRange : 0;

  progressBar.style.transform = `scaleX(${progress})`;
  progressTicking = false;
};

const requestProgressUpdate = () => {
  if (progressTicking) {
    return;
  }

  progressTicking = true;
  window.requestAnimationFrame(updateScrollProgress);
};

window.addEventListener("scroll", requestProgressUpdate, { passive: true });
window.addEventListener("resize", requestProgressUpdate);
requestProgressUpdate();

const copyButtons = document.querySelectorAll(".copy-btn");

const fallbackCopyText = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const succeeded = document.execCommand("copy");
  document.body.removeChild(textarea);
  return succeeded;
};

const flashCopiedState = (button) => {
  const originalLabel = button.dataset.originalLabel || button.textContent;
  button.dataset.originalLabel = originalLabel;
  button.textContent = getTranslation(currentLanguage, "ui.copied") || "Copied";
  button.classList.add("is-copied");

  window.setTimeout(() => {
    button.textContent = originalLabel;
    button.classList.remove("is-copied");
  }, 1200);
};

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const textToCopy = button.dataset.copy;
    if (!textToCopy) {
      return;
    }

    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        copied = true;
      } catch (error) {
        copied = false;
      }
    }

    if (!copied) {
      copied = fallbackCopyText(textToCopy);
    }

    if (copied) {
      flashCopiedState(button);
    }
  });
});
