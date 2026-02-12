import { useState, useEffect } from 'react';

export default function FlyingLogo() {
  const [transform, setTransform] = useState('translate(0px)');

  useEffect(() => {
    if (globalThis.visualViewport) {
      const width = globalThis.visualViewport.width;
      const height = globalThis.visualViewport.height;
      let curX = 0;
      let curY = 0;
      const interval = setInterval(() => {
        const randomX = Math.random() * width;
        const randomY = Math.random() * height;
        const targetX = (randomX + curX) / 2;
        const targetY = (randomY + curY) / 2;
        curX = targetX;
        curY = targetY;
        const randomRotation = (Math.random() - 0.5) * 10;
        setTransform(
          `translate(${targetX}px, ${targetY}px) rotate(${randomRotation}deg)`,
        );
      }, 3500);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <a
      href="/"
      onClick={() => sessionStorage.setItem('watchedTab', '0')}
    >
      <img
        src="/images/default/snoopy.gif"
        alt="Home"
        width={214}
        height={224}
        className="fixed select-none opacity-[.8] transition-all duration-3000 ease-in-out sm:left-5 sm:top-5 sm:size-10 md:left-32 md:top-16 md:size-12"
        style={{ transform }}
      />
    </a>
  );
}
