import { useState, useEffect, useRef, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { headerStore } from '../../lib/store';

interface HeadersType {
  isIntersecting?: boolean;
  target: { id: string };
}

function useIntersectionObserver(setActiveId: (id: string) => void) {
  const headingElementsRef = useRef<Record<string, HeadersType>>({});

  useEffect(() => {
    const navigator = (entries: IntersectionObserverEntry[]) => {
      headingElementsRef.current = entries.reduce(
        (map: Record<string, { target: { id: string } }>, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        },
        headingElementsRef.current,
      );

      const visibleHeadings: HeadersType[] = [];
      Object.keys(headingElementsRef.current).forEach(key => {
        const el = headingElementsRef.current[key];
        if (el.isIntersecting) visibleHeadings.push(el);
      });

      const headingElements = Array.from(document.querySelectorAll('h3'));
      const getIndexFromId = (id: string) =>
        headingElements.findIndex(h => h.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sorted = visibleHeadings.sort((a, b) =>
          getIndexFromId(a.target.id) > getIndexFromId(b.target.id) ? 1 : 0,
        );
        setActiveId(sorted[0].target.id);
      }
    };

    const observer = new IntersectionObserver(navigator, {
      rootMargin: '-50px 0px -50%',
    });

    const headingElements = Array.from(document.querySelectorAll('h3'));
    headingElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [setActiveId]);
}

export default function HeadingNavigator() {
  const [isClick, setIsClick] = useState(true);
  const [activeId, setActiveId] = useState('');
  const [headers, setHeaders] = useState<string[]>([]);

  useIntersectionObserver(setActiveId);

  // DOM에서 직접 h3 수집 (MDX 내 H3는 SSR로 렌더링되어 useEffect 미실행)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('h3[id]'));
    const links = els.map(el => `#${el.id}`).filter(Boolean);
    setHeaders(links);
  }, []);

  const pinColor = ['blue', 'green', 'orange'];
  const pickColor = useMemo(() => Math.floor(Math.random() * pinColor.length), []);

  if (headers.length === 0) return null;

  return (
    <div
      className={`fixed font-heading duration-500 ease-out sm:hidden lg:block ${
        isClick
          ? 'top-1/4 w-48 opacity-100 lg:right-12 xl:right-[10%]'
          : 'right-0 top-0 w-5 opacity-30'
      }`}
    >
      <div className={isClick ? 'notepad_heading' : 'bg-transparent'}>
        <img
          onClick={() => setIsClick(!isClick)}
          className="m-auto mt-0 size-5 cursor-[url(\'/images/2022/autumm/cursor_hover.png\'),pointer] transition hover:scale-110"
          src={`/images/2022/pinColor/pin-${pinColor[pickColor]}@2x.png`}
          alt="toggle toc"
        />
      </div>
      <div className={isClick ? 'opacity-100' : 'opacity-0'}>
        <div className="notepad">
          {headers.map((header, i) => {
            const heading = header.replace(/[#]/g, ' ').replace(/[-]/g, ' ');
            const isActive = header === `#${activeId}`;
            return (
              <div key={i}>
                <div
                  className={`absolute left-0 duration-300 ${
                    isActive ? 'blue-dot' : 'white-dot'
                  }`}
                />
                <a
                  href={header}
                  className={`duration-300 ${
                    isActive ? 'scale-125 opacity-100' : 'scale-100 opacity-30'
                  }`}
                >
                  {heading}
                </a>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
