/*************************************************************
 * 카드 컴포넌트
 * - created by hwanee-k
 *************************************************************/

import { twMerge } from 'tailwind-merge';

interface CardProps {
  className?: string; // 카드 스타일
  children: React.ReactNode; // 카드 내용
  onClick?: () => void;
}

export default function Card({ className, children, onClick }: CardProps) {
  return (
    <div
      className={twMerge(
        'rounded-md border border-gray-100 bg-white px-5 py-4 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06)]',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
