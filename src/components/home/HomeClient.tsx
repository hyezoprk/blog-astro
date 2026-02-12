/**
 * HomeClient: 홈 페이지의 인터랙티브 부분을 담당하는 React Island
 * - 카테고리 탭 전환 (CategoryTabs + TabTracker)
 * - 태그 목록 표시 (TagList)
 * - RecentPosts 토글
 */
import { useState, useEffect, useMemo } from 'react';
import { FcDislike, FcPuzzle, FcWorkflow } from 'react-icons/fc';
import { BsChevronDown } from 'react-icons/bs';
import useSound from 'use-sound';

interface PostData {
  id: string;
  title: string;
  date: string;
  categories: string;
  tags: string | string[];
  description?: string;
  excerpt?: string;
  pinned?: boolean;
  series?: string;
  image?: string;
}

interface Props {
  allPostsData: PostData[];
  recentPosts: PostData[];
  initialCategory?: string;
}

// Safari 감지 (클라이언트에서만)
function isSafari() {
  if (typeof navigator === 'undefined') return false;
  return (
    navigator.userAgent.indexOf('Safari') !== -1 &&
    navigator.userAgent.indexOf('Chrome') === -1
  );
}

function CategoryIcon({ category }: { category: string }) {
  if (category === 'project') return <FcDislike className="size-6" />;
  if (category === 'reading') return <FcPuzzle className="size-6" />;
  return <FcWorkflow className="size-6" />;
}

