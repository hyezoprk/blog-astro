import { useState } from 'react';
import useSound from 'use-sound';

interface PostData {
  id: string;
  title: string;
  date: string;
  categories: string;
  tags: string | string[];
  description?: string;
  excerpt?: string;
  image?: string;
}

interface Props {
  posts: PostData[];
  tag: string;
}

function PostItem({ id, title, date, description }: Pick<PostData, 'id' | 'title' | 'date' | 'description'>) {
  const [tapSound] = useSound('/sounds/tap.mp3', { volume: 0.6 });

  return (
    <a
      href={`/posts/${id}`}
      onMouseUp={() => tapSound()}
      onClick={() => sessionStorage.setItem('path', window.location.pathname)}
      className="-my-px flex border-y border-blue-800 py-2 text-right no-underline dark:border-blue-900"
    >
      <div className="pl-3 text-left sm:basis-4/12 md:basis-3/12">{description}</div>
      <div className="sm:basis-8/12 sm:pr-3 md:basis-7/12 md:pr-10">{title}</div>
      <div className="basis-2/12 justify-end pr-3 sm:hidden md:inline-flex">{date}</div>
    </a>
  );
}

export default function TagPageClient({ posts, tag }: Props) {
  const [page, setPage] = useState(0);
  const limit = 6;
  const total = posts.length;
  const offset = page * limit;

  const summary = posts.filter(p => p.excerpt);
  const banner = posts.filter(p => p.image);

  return (
    <>
      <div className="flex justify-between pb-12 pl-3 pt-7">
        <p className="keep-all text-base sm:basis-1/2 md:basis-2/5">
          {[...summary].reverse().map(({ excerpt }, i) => (
            <span key={i}>
              {excerpt}
              <br />
            </span>
          ))}
        </p>
        <div className="-mt-3 pr-3 sm:basis-1/2 md:basis-3/5">
          {banner.map(({ image, id }) => (
            <img
              key={id}
              src={image}
              alt=""
              className="mb-3 mt-5 h-auto max-w-full rounded-xl"
            />
          ))}
        </div>
      </div>

      <div className="text-base">
        {posts.slice(offset, offset + limit).map(({ id, title, date, description }) => (
          <PostItem key={id} id={id} title={title} date={date} description={description} />
        ))}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`size-8 rounded-full text-sm ${
                page === i
                  ? 'bg-blue-800 text-white'
                  : 'border border-blue-800 hover:bg-blue-800/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
