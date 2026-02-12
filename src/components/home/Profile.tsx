import { useState, useEffect } from 'react';
import { RoughNotation } from 'react-rough-notation';

export default function Profile() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="flex flex-col place-items-center">
      <div>
        <section className="mx-2 mt-10 flex sm:p-8 md:p-10">
          <img
            src="/images/default/profile.png"
            className="select-none rounded-full ring-2 ring-indigo-900 ring-offset-1 sm:size-16 md:size-20"
            height={80}
            width={80}
            alt="프로필"
          />
          <div className="ml-8 flex flex-col justify-center space-y-1">
            <p className="pt-0 font-heading text-lg">hyezolog</p>
            <p className="pt-0 text-base">공부일지</p>
          </div>
        </section>
        <section className="mx-10 flex items-center">
          <p className="pt-0 font-content text-base sm:leading-6 md:leading-7">
            안녕하세요. 처절한 코딩 생존기를 담은 사이트입니다.
            <br />
            <RoughNotation
              show={show}
              type="underline"
              color="orange"
              animationDuration={1000}
            >
              코딩과 일기
            </RoughNotation>
            가 뒤죽박죽 섞여 있어요 😵‍💫
          </p>
        </section>
      </div>
    </div>
  );
}
