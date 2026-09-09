'use client';

import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission:', formData);
    alert('תודה! בקרוב נחזור אליך');
    setFormData({ name: '', email: '', phone: '' });
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqItems = [
    {
      question: 'האם נדרש ניסיון קודם?',
      answer: 'לא! הקורס שלי מעוצב למתחילות לחלוטין. נתחיל מהבסיס ונבנה את כל המיומנויות יחד.'
    },
    {
      question: 'כמה מפגשים יש בקורס?',
      answer: '[פרטים יתמלאו אחר כך]'
    },
    {
      question: 'מה הביטוח וההסכמים?',
      answer: '[פרטים יתמלאו אחר כך]'
    },
    {
      question: 'האם יש ליווי אחרי הקורס?',
      answer: 'כן! אחד מדברים המיוחדים בקורס שלי הוא שאני נשארת בקשר לתלמידות שלי גם אחרי הקורס לשאלות וייעוץ.'
    }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-light-blue">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Logo size="small" />

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('hero')} className="text-gray-700 hover:text-brand-navy transition">עמוד הבית</button>
            <button onClick={() => scrollToSection('story')} className="text-gray-700 hover:text-brand-navy transition">הסיפור שלי</button>
            <button onClick={() => scrollToSection('why')} className="text-gray-700 hover:text-brand-navy transition">למה הקורס</button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-700 hover:text-brand-navy transition">שאלות נפוצות</button>
          </div>

          <button
            onClick={() => scrollToSection('cta')}
            className="hidden md:block px-6 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-brown transition"
          >
            התחלה
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('hero')} className="text-right text-gray-700 hover:text-brand-navy">עמוד הבית</button>
              <button onClick={() => scrollToSection('story')} className="text-right text-gray-700 hover:text-brand-navy">הסיפור שלי</button>
              <button onClick={() => scrollToSection('why')} className="text-right text-gray-700 hover:text-brand-navy">למה הקורס</button>
              <button onClick={() => scrollToSection('faq')} className="text-right text-gray-700 hover:text-brand-navy">שאלות נפוצות</button>
              <button
                onClick={() => scrollToSection('cta')}
                className="w-full px-4 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-brown transition"
              >
                התחלה
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-cream to-brand-light-blue min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                מציפורניים לחלום, מחלום לעסק
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                התחלתי בגיל 12 מתוך עניין, עברתי את כל הדרך שלי לסטודיו משלי בתל אביב. היום אני כאן כדי ללמד אותך את כל מה שלמדתי - בצורה נכונה, מקצועית, עם ליווי שלא מסתיים בסוף הקורס.
              </p>
              <button
                onClick={() => scrollToSection('cta')}
                className="px-8 py-4 bg-brand-navy text-white text-lg font-semibold rounded-lg hover:bg-brand-brown transition transform hover:scale-105"
              >
                התחילי עכשיו
              </button>
            </div>

            <div className="relative bg-gradient-to-br from-brand-navy via-brand-light-blue to-brand-brown rounded-2xl h-96 flex items-center justify-center shadow-2xl overflow-hidden group">
              <img
                src="/images/nicole-hero.jpg"
                alt="ניקול איליבסקי - מייסדת NIKOLiL"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">הסיפור שלי</h2>

          <div className="bg-brand-cream rounded-xl border-2 border-brand-light-blue p-8 md:p-12">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                <strong className="text-brand-navy">בגיל 12</strong> התחלתי עם עניין קטן לציפורניים. לא היה זה בתוכנית, אבל משהו בקסום לי בעבודה הקטנה, המדויקת, היצירתית הזו.
              </p>

              <p>
                <strong className="text-brand-navy">בגיל 16</strong> פתחתי את העסק הראשון שלי. זה לא היה קל - טעויות, בעיות של לקוחות, קשיים טכניים. אבל כל טעות הייתה לי שיעור.
              </p>

              <p>
                <strong className="text-brand-navy">בגיל 18</strong> עברתי לתל אביב והקמתי את הסטודיו שלי. בנית יומן לקוחות מלא, שיטות עבודה שמעבודה, מכיר כמו לא מישהו אחר את הביטחון שצריך לקחת עם כל לקוח חדש.
              </p>

              <p>
                <strong className="text-brand-navy">היום</strong> אני מלמדת מה שלמדתי הקשה - במהירות, בצורה חכמה, ביעילות. לא רוצה שתלמידות שלי יעברו את כל השגיאות שעברתי.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why" className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">למה הקורס שלי</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-off-white rounded-xl p-8 shadow-sm hover:shadow-lg transition border border-brand-light-blue">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">בסיס מקצועי</h3>
              <p className="text-gray-700">
                לא רק טריקים חדשים - אני מלמדת אותך את הנכון. היסוד שמחזיק קורה לאורך זמן, לא רק חודשים.
              </p>
            </div>

            <div className="bg-brand-off-white rounded-xl p-8 shadow-sm hover:shadow-lg transition border border-brand-light-blue">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">ליווי נמשך</h3>
              <p className="text-gray-700">
                הקורס לא מסתיים כשמסתיים. אני נשארת כאן לשאלות, טיפים, חסמים שנתקלת בהם בדרך.
              </p>
            </div>

            <div className="bg-brand-off-white rounded-xl p-8 shadow-sm hover:shadow-lg transition border border-brand-light-blue">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">ניסיון אמיתי</h3>
              <p className="text-gray-700">
                כל דבר שמלמדתי אני עשיתי בעצמי בעבודה. לא תיאוריה - פרקטיקה שעובדת בבן.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">שאלות נפוצות</h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition text-right"
                >
                  <ChevronDown
                    size={20}
                    className={`text-brand-navy transition-transform ${openAccordion === index ? 'rotate-180' : ''}`}
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                </button>

                {openAccordion === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-navy via-brand-light-blue to-brand-brown">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            התחילי את הקורס שלך עכשיו
          </h2>

          <form onSubmit={handleFormSubmit} className="bg-white rounded-xl p-8 shadow-xl">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">שם מלא</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent outline-none transition"
                placeholder="שם שלך"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">דוא"ל</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent outline-none transition"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2">טלפון</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent outline-none transition"
                placeholder="0501234567"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-brand-navy text-white font-bold text-lg rounded-lg hover:bg-brand-brown transition transform hover:scale-105"
            >
              שלחי את הבקשה שלי
            </button>
          </form>

          <p className="text-white text-center mt-6 text-sm">
            אתן בקשה תתקבל וניצור קשר לתא פרטים וביומים זמינים
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-white py-12 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: 'url(/images/logo-pattern.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#1a1a1a'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-900/95 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4 text-brand-off-white">
                <Logo size="small" />
              </div>
              <p className="text-gray-400">קורס ציפורניים מקצועי עם ניקול איליבסקי</p>
            </div>

            <div className="text-right md:text-center">
              <h4 className="font-semibold mb-4">יצירת קשר</h4>
              <p className="text-gray-400 mb-2">[מייל - יתמלא אחר כך]</p>
              <p className="text-gray-400 mb-2">[טלפון - יתמלא אחר כך]</p>
              <p className="text-gray-400">[שעות - יתמלא אחר כך]</p>
            </div>

            <div className="text-left md:text-right">
              <h4 className="font-semibold mb-4">ניווט</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('hero')} className="block text-gray-400 hover:text-white transition">עמוד הבית</button>
                <button onClick={() => scrollToSection('story')} className="block text-gray-400 hover:text-white transition">הסיפור שלי</button>
                <button onClick={() => scrollToSection('why')} className="block text-gray-400 hover:text-white transition">למה הקורס</button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 NIKOLiL. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
