import { atom } from 'nanostores';

// TOC 헤더 상태 (MdxComponents.tsx의 headerState Recoil atom을 대체)
export const headerStore = atom<string[]>([]);
