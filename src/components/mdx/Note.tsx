import { useState, useEffect } from 'react';
import { RoughNotation } from 'react-rough-notation';
import type { RoughNotationProps } from 'react-rough-notation';

interface NoteProps extends Omit<RoughNotationProps, 'children'> {
  className?: string;
  children?: React.ReactNode;
}

export default function Note(props: NoteProps) {
  const [isCalled, setIsCalled] = useState(false);
  useEffect(() => {
    setIsCalled(true);
    return () => setIsCalled(false);
  }, []);
  return (
    <RoughNotation show={isCalled} color="tomato" animationDuration={1200} {...props}>
      {props.children}
    </RoughNotation>
  );
}
