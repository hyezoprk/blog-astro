import { useState, useEffect } from 'react';
import Note from './Note';
import H3 from './H3';
import HeadingNavigator from './HeadingNavigator';
import { Img, Lnk, Youtube } from './MdxComponents';
import { CHCode, CHScrollycoding, CHSpotlight, CHSection } from './CHComponents';

interface SeriesItem {
  id: string;
  title: string;
}

interface Props {
  Content: React.ComponentType<{ components?: Record<string, unknown> }>;
  frontmatter: {
    title: string;
    date: string;
    categories: string;
    series?: string;
  };
  postId: string;
  series: SeriesItem[];
}

export default function PostContent({ Content, frontmatter, postId, series }: Props) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    return () => setFade(false);
  }, []);

  const CH = {
    Code: CHCode,
    Scrollycoding: CHScrollycoding,
    Spotlight: CHSpotlight,
    Section: CHSection,
  };

  const components = {
    h3: H3,
    Note,
    Img,
    Lnk,
    Youtube,
    CH,
    HeadingNavigator: () => null, // HeadingNavigator는 별도로 렌더링
  };

  return (
    <div className={`duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="overflow-hidden text-ellipsis text-center sm:mt-20 sm:px-3 md:mt-28">
        {frontmatter.title}
      </h1>
      <div className="flex justify-center leading-6 sm:mb-10 sm:mt-3 md:mb-12 md:mt-5">
        <time dateTime={frontmatter.date}>{frontmatter.date}</time>
      </div>

      {series.length > 0 && (
        <div className="flex rounded-lg border p-5 leading-6 sm:mx-20 sm:mb-10 md:mx-24 md:mb-12">
          <div className="flex flex-col">
            <h5 className="font-bold">시리즈</h5>
            <ul className="flex list-decimal flex-col">
              {series.map(each => (
                <li
                  key={each.id}
                  className={
                    postId !== each.id
                      ? 'marker:text-current'
                      : 'text-emerald-600 marker:text-emerald-600'
                  }
                >
                  <a className="no-underline" href={`/posts/${each.id}`}>
                    <Note type="highlight" color="#CAFC9D" show={postId === each.id}>
                      {each.title}
                    </Note>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <article
        className={`keep-all mx-6 my-10 ${
          frontmatter.categories === 'reading'
            ? 'word-arita font-content text-sm2 leading-6 tracking-tight'
            : 'font-line text-base antialiased sm:leading-6 md:leading-7'
        }`}
      >
        <Content components={components as Record<string, unknown>} />
      </article>

      <HeadingNavigator />
    </div>
  );
}
