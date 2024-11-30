import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaBell, FaPalette, FaShieldAlt } from 'react-icons/fa';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  
  // Get initial theme and language from localStorage or set defaults
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Load user data on component mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setFormData(prev => ({
      ...prev,
      name: currentUser.name || '',
      email: currentUser.email || ''
    }));
  }, []);

  // Apply theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Apply theme-specific styles
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  // Apply language changes
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('language', language);
  }, [language]);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    setSuccessMessage('Theme updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setSuccessMessage('Language updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      
      // Update user in users array
      const updatedUsers = users.map(user => {
        if (user.email === currentUser.email) {
          return { ...user, name: formData.name, email: formData.email };
        }
        return user;
      });

      // Update localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify({
        ...currentUser,
        name: formData.name,
        email: formData.email
      }));

      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-6 py-3 ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="inline mr-2" />
            Profile
          </button>
          <button
            className={`px-6 py-3 ${activeTab === 'appearance' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('appearance')}
          >
            <FaPalette className="inline mr-2" />
            Appearance
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 text-green-500 rounded">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded">
              {error}
            </div>
          )}

          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Theme</label>
                <select
                  value={theme}
                  onChange={handleThemeChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                </select>
              </div>

              <div className="mt-4 p-4 border rounded-md">
                <h3 className="text-lg font-medium mb-2">Preview</h3>
                <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
                  {language === 'en' && 'This is how your content will look.'}
                  {language === 'es' && 'Así es como se verá tu contenido.'}
                  {language === 'fr' && 'Voici à quoi ressemblera votre contenu.'}
                  {language === 'de' && 'So wird Ihr Inhalt aussehen.'}
                  {language === 'it' && 'Ecco come apparirà il tuo contenuto.'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
