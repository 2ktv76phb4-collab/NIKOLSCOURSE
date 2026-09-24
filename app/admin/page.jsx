'use client';

import { useState, useEffect } from 'react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('ג׳ל ציפורן');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('he');

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved && ['he', 'en', 'ru'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const isHebrew = language === 'he';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'NIKOL123456789') {
      setIsAuthenticated(true);
      setPassword('');
      setMessage('');
    } else {
      setMessage(language === 'he' ? 'סיסמא שגויה' : language === 'en' ? 'Invalid password' : 'Неверный пароль');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage(language === 'he' ? 'בחר תמונה' : language === 'en' ? 'Please select an image' : 'Пожалуйста, выберите изображение');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('password', 'NIKOL123456789');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setMessage(language === 'he' ? '✓ התמונה הועלתה בהצלחה!' : language === 'en' ? '✓ Image uploaded successfully!' : '✓ Изображение загружено успешно!');
        setFile(null);
        setTitle('');
        setDescription('');
        setCategory('ג׳ל ציפורן');
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        const error = await response.json();
        setMessage(language === 'he' ? `שגיאה: ${error.error}` : `Error: ${error.error}`);
      }
    } catch (error) {
      setMessage(language === 'he' ? `שגיאה: ${error.message}` : `Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    he: {
      admin: 'פורטל אדמין',
      password: 'סיסמא',
      enter: 'כניסה',
      upload: 'העלאת תמונה',
      selectImage: 'בחר תמונה',
      title: 'כותרת',
      description: 'תיאור',
      category: 'קטגוריה',
      uploadBtn: 'העלה תמונה',
      logout: 'יציאה'
    },
    en: {
      admin: 'Admin Portal',
      password: 'Password',
      enter: 'Login',
      upload: 'Upload Image',
      selectImage: 'Select Image',
      title: 'Title',
      description: 'Description',
      category: 'Category',
      uploadBtn: 'Upload Image',
      logout: 'Logout'
    },
    ru: {
      admin: 'Портал администратора',
      password: 'Пароль',
      enter: 'Войти',
      upload: 'Загрузить изображение',
      selectImage: 'Выбрать изображение',
      title: 'Заголовок',
      description: 'Описание',
      category: 'Категория',
      uploadBtn: 'Загрузить',
      logout: 'Выход'
    }
  };

  const trans = translations[language];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--cream)', direction: isHebrew ? 'rtl' : 'ltr' }}>
      <div className="max-w-md mx-auto pt-20 px-4">
        <h1 className="text-3xl font-serif text-center mb-8" style={{ color: 'var(--navy)' }}>
          {trans.admin}
        </h1>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-4">
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
            {message && (
              <div className="p-3 rounded text-sm" style={{ backgroundColor: '#fee', color: '#c33' }}>
                {message}
              </div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 rounded transition hover:opacity-75 font-medium"
              style={{
                backgroundColor: 'var(--navy)',
                color: 'var(--cream)',
              }}
            >
              {trans.enter}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                  {trans.selectImage}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: 'var(--line)' }}
                />
                {file && (
                  <p className="mt-2 text-sm" style={{ color: 'var(--navy-soft)' }}>
                    ✓ {file.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                  {trans.title}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: 'var(--line)' }}
                  placeholder={trans.title}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                  {trans.description}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: 'var(--line)' }}
                  placeholder={trans.description}
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                  {trans.category}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <option>ג׳ל ציפורן</option>
                  <option>מבנה אנטומי</option>
                  <option>הסרה ומניקור</option>
                  <option>עיצוב</option>
                </select>
              </div>

              {message && (
                <div className={`p-3 rounded text-sm ${message.includes('✓') ? 'text-green-700' : 'text-red-700'}`} style={{ backgroundColor: message.includes('✓') ? '#efe' : '#fee' }}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 rounded transition hover:opacity-75 font-medium disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--navy)',
                  color: 'var(--cream)',
                }}
              >
                {loading ? '⏳ מעלה...' : trans.uploadBtn}
              </button>
            </form>

            <button
              onClick={() => {
                setIsAuthenticated(false);
                setFile(null);
                setTitle('');
                setDescription('');
                setMessage('');
              }}
              className="w-full px-4 py-2 rounded transition hover:opacity-75 text-sm"
              style={{
                color: 'var(--navy)',
                border: '1px solid var(--line)',
                backgroundColor: 'transparent'
              }}
            >
              {trans.logout}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
