/*************************************************************
 * 아코디언 컴포넌트
 * - created by hwanee-k
 *************************************************************/

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface AccordionItem {
  title: string; // 제목
  content: React.ReactNode; // 자식 컴포넌트
  isDisabled?: boolean; // 비활성화 여부
}

interface AccordionProps {
  items: AccordionItem[]; // 데이터
  isSingleOpen?: boolean; // 단일 열기 여부
  titleClassName?: string; // 아코디언 제목 스타일
  contentClassName?: string; // 아코디언 내용 스타일
}

export default function Accordion({
  items,
  isSingleOpen = false,
  titleClassName = '',
  contentClassName = '',
}: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (isSingleOpen) {
      if (openIndices.includes(index)) {
        setOpenIndices([]);
      } else {
        setOpenIndices([]);
        setTimeout(() => setOpenIndices([index]), 50);
      }
    } else {
      setOpenIndices(openIndices.includes(index) ? openIndices.filter((i) => i !== index) : [...openIndices, index]);
    }
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className='border-b border-slate-200'>
          <button
            className={twMerge(
              'flex w-full items-center justify-between py-3 text-left text-slate-800 focus:outline-none',
              titleClassName,
              item.isDisabled ? 'cursor-not-allowed text-slate-400' : '',
            )}
            onClick={() => handleToggle(index)}
            disabled={item.isDisabled}
          >
            {/* 제목 */}
            <span className={titleClassName}>{item.title}</span>
            <span>
              {openIndices.includes(index) ? (
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='h-4 w-4'>
                  <path
                    fillRule='evenodd'
                    d='M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='h-4 w-4'>
                  <path
                    fillRule='evenodd'
                    d='M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndices.includes(index) ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {/* 내용 */}
            <div className={twMerge('pb-5 text-sm text-slate-500', contentClassName)}>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
