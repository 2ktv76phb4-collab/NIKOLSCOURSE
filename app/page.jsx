'use client';

import { useState, useEffect } from 'react';

// Content data from your design
const CONTENT = {
  links: {
    whatsapp: '',
    instagram: '',
    registration: '',
  },

  nav: [
    { label: 'התהליך', href: '#transform' },
    { label: 'עליי', href: '#about' },
    { label: 'למי מיועד', href: '#audience' },
    { label: 'תוכנית הלימודים', href: '#curriculum' },
    { label: 'בונוסים', href: '#bonuses' },
    { label: 'פרטים', href: '#structure' },
    { label: 'שאלות', href: '#faq' },
  ],

  hero: {
    eyebrow: `קורס לק ג'ל ומבנה אנטומי`,
    title: `קורס מתחילות`,
    subtitle: `קורס למתחילות מ-0 בלי ידע קודם או ניסיון, למי שמבינה שלמידת הבסיס הוא הכי חשוב.`,
    ctaPrimary: { label: `לתוכנית הקורס`, href: '#curriculum' },
    ctaSecondary: { label: `לקבלת כל הפרטים`, href: '#cta' },
  },

  philosophy: `לא רק ללמוד לעשות ציפורניים —<br>אלא לבנות מקצוע שאת גאה בו.`,

  about: {
    eyebrow: `עליי`,
    title: `נעים להכיר, אני ניקול`,
    text: `הי אני ניקול, בת 22 מתל אביב. את הדרך שלי התחלתי כבר בגיל 12, מתוך סקרנות ואהבה אמיתית לעולם הציפורניים. במשך 5 שנים לימדתי את עצמי את עולם הציפורניים דרך תרגול, ניסיון וטעייה, חקר בלתי פוסק והמון שעות עבודה, ובגיל 17 כבר התחלתי לבנות את העסק שלי שהחזיק אותי כלכלית וקיבלתי לקוחות באופן מקצועי.<br/><br/>כמעט עשור בתוך התחום לימד אותי שמקצועיות לא נמדדת רק בתוצאה יפה — אלא בהבנה של מה שאנחנו עושות, למה אנחנו עושות אותו, וביכולת להתאים את העבודה לציפורן וללקוחה שנמצאת מולנו. גם היום אני ממשיכה ללמוד, להשתלם ולהעמיק, כי מבחינתי אשת מקצוע טובה אף פעם לא מפסיקה ללמוד.<br/><br/>וזו גם גישת ההוראה שלי: אני לא רוצה ללמד אותך רק איך לבצע. חשוב לי שתביני למה, ומה עומד מאחורי כל דבר. שתצאי מהלימודים עם יסודות חזקים, חשיבה מקצועית, ביטחון בקבלת החלטות ויכולת לעבוד באופן עצמאי גם כשאני כבר לא עומדת לידך.<br/><br/>המטרה שלי היא לא ליצור עוד מישהי שיודעת לעשות ציפורניים, אלא לעזור לך לבנות מקצוע שאת באמת גאה בו. ויכול ללוות אותך לאורך החיים 🤍`,
  },

  values: {
    eyebrow: `הפילוסופיה המקצועית שלי`,
    title: `לא לחקות תנועות — להבין מקצוע`,
    lede: `התלמידות שלי לא לומדות לחקות תנועות באופן מכני. הן לומדות להבין מה הן עושות, ולמה.`,
    items: [
      `בסיס לפני הכל`,
      `להבין, לא לשנן`,
      `מקצועיות ללא קיצורי דרך`,
      `דיוק, שליטה והבנה מקצועית`,
    ],
  },

  audience: {
    eyebrow: `למי מיועד הקורס`,
    title: `למי מיועד הקורס?`,
    items: [
      `למי שמגיעה ללא ניסיון קודם`,
      `למי שחולמת להיכנס לעולם הציפורניים ולהפוך אותו למקצוע`,
      `למי שחשוב לה ללמוד נכון מהבסיס`,
      `למי שלא רוצה להסתמך על סרטונים מפוזרים או ללמוד "כמו תוכי"`,
      `למי שרוצה להבין את המקצוע ולא רק לשנן שלבים`,
      `למי שרוצה בעתיד לעבוד עם לקוחות ולבנות עסק וקהל לקוחות משלה`,
    ],
  },

  transform: {
    eyebrow: `התהליך שלך`,
    title: `0 ידע ← בסיס של בעלת מקצוע`,
    start: {
      heading: `נקודת ההתחלה`,
      text: `את יכולה להגיע ללא שום ניסיון קודם - בלי לדעת איך לגשת לציפורן, איך לבחור את החומרים הנכונים, מהו תהליך העבודה הנכון, או איך כל חלקי המקצוע מתחברים יחד.`,
    },
    end: {
      heading: `לאן את מגיעה`,
      text: `בסיום הקורס יהיה לך בסיס מקצועי מוצק - הבנה של הציפורן והחומרים שאת עובדת איתם, תהליך עבודה ברור, מיומנות מעשית, והכלים להתחיל את הדרך המקצועית שלך.`,
    },
  },

  why: {
    eyebrow: `למה ללמוד דווקא איתי`,
    title: `למה ללמוד דווקא איתי?`,
    items: [
      { title: `למידה אישית 1:1`, text: `את לא אחת מתוך קבוצה גדולה. אני רואה את העבודה שלך, הטכניקה שלך וההתקדמות שלך באופן אישי.` },
      { title: `הבנה, לא חיקוי`, text: `המטרה שלי היא שתביני את המקצוע ותדעי למה את מבצעת כל שלב - לא רק להעתיק תנועות.` },
      { title: `סטנדרט מקצועי גבוה`, text: `הבסיס הוא הכל. אני רוצה שתבני הרגלים מקצועיים נכונים כבר מההתחלה.` },
      { title: `אני נשארת איתך`, text: `הליווי שלי לא נעלם כשנגמר המפגש האחרון.` },
    ],
  },

  structure: {
    eyebrow: `מבנה הקורס`,
    title: `מבנה הקורס`,
    format: `1:1 , קורס זוגי`,
    items: [
      { k: `מספר מפגשים`, v: `4 מפגשים במתכונת פרונטלית` },
      { k: `אורך מפגש`, v: `בין 5-6 שעות` },
      { k: `סה"כ שעות לימוד`, v: `24 שעות לימודיות פרונטלית` },
      { k: `יום קבוע`, v: `הקורס מתקיים בימי רביעי` },
      { k: `מסלול בוקר`, v: `09:00–15:00` },
      { k: `מסלול ערב`, v: `15:00–21:00` },
      { k: `עלות השתתפות`, v: `8,169 ש"ח` },
    ],
    location: {
      heading: `מיקום הקורס`,
      lines: [
        `הקורס מתקיים בסטודיו שלי.`,
        `כתובת: דב גרונר 20, תל אביב.`,
        `קיימת חנייה בחינם לאורך כל הרחוב.`,
      ],
    },
    payment: `את התשלום אפשר להסדיר בהעברה בנקאית או באשראי.`,
  },

  curriculum: {
    eyebrow: `תוכנית הלימודים`,
    title: `המסע שלך דרך הקורס`,
    lede: `ארבעה מפגשים מלאים, כל אחד בונה על הקודם. לחצי על מפגש כדי לראות את התוכן המלא שלו.`,
    meetings: [
      {
        num: '01',
        title: `מבוא לעולם הציפורניים והלק ג'ל, יסודות תאורטיים של התחום`,
        items: [
          `הכרות מקדימה עם הקורס, הצבת מטרות לתהליך, והסבר על תהליך הלמידה.`,
          `שיעור עיוני שיכין אותך בצורה מקיפה ומפורטת לכניסתך לתחום הציפורניים מכל היבט אפשרי.`,
          `התנסות מעשית ראשונית על טיפוס הסרה + מניקור אירופאי.`,
          `התנסות ראשונית מעשית על עצמך.`,
        ],
      },
      {
        num: '02',
        title: `מפגש מעשי: יסודות ההסרה, השיוף והמניקור`,
        items: [
          `התנסות ראשונית עם מכונת שיוף (הסבר על המכונות).`,
          `נלמד על סוגי חומרים (ראבר בייס קשיח / גמיש).`,
          `תרגול על טיפוס מריחת צבע (אחיזה נכונה של המכחול).`,
          `תרגול מעשי על מודליסטית - הסרת לק ג'ל, שיוף צורה, מניקור מכשירי.`,
        ],
      },
      {
        num: '03',
        title: `מפגש מעשי: יסודות המבנה האנטומי`,
        items: [
          `נלמד מהו תיקון מבנה אנטומי - מה היתרונות בשיטת העבודה הזו.`,
          `נלמד התאמה של ביסים לפי אורך וסוג הציפורן.`,
          `תרגול על מודליסטית (שקד ארוך) - תיקון מבנה אנטומי.`,
          `בונוס - נלמד צילום עבודות קטלוג לאינסטגרם.`,
        ],
      },
      {
        num: '04',
        title: `מפגש מעשי: השלמות ותיקונים`,
        items: [
          `נלמד לבצע השלמת ציפורן שבורה בשיטת הטיפוסים ההפוכים.`,
          `נלמד לבצע תיקונים והשלמת חוסרים של ציפורן.`,
          `עבודת גמר על מודליסטית הכוללת כל מה שלמדנו בקורס.`,
          `צילום עבודת קטלוג.`,
          `חלוקת תעודה וסיום.`,
        ],
      },
    ],
  },

  receive: {
    eyebrow: `מה תקבלי`,
    title: `כל מה שכלול בקורס`,
    items: [
      `4 מפגשים פרונטליים מלאים - סה"כ 24 שעות לימוד`,
      `למידה בפורמט 1:1 או זוגי`,
      `ליווי אישי צמוד לאורך כל הקורס`,
      `תעודת סיום בתום המפגש הרביעי`,
      `5 בונוסים מקצועיים`,
      `ליווי מתמשך גם אחרי סיום הקורס`,
    ],
  },

  bonuses: {
    eyebrow: `מעבר לארבעת המפגשים`,
    title: `בונוסים`,
    items: [
      {
        title: `צילום מקצועי של עבודות קטלוג`,
        intro: `בקורס הזה את לא רק לומדת לעבוד מקצועי - את גם לומדת להציג את עצמך ברשתות החברתיות כמו מקצוענית אמיתית.`,
        items: [
          `הדרכה על צילום מקצועי של עבודות.`,
          `למידה של זוויות מדויקות, הנחת ידיים נכונה, שימוש בתאורה נכונה.`,
          `שלוש עבודות קטלוגיות מוכנות + סרטון תהליך.`,
          `ידע איך לצלם תמונות וסרטונים מקצועיים שמושכים לקוחות.`,
        ],
      },
      {
        title: `שיווק ופרסום`,
        intro: `במסגרת הבונוס הזה תקבלי ליווי אישי ממני על:`,
        items: [
          `מעבר מאינסטגרם פרטי לעמוד עסקי.`,
          `הקמת ואטסאפ עסקי - שימוש חכם בפיצ'רים לניהול לקוחות.`,
        ],
      },
      {
        title: `הצעה לתהליך עבודה שלי מול לקוחה - בלייב!`,
        intro: `הזדמנות ייחודית לצפות בי בזמן אמת בקליניקה שלי. תראי אותי מקבלת לקוחה אמיתית, מההתחלה ועד הסיום.`,
        items: [],
      },
      {
        title: `שיחת זום עם הרואה חשבון שלי`,
        intro: `בהרשמה לקורס את מקבלת שיחת זום עם הרואה חשבון שלי.`,
        items: [
          `למה חשוב להיעזר ברואה חשבון.`,
          `איך להקים עסק עצמאי נכון.`,
          `כלים פרקטיים לניהול העסק.`,
        ],
      },
      {
        title: `אפליקציה לניהול תורים`,
        intro: `בהרשמה לקורס את מקבלת חצי שנה של מנוי פרימיום באפליקציה לניהול תורים - ללא עלות!`,
        items: [],
      },
    ],
  },

  workbook: {
    eyebrow: `משאב מקצועי`,
    title: `החוברת המקצועית שלי`,
    text: `חוברת לימוד מעוצבת שנשארת איתך גם אחרי הקורס, ותומכת במה שאת לומדת לאורך הדרך.`,
  },

  support: {
    eyebrow: `אחרי הקורס`,
    headline: `הקורס נגמר. הליווי שלי לא.`,
    text: `גם אחרי המפגש האחרון אני נשארת זמינה עבורך - אפשר לפנות אליי בוואטסאפ, לשלוח תמונות של העבודות שלך, לשאול שאלות ולקבל ממני משוב מקצועי.`,
  },

  faq: {
    eyebrow: `שאלות נפוצות`,
    title: `כל מה שרציתן לשאול`,
    items: [
      { q: `האם אני צריכה ניסיון קודם?`, a: `לא. הקורס מיועד למתחילות מ-0, ללא כל ידע או ניסיון קודם.` },
      { q: `הקורס הוא קבוצתי או אישי?`, a: `הקורס מתקיים בליווי אישי - 1:1, או במתכונת זוגית.` },
      { q: `כמה מפגשים יש בקורס?`, a: `4 מפגשים פרונטליים, כל מפגש בין 5-6 שעות - סה"כ 24 שעות לימודיות.` },
      { q: `האם יש תאריכים קבועים לקורס?`, a: `הקורס מתקיים באופן קבוע בימי רביעי, במסלול בוקר (09:00–15:00) או ערב (15:00–21:00).` },
    ],
  },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMeeting, setExpandedMeeting] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submission:', formData);
    alert('תודה! בקרוב נחזור אליך');
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Header */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          background: 'rgba(255, 249, 239, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottomColor: headerScrolled ? 'var(--line)' : 'transparent',
          borderBottomWidth: '1px',
          padding: headerScrolled ? '0.7rem 6.4%' : '1.1rem 6.4%',
        }}
      >
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '1.5rem' }}>ניקול</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {CONTENT.nav.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href.replace('#', ''))}
                className="text-sm hover:text-opacity-70 transition"
                style={{ color: 'var(--navy)' }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl"
            style={{ color: 'var(--navy)' }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 pb-4">
            {CONTENT.nav.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href.replace('#', ''))}
                className="text-right hover:text-opacity-70 transition py-2"
                style={{ color: 'var(--navy)' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="min-h-screen flex flex-col pt-24 px-[6.4%] relative overflow-hidden md:flex-row md:items-center md:gap-8"
        style={{ backgroundColor: 'var(--cream)' }}
      >
        {/* Background Image - Show on all devices */}
        <div
          className="absolute left-0 top-0 w-full md:w-2/5 md:h-full md:max-h-96 opacity-30 md:opacity-100 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/nicole-hero.jpg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center top',
            pointerEvents: 'none',
          }}
        />

        {/* Content - centered on mobile, right side on desktop */}
        <div className="flex-1 flex flex-col gap-9 relative z-10 md:ml-auto md:max-w-xl">
          <div className="text-center">
            <span className="eyebrow">{CONTENT.hero.eyebrow}</span>
            <h1 className="text-5xl md:text-6xl font-serif mt-4" style={{ color: 'var(--navy)' }}>
              {CONTENT.hero.title}
            </h1>
            <p className="mt-4" style={{ color: 'var(--navy-soft)' }}>
              {CONTENT.hero.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={() => scrollToSection(CONTENT.hero.ctaPrimary.href.replace('#', ''))}
              className="px-7 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--navy)', color: 'var(--cream)' }}
            >
              {CONTENT.hero.ctaPrimary.label}
            </button>
            <button
              onClick={() => scrollToSection(CONTENT.hero.ctaSecondary.href.replace('#', ''))}
              className="px-7 py-3 text-sm font-medium border transition-colors hover:border-opacity-100"
              style={{ borderColor: 'var(--line)', color: 'var(--navy)' }}
            >
              {CONTENT.hero.ctaSecondary.label}
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Band */}
      <section
        className="py-20 text-center px-[6.4%]"
        style={{ backgroundColor: 'var(--navy)', color: 'var(--cream)' }}
      >
        <p
          className="text-2xl md:text-4xl font-serif max-w-sm mx-auto leading-relaxed"
          dangerouslySetInnerHTML={{ __html: CONTENT.philosophy }}
        />
      </section>

      {/* About */}
      <section
        id="about"
        className="py-24 px-[6.4%]"
        style={{ backgroundColor: 'var(--white)' }}
      >
        <div className="max-w-3xl">
          <span className="eyebrow">{CONTENT.about.eyebrow}</span>
          <h2 className="title">{CONTENT.about.title}</h2>
          <p
            className="lede"
            style={{ color: 'var(--navy-soft)', lineHeight: '1.9', maxWidth: '100%' }}
            dangerouslySetInnerHTML={{ __html: CONTENT.about.text }}
          />
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-24 px-[6.4%]" style={{ backgroundColor: 'var(--skyblue)' }}>
        <span className="eyebrow">{CONTENT.values.eyebrow}</span>
        <h2 className="title">{CONTENT.values.title}</h2>
        <p className="lede">{CONTENT.values.lede}</p>

        <div className="mt-10 space-y-0">
          {CONTENT.values.items.map((item, i) => (
            <div
              key={i}
              className="py-4 px-4 border-t"
              style={{ borderTopColor: 'rgba(20, 44, 74, 0.16)' }}
            >
              <h3 className="font-serif text-lg" style={{ color: 'var(--navy)' }}>
                {item}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section id="audience" className="py-24 px-[6.4%]" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="eyebrow">{CONTENT.audience.eyebrow}</span>
        <h2 className="title">{CONTENT.audience.title}</h2>

        <div className="mt-10 space-y-0">
          {CONTENT.audience.items.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 py-3 border-t"
              style={{ borderTopColor: 'var(--line-soft)' }}
            >
              <span style={{ color: 'var(--navy)' }}>✓</span>
              <span style={{ color: 'var(--navy-soft)' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Transformation */}
      <section
        id="transform"
        className="py-24 px-[6.4%] text-center"
        style={{ backgroundColor: 'var(--navy)', color: 'var(--cream)' }}
      >
        <span className="eyebrow" style={{ color: 'var(--skyblue)' }}>
          {CONTENT.transform.eyebrow}
        </span>
        <h2 className="title" style={{ color: 'var(--cream)' }}>
          {CONTENT.transform.title}
        </h2>

        <div className="mt-16 flex flex-col md:flex-row gap-8 max-w-4xl mx-auto justify-center">
          <div className="flex-1">
            <h3 className="font-serif text-xl mb-4">{CONTENT.transform.start.heading}</h3>
            <p style={{ color: 'rgba(255, 249, 239, 0.75)' }}>{CONTENT.transform.start.text}</p>
          </div>

          <div className="w-1 hidden md:block" style={{ backgroundColor: 'var(--skyblue)' }}></div>

          <div className="flex-1">
            <h3 className="font-serif text-xl mb-4">{CONTENT.transform.end.heading}</h3>
            <p style={{ color: 'rgba(255, 249, 239, 0.75)' }}>{CONTENT.transform.end.text}</p>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why" className="py-24 px-[6.4%]" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="eyebrow">{CONTENT.why.eyebrow}</span>
        <h2 className="title">{CONTENT.why.title}</h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTENT.why.items.map((card, i) => (
            <div key={i} className="p-6 border" style={{ borderColor: 'var(--line)' }}>
              <h3 className="font-serif text-base mb-3" style={{ color: 'var(--navy)' }}>
                {card.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--navy-soft)' }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Structure */}
      <section id="structure" className="py-24 px-[6.4%]" style={{ backgroundColor: 'var(--skyblue)' }}>
        <span className="eyebrow">{CONTENT.structure.eyebrow}</span>
        <h2 className="title">{CONTENT.structure.title}</h2>

        <div className="mt-8 space-y-1">
          {CONTENT.structure.items.map((item, i) => (
            <div key={i} className="flex justify-between py-4 border-t" style={{ borderTopColor: 'rgba(20, 44, 74, 0.1)' }}>
              <span className="text-sm" style={{ color: 'var(--navy-soft)' }}>
                {item.k}
              </span>
              <span className="font-serif text-right">{item.v}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t" style={{ borderTopColor: 'rgba(20, 44, 74, 0.16)' }}>
          <h3 className="font-serif text-lg mb-3">{CONTENT.structure.location.heading}</h3>
          {CONTENT.structure.location.lines.map((line, i) => (
            <p key={i} className="text-sm" style={{ color: 'var(--navy-soft)' }}>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-24 px-[6.4%]" style={{ backgroundColor: 'var(--white)' }}>
        <span className="eyebrow">{CONTENT.curriculum.eyebrow}</span>
        <h2 className="title">{CONTENT.curriculum.title}</h2>
        <p className="lede">{CONTENT.curriculum.lede}</p>

        <div className="mt-8 space-y-0">
          {CONTENT.curriculum.meetings.map((meeting, i) => (
            <div key={i} className="border-t" style={{ borderTopColor: 'var(--line-soft)' }}>
              <button
                onClick={() => setExpandedMeeting(expandedMeeting === i ? null : i)}
                className="w-full flex items-center justify-between py-4 hover:opacity-75 transition text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif italic text-xl" style={{ color: 'var(--taupe)' }}>
                    {meeting.num}
                  </span>
                  <h3 className="font-serif text-lg">{meeting.title}</h3>
                </div>
                <span
                  style={{
                    color: 'var(--taupe)',
                    transform: expandedMeeting === i ? 'rotate(135deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  +
                </span>
              </button>

              {expandedMeeting === i && (
                <div className="pb-4 pl-20 space-y-2 max-h-96 overflow-hidden">
                  {meeting.items.map((item, j) => (
                    <div key={j} className="flex gap-3">
                      <span style={{ color: 'var(--taupe)' }}>—</span>
                      <p className="text-sm" style={{ color: 'var(--navy-soft)' }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Receive */}
      <section id="receive" className="py-24 px-[6.4%]" style={{ backgroundColor: 'var(--skyblue)' }}>
        <span className="eyebrow">{CONTENT.receive.eyebrow}</span>
        <h2 className="title">{CONTENT.receive.title}</h2>

        <div className="mt-8 space-y-0">
          {CONTENT.receive.items.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 py-3 border-t"
              style={{ borderTopColor: 'rgba(20, 44, 74, 0.14)' }}
            >
              <span style={{ color: 'var(--navy)' }}>✓</span>
              <span style={{ color: 'var(--navy)' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bonuses */}
      <section id="bonuses" className="py-24 px-[6.4%]" style={{ backgroundColor: 'var(--white)' }}>
        <span className="eyebrow">{CONTENT.bonuses.eyebrow}</span>
        <h2 className="title">{CONTENT.bonuses.title}</h2>

        <div className="mt-10 grid grid-cols-1 gap-6">
          {CONTENT.bonuses.items.map((bonus, i) => (
            <div key={i} className="border p-6" style={{ borderColor: 'var(--line)' }}>
              <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: 'var(--taupe)' }}></div>
              <h3 className="font-serif text-lg mb-3" style={{ color: 'var(--navy)' }}>
                {bonus.title}
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--navy-soft)' }}>
                {bonus.intro}
              </p>
              {bonus.items.length > 0 && (
                <ul className="space-y-2">
                  {bonus.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm" style={{ color: 'var(--navy-soft)' }}>
                      <span style={{ color: 'var(--taupe)' }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Workbook */}
      <section id="workbook" className="py-24 px-[6.4%]" style={{ backgroundColor: 'var(--navy)', color: 'var(--cream)' }}>
        <span className="eyebrow" style={{ color: 'var(--skyblue)' }}>
          {CONTENT.workbook.eyebrow}
        </span>
        <h2 className="title" style={{ color: 'var(--cream)' }}>
          {CONTENT.workbook.title}
        </h2>
        <p className="mt-4" style={{ color: 'rgba(255, 249, 239, 0.75)' }}>
          {CONTENT.workbook.text}
        </p>
      </section>

      {/* Support */}
      <section id="support" className="py-24 px-[6.4%] text-center" style={{ backgroundColor: 'var(--skyblue)' }}>
        <span className="eyebrow">{CONTENT.support.eyebrow}</span>
        <h2 className="font-serif text-2xl md:text-4xl mt-3" style={{ color: 'var(--navy)' }}>
          {CONTENT.support.headline}
        </h2>
        <p className="lede mt-6 mx-auto" style={{ color: 'var(--navy-soft)' }}>
          {CONTENT.support.text}
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-[6.4%]" style={{ backgroundColor: 'var(--white)' }}>
        <span className="eyebrow">{CONTENT.faq.eyebrow}</span>
        <h2 className="title">{CONTENT.faq.title}</h2>

        <div className="mt-8 space-y-0">
          {CONTENT.faq.items.map((item, i) => (
            <div key={i} className="border-t" style={{ borderTopColor: 'var(--line-soft)' }}>
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                className="w-full flex items-center justify-between py-3 hover:opacity-75 transition text-left"
              >
                <span className="text-sm font-medium">{item.q}</span>
                <span
                  style={{
                    color: 'var(--taupe)',
                    transform: expandedFAQ === i ? 'rotate(135deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  +
                </span>
              </button>

              {expandedFAQ === i && (
                <div className="pb-4">
                  <p className="text-sm" style={{ color: 'var(--navy-soft)' }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 px-[6.4%] text-center" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="eyebrow">{CONTENT.hero.eyebrow}</span>
        <h2 className="title mt-3">הרשמה לקורס</h2>

        <form onSubmit={handleFormSubmit} className="mt-10 max-w-md mx-auto space-y-4">
          <input
            type="text"
            name="name"
            placeholder="שם מלא"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border"
            style={{ borderColor: 'var(--line)' }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="דוא״ל"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border"
            style={{ borderColor: 'var(--line)' }}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="טלפון"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border"
            style={{ borderColor: 'var(--line)' }}
            required
          />
          <button
            type="submit"
            className="w-full py-3 text-white font-medium transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--navy)' }}
          >
            שלח
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-8 px-[6.4%] border-t" style={{ backgroundColor: 'var(--white)', borderTopColor: 'var(--line)' }}>
        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div className="flex-1">
            <span style={{ fontSize: '1.5rem' }}>ניקול</span>
          </div>
          <div className="flex gap-6 text-sm" style={{ color: 'var(--navy-soft)' }}>
            <a href="#" className="hover:opacity-70 transition">
              בעמודים החברתיים
            </a>
            <a href="#" className="hover:opacity-70 transition">
              צור קשר
            </a>
          </div>
        </div>
        <p className="text-xs" style={{ color: 'rgba(20, 44, 74, 0.4)' }}>
          © 2026 ניקול - קורס ציפורניים מקצועי
        </p>
      </footer>
    </div>
  );
}
