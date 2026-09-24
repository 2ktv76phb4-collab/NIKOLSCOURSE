'use client';

import { useState, useEffect } from 'react';

const DEFAULT_ITEMS = [
  {
    id: 1,
    title: 'עבודה מס׳ 1',
    description: 'תיאור העבודה יופיע כאן',
    image: '/images/gallery-placeholder-1.jpg',
    category: 'ג\'ל ציפורן'
  },
];

export default function Gallery() {
  const [language, setLanguage] = useState('he');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState(DEFAULT_ITEMS);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [password, setPassword] = useState('');

  const isHebrew = language === 'he';
  const dir = language === 'ru' ? 'ltr' : (isHebrew ? 'rtl' : 'ltr');

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved && ['he', 'en', 'ru'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setGalleryItems(data.map(item => ({
              id: item.id,
              title: item.title,
              description: item.description,
              category: item.category,
              image: item.image_url,
              cloudinary_id: item.cloudinary_id
            })));
          }
        }
      } catch (error) {
        console.log('Using default gallery items');
      }
    };
    loadGalleryData();
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

  const toggleLanguage = () => {
    const langs = ['he', 'en', 'ru'];
    const current = langs.indexOf(language);
    setLanguage(langs[(current + 1) % langs.length]);
  };

  const scrollToHome = () => {
    window.location.href = '/';
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const currentItem = galleryItems[currentIndex];

  const handleDelete = async () => {
    if (!password || password !== 'NIKOL123456789') {
      alert(language === 'he' ? 'סיסמא שגויה' : language === 'en' ? 'Invalid password' : 'Неверный пароль');
      return;
    }

    try {
      const response = await fetch(`/api/gallery/${selectedItem.id}`, {
        method: 'DELETE',
        headers: { 'x-password': password }
      });

      if (response.ok) {
        setGalleryItems(galleryItems.filter(item => item.id !== selectedItem.id));
        setSelectedItem(null);
        setPassword('');
        alert(language === 'he' ? 'התמונה נמחקה בהצלחה' : language === 'en' ? 'Image deleted successfully' : 'Изображение удалено успешно');
      } else {
        alert(language === 'he' ? 'שגיאה במחיקה' : 'Error deleting image');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert(language === 'he' ? 'שגיאה במחיקה' : 'Error deleting image');
    }
  };

  const handleEdit = async () => {
    if (!password || password !== 'NIKOL123456789') {
      alert(language === 'he' ? 'סיסמא שגויה' : language === 'en' ? 'Invalid password' : 'Неверный пароль');
      return;
    }

    try {
      const response = await fetch(`/api/gallery/${selectedItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editData.title,
          description: editData.description,
          category: editData.category,
          password
        })
      });

      if (response.ok) {
        const updated = await response.json();
        setGalleryItems(galleryItems.map(item =>
          item.id === selectedItem.id ? { ...item, ...updated.item } : item
        ));
        setSelectedItem(null);
        setIsEditMode(false);
        setPassword('');
        alert(language === 'he' ? 'התמונה עודכנה בהצלחה' : language === 'en' ? 'Image updated successfully' : 'Изображение обновлено успешно');
      } else {
        alert(language === 'he' ? 'שגיאה בעדכון' : 'Error updating image');
      }
    } catch (error) {
      console.error('Edit error:', error);
      alert(language === 'he' ? 'שגיאה בעדכון' : 'Error updating image');
    }
  };

  const translations = {
    he: {
      gallery: 'גלריית עבודות',
      home: 'בחזרה לעמוד הבית',
      clickForDetails: 'לחץ על התמונה לפרטים נוספים',
      edit: 'עריכה',
      delete: 'מחיקה',
      password: 'סיסמא',
      title: 'כותרת',
      description: 'תיאור',
      category: 'קטגוריה',
      save: 'שמור',
      cancel: 'ביטול',
      enterPassword: 'הזן סיסמא'
    },
    en: {
      gallery: 'Work Gallery',
      home: 'Back to Home',
      clickForDetails: 'Click on the image for more details',
      edit: 'Edit',
      delete: 'Delete',
      password: 'Password',
      title: 'Title',
      description: 'Description',
      category: 'Category',
      save: 'Save',
      cancel: 'Cancel',
      enterPassword: 'Enter password'
    },
    ru: {
      gallery: 'Галерея работ',
      home: 'Вернуться домой',
      clickForDetails: 'Нажмите на изображение для деталей',
      edit: 'Редактировать',
      delete: 'Удалить',
      password: 'Пароль',
      title: 'Название',
      description: 'Описание',
      category: 'Категория',
      save: 'Сохранить',
      cancel: 'Отмена',
      enterPassword: 'Введите пароль'
    }
  };

  const trans = translations[language];

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
                height: 'clamp(50px, 8vw, 85px)',
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

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToHome}
              className="hidden md:inline px-4 py-2 rounded text-sm transition hover:opacity-75"
              style={{
                color: 'var(--navy)',
                border: '1px solid var(--line)',
              }}
            >
              {trans.home}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded text-sm font-medium transition hover:opacity-75"
              style={{
                color: 'var(--navy)',
                border: '1px solid var(--line)',
                backgroundColor: 'transparent'
              }}
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
            <button
              onClick={scrollToHome}
              className="hover:text-opacity-70 transition py-2"
              style={{ color: 'var(--navy)', textAlign: isHebrew ? 'right' : 'left' }}
            >
              {trans.home}
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-[6.4%] text-center" style={{ backgroundColor: 'var(--cream)' }}>
        <h1 className="title" style={{ color: 'var(--navy)' }}>
          {trans.gallery}
        </h1>
        <p className="lede mt-4">{trans.clickForDetails}</p>
      </section>

      {/* Slider */}
      <section className="py-12 md:py-24 px-[6.4%]">
        <div className="max-w-4xl mx-auto">
          {/* Slider Container */}
          <div className="relative aspect-video md:aspect-square mb-8 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)' }}>
            <div
              className="w-full h-full cursor-pointer flex items-center justify-center"
              onClick={() => setSelectedItem(currentItem)}
              style={{
                backgroundImage: `url('${currentItem.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Placeholder text if image doesn't load */}
              <div className="text-center p-4" style={{ color: 'var(--navy-soft)' }}>
                <p className="text-sm">{trans.clickForDetails}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute inset-y-0 left-0 flex items-center justify-center w-12 md:w-16 transition hover:opacity-75"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}
            >
              {isHebrew ? '→' : '←'}
            </button>
            <button
              onClick={nextSlide}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-12 md:w-16 transition hover:opacity-75"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}
            >
              {isHebrew ? '←' : '→'}
            </button>

            {/* Slide Counter */}
            <div
              className="absolute bottom-4 left-4 md:bottom-6 md:left-6 px-3 py-1 rounded text-sm font-medium"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
            >
              {currentIndex + 1} / {galleryItems.length}
            </div>
          </div>

          {/* Info Card */}
          <div className="border p-6 rounded-lg" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--white)' }}>
            <div className="flex items-start justify-between gap-4">
              <div style={{ textAlign: isHebrew ? 'right' : 'left' }}>
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--taupe)', textTransform: 'uppercase' }}>
                  {currentItem.category}
                </p>
                <h2 className="font-serif text-xl mb-3" style={{ color: 'var(--navy)' }}>
                  {currentItem.title}
                </h2>
                <p style={{ color: 'var(--navy-soft)' }}>
                  {currentItem.description}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="mt-8 flex justify-center gap-2">
            {galleryItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="w-3 h-3 rounded-full transition"
                style={{
                  backgroundColor: i === currentIndex ? 'var(--navy)' : 'var(--line)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setSelectedItem(null);
            setIsEditMode(false);
            setPassword('');
          }}
          style={{ direction: dir }}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: 'var(--cream)' }}
          >
            {!isEditMode ? (
              <>
                <div className="relative flex-1 min-h-[300px] md:min-h-[500px]">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      setIsEditMode(false);
                      setPassword('');
                    }}
                    className="absolute top-4 right-4 text-3xl flex-shrink-0 w-10 h-10 flex items-center justify-center rounded"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 border-t" style={{ borderTopColor: 'var(--line)' }}>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--taupe)', textTransform: 'uppercase' }}>
                    {selectedItem.category}
                  </p>
                  <h2 className="font-serif text-2xl mb-4" style={{ color: 'var(--navy)' }}>
                    {selectedItem.title}
                  </h2>
                  <p style={{ color: 'var(--navy-soft)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    {selectedItem.description}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setIsEditMode(true);
                        setEditData({
                          title: selectedItem.title,
                          description: selectedItem.description,
                          category: selectedItem.category
                        });
                      }}
                      className="flex-1 px-4 py-2 rounded transition text-sm font-medium"
                      style={{
                        backgroundColor: 'var(--navy)',
                        color: 'var(--cream)',
                      }}
                    >
                      {trans.edit}
                    </button>
                    <button
                      onClick={() => setPassword(prompt(trans.enterPassword) || '')}
                      className="flex-1 px-4 py-2 rounded transition text-sm font-medium"
                      style={{
                        backgroundColor: '#dc2626',
                        color: 'white',
                      }}
                    >
                      {trans.delete}
                    </button>
                  </div>

                  {password && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={handleDelete}
                        className="flex-1 px-4 py-2 rounded transition text-sm font-medium"
                        style={{
                          backgroundColor: '#dc2626',
                          color: 'white',
                        }}
                      >
                        {trans.delete}
                      </button>
                      <button
                        onClick={() => setPassword('')}
                        className="flex-1 px-4 py-2 rounded transition text-sm font-medium"
                        style={{
                          backgroundColor: 'var(--line)',
                          color: 'var(--navy)',
                        }}
                      >
                        {trans.cancel}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-6">
                <h2 className="font-serif text-2xl mb-6" style={{ color: 'var(--navy)' }}>
                  {trans.edit}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                      {trans.title}
                    </label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full px-4 py-2 rounded border"
                      style={{ borderColor: 'var(--line)' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                      {trans.description}
                    </label>
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full px-4 py-2 rounded border"
                      style={{ borderColor: 'var(--line)' }}
                      rows="4"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                      {trans.category}
                    </label>
                    <select
                      value={editData.category}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      className="w-full px-4 py-2 rounded border"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <option>ג׳ל ציפורן</option>
                      <option>מבנה אנטומי</option>
                      <option>הסרה ומניקור</option>
                      <option>עיצוב</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                      {trans.password}
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded border"
                      style={{ borderColor: 'var(--line)' }}
                      placeholder="••••••••••••"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleEdit}
                      className="flex-1 px-4 py-2 rounded transition font-medium"
                      style={{
                        backgroundColor: 'var(--navy)',
                        color: 'var(--cream)',
                      }}
                    >
                      {trans.save}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditMode(false);
                        setPassword('');
                      }}
                      className="flex-1 px-4 py-2 rounded transition font-medium"
                      style={{
                        backgroundColor: 'var(--line)',
                        color: 'var(--navy)',
                      }}
                    >
                      {trans.cancel}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
