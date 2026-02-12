import Note from './Note';
import H3 from './H3';
import CH from './CHComponents';

interface ImgProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}

interface LnkProps {
  href: string;
  text: string;
}

interface YoutubeProps {
  src: string;
}

export const Img = ({ src, alt, className, ...props }: ImgProps) => (
  <img
    src={src}
    alt={alt ?? '이미지'}
    className={`mb-3 mt-5 h-auto max-w-full rounded-xl bg-cover bg-no-repeat align-middle ${className ?? ''}`}
    {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
  />
);

export const Lnk = ({ href, text }: LnkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: 'rgb(102, 153, 204)' }}
  >
    {text}
  </a>
);

export const Youtube = ({ src }: YoutubeProps) => (
  <div className="relative mb-8 pb-[76.25%] pt-6 md:w-screen md:max-w-3xl">
    <iframe
      className="absolute left-0 top-0 size-full rounded-2xl bg-black shadow-lg shadow-black dark:shadow-red-900/30"
      width="560"
      height="315"
      src={src}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

// MDX에서 사용할 컴포넌트 맵
const MdxComponents = {
  h3: H3,
  Note,
  Img,
  Lnk,
  Youtube,
  CH,
};

export default MdxComponents;