export default function HomeClient({ allPostsData, recentPosts, initialCategory }: Props) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'coding');
  const [tabTranslate, setTabTranslate] = useState('0%');
  const [recentOpen, setRecentOpen] = useState(true);
  const [recentAnimation, setRecentAnimation] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [thisMonth, setThisMonth] = useState('');

  const [tapSound] = useSound('/sounds/tap.mp3', { volume: 0.6 });
  const [beepSound] = useSound('/sounds/beep.mp3', { volume: 0.6 });

  // 카테고리 목록 (고유값)
  const categories = useMemo(() => {
    const cats = [...new Set(allPostsData.map(p => p.categories))].sort();
    return cats;
  }, [allPostsData]);

  // 현재 카테고리 인덱스
  const categoryIndex = categories.indexOf(activeCategory);

  // 선택된 카테고리의 태그 목록
  const tags = useMemo(() => {
    const filtered = allPostsData.filter(p => p.categories === activeCategory);
    const tagSet = new Set<string>();
    filtered.forEach(p => {
      if (typeof p.tags === 'string') tagSet.add(p.tags);
      else p.tags.forEach(t => tagSet.add(t));
    });
    return Array.from(tagSet);
  }, [allPostsData, activeCategory]);

  useEffect(() => {
    setMounted(true);
    setThisMonth(new Date().toLocaleString('en', { month: 'short' }));

    // URL에서 category 파라미터 읽기
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category') || 'coding';
    setActiveCategory(cat);

    // sessionStorage에서 탭 위치 복원
    const watchedTab = sessionStorage.getItem('watchedTab');
    if (watchedTab) {
      setTabTranslate(`${watchedTab}00%`);
    }

    // localStorage에서 RecentPosts 상태 복원
    const stored = localStorage.getItem('RecentPosts');
    if (stored) {
      const data = JSON.parse(stored).toggle;
      setRecentOpen(data);
      setRecentAnimation(data);
    } else {
      setRecentAnimation(true);
    }
  }, []);

  // URL 업데이트 없이 카테고리 변경
  const handleCategoryChange = (cat: string, idx: number) => {
    tapSound();
    setActiveCategory(cat);
    setTabTranslate(`${idx}00%`);
    sessionStorage.setItem('watchedTab', String(idx));

    // URL query 업데이트 (history.pushState)
    const url = new URL(window.location.href);
    url.searchParams.set('category', cat);
    window.history.pushState({}, '', url.toString());
  };

  const toggleRecent = () => {
    beepSound();
    const next = !recentOpen;
    localStorage.setItem('RecentPosts', JSON.stringify({ toggle: next }));
    setRecentOpen(next);
    setRecentAnimation(next);
  };

  if (!mounted) return null;

  return (
    <>
      {/* RecentPosts */}
      <div className="mb-px sm:mx-5 sm:mt-12 md:mx-10 md:mt-16">
        <div
          onClick={toggleRecent}
          className="relative my-2 flex cursor-[url('/images/2022/autumm/cursor_hover.png'),pointer] place-items-center justify-center rounded-md bg-blue-800 py-1 text-md text-white dark:bg-blue-900"
        >
          <div className="grow select-none text-center font-grapeNuts">
            {thisMonth}
          </div>
          <div className="absolute right-2">
            <BsChevronDown
              className={`duration-700 ${recentAnimation ? 'rotate-0' : '-rotate-180'}`}
            />
          </div>
        </div>
        <div
          className={`grid gap-x-5 text-base transition-all duration-1000 sm:grid-cols-1 md:grid-cols-2 ${
            recentAnimation ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {recentOpen &&
            recentPosts.map(({ id, categories, title }) => (
              <a
                key={id}
                href={`/posts/${id}`}
                onMouseUp={() => tapSound()}
                onClick={() => sessionStorage.setItem('path', window.location.pathname + window.location.search)}
                className="mb-2 flex flex-row justify-between border-slate-600/30 px-5 no-underline sm:border-y-0 sm:py-1 md:border-y md:py-2"
              >
                <div>
                  {categories === 'coding' ? (
                    <FcWorkflow className="size-5" />
                  ) : categories === 'project' ? (
                    <FcDislike className="size-5" />
                  ) : (
                    <FcPuzzle className="size-5" />
                  )}
                </div>
                <div>{title}</div>
              </a>
            ))}
        </div>
      </div>

      {/* Category Tabs */}
      <section className="pb-10 sm:mx-5 md:mx-10">
        <div className="-mb-2 flex">
          {/* TabTracker */}
          <span
            className="relative my-1 flex size-1 basis-1/3 justify-center duration-700"
            style={{ transform: `translate(${tabTranslate})` }}
          >
            <span className="absolute inline-flex size-1 animate-ping rounded-full bg-blue-600 opacity-75 dark:bg-yellow-300" />
            <span className="relative inline-flex size-1 rounded-full bg-blue-800 dark:bg-[var(--color-orange)]" />
          </span>
        </div>

        <div className="my-3 flex text-center font-grapeNuts text-md font-bold">
          {categories.map((cat, i) => (
            <div
              key={cat}
              onClick={() => handleCategoryChange(cat, i)}
              className="basis-1/3 cursor-[url('/images/2022/autumm/cursor_hover.png'),pointer] select-none"
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Tag List */}
        <article className="flex flex-row border-y border-blue-800 py-px backdrop-blur dark:border-blue-900">
          <div className="flex basis-1/12 items-center justify-center pl-3">
            <CategoryIcon category={activeCategory} />
          </div>
          <div className="flex basis-11/12 flex-row overflow-hidden pl-3">
            {tags.map(tag => (
              <div
                key={tag}
                onClick={() => tapSound()}
                className={`relative flex justify-center px-2 pt-[3px] sm:h-40 md:h-52 ${
                  isSafari() ? 'word-safari tracking-wider' : 'word-tightest'
                }`}
              >
                <div
                  className="absolute left-0 w-px"
                  style={{
                    top: '1px',
                    bottom: '1px',
                    backgroundColor: 'rgba(30, 58, 138, 0.2)',
                  }}
                />
                <a href={`/tags/${tag}`} className="writing-vertical text-md no-underline">
                  {tag}
                </a>
              </div>
            ))}
          </div>
        </article>

        <footer />
      </section>
    </>
  );
}
