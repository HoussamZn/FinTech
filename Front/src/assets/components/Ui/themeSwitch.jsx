import { useState, useEffect } from 'react';

const ThemeSwitch = ({withLabel}) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
      document.documentElement.classList.toggle('dark', savedMode === 'true');
    }else{
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={darkMode}
        onChange={toggleDarkMode}
        className="sr-only peer" 
      />
      <div className="relative w-11 h-6 bg-neutral-300 rounded-full peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600 transition-colors duration-300">
        {/* Sun icon (visible in light mode) */}
        <span className={`absolute left-[2px] top-[2px] flex items-center justify-center h-5 w-5 bg-white rounded-full border border-gray-300 transition-all duration-300 transform ${darkMode ? 'opacity-0' : 'opacity-100'}`}>
          <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
        </span>
        
        {/* Moon icon (visible in dark mode) */}
        <span className={`absolute left-[2px] top-[2px] flex items-center justify-center h-5 w-5 bg-white rounded-full border border-gray-300 transition-all duration-300 transform ${darkMode ? 'translate-x-full opacity-100' : 'opacity-0'}`}>
          <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </span>
      </div>
      {withLabel && <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </span> }
    </label>
  );
};

export default ThemeSwitch;