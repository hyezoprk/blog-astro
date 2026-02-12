interface H3Props {
  id?: string;
  children?: React.ReactNode;
}

// rehype-slug가 빌드 타임에 id를 자동 생성함
export default function H3({ id, children }: H3Props) {
  const link = id ? `#${id}` : '#';

  return (
    <h3 id={id}>
      <a className="anchor-link no-underline" href={link}>
        💡&nbsp;
      </a>
      {children}
    </h3>
  );
}
