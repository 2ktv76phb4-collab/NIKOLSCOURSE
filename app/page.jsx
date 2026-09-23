'use client';

import { useState, useEffect } from 'react';

const CONTENT = {
  he: {
    links: { whatsapp: '', instagram: '', registration: '' },
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
      items: [`בסיס לפני הכל`, `להבין, לא לשנן`, `מקצועיות ללא קיצורי דרך`, `דיוק, שליטה והבנה מקצועית`],
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
      start: { heading: `נקודת ההתחלה`, text: `את יכולה להגיע ללא שום ניסיון קודם - בלי לדעת איך לגשת לציפורן, איך לבחור את החומרים הנכונים, מהו תהליך העבודה הנכון, או איך כל חלקי המקצוע מתחברים יחד.` },
      end: { heading: `לאן את מגיעה`, text: `בסיום הקורס יהיה לך בסיס מקצועי מוצק - הבנה של הציפורן והחומרים שאת עובדת איתם, תהליך עבודה ברור, מיומנות מעשית, והכלים להתחיל את הדרך המקצועית שלך.` },
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
        lines: [`הקורס מתקיים בסטודיו שלי.`, `כתובת: דב גרונר 20, תל אביב.`, `קיימת חנייה בחינם לאורך כל הרחוב.`],
      },
      payment: `את התשלום אפשר להסדיר בהעברה בנקאית או באשראי.`,
    },
    curriculum: {
      eyebrow: `תוכנית הלימודים`,
      title: `המסע שלך דרך הקורס`,
      lede: `ארבעה מפגשים מלאים, כל אחד בונה על הקודם. לחצי על מפגש כדי לראות את התוכן המלא שלו.`,
      meetings: [
        { num: '01', title: `מבוא לעולם הציפורניים והלק ג'ל, יסודות תאורטיים של התחום`, items: [`הכרות מקדימה עם הקורס, הצבת מטרות לתהליך, והסבר על תהליך הלמידה.`, `שיעור עיוני שיכין אותך בצורה מקיפה ומפורטת לכניסתך לתחום הציפורניים מכל היבט אפשרי.`, `התנסות מעשית ראשונית על טיפוס הסרה + מניקור אירופאי.`, `התנסות ראשונית מעשית על עצמך.`] },
        { num: '02', title: `מפגש מעשי: יסודות ההסרה, השיוף והמניקור`, items: [`התנסות ראשונית עם מכונת שיוף (הסבר על המכונות).`, `נלמד על סוגי חומרים (ראבר בייס קשיח / גמיש).`, `תרגול על טיפוס מריחת צבע (אחיזה נכונה של המכחול).`, `תרגול מעשי על מודליסטית - הסרת לק ג'ל, שיוף צורה, מניקור מכשירי.`] },
        { num: '03', title: `מפגש מעשי: יסודות המבנה האנטומי`, items: [`נלמד מהו תיקון מבנה אנטומי - מה היתרונות בשיטת העבודה הזו.`, `נלמד התאמה של ביסים לפי אורך וסוג הציפורן.`, `תרגול על מודליסטית (שקד ארוך) - תיקון מבנה אנטומי.`, `בונוס - נלמד צילום עבודות קטלוג לאינסטגרם.`] },
        { num: '04', title: `מפגש מעשי: השלמות ותיקונים`, items: [`נלמד לבצע השלמת ציפורן שבורה בשיטת הטיפוסים ההפוכים.`, `נלמד לבצע תיקונים והשלמת חוסרים של ציפורן.`, `עבודת גמר על מודליסטית הכוללת כל מה שלמדנו בקורס.`, `צילום עבודת קטלוג.`, `חלוקת תעודה וסיום.`] },
      ],
    },
    receive: {
      eyebrow: `מה תקבלי`,
      title: `כל מה שכלול בקורס`,
      items: [`4 מפגשים פרונטליים מלאים - סה"כ 24 שעות לימוד`, `למידה בפורמט 1:1 או זוגי`, `ליווי אישי צמוד לאורך כל הקורס`, `תעודת סיום בתום המפגש הרביעי`, `5 בונוסים מקצועיים`, `ליווי מתמשך גם אחרי סיום הקורס`],
    },
    bonuses: {
      eyebrow: `מעבר לארבעת המפגשים`,
      title: `בונוסים`,
      items: [
        { title: `צילום מקצועי של עבודות קטלוג`, intro: `בקורס הזה את לא רק לומדת לעבוד מקצועי - את גם לומדת להציג את עצמך ברשתות החברתיות כמו מקצוענית אמיתית.`, items: [`הדרכה על צילום מקצועי של עבודות.`, `למידה של זוויות מדויקות, הנחת ידיים נכונה, שימוש בתאורה נכונה.`, `שלוש עבודות קטלוגיות מוכנות + סרטון תהליך.`, `ידע איך לצלם תמונות וסרטונים מקצועיים שמושכים לקוחות.`] },
        { title: `שיווק ופרסום`, intro: `במסגרת הבונוס הזה תקבלי ליווי אישי ממני על:`, items: [`מעבר מאינסטגרם פרטי לעמוד עסקי.`, `הקמת ואטסאפ עסקי - שימוש חכם בפיצ'רים לניהול לקוחות.`] },
        { title: `הצעה לתהליך עבודה שלי מול לקוחה - בלייב!`, intro: `הזדמנות ייחודית לצפות בי בזמן אמת בקליניקה שלי. תראי אותי מקבלת לקוחה אמיתית, מההתחלה ועד הסיום.`, items: [] },
        { title: `שיחת זום עם הרואה חשבון שלי`, intro: `בהרשמה לקורס את מקבלת שיחת זום עם הרואה חשבון שלי.`, items: [`למה חשוב להיעזר ברואה חשבון.`, `איך להקים עסק עצמאי נכון.`, `כלים פרקטיים לניהול העסק.`] },
        { title: `אפליקציה לניהול תורים`, intro: `בהרשמה לקורס את מקבלת חצי שנה של מנוי פרימיום באפליקציה לניהול תורים - ללא עלות!`, items: [] },
      ],
    },
    workbook: { eyebrow: `משאב מקצועי`, title: `החוברת המקצועית שלי`, text: `חוברת לימוד מעוצבת שנשארת איתך גם אחרי הקורס, ותומכת במה שאת לומדת לאורך הדרך.` },
    support: { eyebrow: `אחרי הקורס`, headline: `הקורס נגמר. הליווי שלי לא.`, text: `גם אחרי המפגש האחרון אני נשארת זמינה עבורך - אפשר לפנות אליי בוואטסאפ, לשלוח תמונות של העבודות שלך, לשאול שאלות ולקבל ממני משוב מקצועי.` },
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
  },
  en: {
    links: { whatsapp: '', instagram: '', registration: '' },
    nav: [
      { label: 'The Process', href: '#transform' },
      { label: 'About Me', href: '#about' },
      { label: 'Who It\'s For', href: '#audience' },
      { label: 'Curriculum', href: '#curriculum' },
      { label: 'Bonuses', href: '#bonuses' },
      { label: 'Details', href: '#structure' },
      { label: 'FAQ', href: '#faq' },
    ],
    hero: {
      eyebrow: `Professional Gel Manicure & Nail Structure Course`,
      title: `Beginner's Mastery Course`,
      subtitle: `A comprehensive course for beginners with zero prior experience. Perfect for those who understand that a strong foundation is the most important thing.`,
      ctaPrimary: { label: `See Curriculum`, href: '#curriculum' },
      ctaSecondary: { label: `Get All Details`, href: '#cta' },
    },
    philosophy: `Not just learning to do nails —<br>but building a profession you're proud of.`,
    about: {
      eyebrow: `About Me`,
      title: `Nice to Meet You, I'm Nikol`,
      text: `Hi, I'm Nikol, 22 years old from Tel Aviv. I started my journey at age 12 out of genuine curiosity and passion for the world of nail artistry. Over 5 years, I taught myself through practice, trial and error, and countless hours of work. By age 17, I had already built my own business and was working with clients professionally.<br/><br/>Nearly a decade in this field has taught me that professionalism isn't measured just by beautiful results — it's about understanding what you're doing, why you're doing it, and how to adapt your work to each nail and client. Even today, I continue learning and evolving, because in my view, a true professional never stops growing.<br/><br/>This philosophy guides my teaching too: I don't just want to teach you the motions. I want you to understand the profession and the reason behind every step. I want you to leave with a strong foundation, professional thinking, confident decision-making, and the ability to work independently even when I'm not there.<br/><br/>My goal isn't to create another person who can do nails — it's to help you build a profession you're truly proud of, one that will serve you throughout your life 🤍`,
    },
    values: {
      eyebrow: `My Professional Philosophy`,
      title: `Not Mimicking Movements — Understanding Craft`,
      lede: `My students don't learn to mindlessly copy motions. They learn to understand what they're doing and why.`,
      items: [`Foundation Above All`, `Understanding, Not Memorizing`, `Professionalism Without Shortcuts`, `Precision, Control & Professional Mastery`],
    },
    audience: {
      eyebrow: `Who This Course Is For`,
      title: `Who Is This Course For?`,
      items: [
        `For those starting with zero experience`,
        `For those dreaming of turning nail artistry into a real profession`,
        `For those who value learning correctly from the ground up`,
        `For those who won't rely on scattered videos or learn by rote`,
        `For those who want to understand the craft, not just memorize steps`,
        `For those who want to build a professional business and clientele in the future`,
      ],
    },
    transform: {
      eyebrow: `Your Journey`,
      title: `Zero Knowledge → Professional Foundation`,
      start: { heading: `Starting Point`, text: `You can arrive with absolutely no experience — not knowing how to approach nails, which materials to choose, what the correct work process is, or how all the elements fit together.` },
      end: { heading: `Where You'll Be`, text: `By course completion, you'll have a solid professional foundation — understanding nails and materials, a clear work process, practical skill, and the tools to start your professional journey with confidence.` },
    },
    why: {
      eyebrow: `Why Study With Me`,
      title: `Why Learn With Me?`,
      items: [
        { title: `1:1 Personal Learning`, text: `You're not one of many. I see your work, technique, and progress individually.` },
        { title: `Understanding, Not Imitation`, text: `My goal is for you to understand the profession and know why you're taking each step — not just copy movements.` },
        { title: `High Professional Standards`, text: `Foundation is everything. I want you to build correct professional habits from the start.` },
        { title: `I'm Here For You`, text: `My support doesn't disappear when the last session ends.` },
      ],
    },
    structure: {
      eyebrow: `Course Structure`,
      title: `Course Structure`,
      format: `1:1 or Couples Format`,
      items: [
        { k: `Number of Sessions`, v: `4 in-person sessions` },
        { k: `Session Length`, v: `5-6 hours each` },
        { k: `Total Study Hours`, v: `24 hours of in-person instruction` },
        { k: `Regular Day`, v: `Course meets on Wednesdays` },
        { k: `Morning Track`, v: `09:00–15:00` },
        { k: `Evening Track`, v: `15:00–21:00` },
        { k: `Course Fee`, v: `8,169 ILS` },
      ],
      location: {
        heading: `Course Location`,
        lines: [`The course takes place in my studio.`, `Address: Dov Gruner 20, Tel Aviv.`, `Free parking available along the street.`],
      },
      payment: `Payment can be arranged via bank transfer or credit card.`,
    },
    curriculum: {
      eyebrow: `Curriculum`,
      title: `Your Journey Through the Course`,
      lede: `Four full sessions, each building on the previous one. Click on a session to see the complete content.`,
      meetings: [
        { num: '01', title: `Introduction to Nail Artistry & Gel Polish, Theoretical Foundations`, items: [`Course overview, setting goals, and explaining the learning process.`, `Comprehensive theoretical instruction preparing you thoroughly for entering the nail industry from every angle.`, `Initial hands-on experience with removal technique + European manicure.`, `First practical experience on yourself.`] },
        { num: '02', title: `Practical Session: Removal Basics, Filing & Manicure`, items: [`Initial experience with filing machine (explanation of tools).`, `Learning about material types (hard/soft rubber base).`, `Practice applying color (correct brush technique).`, `Practical work on mannequins - gel removal, shaping, machine manicure.`] },
        { num: '03', title: `Practical Session: Anatomical Structure Fundamentals`, items: [`Learning about anatomical structure correction and its benefits.`, `Learning to match tips by nail length and type.`, `Practice on mannequins (almond shape) - anatomical structure correction.`, `Bonus - learning professional photography for Instagram.`] },
        { num: '04', title: `Practical Session: Completion & Repairs`, items: [`Learning to complete broken nails using the reverse tip method.`, `Learning repairs and completing missing nail portions.`, `Final project on mannequins incorporating everything learned.`, `Professional photography for your portfolio.`, `Certificate distribution and course completion.`] },
      ],
    },
    receive: {
      eyebrow: `What You'll Get`,
      title: `Everything Included in the Course`,
      items: [`4 full in-person sessions — 24 total hours of instruction`, `Learning in 1:1 or couples format`, `Close personal guidance throughout the course`, `Completion certificate at the end of session four`, `5 professional bonuses`, `Continued support even after course completion`],
    },
    bonuses: {
      eyebrow: `Beyond the Four Sessions`,
      title: `Bonuses`,
      items: [
        { title: `Professional Portfolio Photography`, intro: `In this course, you don't just learn to work professionally — you also learn to present yourself on social media like the true professional you are.`, items: [`Guidance on professional photography of your work.`, `Learning precise angles, proper hand positioning, correct lighting.`, `Three ready-made portfolio pieces + process video.`, `Knowledge of how to create professional images and videos that attract clients.`] },
        { title: `Marketing & Promotion`, intro: `As part of this bonus, you'll receive personal guidance from me on:`, items: [`Transitioning from private Instagram to a business page.`, `Setting up a business WhatsApp — smart use of features for client management.`] },
        { title: `Live Look at My Client Work Process`, intro: `A unique opportunity to watch me work in real-time at my clinic. See me with an actual client from start to finish.`, items: [] },
        { title: `Zoom Call With My Accountant`, intro: `Upon course enrollment, you get a Zoom call with my accountant.`, items: [`Why working with an accountant matters.`, `How to properly establish an independent business.`, `Practical tools for business management.`] },
        { title: `Appointment Management App`, intro: `Upon course enrollment, you receive six months of premium subscription to an appointment management app — free!`, items: [] },
      ],
    },
    workbook: { eyebrow: `Professional Resource`, title: `My Professional Workbook`, text: `A beautifully designed study workbook that stays with you after the course, supporting your learning every step of the way.` },
    support: { eyebrow: `After the Course`, headline: `The Course Ends. My Support Doesn't.`, text: `Even after the last session, I'm available for you — reach out on WhatsApp, send pictures of your work, ask questions, and receive my professional feedback.` },
    faq: {
      eyebrow: `Frequently Asked Questions`,
      title: `Everything You Want to Know`,
      items: [
        { q: `Do I need prior experience?`, a: `No. This course is designed for complete beginners with zero prior knowledge or experience.` },
        { q: `Is this a group or individual course?`, a: `The course is taught individually — 1:1 or in pairs.` },
        { q: `How many sessions are in the course?`, a: `4 in-person sessions, each 5-6 hours — 24 total hours of instruction.` },
        { q: `Are there fixed dates for the course?`, a: `The course meets regularly on Wednesdays in the morning (09:00–15:00) or evening (15:00–21:00) track.` },
      ],
    },
  },
  ru: {
    links: { whatsapp: '', instagram: '', registration: '' },
    nav: [
      { label: 'Процесс', href: '#transform' },
      { label: 'Обо мне', href: '#about' },
      { label: 'Для кого курс', href: '#audience' },
      { label: 'Учебная программа', href: '#curriculum' },
      { label: 'Бонусы', href: '#bonuses' },
      { label: 'Детали', href: '#structure' },
      { label: 'FAQ', href: '#faq' },
    ],
    hero: {
      eyebrow: `Профессиональный курс гель-лака и структуры ногтя`,
      title: `Курс для новичков`,
      subtitle: `Комплексный курс для начинающих с нулевым опытом. Идеально подходит для тех, кто понимает, что крепкий фундамент — это самое главное.`,
      ctaPrimary: { label: `Смотреть программу`, href: '#curriculum' },
      ctaSecondary: { label: `Все детали`, href: '#cta' },
    },
    philosophy: `Не просто научиться делать ногти —<br>а построить профессию, которой вы будете гордиться.`,
    about: {
      eyebrow: `Обо мне`,
      title: `Приятно познакомиться, я Никол`,
      text: `Привет, я Никол, 22 года, из Тель-Авива. Свой путь я начала в возрасте 12 лет из подлинного любопытства и страсти к миру nail-арта. За 5 лет я самостоятельно овладела мастерством через практику, ошибки и бесчисленные часы работы. К 17 годам я уже построила свой бизнес и работала с клиентами профессионально.<br/><br/>Почти десять лет в этой сфере научили меня, что профессионализм измеряется не только красивым результатом — это понимание того, что вы делаете, почему вы это делаете и как адаптировать работу к каждому ногтю и клиенту. И сегодня я продолжаю учиться и развиваться, потому что, по моему мнению, настоящий профессионал никогда не прекращает обучаться.<br/><br/>Эта философия определяет и мой подход к преподаванию: я не просто хочу научить вас движениям. Я хочу, чтобы вы поняли профессию и причину каждого шага. Я хочу, чтобы вы ушли с сильным фундаментом, профессиональным мышлением, уверенностью в принятии решений и способностью работать независимо.<br/><br/>Моя цель — не создать еще одного человека, который может делать ногти, а помочь вам построить профессию, которой вы действительно будете гордиться, профессию, которая будет служить вам всю жизнь 🤍`,
    },
    values: {
      eyebrow: `Моя профессиональная философия`,
      title: `Не подражание движениям — понимание мастерства`,
      lede: `Мои ученицы не учатся механически копировать движения. Они учатся понимать, что они делают и почему.`,
      items: [`Фундамент прежде всего`, `Понимание, а не заучивание`, `Профессионализм без shortcuts`, `Точность, контроль и мастерство`],
    },
    audience: {
      eyebrow: `Для кого этот курс`,
      title: `Для кого этот курс?`,
      items: [
        `Для тех, кто начинает с нулевым опытом`,
        `Для тех, кто мечтает превратить nail-арт в настоящую профессию`,
        `Для тех, кому важно учиться правильно с основ`,
        `Для тех, кто не хочет полагаться на разрозненные видео`,
        `Для тех, кто хочет понять мастерство, а не просто запомнить шаги`,
        `Для тех, кто хочет в будущем работать с клиентами и построить собственный бизнес`,
      ],
    },
    transform: {
      eyebrow: `Ваш путь`,
      title: `Ноль знаний → Профессиональный фундамент`,
      start: { heading: `Точка отправления`, text: `Вы можете прийти с нулевым опытом — не зная, как подойти к ногтю, какие материалы выбрать, что такое правильный процесс работы и как все части мастерства соединяются вместе.` },
      end: { heading: `Где вы будете`, text: `По окончании курса у вас будет прочный профессиональный фундамент — понимание ногтя и материалов, четкий рабочий процесс, практические навыки и инструменты для начала вашего профессионального пути.` },
    },
    why: {
      eyebrow: `Почему учиться у меня`,
      title: `Почему учиться у меня?`,
      items: [
        { title: `Персональное обучение 1:1`, text: `Вы не один из многих. Я вижу вашу работу, технику и прогресс индивидуально.` },
        { title: `Понимание, а не подражание`, text: `Моя цель — чтобы вы понимали мастерство и знали, почему вы делаете каждый шаг.` },
        { title: `Высокие профессиональные стандарты`, text: `Фундамент — это всё. Я хочу, чтобы вы с самого начала вырабатывали правильные профессиональные привычки.` },
        { title: `Я рядом с вами`, text: `Моя поддержка не исчезает после последнего занятия.` },
      ],
    },
    structure: {
      eyebrow: `Структура курса`,
      title: `Структура курса`,
      format: `Формат 1:1 или для пары`,
      items: [
        { k: `Количество сессий`, v: `4 очных сеанса` },
        { k: `Длительность сеанса`, v: `5-6 часов каждый` },
        { k: `Общее количество часов`, v: `24 часа очного обучения` },
        { k: `Постоянный день`, v: `Курс проводится по средам` },
        { k: `Утренняя программа`, v: `09:00–15:00` },
        { k: `Вечерняя программа`, v: `15:00–21:00` },
        { k: `Стоимость курса`, v: `8,169 ILS` },
      ],
      location: {
        heading: `Местоположение курса`,
        lines: [`Курс проводится в моей студии.`, `Адрес: Дов Грунер 20, Тель-Авив.`, `Бесплатная парковка доступна вдоль улицы.`],
      },
      payment: `Оплату можно произвести банковским переводом или кредитной картой.`,
    },
    curriculum: {
      eyebrow: `Учебная программа`,
      title: `Ваш путь через курс`,
      lede: `Четыре полных сеанса, каждый строится на предыдущем. Нажмите на сеанс, чтобы увидеть полное содержание.`,
      meetings: [
        { num: '01', title: `Введение в nail-арт и гель-лак, теоретические основы`, items: [`Обзор курса, постановка целей и объяснение процесса обучения.`, `Комплексное теоретическое обучение, подготавливающее вас к вхождению в индустрию.`, `Первый практический опыт с техникой снятия + европейский маникюр.`, `Первый практический опыт на себе.`] },
        { num: '02', title: `Практический сеанс: основы снятия, спила и маникюра`, items: [`Первый опыт работы с фрезер-машинкой (объяснение инструментов).`, `Изучение типов материалов (твердая/мягкая база).`, `Практика нанесения цвета (правильная техника кисти).`, `Практическая работа на типсах — снятие гель-лака, формирование, аппаратный маникюр.`] },
        { num: '03', title: `Практический сеанс: основы анатомической структуры`, items: [`Изучение коррекции анатомической структуры и её преимуществ.`, `Подбор типсов по длине и типу ногтя.`, `Практика на типсах (миндалевидная форма) — коррекция структуры.`, `Бонус — изучение профессиональной фотографии для Instagram.`] },
        { num: '04', title: `Практический сеанс: завершение и ремонт`, items: [`Изучение удлинения сломанного ногтя обратным методом.`, `Изучение ремонта и восполнения недостающих участков.`, `Финальный проект со всеми полученными навыками.`, `Профессиональная фотография вашего портфолио.`, `Выдача сертификата и завершение курса.`] },
      ],
    },
    receive: {
      eyebrow: `Что вы получите`,
      title: `Всё включено в курс`,
      items: [`4 полных очных сеанса — всего 24 часа обучения`, `Обучение в формате 1:1 или для пары`, `Индивидуальное сопровождение на протяжении всего курса`, `Сертификат об окончании после четвёртого сеанса`, `5 профессиональных бонусов`, `Продолжающаяся поддержка даже после завершения курса`],
    },
    bonuses: {
      eyebrow: `Помимо четырех сеансов`,
      title: `Бонусы`,
      items: [
        { title: `Профессиональная фотография портфолио`, intro: `В этом курсе вы не только учитесь работать профессионально — вы также учитесь представлять себя в социальных сетях как настоящий профессионал.`, items: [`Рекомендации по профессиональной фотографии вашей работы.`, `Изучение правильных углов, позиционирования рук, правильного освещения.`, `Три готовых портфолио-работы + видео процесса.`, `Умение создавать профессиональные фотографии и видео, привлекающие клиентов.`] },
        { title: `Маркетинг и продвижение`, intro: `В рамках этого бонуса вы получите от меня персональное руководство по:`, items: [`Переходу с личного Instagram на бизнес-страницу.`, `Настройке бизнес-WhatsApp — умное использование функций для управления клиентами.`] },
        { title: `Живой процесс работы с клиентом`, intro: `Уникальная возможность посмотреть, как я работаю в реальном времени в моей клинике. Увидеть меня с настоящим клиентом от начала до конца.`, items: [] },
        { title: `Звонок Zoom с моим бухгалтером`, intro: `При регистрации на курс вы получаете звонок Zoom с моим бухгалтером.`, items: [`Почему важно работать с бухгалтером.`, `Как правильно зарегистрировать независимый бизнес.`, `Практические инструменты управления бизнесом.`] },
        { title: `Приложение для управления записями`, intro: `При регистрации на курс вы получаете шесть месяцев премиум-подписки на приложение для управления записями — бесплатно!`, items: [] },
      ],
    },
    workbook: { eyebrow: `Профессиональный ресурс`, title: `Мой профессиональный учебник`, text: `Красиво оформленный учебник, который остаётся с вами даже после курса и поддерживает вас на каждом этапе обучения.` },
    support: { eyebrow: `После курса`, headline: `Курс заканчивается. Моя поддержка — нет.`, text: `Даже после последнего сеанса я доступна для вас — напишите мне в WhatsApp, пришлите фотографии вашей работы, задавайте вопросы и получайте мою профессиональную обратную связь.` },
    faq: {
      eyebrow: `Часто задаваемые вопросы`,
      title: `Всё что вы хотели узнать`,
      items: [
        { q: `Нужен ли мне опыт?`, a: `Нет. Этот курс предназначен для полных новичков с нулевым опытом и знаниями.` },
        { q: `Это групповой или индивидуальный курс?`, a: `Курс преподаётся индивидуально — 1:1 или в паре.` },
        { q: `Сколько сеансов в курсе?`, a: `4 очных сеанса по 5-6 часов каждый — всего 24 часа обучения.` },
        { q: `Есть ли фиксированные даты?`, a: `Курс проводится регулярно по средам в утренней (09:00–15:00) или вечерней (15:00–21:00) программе.` },
      ],
    },
  },
};

