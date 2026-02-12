/**
 * Code Hike 컴포넌트 fallback
 * CH.Code, CH.Scrollycoding, CH.Spotlight, CH.Section을
 * Expressive Code 호환 형태로 래핑합니다.
 */
import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
}

// CH.Code → 단순 코드 블록 래퍼 (Expressive Code가 처리)
export function CHCode({ children }: Props) {
  return <div className="ch-code-wrapper">{children}</div>;
}

// CH.Scrollycoding → 스크롤 섹션 (레이아웃만 유지)
export function CHScrollycoding({ children }: Props) {
  return (
    <div className="ch-scrollycoding not-prose my-8 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {children}
    </div>
  );
}

// CH.Spotlight → 스포트라이트 섹션
export function CHSpotlight({ children }: Props) {
  return (
    <div className="ch-spotlight not-prose my-8 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {children}
    </div>
  );
}

// CH.Section → 일반 섹션
export function CHSection({ children }: Props) {
  return <div className="ch-section my-4">{children}</div>;
}

const CH = {
  Code: CHCode,
  Scrollycoding: CHScrollycoding,
  Spotlight: CHSpotlight,
  Section: CHSection,
};

export default CH;
