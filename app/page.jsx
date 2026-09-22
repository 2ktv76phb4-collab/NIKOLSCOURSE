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
    eyebrow: `Creating pearls of nail masters`,
    title: `קורס מתחילות`,
    subtitle: `קורס למתחילות מ-0 בלי ידע קודם או ניסיון, למי שמבינה שלמידת הבסיס הוא הכי חשוב.`,
    ctaPrimary: { label: `ספרי לי עוד על הקורס`, href: '#curriculum' },
    ctaSecondary: { label: `אני רוצה את זה!`, href: '#cta' },
  },

  philosophy: `בונות מקצוע שגאים בו.`,

  about: {
    eyebrow: `עליי`,
    title: `נעים להכיר, אני ניקול`,
    text: `הי אני ניקול, בת 22 מתל אביב. את הדרך שלי התחלתי כבר בגיל 12, מתוך סקרנות ואהבה אמיתית לעולם הציפורניים. במשך 5 שנים לימדתי את עצמי את עולם הציפורניים דרך תרגול, ניסיון וטעייה, חקר בלתי פוסק והמון שעות עבודה, ובגיל 17 כבר התחלתי לבנות את העסק שלי שהחזיק אותי כלכלית וקיבלתי לקוחות באופן מקצועי.<br/><br/>כמעט עשור בתוך התחום לימד אותי שמקצועיות לא נמדדת רק בתוצאה יפה — אלא בהבנה של מה שאנחנו עושות, למה אנחנו עושות אותו, וביכולת להתאים את העבודה לציפורן וללקוחה שנמצאת מולנו. גם היום אני ממשיכה ללמוד, להשתלם ולהעמיק, כי מבחינתי אשת מקצוע טובה אף פעם לא מפסיקה ללמוד.<br/><br/>וזו גם גישת ההוראה שלי: אני לא רוצה ללמד אותך רק איך לבצע. חשוב לי שתביני למה, ומה עומד מאחורי כל דבר. שתצאי מהלימודים עם יסודות חזקים, חשיבה מקצועית, ביטחון בקבלת החלטות ויכולת לעבוד באופן עצמאי גם כשאני כבר לא עומדת לידך.<br/><br/>המטרה שלי היא לא ליצור עוד מישהי שיודעת לעשות ציפורניים, אלא לעזור לך לבנות מקצוע שאת באמת גאה בו. ויכול ללוות אותך לאורך החיים 🤍`,
  },

  values: {
    eyebrow: `הפילוסופיה המקצועית שלי`,
    title: `בונות מקצוע שגאים בו`,
    lede: `לא רק לומדות לעשות ציפורניים`,
    items: [
      `בסיס לפני הכל`,
      `להבין, לא לשנן`,
      `מקצועיות ללא קיצורי דרך`,
      `דיוק, שליטה והבנה מקצועית`,
    ],
  },

  audience: {
    eyebrow: `למי מיועד הקורס?`,
    title: `אני מתאימה לקורס הזה?`,
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
    eyebrow: `התהליך שאת הולכת לעבור`,
    title: `0 ידע`,
    end_title: `בעלת מקצוע`,
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
    eyebrow: `אז מדוע איתי?`,
    title: `בהרשמה לתוכנית את מקבלת ממני`,
    items: [
      { title: `למידה אישית 1:1`, text: `את לא אחת מתוך קבוצה גדולה. אני רואה את העבודה שלך, הטכניקה שלך וההתקדמות שלך באופן אישי.` },
      { title: `הבנה, לא חיקוי`, text: `המטרה שלי היא שתביני את המקצוע ותדעי למה את מבצעת כל שלב - לא רק להעתיק תנועות.` },
      { title: `סטנדרט מקצועי גבוה`, text: `הבסיס הוא הכל. אני רוצה שתבני הרגלים מקצועיים נכונים כבר מההתחלה.` },
      { title: `אני נשארת איתך`, text: `הליווי שלי לא נעלם כשנגמר המפגש האחרון.` },
      { title: `ליווי אישי בקורס ולאחריו`, text: `אני כאן עבורך במהלך כל הדרך ולא מפסיקה בסיום.` },
    ],
  },

  structure: {
    eyebrow: `מבנה הקורס`,
    title: `איך זה הולך לעבוד?`,
    format: `1:1 , קורס זוגי`,
    items: [
      { k: `מספר מפגשים`, v: `4 מפגשים` },
      { k: `אורך כל מפגש`, v: `בין 5-6 שעות` },
      { k: `משך הקורס`, v: `חודש במתכונת של מפגש אחד לשבוע` },
    ],
    schedules: [
      { type: `מסלול בוקר`, time: `09:00–15:00` },
      { type: `מסלול ערב`, time: `15:00–21:00` },
    ],
  },

  curriculum: {
    eyebrow: `תוכנית הלימודים`,
    title: `המסע שלך למניקורסטית מקצועית בעלת מקצוע רווחי`,
    lede: `בלחיצה על מספר המפגש יפתח לך תוכן המפגש המלא.`,
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
    eyebrow: `מה את הולכת לקבל`,
    title: `כל מה שכלול בקורס`,
    items: [
      `4 מפגשים פרונטליים מלאים - סה"כ 24 שעות לימוד`,
      `למידה בפורמט 1:1 או זוגי`,
      `תעודת סיום קורס מקצועית`,
      `ליווי אישי שלי במהלך הקורס וכמובן לאחריו`,
      `5 בונוסים מקצועיים`,
      `חוברת מקצועית שתלווה אותך בתחילת דרכך ובצעדים הראשונים שלך בעולם הציפורניים`,
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
    text: `את מקבלת חוברת שהולכת לעבור לתנך המקצועי שלך בתחילת דרכך והולכת ללוות אותך בצעדים הראשונים שלך בעולם הציפורניים.`,
  },

  support: {
    eyebrow: `אחרי הקורס`,
    headline: `הקורס נגמר. הליווי שלי לא.`,
    text: `גם אחרי המפגש האחרון אני נשארת זמינה עבורך - אפשר לפנות אליי בוואטסאפ, לשלוח תמונות של העבודות שלך, לשאול שאלות ולקבל ממני משוב מקצועי.`,
  },

  faq: {
    eyebrow: `שאלות נפוצות`,
    title: `כל מה שרציתן לשאול`,
    intro: `ולמקרה שנשארו לך שאלות נוספות...`,
    items: [
      { q: `האם אני צריכה ניסיון קודם?`, a: `לא. הקורס מיועד למתחילות מ-0, ללא כל ידע או ניסיון קודם.` },
      { q: `הקורס הוא קבוצתי או אישי?`, a: `הקורס מתקיים בליווי אישי - 1:1, או במתכונת זוגית.` },
      { q: `האם מקבלים ערכה?`, a: `לא, אבל את מקבלת ממני רשימה מסודרת של כל הציוד המקצועי שאת תצטרכי לרכוש. למה אני לא עושה ערכה? כי אני מאמינה שערכות היום הן זולות ולא איכותיות ואני רוצה לכוון אותך לאיזה מכונות לקנות ומה חשוב לשים לב אליו כשקונים.` },
      { q: `מתי התלמידה צריכה לרכוש את הציוד?`, a: `בין השיעור הראשון לשני. לשיעור השני היא צריכה כבר להגיע עם כל הציוד כי חשוב לי מהשיעור השני המעשי ללמד אותה על המכשור שהיא הולכת לעבוד איתו עם לקוחות שהיד שלה תתרגל לזה, ולא למוצרים שלי.` },
      { q: `תוך כמה זמן אני יכולה להתחיל לקבל לקוחות?`, a: `מסיום הקורס את עוברת הכשרה מקיפה, שבאותו היום שאת מסיימת את הקורס את יכולה להתחיל לגבות תשלום על העבודות שלך.` },
    ],
  },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMeeting, setExpandedMeeting] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [expandedWhyCard, setExpandedWhyCard] = useState(null);
  const [expandedBonus, setExpandedBonus] = useState(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
          <div className="flex flex-col items-start gap-0">
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>ניקול</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--taupe)', letterSpacing: '0.05em' }}>Creating pearls of nail masters</span>
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
        className="py-12 md:py-24 px-[6.4%] flex flex-col items-center gap-6 md:gap-12"
        style={{ backgroundColor: 'var(--cream)' }}
      >
        {/* Content - centered */}
        <div className="flex flex-col gap-9 max-w-2xl text-center">
          <div>
            <span className="eyebrow">{CONTENT.hero.eyebrow}</span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif mt-4" style={{ color: 'var(--navy)' }}>
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
              onClick={() => {
                const message = encodeURIComponent('שלום ניקול! אני מעוניינת ללמוד בקורס של לק ג\'ל ומבנה אנטומי. אשמח לפרטים!');
                const phone = '972501234567';
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
              }}
              className="px-7 py-3 text-sm font-medium border transition-colors hover:border-opacity-100"
              style={{ borderColor: 'var(--line)', color: 'var(--navy)' }}
            >
              {CONTENT.hero.ctaSecondary.label}
            </button>
          </div>
        </div>

        {/* Image - below text, centered and adaptive */}
        <div
          className="w-full md:w-1/2 max-w-xs md:max-w-lg aspect-auto"
          style={{
            backgroundImage: 'url(/images/nicole-hero.jpg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '280px',
            ['@media (min-width: 768px)']: { minHeight: '500px' },
            borderRadius: '16px',
          }}
        />
      </section>

      {/* Philosophy Band */}
      <section
        className="py-12 md:py-20 text-center px-[6.4%]"
        style={{ backgroundColor: 'var(--cream)', color: 'var(--navy)' }}
      >
        <p
          className="text-2xl md:text-4xl font-serif max-w-sm mx-auto leading-relaxed reveal in"
          style={{ animationDelay: '0.2s' }}
          dangerouslySetInnerHTML={{ __html: CONTENT.philosophy }}
        />
      </section>

      {/* About */}
      <section
        id="about"
        className="py-12 md:py-24 px-[6.4%]"
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
      <section id="values" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--skyblue)' }}>
        <span className="eyebrow">{CONTENT.values.eyebrow}</span>
        <h2 className="title">{CONTENT.values.title}</h2>
        <p className="lede">{CONTENT.values.lede}</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONTENT.values.items.map((item, i) => (
            <div
              key={i}
              className="p-6 border-2 rounded-lg reveal in"
              style={{
                borderColor: 'rgba(20, 44, 74, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                animationDelay: `${0.1 * (i + 1)}s`
              }}
            >
              <h3 className="font-serif text-lg" style={{ color: 'var(--navy)' }}>
                {item}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section id="audience" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="eyebrow">{CONTENT.audience.eyebrow}</span>
        <h2 className="title">{CONTENT.audience.title}</h2>

        <div className="mt-10 space-y-3">
          {CONTENT.audience.items.map((item, i) => {
            const colors = ['var(--navy)', 'var(--taupe)', 'var(--skyblue)', 'var(--navy)', 'var(--taupe)', 'var(--skyblue)'];
            const bgColors = ['rgba(218, 232, 246, 0.5)', 'rgba(133, 100, 78, 0.1)', 'rgba(20, 44, 74, 0.05)', 'rgba(218, 232, 246, 0.5)', 'rgba(133, 100, 78, 0.1)', 'rgba(20, 44, 74, 0.05)'];
            return (
              <div
                key={i}
                className="flex gap-3 py-4 px-4 border-l-4 rounded reveal in"
                style={{
                  borderLeftColor: colors[i % colors.length],
                  backgroundColor: bgColors[i % bgColors.length],
                  animationDelay: `${0.1 * (i + 1)}s`
                }}
              >
                <span style={{ color: colors[i % colors.length], flexShrink: 0 }}>✓</span>
                <span style={{ color: 'var(--navy-soft)' }}>{item}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Transformation */}
      <section
        id="transform"
        className="py-12 md:py-24 px-[6.4%] text-center"
        style={{ backgroundColor: 'var(--navy)', color: 'var(--cream)' }}
      >
        <span className="eyebrow" style={{ color: 'var(--skyblue)' }}>
          {CONTENT.transform.eyebrow}
        </span>
        <h2 className="title" style={{ color: 'var(--cream)' }}>
          <span className="reveal in" style={{ display: 'inline-block', animationDelay: '0.2s' }}>
            {CONTENT.transform.title}
          </span>
          <span className="mx-3" style={{ color: 'var(--skyblue)' }}>↓</span>
          <span className="reveal in" style={{ display: 'inline-block', animationDelay: '0.4s' }}>
            {CONTENT.transform.end_title}
          </span>
        </h2>

        <div className="mt-16 flex flex-col md:flex-row gap-8 max-w-4xl mx-auto justify-center items-center">
          <div className="flex-1 reveal in" style={{ animationDelay: '0.3s' }}>
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-serif border-2" style={{ backgroundColor: 'transparent', borderColor: 'var(--skyblue)', color: 'var(--skyblue)' }}>
              0
            </div>
            <h3 className="font-serif text-xl mb-4">{CONTENT.transform.start.heading}</h3>
            <p style={{ color: 'rgba(255, 249, 239, 0.75)', fontSize: '0.9rem' }}>{CONTENT.transform.start.text}</p>
          </div>

          <div className="hidden md:flex flex-col items-center gap-2 md:gap-8">
            <svg width="60" height="120" viewBox="0 0 60 120" style={{ stroke: 'var(--skyblue)', fill: 'none', strokeWidth: '3' }}>
              <path d="M 30 0 Q 50 30, 40 60 Q 20 90, 30 120" strokeDasharray="200" strokeDashoffset="0" style={{ animation: 'flow 3s ease-in-out infinite' }} />
              <circle cx="30" cy="60" r="4" fill="var(--skyblue)" style={{ animation: 'moveDot 3s ease-in-out infinite' }} />
              <polygon points="30,125 26,115 34,115" fill="var(--skyblue)" />
            </svg>
            <style>{`
              @keyframes flow {
                0% { stroke-dashoffset: 200; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes moveDot {
                0% { cy: 10; }
                50% { cy: 60; }
                100% { cy: 120; }
              }
            `}</style>
          </div>

          <div className="flex-1 reveal in" style={{ animationDelay: '0.5s' }}>
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-serif border-2" style={{ backgroundColor: 'transparent', borderColor: 'var(--skyblue)', color: 'var(--skyblue)' }}>
              ✓
            </div>
            <h3 className="font-serif text-xl mb-4">{CONTENT.transform.end.heading}</h3>
            <p style={{ color: 'rgba(255, 249, 239, 0.75)', fontSize: '0.9rem' }}>{CONTENT.transform.end.text}</p>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="eyebrow">{CONTENT.why.eyebrow}</span>
        <h2 className="title">{CONTENT.why.title}</h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTENT.why.items.map((card, i) => (
            <button
              key={i}
              onClick={() => setExpandedWhyCard(expandedWhyCard === i ? null : i)}
              className="p-6 rounded-2xl text-left transition-all duration-300 reveal in hover:shadow-lg border-2 cursor-pointer"
              style={{
                borderColor: expandedWhyCard === i ? 'var(--navy)' : 'var(--line-soft)',
                backgroundColor: expandedWhyCard === i ? 'var(--skyblue)' : 'var(--white)',
                animationDelay: `${0.1 * (i + 1)}s`,
                minHeight: expandedWhyCard === i ? 'auto' : '100px',
              }}
            >
              <h3 className="font-serif text-lg mb-3" style={{ color: 'var(--navy)', textAlign: 'center' }}>
                {card.title}
              </h3>
              {expandedWhyCard === i && (
                <p className="text-sm mt-4 text-center" style={{ color: 'var(--navy-soft)' }}>
                  {card.text}
                </p>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Structure */}
      <section id="structure" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--skyblue)' }}>
        <span className="eyebrow">{CONTENT.structure.eyebrow}</span>
        <h2 className="title">{CONTENT.structure.title}</h2>

        <div className="mt-8 space-y-0">
          {CONTENT.structure.items.map((item, i) => (
            <div key={i} className="flex justify-between py-4 border-t" style={{ borderTopColor: 'rgba(20, 44, 74, 0.1)' }}>
              <span className="text-sm" style={{ color: 'var(--navy-soft)' }}>
                {item.k}
              </span>
              <span className="font-serif text-right">{item.v}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-serif text-lg mb-4" style={{ color: 'var(--navy)' }}>סוגי מסלולים</h3>
            {CONTENT.structure.schedules.map((schedule, i) => (
              <div key={i} className="py-3 px-4 rounded mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <p className="font-serif text-sm" style={{ color: 'var(--navy)' }}>{schedule.type}</p>
                <p className="text-xs" style={{ color: 'var(--navy-soft)' }}>{schedule.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--white)' }}>
        <span className="eyebrow">{CONTENT.curriculum.eyebrow}</span>
        <h2 className="title">{CONTENT.curriculum.title}</h2>
        <p className="lede">{CONTENT.curriculum.lede}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {CONTENT.curriculum.meetings.map((meeting, i) => (
            <button
              key={i}
              onClick={() => setExpandedMeeting(expandedMeeting === i ? null : i)}
              className="flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md"
              style={{
                backgroundColor: expandedMeeting === i ? 'var(--skyblue)' : 'transparent',
                borderColor: expandedMeeting === i ? 'var(--navy)' : 'var(--line-soft)',
              }}
            >
              <div
                className="w-20 h-20 rounded-full font-serif text-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: expandedMeeting === i ? 'var(--navy)' : 'var(--skyblue)',
                  color: expandedMeeting === i ? 'var(--cream)' : 'var(--navy)',
                }}
              >
                {meeting.num}
              </div>
              <p className="text-xs text-center font-medium" style={{ color: 'var(--navy)', lineHeight: '1.3' }}>
                {meeting.title}
              </p>
            </button>
          ))}
        </div>

        {expandedMeeting !== null && (
          <div className="mt-8 p-6 border reveal in" style={{ borderColor: 'var(--line)' }}>
            <h3 className="font-serif text-xl mb-4" style={{ color: 'var(--navy)' }}>
              {CONTENT.curriculum.meetings[expandedMeeting].title}
            </h3>
            <div className="space-y-3">
              {CONTENT.curriculum.meetings[expandedMeeting].items.map((item, j) => (
                <div key={j} className="flex gap-3">
                  <span style={{ color: 'var(--taupe)', flexShrink: 0 }}>—</span>
                  <p className="text-sm" style={{ color: 'var(--navy-soft)' }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Receive */}
      <section id="receive" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--skyblue)' }}>
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
      <section id="bonuses" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--white)' }}>
        <span className="eyebrow">{CONTENT.bonuses.eyebrow}</span>
        <h2 className="title">{CONTENT.bonuses.title}</h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTENT.bonuses.items.map((bonus, i) => (
            <button
              key={i}
              onClick={() => setExpandedBonus(expandedBonus === i ? null : i)}
              className="p-6 rounded-3xl border-2 transition-all duration-300 text-left reveal in hover:shadow-lg"
              style={{
                borderColor: expandedBonus === i ? 'var(--navy)' : 'var(--line)',
                backgroundColor: expandedBonus === i ? 'var(--skyblue)' : 'transparent',
                animationDelay: `${0.1 * (i + 1)}s`
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: 'var(--taupe)' }}></div>
                <h3 className="font-serif text-lg" style={{ color: 'var(--navy)' }}>
                  {bonus.title}
                </h3>
              </div>

              {expandedBonus === i && (
                <div className="mt-4">
                  <p className="text-sm mb-3" style={{ color: 'var(--navy-soft)' }}>
                    {bonus.intro}
                  </p>
                  {bonus.items.length > 0 && (
                    <ul className="space-y-2">
                      {bonus.items.map((item, j) => (
                        <li key={j} className="flex gap-3 text-sm" style={{ color: 'var(--navy-soft)' }}>
                          <span style={{ color: 'var(--taupe)', flexShrink: 0 }}>—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Workbook */}
      <section id="workbook" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--navy)', color: 'var(--cream)' }}>
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
      <section id="support" className="py-12 md:py-24 px-[6.4%] text-center relative overflow-hidden" style={{ backgroundColor: 'var(--skyblue)' }}>
        {/* Background image with opacity overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/nicole-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isMobile ? 0.15 : 0.35,
            zIndex: 0,
          }}
        />

        {/* Cream overlay for better readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 249, 239, 0.55)',
            zIndex: 1,
          }}
        />

        {/* Content with z-index */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span className="eyebrow">{CONTENT.support.eyebrow}</span>
          <h2
            className="font-serif text-2xl md:text-4xl mt-3 reveal in"
            style={{
              color: 'var(--navy)',
              animationDelay: '0.2s',
              animation: 'bounce 2s ease-in-out infinite'
            }}
          >
            {CONTENT.support.headline}
          </h2>
          <p className="lede mt-6 mx-auto reveal in" style={{ color: 'var(--navy-soft)', animationDelay: '0.3s' }}>
            {CONTENT.support.text}
          </p>
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--white)' }}>
        <span className="eyebrow">{CONTENT.faq.eyebrow}</span>
        <h2 className="title">{CONTENT.faq.title}</h2>
        <p className="lede mt-4">{CONTENT.faq.intro}</p>

        <div className="mt-8 space-y-0">
          {CONTENT.faq.items.map((item, i) => (
            <div key={i} className="border-t reveal in" style={{ borderTopColor: 'var(--line-soft)', animationDelay: `${0.05 * (i + 1)}s` }}>
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
                <div className="pb-4 reveal in">
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
      <section id="cta" className="py-12 md:py-24 px-[6.4%] text-center" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="eyebrow" style={{ color: 'var(--taupe)' }}>ההרשמה למחזור הקרוב</span>
        <h2 className="title mt-3">בינך לבין החלום הגדול מפריד צעד אחד קטן בלבד</h2>
        <p className="lede mt-6">להרשמה והצטרפות למחזור הקרוב, תשאירי פרטים:</p>

        <div className="mt-10 max-w-md mx-auto space-y-6">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="שם מלא"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border rounded"
              style={{ borderColor: 'var(--line)' }}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="דוא״ל"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border rounded"
              style={{ borderColor: 'var(--line)' }}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="טלפון"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border rounded"
              style={{ borderColor: 'var(--line)' }}
              required
            />
            <button
              type="submit"
              className="w-full py-3 text-white font-medium transition-transform hover:-translate-y-0.5 rounded"
              style={{ backgroundColor: 'var(--navy)' }}
            >
              שלח דרך דוא״ל
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--line)' }}></div>
            <span style={{ color: 'var(--navy-soft)', fontSize: '0.9rem' }}>או</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--line)' }}></div>
          </div>

          <button
            onClick={() => {
              const message = encodeURIComponent('היי ניקול, עברתי על כל הפרטים ואני מוכנה לעשות את הצעד הבא לרכישת הקורס, אשמח לפרטים הסופיים ממך');
              const phone = '972501234567';
              window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
            }}
            className="w-full py-3 text-white font-medium transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 rounded"
            style={{ backgroundColor: '#25D366' }}
          >
            <span>💬</span>
            <span>צור קשר דרך WhatsApp</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-[6.4%] border-t" style={{ backgroundColor: 'var(--white)', borderTopColor: 'var(--line)' }}>
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
