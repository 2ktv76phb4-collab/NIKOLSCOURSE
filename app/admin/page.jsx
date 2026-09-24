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
  const [galleryItems, setGalleryItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved && ['he', 'en', 'ru'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadGalleryItems();
    }
  }, [isAuthenticated]);

  const loadGalleryItems = async () => {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data || []);
      }
    } catch (error) {
      console.error('Failed to load gallery items:', error);
    }
  };

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
      loadGalleryItems();
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm(language === 'he' ? 'האם אתה בטוח שברצונך למחוק?' : 'Are you sure?')) {
      return;
    }

    try {
      const response = await fetch(`/api/gallery/${itemId}`, {
        method: 'DELETE',
        headers: { 'x-password': 'NIKOL123456789' }
      });

      if (response.ok) {
        setMessage(language === 'he' ? '✓ התמונה נמחקה' : '✓ Image deleted');
        loadGalleryItems();
      } else {
        setMessage(language === 'he' ? 'שגיאה במחיקה' : 'Error deleting');
      }
    } catch (error) {
      setMessage(language === 'he' ? 'שגיאה במחיקה' : 'Error deleting');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/gallery/${editingItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingItem.title,
          description: editingItem.description,
          category: editingItem.category,
          password: 'NIKOL123456789'
        })
      });

      if (response.ok) {
        setMessage(language === 'he' ? '✓ התמונה עודכנה' : '✓ Image updated');
        setEditingItem(null);
        loadGalleryItems();
      } else {
        setMessage(language === 'he' ? 'שגיאה בעדכון' : 'Error updating');
      }
    } catch (error) {
      setMessage(language === 'he' ? 'שגיאה בעדכון' : 'Error updating');
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
      logout: 'יציאה',
      gallery: 'ניהול התמונות',
      edit: 'עריכה',
      delete: 'מחיקה',
      save: 'שמור',
      cancel: 'ביטול',
      noImages: 'אין תמונות'
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
      logout: 'Logout',
      gallery: 'Manage Images',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      noImages: 'No images'
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
      logout: 'Выход',
      gallery: 'Управление изображениями',
      edit: 'Редактировать',
      delete: 'Удалить',
      save: 'Сохранить',
      cancel: 'Отмена',
      noImages: 'Нет изображений'
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
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setShowGallery(false)}
                className="flex-1 px-4 py-2 rounded transition font-medium"
                style={{
                  backgroundColor: !showGallery ? 'var(--navy)' : 'transparent',
                  color: !showGallery ? 'var(--cream)' : 'var(--navy)',
                  border: '1px solid var(--line)'
                }}
              >
                {trans.upload}
              </button>
              <button
                onClick={() => setShowGallery(true)}
                className="flex-1 px-4 py-2 rounded transition font-medium"
                style={{
                  backgroundColor: showGallery ? 'var(--navy)' : 'transparent',
                  color: showGallery ? 'var(--cream)' : 'var(--navy)',
                  border: '1px solid var(--line)'
                }}
              >
                {trans.gallery}
              </button>
            </div>

            {!showGallery ? (
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
            ) : (
              <div className="space-y-4">
                {editingItem ? (
                  <form onSubmit={handleEditSubmit} className="space-y-4 border-t pt-4">
                    <h2 className="font-serif text-xl" style={{ color: 'var(--navy)' }}>
                      {trans.edit}
                    </h2>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                        {trans.title}
                      </label>
                      <input
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full px-4 py-2 rounded border"
                        style={{ borderColor: 'var(--line)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                        {trans.description}
                      </label>
                      <textarea
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full px-4 py-2 rounded border"
                        style={{ borderColor: 'var(--line)' }}
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                        {trans.category}
                      </label>
                      <select
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full px-4 py-2 rounded border"
                        style={{ borderColor: 'var(--line)' }}
                      >
                        <option>ג׳ל ציפורן</option>
                        <option>מבנה אנטומי</option>
                        <option>הסרה ומניקור</option>
                        <option>עיצוב</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-4 py-2 rounded transition font-medium disabled:opacity-50"
                        style={{
                          backgroundColor: 'var(--navy)',
                          color: 'var(--cream)',
                        }}
                      >
                        {trans.save}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="flex-1 px-4 py-2 rounded transition font-medium"
                        style={{
                          backgroundColor: 'transparent',
                          color: 'var(--navy)',
                          border: '1px solid var(--line)'
                        }}
                      >
                        {trans.cancel}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-2">
                    {galleryItems.length === 0 ? (
                      <p style={{ color: 'var(--navy-soft)' }}>{trans.noImages}</p>
                    ) : (
                      galleryItems.map((item) => (
                        <div key={item.id} className="flex gap-2 items-start p-3 rounded border" style={{ borderColor: 'var(--line)' }}>
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium" style={{ color: 'var(--navy)' }}>
                              {item.title}
                            </h3>
                            <p className="text-xs" style={{ color: 'var(--navy-soft)' }}>
                              {item.category}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setEditingItem(item)}
                              className="px-3 py-1 rounded text-sm transition hover:opacity-75"
                              style={{
                                backgroundColor: 'var(--navy)',
                                color: 'var(--cream)',
                              }}
                            >
                              {trans.edit}
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="px-3 py-1 rounded text-sm transition hover:opacity-75"
                              style={{
                                backgroundColor: '#dc2626',
                                color: 'white',
                              }}
                            >
                              {trans.delete}
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {message && (
              <div className={`p-3 rounded text-sm ${message.includes('✓') ? 'text-green-700' : 'text-red-700'}`} style={{ backgroundColor: message.includes('✓') ? '#efe' : '#fee' }}>
                {message}
              </div>
            )}

            <button
              onClick={() => {
                setIsAuthenticated(false);
                setFile(null);
                setTitle('');
                setDescription('');
                setMessage('');
                setEditingItem(null);
                setShowGallery(false);
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
