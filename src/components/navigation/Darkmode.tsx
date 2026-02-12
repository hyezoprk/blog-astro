import { useEffect, useState } from 'react';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import useSound from 'use-sound';

export default function Darkmode() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [rotate, setRotate] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sound] = useSound('/sounds/switch.mp3');

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
    setRotate(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    setRotate(next === 'dark');
  };

  if (!mounted) return <div className="size-6" />;

  return (
    <button
      aria-label="Darkmode Switch"
      className={`rounded-md transition-transform duration-300 hover:bg-gray-300/30 dark:hover:bg-zinc-800/30 md:inline ${rotate ? 'rotate-0' : 'rotate-45'}`}
    >
      {theme === 'dark' ? (
        <MdDarkMode
          onMouseUp={() => sound()}
          onClick={toggleTheme}
          className="size-6"
          fill="gold"
        />
      ) : (
        <MdOutlineLightMode
          onMouseUp={() => sound()}
          onClick={toggleTheme}
          className="size-6"
          fill="orange"
        />
      )}
    </button>
  );
}