export default function Home() {
  const [language, setLanguage] = useState('he');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [openedMeetingModal, setOpenedMeetingModal] = useState(null);

  const content = CONTENT[language];
  const isHebrew = language === 'he';
  const dir = language === 'ru' ? 'ltr' : (isHebrew ? 'rtl' : 'ltr');

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved && ['he', 'en', 'ru'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

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
    const messages = { he: 'תודה! בקרוב נחזור אליך', en: 'Thank you! We\'ll be in touch soon', ru: 'Спасибо! Мы свяжемся с вами в ближайшее время' };
    alert(messages[language]);
    setFormData({ name: '', email: '', phone: '' });
  };

  const toggleLanguage = () => {
    const langs = ['he', 'en', 'ru'];
    const current = langs.indexOf(language);
    setLanguage(langs[(current + 1) % langs.length]);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--cream)', direction: dir }}>
      {/* Header */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          background: 'rgba(255, 249, 239, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottomColor: headerScrolled ? 'var(--line)' : 'transparent',
          borderBottomWidth: '1px',
          padding: headerScrolled ? '0.7rem 6.4%' : '1.1rem 6.4%',
          direction: dir,
        }}
      >
        <nav className="flex items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/nikol-logo.png"
              alt="Nikol Logo"
              style={{
                height: 'clamp(40px, 6vw, 65px)',
                width: 'auto',
                objectFit: 'contain',
                maxWidth: 'none'
              }}
            />
            <span
              style={{
                fontSize: 'clamp(14px, 2.8vw, 18px)',
                color: 'var(--navy)',
                fontFamily: "'Frank Ruhl Libre', serif",
                fontWeight: 500,
                lineHeight: 1.1,
                whiteSpace: 'nowrap'
              }}
            >
              {language === 'ru' ? 'Nikol' : language === 'en' ? 'Nikol' : 'ניקול'}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {content.nav.map((item) => (
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

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded text-sm font-medium transition hover:opacity-75"
              style={{
                color: 'var(--navy)',
                border: '1px solid var(--line)',
                backgroundColor: 'transparent'
              }}
              title={language === 'he' ? 'Switch language' : 'Switch language'}
            >
              {language === 'he' ? 'EN/РУ' : language === 'en' ? 'עברית/РУ' : 'עברית/EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-2xl"
              style={{ color: 'var(--navy)' }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 pb-4" style={{ textAlign: isHebrew ? 'right' : 'left' }}>
            {content.nav.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href.replace('#', ''))}
                className="hover:text-opacity-70 transition py-2"
                style={{ color: 'var(--navy)', textAlign: isHebrew ? 'right' : 'left' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-[6.4%]" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="eyebrow">{content.hero.eyebrow}</span>
        <h1 className="title mt-4" style={{ color: 'var(--navy)' }}>
          {content.hero.title}
        </h1>
        <p className="lede mt-6">{content.hero.subtitle}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollToSection('curriculum')}
            className="px-8 py-3 rounded transition hover:opacity-75"
            style={{
              backgroundColor: 'var(--navy)',
              color: 'var(--cream)',
              fontWeight: 500
            }}
          >
            {content.hero.ctaPrimary.label}
          </button>
          <button
            onClick={() => scrollToSection('cta')}
            className="px-8 py-3 rounded border transition hover:opacity-75"
            style={{
              borderColor: 'var(--navy)',
              color: 'var(--navy)',
              fontWeight: 500
            }}
          >
            {content.hero.ctaSecondary.label}
          </button>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-12 md:py-24 px-[6.4%] text-center" style={{ backgroundColor: 'var(--skyblue)' }}>
        <h2 className="title" style={{ color: 'var(--navy)' }} dangerouslySetInnerHTML={{ __html: content.philosophy }} />
      </section>

      {/* About */}
      <section id="about" className="py-12 md:py-24 px-[6.4%] relative" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="eyebrow">{content.about.eyebrow}</span>
        <h2 className="title mt-3">{content.about.title}</h2>
        <div className="mt-8 max-w-3xl" dangerouslySetInnerHTML={{ __html: content.about.text }} style={{ color: 'var(--navy-soft)', lineHeight: 1.8 }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/nikol-silhouette-blurred.png)',
            backgroundPosition: isHebrew ? 'right' : 'left',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'clamp(200px, 40vw, 500px)',
            opacity: 0.48,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      </section>

      {/* Values */}
      <section className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--white)' }}>
        <span className="eyebrow">{content.values.eyebrow}</span>
        <h2 className="title mt-3">{content.values.title}</h2>
        <p className="lede">{content.values.lede}</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.values.items.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border flex items-start gap-4"
              style={{
                borderColor: 'var(--line)',
                backgroundColor: 'var(--white)'
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium"
                style={{
                  backgroundColor: 'var(--navy)',
                  color: 'var(--cream)'
                }}
              >
                {i + 1}
              </div>
              <span style={{ color: 'var(--navy)' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section id="audience" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--skyblue)' }}>
        <span className="eyebrow">{content.audience.eyebrow}</span>
        <h2 className="title mt-3">{content.audience.title}</h2>
        <div className="mt-8 space-y-3">
          {content.audience.items.map((item, i) => (
            <div key={i} className="flex gap-3">
              <span style={{ color: 'var(--navy)', flexShrink: 0 }}>✓</span>
              <span style={{ color: 'var(--navy)' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Transform */}
      <section id="transform" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="eyebrow">{content.transform.eyebrow}</span>
        <h2 className="title mt-3">{content.transform.title}</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
          <div>
            <h3 className="font-serif text-lg mb-3" style={{ color: 'var(--navy)' }}>
              {content.transform.start.heading}
            </h3>
            <p style={{ color: 'var(--navy-soft)' }}>{content.transform.start.text}</p>
          </div>
          <div className="relative flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ color: 'var(--navy)' }}>
              <path d="M 5 20 L 35 20" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M 30 15 L 35 20 L 30 25" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="md:col-start-2">
            <h3 className="font-serif text-lg mb-3" style={{ color: 'var(--navy)' }}>
              {content.transform.end.heading}
            </h3>
            <p style={{ color: 'var(--navy-soft)' }}>{content.transform.end.text}</p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--white)' }}>
        <span className="eyebrow">{content.why.eyebrow}</span>
        <h2 className="title mt-3">{content.why.title}</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.why.items.map((item, i) => (
            <div key={i}>
              <h3 className="font-serif text-lg mb-3" style={{ color: 'var(--navy)' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--navy-soft)' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--white)' }}>
        <span className="eyebrow">{content.curriculum.eyebrow}</span>
        <h2 className="title mt-3">{content.curriculum.title}</h2>
        <p className="lede">{content.curriculum.lede}</p>

        <div className="mt-8 space-y-0">
          {content.curriculum.meetings.map((meeting, i) => (
            <div key={i} className="border-t" style={{ borderTopColor: 'var(--line-soft)' }}>
              <button
                onClick={() => setOpenedMeetingModal(i)}
                className="w-full flex items-center justify-between py-4 hover:opacity-75 transition"
                style={{ textAlign: isHebrew ? 'right' : 'left' }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif italic text-xl" style={{ color: 'var(--taupe)' }}>
                    {meeting.num}
                  </span>
                  <h3 className="font-serif text-lg">{meeting.title}</h3>
                </div>
                <span style={{ color: 'var(--taupe)', flexShrink: 0 }}>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {openedMeetingModal !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setOpenedMeetingModal(null)}
          style={{ direction: dir }}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: 'var(--cream)' }}
          >
            <div className="p-6 border-b" style={{ borderBottomColor: 'var(--line)' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <span className="font-serif italic text-3xl" style={{ color: 'var(--taupe)' }}>
                    {content.curriculum.meetings[openedMeetingModal].num}
                  </span>
                  <h2 className="font-serif text-xl" style={{ color: 'var(--navy)' }}>
                    {content.curriculum.meetings[openedMeetingModal].title}
                  </h2>
                </div>
                <button
                  onClick={() => setOpenedMeetingModal(null)}
                  className="text-2xl flex-shrink-0"
                  style={{ color: 'var(--navy)' }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-3">
              {content.curriculum.meetings[openedMeetingModal].items.map((item, j) => (
                <div key={j} className="flex gap-3">
                  <span style={{ color: 'var(--taupe)', flexShrink: 0 }}>—</span>
                  <p style={{ color: 'var(--navy-soft)' }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Receive */}
      <section id="receive" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--skyblue)' }}>
        <span className="eyebrow">{content.receive.eyebrow}</span>
        <h2 className="title mt-3">{content.receive.title}</h2>

        <div className="mt-8 space-y-0">
          {content.receive.items.map((item, i) => (
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
        <span className="eyebrow">{content.bonuses.eyebrow}</span>
        <h2 className="title mt-3">{content.bonuses.title}</h2>

        <div className="mt-10 grid grid-cols-1 gap-6">
          {content.bonuses.items.map((bonus, i) => (
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
      <section id="workbook" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--navy)', color: 'var(--cream)' }}>
        <span className="eyebrow" style={{ color: 'var(--skyblue)' }}>
          {content.workbook.eyebrow}
        </span>
        <h2 className="title mt-3" style={{ color: 'var(--cream)' }}>
          {content.workbook.title}
        </h2>
        <p className="mt-4" style={{ color: 'rgba(255, 249, 239, 0.75)' }}>
          {content.workbook.text}
        </p>
      </section>

      {/* Support */}
      <section id="support" className="py-12 md:py-24 px-[6.4%] text-center" style={{ backgroundColor: 'var(--skyblue)' }}>
        <span className="eyebrow">{content.support.eyebrow}</span>
        <h2 className="font-serif text-2xl md:text-4xl mt-3" style={{ color: 'var(--navy)' }}>
          {content.support.headline}
        </h2>
        <p className="lede mt-6 mx-auto" style={{ color: 'var(--navy-soft)' }}>
          {content.support.text}
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--white)' }}>
        <span className="eyebrow">{content.faq.eyebrow}</span>
        <h2 className="title mt-3">{content.faq.title}</h2>

        <div className="mt-8 space-y-0">
          {content.faq.items.map((item, i) => (
            <div key={i} className="border-t" style={{ borderTopColor: 'var(--line-soft)' }}>
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                className="w-full flex items-center justify-between py-3 hover:opacity-75 transition"
                style={{ textAlign: isHebrew ? 'right' : 'left' }}
              >
                <span className="text-sm font-medium">{item.q}</span>
                <span
                  style={{
                    color: 'var(--taupe)',
                    transform: expandedFAQ === i ? 'rotate(135deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0
                  }}
                >
                  +
                </span>
              </button>

              {expandedFAQ === i && (
                <div className="pb-4" style={{ paddingRight: isHebrew ? '1.25rem' : 0, paddingLeft: isHebrew ? 0 : '1.25rem' }}>
                  <p className="text-sm" style={{ color: 'var(--navy-soft)' }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Structure */}
      <section id="structure" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="eyebrow">{content.structure.eyebrow}</span>
        <h2 className="title mt-3">{content.structure.title}</h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm mb-6" style={{ color: 'var(--navy-soft)' }}>
              {content.structure.format}
            </p>
            <div className="space-y-4">
              {content.structure.items.map((item, i) => (
                <div key={i}>
                  <p className="text-sm font-medium" style={{ color: 'var(--taupe)' }}>
                    {item.k}
                  </p>
                  <p style={{ color: 'var(--navy-soft)' }}>{item.v}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-serif text-lg mb-4" style={{ color: 'var(--navy)' }}>
              {content.structure.location.heading}
            </h3>
            <div className="space-y-2">
              {content.structure.location.lines.map((line, i) => (
                <p key={i} style={{ color: 'var(--navy-soft)' }}>
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-4 text-sm" style={{ color: 'var(--navy-soft)' }}>
              {content.structure.payment}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-12 md:py-24 px-[6.4%]" style={{ backgroundColor: 'var(--skyblue)' }}>
        <div className="max-w-md">
          <span className="eyebrow">{language === 'he' ? 'צור קשר' : language === 'en' ? 'Get in Touch' : 'Свяжитесь со мной'}</span>
          <h2 className="title mt-3">{language === 'he' ? 'מוכנה להתחיל?' : language === 'en' ? 'Ready to Begin?' : 'Готовы начать?'}</h2>
          <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder={language === 'he' ? 'שמך' : language === 'en' ? 'Your Name' : 'Ваше имя'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded border"
              style={{ borderColor: 'var(--line)', backgroundColor: 'var(--cream)' }}
            />
            <input
              type="email"
              placeholder={language === 'he' ? 'אימייל' : language === 'en' ? 'Email' : 'Email'}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded border"
              style={{ borderColor: 'var(--line)', backgroundColor: 'var(--cream)' }}
            />
            <input
              type="tel"
              placeholder={language === 'he' ? 'פלאפון' : language === 'en' ? 'Phone' : 'Телефон'}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 rounded border"
              style={{ borderColor: 'var(--line)', backgroundColor: 'var(--cream)' }}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 rounded transition hover:opacity-75"
              style={{
                backgroundColor: 'var(--navy)',
                color: 'var(--cream)',
                fontWeight: 500
              }}
            >
              {language === 'he' ? 'שלח' : language === 'en' ? 'Send' : 'Отправить'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
